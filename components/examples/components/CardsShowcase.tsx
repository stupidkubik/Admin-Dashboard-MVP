import type { ReactNode } from "react";

type CardShowcaseItem = {
  title: ReactNode;
  description: ReactNode;
  className: string;
};

type CardsShowcaseProps = {
  title?: string;
  cards: CardShowcaseItem[];
};

export default function CardsShowcase({
  title = "Cards",
  cards,
}: CardsShowcaseProps) {
  return (
    <section className="section-container">
      <h2 className="heading-2 mb-6">{title}</h2>
      <div className="grid-container md:grid-cols-3">
        {cards.map(({ title: cardTitle, description, className }, index) => (
          <div key={`card-${index}`} className={className}>
            <h3 className="heading-4 mb-2">{cardTitle}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
