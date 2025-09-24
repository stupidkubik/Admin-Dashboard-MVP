"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Bell, Mail, Shield, CreditCard, User, Layout } from "lucide-react";
import SettingsLayout from "@/components/examples/settings/SettingsLayout";
import SettingsSidebar, {
  SettingsTab,
} from "@/components/examples/settings/SettingsSidebar";
import ProfileSection, {
  ProfileField,
} from "@/components/examples/settings/ProfileSection";
import PreferencesSection, {
  PreferenceToggle,
} from "@/components/examples/settings/PreferencesSection";
import ConnectedAccounts, {
  ConnectedAccount,
} from "@/components/examples/settings/ConnectedAccounts";
import DangerZone from "@/components/examples/settings/DangerZone";

const SETTINGS_TABS: SettingsTab[] = [
  { icon: User, label: "Profile", id: "profile" },
  { icon: Bell, label: "Notifications", id: "notifications" },
  { icon: Mail, label: "Email", id: "email" },
  { icon: Shield, label: "Security", id: "security" },
  { icon: CreditCard, label: "Billing", id: "billing" },
  { icon: Layout, label: "Appearance", id: "appearance" },
];

const PROFILE_FIELDS: ProfileField[] = [
  {
    id: "firstName",
    label: "First Name",
    placeholder: "Enter your first name",
  },
  { id: "lastName", label: "Last Name", placeholder: "Enter your last name" },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email",
    colSpan: "full",
  },
  {
    id: "bio",
    label: "Bio",
    multiline: true,
    rows: 4,
    placeholder: "Write a short bio about yourself",
    colSpan: "full",
  },
];

const GENERAL_PREFERENCES: PreferenceToggle[] = [
  {
    id: "marketingEmails",
    label: "Marketing Emails",
    description: "Receive emails about new products and updates",
  },
  {
    id: "activityDigest",
    label: "Activity Digest",
    description: "Get weekly digest of your account activity",
    defaultChecked: true,
  },
];

const NOTIFICATION_PREFERENCES: PreferenceToggle[] = [
  {
    id: "pushAlerts",
    label: "Push Alerts",
    description: "Receive push notifications on mobile devices",
    defaultChecked: true,
  },
  {
    id: "desktopNotifications",
    label: "Desktop Notifications",
    description: "Show desktop alerts when important events happen",
  },
  {
    id: "weeklySummary",
    label: "Weekly Summary",
    description: "Send a weekly summary of performance metrics",
  },
];

const EMAIL_PREFERENCES: PreferenceToggle[] = [
  {
    id: "productEmails",
    label: "Product Updates",
    description: "Get announcements about product improvements",
    defaultChecked: true,
  },
  {
    id: "newsletter",
    label: "Newsletter",
    description: "Monthly newsletter with tips and best practices",
  },
  {
    id: "billingEmails",
    label: "Billing Emails",
    description: "Receive copies of invoices and receipts",
    defaultChecked: true,
  },
];

const APPEARANCE_OPTIONS: PreferenceToggle[] = [
  {
    id: "darkMode",
    label: "Dark Mode",
    description: "Automatically switch to dark mode at night",
  },
  {
    id: "compactUI",
    label: "Compact Layout",
    description: "Use tighter spacing for dense content",
  },
  {
    id: "highContrast",
    label: "High Contrast",
    description: "Improve readability with higher contrast colors",
  },
];

const SECURITY_PROVIDERS: ConnectedAccount[] = [
  {
    id: "google-auth",
    name: "Google Auth",
    connected: true,
    disconnectLabel: "Disable",
  },
  { id: "okta", name: "Okta", connected: false, connectLabel: "Enable" },
  { id: "auth0", name: "Auth0", connected: false, connectLabel: "Enable" },
];

const BILLING_INTEGRATIONS: ConnectedAccount[] = [
  {
    id: "stripe",
    name: "Stripe",
    connected: true,
    disconnectLabel: "Disconnect",
  },
  { id: "paddle", name: "Paddle", connected: false },
  { id: "paypal", name: "PayPal", connected: false },
];

const DANGER_ZONE = {
  title: "Danger Zone",
  description:
    "Once you delete your account, there is no going back. Please be certain.",
  actionLabel: "Delete Account",
};

export default function SettingsExample() {
  const [activeTabId, setActiveTabId] = useState(
    SETTINGS_TABS[0]?.id ?? "profile",
  );

  const handleProfileSave = () => {
    toast.success("Profile updated");
  };

  const handleProfileCancel = () => {
    toast.info("Changes discarded");
  };

  const handleDangerAction = () => {
    toast.error("Account deletion requested", {
      description: "This action is simulated for the demo.",
    });
  };

  const renderContent = () => {
    switch (activeTabId) {
      case "profile":
        return (
          <>
            <ProfileSection
              fields={PROFILE_FIELDS}
              onSave={handleProfileSave}
              onCancel={handleProfileCancel}
            />
            <PreferencesSection
              title="General Preferences"
              toggles={GENERAL_PREFERENCES}
            />
          </>
        );
      case "notifications":
        return (
          <PreferencesSection
            title="Notification Preferences"
            toggles={NOTIFICATION_PREFERENCES}
          />
        );
      case "email":
        return (
          <PreferencesSection
            title="Email Preferences"
            toggles={EMAIL_PREFERENCES}
          />
        );
      case "security":
        return (
          <>
            <ConnectedAccounts
              title="Security Providers"
              accounts={SECURITY_PROVIDERS}
            />
            <DangerZone {...DANGER_ZONE} onAction={handleDangerAction} />
          </>
        );
      case "billing":
        return (
          <ConnectedAccounts
            title="Billing Integrations"
            accounts={BILLING_INTEGRATIONS}
          />
        );
      case "appearance":
        return (
          <PreferencesSection title="Appearance" toggles={APPEARANCE_OPTIONS} />
        );
      default:
        return null;
    }
  };

  return (
    <SettingsLayout
      title="Settings"
      description="Manage your account preferences"
      sidebar={
        <SettingsSidebar
          tabs={SETTINGS_TABS}
          activeTabId={activeTabId}
          onTabClick={setActiveTabId}
        />
      }
    >
      {renderContent()}
    </SettingsLayout>
  );
}
