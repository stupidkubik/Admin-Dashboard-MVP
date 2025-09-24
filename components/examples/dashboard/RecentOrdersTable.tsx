"use client";

type Order = {
  id: string;
  customer: string;
  status: string;
  statusClass?: string;
  amount: string;
};

type RecentOrdersTableProps = {
  orders: Order[];
  onViewAll?: () => void;
};

export default function RecentOrdersTable({
  orders,
  onViewAll,
}: RecentOrdersTableProps) {
  return (
    <div className="section-container">
      <div className="flex-between mb-6">
        <div>
          <h3 className="heading-4">Recent Orders</h3>
          <p className="text-sm text-muted-foreground">
            Latest customer orders
          </p>
        </div>
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={onViewAll}
        >
          View All
        </button>
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
            {orders.map((order) => (
              <tr key={order.id} className="table-row">
                <td className="table-cell">{order.id}</td>
                <td className="table-cell">{order.customer}</td>
                <td className="table-cell">
                  <span
                    className={
                      order.statusClass ??
                      "inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                    }
                  >
                    {order.status}
                  </span>
                </td>
                <td className="table-cell text-right">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
