import TopBar from "@/components/layout/TopBar";
import MetricCard from "@/components/ui/MetricCard";
import RevenueChart from "@/components/finance/RevenueChart";
import InvoiceList from "@/components/finance/InvoiceList";
import SupplierPayments from "@/components/finance/SupplierPayments";
import WorkflowFlow from "@/components/ui/WorkflowFlow";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Clock, CreditCard } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export default function Finance() {
  return (
    <div className="max-w-7xl mx-auto">
      <TopBar title="Payment Management" subtitle="Financial overview · June 2026" />
      <WorkflowFlow steps={["Invoice", "Submit", "Review", "Pay", "Reconcile", "End"]} currentStep={2} />

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div {...fadeIn} transition={{ delay: 0 }}>
          <MetricCard label="Monthly Revenue" value="$392K" change="↑ 7.4% vs May" changeType="up" icon={DollarSign} />
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.05 }}>
          <MetricCard label="Gross Margin" value="31.9%" change="↑ 1.2pp" changeType="up" icon={TrendingUp} />
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
          <MetricCard label="Outstanding" value="$37.5K" change="3 invoices overdue" changeType="down" icon={Clock} />
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.15 }}>
          <MetricCard label="DSO" value="28 days" change="↓ 4 days vs Q1" changeType="up" icon={CreditCard} />
        </motion.div>
      </div>

      {/* Charts & Lists */}
      <div className="grid grid-cols-12 gap-5">
        <motion.div className="col-span-12 lg:col-span-7" {...fadeIn} transition={{ delay: 0.2 }}>
          <RevenueChart />
        </motion.div>
        <motion.div className="col-span-12 lg:col-span-5" {...fadeIn} transition={{ delay: 0.25 }}>
          <SupplierPayments />
        </motion.div>
        <motion.div className="col-span-12" {...fadeIn} transition={{ delay: 0.3 }}>
          <InvoiceList />
        </motion.div>
      </div>
    </div>
  );
}