'use client'

export default function ComponentsShowcase() {
  return (
    <div className="page-container space-y-12">
      {/* Page Header */}
      <div className="space-y-4">
        <h1 className="heading-1 text-gradient">Components Showcase</h1>
        <p className="text-muted-foreground text-lg">
          A comprehensive showcase of available components and styles
        </p>
      </div>

      {/* Typography Section */}
      <section className="section-container">
        <h2 className="heading-2 mb-6">Typography</h2>
        <div className="space-y-4">
          <h1 className="heading-1">Heading 1</h1>
          <h2 className="heading-2">Heading 2</h2>
          <h3 className="heading-3">Heading 3</h3>
          <h4 className="heading-4">Heading 4</h4>
          <p className="text-lg">Large Text</p>
          <p>Regular Text</p>
          <p className="text-sm text-muted-foreground">Small Muted Text</p>
          <p className="text-gradient text-2xl font-bold">Gradient Text</p>
          <div className="space-y-2">
            <p className="truncate-1 w-64 bg-muted p-2">Single Line Truncation...</p>
            <p className="truncate-2 w-64 bg-muted p-2">
              Multi-line truncation. This text will be truncated after two lines. Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="section-container">
        <h2 className="heading-2 mb-6">Buttons</h2>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-outline">Outline</button>
            <button className="btn btn-ghost">Ghost</button>
            <button className="btn btn-link">Link</button>
            <button className="btn btn-destructive">Destructive</button>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="btn btn-primary btn-sm">Small</button>
            <button className="btn btn-primary">Default</button>
            <button className="btn btn-primary btn-lg">Large</button>
          </div>
          <div className="btn-group">
            <button className="btn btn-outline">Left</button>
            <button className="btn btn-outline">Center</button>
            <button className="btn btn-outline">Right</button>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="section-container">
        <h2 className="heading-2 mb-6">Cards</h2>
        <div className="grid-container md:grid-cols-3">
          {/* Regular Card */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="heading-4 mb-2">Regular Card</h3>
            <p className="text-muted-foreground">Standard card with border and shadow</p>
          </div>

          {/* Glass Card */}
          <div className="glass p-6 hover:glass-hover">
            <h3 className="heading-4 mb-2">Glass Card</h3>
            <p className="text-muted-foreground">With backdrop blur and hover effect</p>
          </div>

          {/* Gradient Card */}
          <div className="rounded-lg bg-gradient-to-br from-primary/50 to-secondary/50 p-6 text-primary-foreground">
            <h3 className="heading-4 mb-2">Gradient Card</h3>
            <p className="text-primary-foreground/80">With gradient background</p>
          </div>
        </div>
      </section>

      {/* Status Indicators */}
      <section className="section-container">
        <h2 className="heading-2 mb-6">Status Indicators</h2>
        <div className="grid-container md:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-2">
            <div className="status-dot status-online">
              <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            </div>
            <span>Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="status-dot status-offline" />
            <span>Offline</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="status-dot status-busy" />
            <span>Busy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="status-dot status-away" />
            <span>Away</span>
          </div>
        </div>
      </section>

      {/* Alerts Section */}
      <section className="section-container">
        <h2 className="heading-2 mb-6">Alerts</h2>
        <div className="space-y-4">
          <div className="alert-success rounded-lg border p-4">
            <p>Success message goes here</p>
          </div>
          <div className="alert-error rounded-lg border p-4">
            <p>Error message goes here</p>
          </div>
          <div className="alert-warning rounded-lg border p-4">
            <p>Warning message goes here</p>
          </div>
          <div className="alert-info rounded-lg border p-4">
            <p>Information message goes here</p>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="section-container">
        <h2 className="heading-2 mb-6">Form Elements</h2>
        <form className="space-y-6">
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="message">Message</label>
            <textarea
              id="message"
              className="form-textarea"
              placeholder="Enter your message"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="form-checkbox" />
              <label htmlFor="terms" className="form-label">Accept terms</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" id="option1" name="option" className="form-radio" />
              <label htmlFor="option1" className="form-label">Option 1</label>
            </div>
          </div>
        </form>
      </section>

      {/* Animations Section */}
      <section className="section-container">
        <h2 className="heading-2 mb-6">Animations</h2>
        <div className="grid-container md:grid-cols-3">
          <div className="animate-fade-in rounded-lg bg-card p-4 shadow-sm">
            <p>Fade In</p>
          </div>
          <div className="animate-slide-in-right rounded-lg bg-card p-4 shadow-sm">
            <p>Slide In Right</p>
          </div>
          <div className="animate-bounce rounded-lg bg-card p-4 shadow-sm">
            <p>Bounce</p>
          </div>
        </div>
      </section>
    </div>
  )
}
