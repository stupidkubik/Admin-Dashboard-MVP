"use client";

import { Filter, Download } from "lucide-react";
import AnalyticsQuickStats, {
  AnalyticsQuickStat,
} from "@/components/examples/dashboard/AnalyticsQuickStats";
import RevenueOverview from "@/components/examples/dashboard/RevenueOverview";
import RecentActivityList from "@/components/examples/dashboard/RecentActivityList";
import RecentOrdersTable from "@/components/examples/dashboard/RecentOrdersTable";
import QuickActions from "@/components/examples/dashboard/QuickActions";

const QUICK_STATS: AnalyticsQuickStat[] = [
  {
    label: "Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    trend: "up",
  },
  {
    label: "Subscriptions",
    value: "+2,350",
    change: "+180.1% from last month",
    trend: "up",
  },
  {
    label: "Sales",
    value: "+12,234",
    change: "-8.1% from last month",
    trend: "down",
  },
  {
    label: "Active Users",
    value: "+573",
    change: "+201 since last hour",
    trend: "up",
  },
];

const REVENUE_RANGES = ["Week", "Month", "Year"];

const RECENT_ACTIVITY = [
  {
    id: "activity-1",
    statusClass: "status-online",
    title: "New sale processed",
    description: "Order #2543 was completed",
    timestamp: "2 minutes ago",
  },
  {
    id: "activity-2",
    statusClass: "status-online",
    title: "Server maintenance completed",
    description: "Servers updated to v2.1.4",
    timestamp: "12 minutes ago",
  },
  {
    id: "activity-3",
    statusClass: "status-busy",
    title: "New support ticket",
    description: "Ticket #482 created by Jane Cooper",
    timestamp: "30 minutes ago",
  },
  {
    id: "activity-4",
    statusClass: "status-online",
    title: "Payment received",
    description: "Stripe payout processed",
    timestamp: "1 hour ago",
  },
];

const RECENT_ORDERS = [
  { id: "#2587", customer: "John Doe", status: "Completed", amount: "$125.00" },
  {
    id: "#2586",
    customer: "Emily Stone",
    status: "Completed",
    amount: "$299.00",
  },
  {
    id: "#2585",
    customer: "William Harris",
    status: "Completed",
    amount: "$89.99",
  },
];

const QUICK_ACTIONS = [
  {
    id: "download-report",
    title: "Download Report",
    description: "Get your monthly report",
    icon: Download,
  },
  {
    id: "advanced-filters",
    title: "Advanced Filters",
    description: "Configure data filters",
    icon: Filter,
  },
];

export default function DashboardAltExample() {
  return (
    <div className="page-container space-y-6">
      {/* Header with Actions */}
      <div className="flex-between">
        <div>
          <h1 className="heading-2 mb-1">Analytics Overview</h1>
          <p className="text-muted-foreground">
            Track your performance and growth
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-outline btn-sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </button>
          <button className="btn btn-outline btn-sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <AnalyticsQuickStats stats={QUICK_STATS} />

      {/* Main Content */}
      <div className="grid-container lg:grid-cols-3">
        <RevenueOverview
          title="Revenue Overview"
          description="Monthly revenue statistics"
          ranges={REVENUE_RANGES}
        />
        <RecentActivityList items={RECENT_ACTIVITY} />
      </div>

      {/* Bottom Section */}
      <div className="grid-container lg:grid-cols-2">
        <RecentOrdersTable orders={RECENT_ORDERS} />
        <QuickActions actions={QUICK_ACTIONS} />
      </div>
    </div>
  );
}
