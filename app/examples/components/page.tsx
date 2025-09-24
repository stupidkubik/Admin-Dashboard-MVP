"use client";

import TypographyShowcase, {
  type TypographyItem,
} from "@/components/examples/components/TypographyShowcase";
import ButtonsShowcase from "@/components/examples/components/ButtonsShowcase";
import CardsShowcase from "@/components/examples/components/CardsShowcase";
import StatusIndicators, {
  type StatusIndicator,
} from "@/components/examples/components/StatusIndicators";
import AlertList from "@/components/examples/components/AlertList";
import FormShowcase, {
  type FormControl,
  type FormField,
} from "@/components/examples/components/FormShowcase";
import AnimationsGrid from "@/components/examples/components/AnimationsGrid";

const TYPOGRAPHY_HEADINGS = [
  { element: "h1", text: "Heading 1", className: "heading-1" },
  { element: "h2", text: "Heading 2", className: "heading-2" },
  { element: "h3", text: "Heading 3", className: "heading-3" },
  { element: "h4", text: "Heading 4", className: "heading-4" },
] satisfies TypographyItem[];

const TYPOGRAPHY_PARAGRAPHS = [
  { element: "p", text: "Large Text", className: "text-lg" },
  { element: "p", text: "Regular Text" },
  {
    element: "p",
    text: "Small Muted Text",
    className: "text-sm text-muted-foreground",
  },
  {
    element: "p",
    text: "Gradient Text",
    className: "text-gradient text-2xl font-bold",
  },
] satisfies TypographyItem[];

const TYPOGRAPHY_TRUNCATIONS = [
  {
    element: "p",
    text: "Single Line Truncation...",
    className: "truncate-1 w-64 bg-muted p-2",
  },
  {
    element: "p",
    text: "Multi-line truncation. This text will be truncated after two lines. Lorem ipsum dolor sit amet.",
    className: "truncate-2 w-64 bg-muted p-2",
  },
] satisfies TypographyItem[];

const BUTTON_VARIANTS = [
  { label: "Primary", className: "btn btn-primary" },
  { label: "Secondary", className: "btn btn-secondary" },
  { label: "Outline", className: "btn btn-outline" },
  { label: "Ghost", className: "btn btn-ghost" },
  { label: "Link", className: "btn btn-link" },
  { label: "Destructive", className: "btn btn-destructive" },
];

const BUTTON_SIZES = [
  { label: "Small", className: "btn btn-primary btn-sm" },
  { label: "Default", className: "btn btn-primary" },
  { label: "Large", className: "btn btn-primary btn-lg" },
];

const BUTTON_GROUP = [
  { label: "Left", className: "btn btn-outline" },
  { label: "Center", className: "btn btn-outline" },
  { label: "Right", className: "btn btn-outline" },
];

const CARD_VARIANTS = [
  {
    title: "Regular Card",
    description: "Standard card with border and shadow",
    className: "rounded-lg border bg-card p-6 shadow-sm",
  },
  {
    title: "Glass Card",
    description: "With backdrop blur and hover effect",
    className: "glass p-6 hover:glass-hover",
  },
  {
    title: "Gradient Card",
    description: "With gradient background",
    className:
      "rounded-lg bg-gradient-to-br from-primary/50 to-secondary/50 p-6 text-primary-foreground",
  },
];

const STATUS_INDICATORS = [
  {
    label: "Online",
    dotClass: "status-dot status-online",
    pulseClass:
      "absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75",
  },
  { label: "Offline", dotClass: "status-dot status-offline" },
  { label: "Busy", dotClass: "status-dot status-busy" },
  { label: "Away", dotClass: "status-dot status-away" },
] satisfies StatusIndicator[];

const ALERT_ITEMS = [
  {
    message: "Success message goes here",
    className: "alert-success rounded-lg border p-4",
  },
  {
    message: "Error message goes here",
    className: "alert-error rounded-lg border p-4",
  },
  {
    message: "Warning message goes here",
    className: "alert-warning rounded-lg border p-4",
  },
  {
    message: "Information message goes here",
    className: "alert-info rounded-lg border p-4",
  },
];

const FORM_FIELDS = [
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    component: "input" as const,
  },
  {
    id: "message",
    label: "Message",
    placeholder: "Enter your message",
    component: "textarea" as const,
  },
] satisfies FormField[];

const FORM_CONTROLS = [
  [{ id: "terms", label: "Accept terms", type: "checkbox" as const }],
  [
    {
      id: "option1",
      label: "Option 1",
      type: "radio" as const,
      name: "options",
    },
  ],
] satisfies FormControl[][];

const ANIMATION_ITEMS = [
  {
    label: "Fade In",
    className: "animate-fade-in rounded-lg bg-card p-4 shadow-sm",
  },
  {
    label: "Slide In Right",
    className: "animate-slide-in-right rounded-lg bg-card p-4 shadow-sm",
  },
  {
    label: "Bounce",
    className: "animate-bounce rounded-lg bg-card p-4 shadow-sm",
  },
];

export default function ComponentsShowcase() {
  return (
    <div className="page-container space-y-12">
      <div className="space-y-4">
        <h1 className="heading-1 text-gradient">Components Showcase</h1>
        <p className="text-muted-foreground text-lg">
          A comprehensive showcase of available components and styles
        </p>
      </div>

      <TypographyShowcase
        headings={TYPOGRAPHY_HEADINGS}
        paragraphs={TYPOGRAPHY_PARAGRAPHS}
        truncations={TYPOGRAPHY_TRUNCATIONS}
      />

      <ButtonsShowcase
        variants={BUTTON_VARIANTS}
        sizes={BUTTON_SIZES}
        groupButtons={BUTTON_GROUP}
      />

      <CardsShowcase cards={CARD_VARIANTS} />

      <StatusIndicators indicators={STATUS_INDICATORS} />

      <AlertList alerts={ALERT_ITEMS} />

      <FormShowcase fields={FORM_FIELDS} controls={FORM_CONTROLS} />

      <AnimationsGrid animations={ANIMATION_ITEMS} />
    </div>
  );
}
