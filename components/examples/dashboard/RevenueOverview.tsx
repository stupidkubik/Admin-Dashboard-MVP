"use client";

type RevenueOverviewProps = {
  title: string;
  description: string;
  ranges: string[];
  placeholder?: string;
};

export default function RevenueOverview({
  title,
  description,
  ranges,
  placeholder = "Chart Placeholder",
}: RevenueOverviewProps) {
  return (
    <div className="glass lg:col-span-2 p-6">
      <div className="flex-between mb-4">
        <div>
          <h3 className="heading-4">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="btn-group">
          {ranges.map((label) => (
            <button key={label} className="btn btn-sm btn-outline">
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex h-[400px] items-center justify-center rounded-lg bg-muted/20">
        {placeholder}
      </div>
    </div>
  );
}
