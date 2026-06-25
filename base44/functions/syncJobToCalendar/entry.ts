import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

function parseScheduledTime(timeStr) {
  if (!timeStr) return null;
  const match = String(timeStr).match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const ampm = match[3].toUpperCase();
  if (ampm === 'PM' && hours !== 12) hours += 12;
  if (ampm === 'AM' && hours === 12) hours = 0;
  const result = new Date();
  result.setHours(hours, minutes, 0, 0);
  return result;
}

function formatDateTime(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
}

function buildEventBody(job) {
  const start = parseScheduledTime(job.scheduled_time);
  const description = [
    `Client: ${job.client || '—'}`,
    `Type: ${job.job_type || '—'}`,
    `Vehicle: ${job.vehicle_id || 'Unassigned'}`,
    `Contact: ${job.contact_name || '—'} (${job.contact_phone || '—'})`,
    `Priority: ${job.priority || 'normal'}`,
    job.notes ? `Notes: ${job.notes}` : '',
  ].filter(Boolean).join('\n');

  const body = {
    summary: `${job.job_id} — ${job.title}`,
    location: job.site_address || '',
    description,
  };

  if (start) {
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    body.start = { dateTime: formatDateTime(start), timeZone: 'Australia/Perth' };
    body.end = { dateTime: formatDateTime(end), timeZone: 'Australia/Perth' };
  } else {
    const today = new Date().toISOString().split('T')[0];
    body.start = { date: today };
    body.end = { date: today };
  }
  return body;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();
    const { event, data, changed_fields } = payload;

    if (!event || !data) {
      return Response.json({ status: 'no_data' });
    }

    const job = data;
    const eventType = event.type;

    // Skip self-triggered updates (only calendar_event_id changed by this function)
    if (eventType === 'update' && Array.isArray(changed_fields)) {
      const meaningful = changed_fields.filter(
        (f) => f !== 'calendar_event_id' && f !== 'updated_date'
      );
      if (meaningful.length === 0) {
        return Response.json({ status: 'skipped_self_update' });
      }
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('googlecalendar');
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    // Handle delete — remove calendar event
    if (eventType === 'delete') {
      if (job.calendar_event_id) {
        await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/primary/events/${job.calendar_event_id}`,
          { method: 'DELETE', headers }
        );
      }
      return Response.json({ status: 'deleted' });
    }

    // Skip if no scheduled_time (not a scheduled job yet)
    if (!job.scheduled_time) {
      return Response.json({ status: 'no_scheduled_time' });
    }

    const eventBody = buildEventBody(job);
    const calendarUrl = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

    // Try to update existing event
    if (job.calendar_event_id) {
      const patchRes = await fetch(`${calendarUrl}/${job.calendar_event_id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(eventBody),
      });
      if (patchRes.ok) {
        return Response.json({ status: 'updated', event_id: job.calendar_event_id });
      }
      if (patchRes.status !== 404) {
        const err = await patchRes.text();
        return Response.json({ status: 'update_failed', error: err }, { status: 500 });
      }
      // 404 — event was deleted from calendar, fall through to create a new one
    }

    // Create new event
    const createRes = await fetch(calendarUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(eventBody),
    });
    if (!createRes.ok) {
      const err = await createRes.text();
      return Response.json({ status: 'create_failed', error: err }, { status: 500 });
    }
    const created = await createRes.json();
    await base44.asServiceRole.entities.Job.update(job.id, {
      calendar_event_id: created.id,
    });
    return Response.json({ status: 'created', event_id: created.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});