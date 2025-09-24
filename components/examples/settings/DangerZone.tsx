"use client";

type DangerZoneProps = {
  title: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
};

export default function DangerZone({
  title,
  description,
  actionLabel,
  onAction,
}: DangerZoneProps) {
  return (
    <section className="rounded-lg border border-destructive/50 p-6">
      <h2 className="heading-3 mb-4 text-destructive">{title}</h2>
      <p className="mb-6 text-sm text-muted-foreground">{description}</p>
      <button type="button" className="btn btn-destructive" onClick={onAction}>
        {actionLabel}
      </button>
    </section>
  );
}
