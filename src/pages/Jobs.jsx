import { useState, useEffect } from "react";
import TopBar from "@/components/layout/TopBar";
import JobBoard from "@/components/jobs/JobBoard";
import JobDetails from "@/components/jobs/JobDetails";
import DispatchStepper from "@/components/jobs/DispatchStepper";
import LiveJobTracking from "@/components/jobs/LiveJobTracking";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

const statusOrder = ["created", "scheduled", "assigned", "dispatched", "en_route", "completed"];

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    base44.entities.Job.list()
      .then((data) => {
        setJobs(data);
        if (data.length > 0) setSelectedJob(data[0]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = jobs.filter(
    (j) =>
      j.job_id?.toLowerCase().includes(search.toLowerCase()) ||
      j.client?.toLowerCase().includes(search.toLowerCase()) ||
      j.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdvance = async (job) => {
    const currentIdx = statusOrder.indexOf(job.status);
    if (currentIdx >= statusOrder.length - 1) return;
    const nextStatus = statusOrder[currentIdx + 1];
    try {
      const updated = await base44.entities.Job.update(job.id, { status: nextStatus });
      setJobs((prev) => prev.map((j) => (j.id === job.id ? updated : j)));
      setSelectedJob(updated);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <TopBar title="Job Management" subtitle="Plan, schedule and deliver with confidence" />

      <div className="grid grid-cols-12 gap-4" style={{ minHeight: "calc(100vh - 220px)" }}>
        <motion.div className="col-span-12 lg:col-span-3" {...fadeIn}>
          <JobBoard
            jobs={filtered}
            selectedJob={selectedJob}
            onSelect={setSelectedJob}
            search={search}
            onSearch={setSearch}
            onNewJob={() => (window.location.href = "/booking")}
            loading={loading}
          />
        </motion.div>

        <motion.div className="col-span-12 lg:col-span-5 space-y-4" {...fadeIn} transition={{ delay: 0.05 }}>
          <JobDetails job={selectedJob} />
          <DispatchStepper job={selectedJob} onAdvance={handleAdvance} />
        </motion.div>

        <motion.div className="col-span-12 lg:col-span-4" {...fadeIn} transition={{ delay: 0.1 }}>
          <LiveJobTracking job={selectedJob} />
        </motion.div>
      </div>
    </div>
  );
}