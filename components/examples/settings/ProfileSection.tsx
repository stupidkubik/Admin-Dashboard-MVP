"use client";

import type { LucideIcon } from "lucide-react";
import { Save, User } from "lucide-react";

export type ProfileField = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  colSpan?: "full" | "half";
};

type ProfileSectionProps = {
  avatarIcon?: LucideIcon;
  avatarHint?: string;
  fields: ProfileField[];
  onCancel?: () => void;
  onSave?: () => void;
  cancelLabel?: string;
  saveLabel?: string;
};

export default function ProfileSection({
  avatarIcon: AvatarIcon = User,
  avatarHint = "Upload a new avatar. Recommended size 200x200px",
  fields,
  onCancel,
  onSave,
  cancelLabel = "Cancel",
  saveLabel = "Save Changes",
}: ProfileSectionProps) {
  return (
    <section className="section-container">
      <h2 className="heading-3 mb-6">Profile Information</h2>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20">
            <div className="flex-center h-full w-full rounded-full bg-muted">
              <AvatarIcon className="h-10 w-10 text-muted-foreground" />
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 rounded-full border bg-card p-1 shadow-sm"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 4v16m8-8H4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </button>
          </div>
          <div>
            <h4 className="text-sm font-medium">Profile Picture</h4>
            <p className="text-sm text-muted-foreground">{avatarHint}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {fields.map(
            ({
              id,
              label,
              type = "text",
              placeholder,
              multiline,
              rows = 4,
              colSpan,
            }) => {
              const baseClass = colSpan === "full" ? "md:col-span-2" : "";
              return (
                <div key={id} className={`form-group ${baseClass}`}>
                  <label className="form-label" htmlFor={id}>
                    {label}
                  </label>
                  {multiline ? (
                    <textarea
                      id={id}
                      className="control-textarea"
                      placeholder={placeholder}
                      rows={rows}
                    />
                  ) : (
                    <input
                      id={id}
                      type={type}
                      className="control-input"
                      placeholder={placeholder}
                    />
                  )}
                </div>
              );
            },
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-4 border-t pt-6">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          {cancelLabel}
        </button>
        <button type="button" className="btn btn-primary" onClick={onSave}>
          <Save className="mr-2 h-4 w-4" />
          {saveLabel}
        </button>
      </div>
    </section>
  );
}
