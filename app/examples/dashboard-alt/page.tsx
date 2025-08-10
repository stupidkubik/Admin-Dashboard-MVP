'use client'

import { ArrowUpIcon, ArrowDownIcon, MoreVerticalIcon, Filter, Download } from 'lucide-react'

export default function DashboardAltExample() {
  return (
    <div className="page-container space-y-6">
      {/* Header with Actions */}
      <div className="flex-between">
        <div>
          <h1 className="heading-2 mb-1">Analytics Overview</h1>
          <p className="text-muted-foreground">Track your performance and growth</p>
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

      {/* Quick Stats */}
      <div className="grid-container md:grid-cols-2 lg:grid-cols-4">
        {/* Revenue Card */}
        <div className="glass p-6 hover:glass-hover">
          <div className="flex-between mb-4">
            <p className="text-sm font-medium text-muted-foreground">Revenue</p>
            <MoreVerticalIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">$45,231.89</h3>
            <p className="flex items-center text-sm text-green-500">
              <ArrowUpIcon className="mr-1 h-4 w-4" />
              +20.1% from last month
            </p>
          </div>
        </div>

        {/* Subscriptions Card */}
        <div className="glass p-6 hover:glass-hover">
          <div className="flex-between mb-4">
            <p className="text-sm font-medium text-muted-foreground">Subscriptions</p>
            <MoreVerticalIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">+2,350</h3>
            <p className="flex items-center text-sm text-green-500">
              <ArrowUpIcon className="mr-1 h-4 w-4" />
              +180.1% from last month
            </p>
          </div>
        </div>

        {/* Sales Card */}
        <div className="glass p-6 hover:glass-hover">
          <div className="flex-between mb-4">
            <p className="text-sm font-medium text-muted-foreground">Sales</p>
            <MoreVerticalIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">+12,234</h3>
            <p className="flex items-center text-sm text-red-500">
              <ArrowDownIcon className="mr-1 h-4 w-4" />
              -8.1% from last month
            </p>
          </div>
        </div>

        {/* Active Users Card */}
        <div className="glass p-6 hover:glass-hover">
          <div className="flex-between mb-4">
            <p className="text-sm font-medium text-muted-foreground">Active Users</p>
            <MoreVerticalIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">+573</h3>
            <p className="flex items-center text-sm text-green-500">
              <ArrowUpIcon className="mr-1 h-4 w-4" />
              +201 since last hour
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid-container lg:grid-cols-3">
        {/* Chart Section */}
        <div className="glass lg:col-span-2 p-6">
          <div className="flex-between mb-4">
            <div>
              <h3 className="heading-4">Revenue Overview</h3>
              <p className="text-sm text-muted-foreground">Monthly revenue statistics</p>
            </div>
            <div className="btn-group">
              <button className="btn btn-sm btn-outline">Week</button>
              <button className="btn btn-sm btn-outline">Month</button>
              <button className="btn btn-sm btn-outline">Year</button>
            </div>
          </div>
          <div className="h-[400px] rounded-lg bg-muted/20 flex items-center justify-center">
            Chart Placeholder
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass p-6">
          <h3 className="heading-4 mb-4">Recent Activity</h3>
          <div className="space-y-6">
            {/* Activity Item */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4 pb-6 border-b last:border-0">
                <div className="status-dot status-online mt-1" />
                <div>
                  <p className="font-medium">New sale processed</p>
                  <p className="text-sm text-muted-foreground">Order #2543 was completed</p>
                  <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-link w-full mt-4">View All Activity</button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid-container lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="section-container">
          <div className="flex-between mb-6">
            <div>
              <h3 className="heading-4">Recent Orders</h3>
              <p className="text-sm text-muted-foreground">Latest customer orders</p>
            </div>
            <button className="btn btn-outline btn-sm">View All</button>
          </div>
          <div className="table-container">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="table-cell">Order</th>
                  <th className="table-cell">Customer</th>
                  <th className="table-cell">Status</th>
                  <th className="table-cell text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="table-row">
                    <td className="table-cell">#2587</td>
                    <td className="table-cell">John Doe</td>
                    <td className="table-cell">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Completed
                      </span>
                    </td>
                    <td className="table-cell text-right">$125.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="section-container">
          <h3 className="heading-4 mb-6">Quick Actions</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <button className="flex-center flex-col rounded-lg border-2 border-dashed p-6 hover:border-primary hover:bg-primary/5">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Download className="h-6 w-6" />
              </div>
              <h4 className="mt-3 font-medium">Download Report</h4>
              <p className="text-sm text-muted-foreground text-center mt-1">
                Get your monthly report
              </p>
            </button>
            <button className="flex-center flex-col rounded-lg border-2 border-dashed p-6 hover:border-primary hover:bg-primary/5">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Filter className="h-6 w-6" />
              </div>
              <h4 className="mt-3 font-medium">Advanced Filters</h4>
              <p className="text-sm text-muted-foreground text-center mt-1">
                Configure data filters
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
