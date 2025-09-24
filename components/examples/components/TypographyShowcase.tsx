import type { JSX, ReactNode } from "react";

export type TypographyItem = {
  text: ReactNode;
  element?: keyof JSX.IntrinsicElements;
  className?: string;
};

type TypographyShowcaseProps = {
  title?: string;
  headings: TypographyItem[];
  paragraphs?: TypographyItem[];
  truncations?: TypographyItem[];
};

export default function TypographyShowcase({
  title = "Typography",
  headings,
  paragraphs = [],
  truncations = [],
}: TypographyShowcaseProps) {
  return (
    <section className="section-container">
      <h2 className="heading-2 mb-6">{title}</h2>
      <div className="space-y-4">
        {headings.map(({ element = "p", text, className }, index) => {
          const Component = element as keyof JSX.IntrinsicElements;
          return (
            <Component key={`heading-${index}`} className={className}>
              {text}
            </Component>
          );
        })}
        {paragraphs.map(({ element = "p", text, className }, index) => {
          const Component = element as keyof JSX.IntrinsicElements;
          return (
            <Component key={`text-${index}`} className={className}>
              {text}
            </Component>
          );
        })}
        {truncations.length > 0 && (
          <div className="space-y-2">
            {truncations.map(({ element = "p", text, className }, index) => {
              const Component = element as keyof JSX.IntrinsicElements;
              return (
                <Component key={`truncate-${index}`} className={className}>
                  {text}
                </Component>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
