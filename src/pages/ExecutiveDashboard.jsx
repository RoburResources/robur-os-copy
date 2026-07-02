import TopBar from "@/components/layout/TopBar";
import MetricCard from "@/components/ui/MetricCard";
import GlassCard from "@/components/ui/GlassCard";
import RevenueChart from "@/components/finance/RevenueChart";
import VehicleStatusCard from "@/components/fleet/VehicleStatusCard";
import { motion } from "framer-motion";
import { DollarSign, Truck, Package, CheckCircle, ArrowRight, TrendingUp, AlertTriangle, GripVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

const alerts = [
  { severity: "critical", message: "Truck 04 service overdue", time: "2h ago" },
  { severity: "warning", message: "3 invoices awaiting payment", time: "5h ago" },
  { severity: "info", message: "Job JOB-1024 completed", time: "1h ago" },
];

const activity = [
  { action: "Job Completed", detail: "JOB-1024 · Tottenham", time: "1h ago" },
  { action: "Vehicle Dispatched", detail: "Truck 03 to Sunshine", time: "2h ago" },
  { action: "Invoice Sent", detail: "INV-4471 to Cleanaway", time: "3h ago" },
  { action: "Docket Processed", detail: "WB-10247 validated", time: "4h ago" },
];

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [moved] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, moved);
  return result;
}

function DraggableCard({ id, index, span, children }) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={cn(span, "relative group", snapshot.isDragging && "z-50")}
        >
          <div
            {...provided.dragHandleProps}
            className="absolute -top-2 -left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing bg-white/80 rounded-lg p-1 shadow-md"
          >
            <GripVertical className="h-3.5 w-3.5 text-robur-steel" />
          </div>
          {children}
        </div>
      )}
    </Draggable>
  );
}

export default function ExecutiveDashboard() {
  const [metricOrder, setMetricOrder] = useState(["revenue-m", "fleet-m", "jobs-m", "ontime-m"]);
  const [cardOrder, setCardOrder] = useState(["revenue", "alerts", "vehicle", "activity", "quick"]);

  const metrics = {
    "revenue-m": { label: "Monthly Revenue", value: "$392K", change: "↑ 7.4% vs May", icon: DollarSign },
    "fleet-m": { label: "Fleet Utilisation", value: "72%", change: "↑ 5% vs last week", icon: Truck },
    "jobs-m": { label: "Active Jobs", value: "18", change: "3 ahead of schedule", icon: Package },
    "ontime-m": { label: "On-Time Rate", value: "94%", change: "↑ 2pp vs May", icon: CheckCircle },
  };

  const cards = {
    revenue: { span: "col-span-12 lg:col-span-8", node: <RevenueChart /> },
    alerts: {
      span: "col-span-12 lg:col-span-4",
      node: (
        <GlassCard level={2} className="p-5 h-full">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-robur-yellow" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Priority Alerts</h3>
          </div>
          <div className="space-y-3">
            {alerts.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={cn("mt-1 h-2 w-2 rounded-full shrink-0",
                  a.severity === "critical" ? "bg-red-400" : a.severity === "warning" ? "bg-robur-yellow" : "bg-blue-400"
                )} />
                <div className="flex-1">
                  <p className="text-xs font-medium text-robur-charcoal">{a.message}</p>
                  <p className="text-[10px] text-robur-steel">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      ),
    },
    vehicle: { span: "col-span-12 lg:col-span-5", node: <VehicleStatusCard /> },
    activity: {
      span: "col-span-12 lg:col-span-7",
      node: (
        <GlassCard level={2} className="p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {activity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-robur-charcoal/[0.03] p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/60">
                  <TrendingUp className="h-4 w-4 text-robur-charcoal" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-robur-charcoal">{a.action}</p>
                  <p className="text-[10px] text-robur-steel">{a.detail}</p>
                </div>
                <span className="text-[10px] text-robur-steel/60">{a.time}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      ),
    },
    quick: {
      span: "col-span-12 lg:col-span-5",
      node: (
        <GlassCard level={2} className="p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel mb-4">Quick Access</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Job Management", path: "/jobs", icon: Package },
              { label: "Fleet Status", path: "/fleet", icon: Truck },
              { label: "Payments", path: "/finance", icon: DollarSign },
              { label: "Documents", path: "/documents", icon: CheckCircle },
            ].map((q) => (
              <Link key={q.path} to={q.path} className="group rounded-xl bg-robur-charcoal/[0.03] p-4 hover:bg-robur-yellow/10 transition-colors">
                <q.icon className="h-5 w-5 text-robur-charcoal mb-2" strokeWidth={1.5} />
                <p className="text-xs font-semibold text-robur-charcoal">{q.label}</p>
                <ArrowRight className="h-3 w-3 text-robur-steel mt-1 group-hover:text-robur-yellow transition-colors" />
              </Link>
            ))}
          </div>
        </GlassCard>
      ),
    },
  };

  const onDragEnd = (result) => {
    if (!result.destination || result.destination.index === result.source.index) return;
    if (result.type === "metrics") {
      setMetricOrder((prev) => reorder(prev, result.source.index, result.destination.index));
    } else {
      setCardOrder((prev) => reorder(prev, result.source.index, result.destination.index));
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <TopBar title="Executive Dashboard" subtitle="Strategic overview · June 2026" />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="metrics" type="metrics" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {metricOrder.map((id, index) => {
                const m = metrics[id];
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={cn("relative group", snapshot.isDragging && "z-50")}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="absolute -top-2 -left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing bg-white/80 rounded-lg p-1 shadow-md"
                        >
                          <GripVertical className="h-3.5 w-3.5 text-robur-steel" />
                        </div>
                        <MetricCard label={m.label} value={m.value} change={m.change} changeType="up" icon={m.icon} />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="cards" type="cards">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="grid grid-cols-12 gap-5">
              {cardOrder.map((id, index) => (
                <DraggableCard key={id} id={id} index={index} span={cards[id].span}>
                  {cards[id].node}
                </DraggableCard>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}