function HeroSection({ section }) {
  return (
    <section className="block hero">
      <h1>{section.heading}</h1>
      {section.subheading ? <p>{section.subheading}</p> : null}
      {section.ctaLabel && section.ctaUrl ? (
        <a className="button" href={section.ctaUrl}>
          {section.ctaLabel}
        </a>
      ) : null}
    </section>
  );
}

function ContentBlockSection({ section }) {
  return (
    <section className="block">
      <h2>{section.title}</h2>
      <p>{section.content}</p>
    </section>
  );
}

function GallerySection({ section }) {
  const items = section.items || [];
  return (
    <section className="block">
      <h2>{section.title || "Galeria"}</h2>
      <div className="grid">
        {items.map((item) => (
          <article className="card" key={item.id}>
            <p>{item.caption || "Element galerii"}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TimelineSection({ section }) {
  const items = section.items || [];
  return (
    <section className="block">
      <h2>{section.title || "Timeline"}</h2>
      <ul className="timeline">
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.year}</strong>
            <span>{item.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FaqSection({ section }) {
  const items = section.items || [];
  return (
    <section className="block">
      <h2>{section.title || "FAQ"}</h2>
      <div className="faq">
        {items.map((item) => (
          <details key={item.id}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function SectionRenderer({ section }) {
  switch (section.__component) {
    case "sections.hero":
      return <HeroSection section={section} />;
    case "sections.content-block":
      return <ContentBlockSection section={section} />;
    case "sections.gallery":
      return <GallerySection section={section} />;
    case "sections.timeline":
      return <TimelineSection section={section} />;
    case "sections.faq":
      return <FaqSection section={section} />;
    default:
      return null;
  }
}
