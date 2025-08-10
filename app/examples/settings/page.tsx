'use client'

import { Bell, Mail, Shield, CreditCard, User, Layout, Save } from 'lucide-react'

const settingsTabs = [
  { icon: User, label: 'Profile', id: 'profile' },
  { icon: Bell, label: 'Notifications', id: 'notifications' },
  { icon: Mail, label: 'Email', id: 'email' },
  { icon: Shield, label: 'Security', id: 'security' },
  { icon: CreditCard, label: 'Billing', id: 'billing' },
  { icon: Layout, label: 'Appearance', id: 'appearance' },
]

export default function SettingsExample() {
  return (
    <div className="page-container max-w-6xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="heading-2 mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      {/* Settings Navigation */}
      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="md:w-64">
          <nav className="space-y-1">
            {settingsTabs.map(({ icon: Icon, label, id }) => (
              <button
                key={id}
                className="nav-item w-full justify-start"
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Settings Content */}
        <div className="flex-1 space-y-8">
          {/* Profile Section */}
          <section className="section-container">
            <h2 className="heading-3 mb-6">Profile Information</h2>
            <div className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20">
                  <div className="flex-center h-full w-full rounded-full bg-muted">
                    <User className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <button className="absolute bottom-0 right-0 rounded-full border bg-card p-1 shadow-sm">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                    </svg>
                  </button>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Profile Picture</h4>
                  <p className="text-sm text-muted-foreground">
                    Upload a new avatar. Recommended size 200x200px
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="form-input"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="form-input"
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="form-group md:col-span-2">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group md:col-span-2">
                  <label className="form-label" htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    className="form-textarea"
                    placeholder="Write a short bio about yourself"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="mt-8 space-y-4 border-t pt-6">
              <h3 className="heading-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="marketingEmails" className="font-medium">
                      Marketing Emails
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about new products and updates
                    </p>
                  </div>
                  <input type="checkbox" id="marketingEmails" className="form-switch" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="activityDigest" className="font-medium">
                      Activity Digest
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Get weekly digest of your account activity
                    </p>
                  </div>
                  <input type="checkbox" id="activityDigest" className="form-switch" defaultChecked />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex items-center justify-end gap-4 border-t pt-6">
              <button className="btn btn-outline">Cancel</button>
              <button className="btn btn-primary">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </button>
            </div>
          </section>

          {/* Connected Accounts */}
          <section className="section-container">
            <h2 className="heading-3 mb-6">Connected Accounts</h2>
            <div className="space-y-4">
              {['Google', 'GitHub', 'Twitter'].map((provider) => (
                <div key={provider} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">{provider}</h4>
                    <p className="text-sm text-muted-foreground">
                      {provider === 'Google' ? 'Connected' : 'Not connected'}
                    </p>
                  </div>
                  <button
                    className={`btn btn-sm ${provider === 'Google' ? 'btn-destructive' : 'btn-outline'
                      }`}
                  >
                    {provider === 'Google' ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Danger Zone */}
          <section className="rounded-lg border border-destructive/50 p-6">
            <h2 className="heading-3 text-destructive mb-4">Danger Zone</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="btn btn-destructive">Delete Account</button>
          </section>
        </div>
      </div>
    </div>
  )
}
