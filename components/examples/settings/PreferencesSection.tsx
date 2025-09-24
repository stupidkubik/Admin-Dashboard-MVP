"use client";

export type PreferenceToggle = {
  id: string;
  label: string;
  description: string;
  defaultChecked?: boolean;
};

type PreferencesSectionProps = {
  title?: string;
  toggles: PreferenceToggle[];
};

export default function PreferencesSection({
  title = "Preferences",
  toggles,
}: PreferencesSectionProps) {
  return (
    <section className="section-container">
      <h3 className="heading-4 mb-6">{title}</h3>
      <div className="space-y-4">
        {toggles.map(({ id, label, description, defaultChecked }) => (
          <div key={id} className="flex items-center justify-between">
            <div>
              <label htmlFor={id} className="font-medium">
                {label}
              </label>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <input
              type="checkbox"
              id={id}
              className="form-switch"
              defaultChecked={defaultChecked}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
