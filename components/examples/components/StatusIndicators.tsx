export type StatusIndicator = {
  label: string;
  dotClass: string;
  pulseClass?: string;
};

type StatusIndicatorsProps = {
  title?: string;
  indicators: StatusIndicator[];
};

export default function StatusIndicators({
  title = "Status Indicators",
  indicators,
}: StatusIndicatorsProps) {
  return (
    <section className="section-container">
      <h2 className="heading-2 mb-6">{title}</h2>
      <div className="grid-container md:grid-cols-2 lg:grid-cols-4">
        {indicators.map(({ label, dotClass, pulseClass }, index) => (
          <div key={`status-${index}`} className="flex items-center gap-2">
            <div className={dotClass}>
              {pulseClass ? <div className={pulseClass} /> : null}
            </div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
