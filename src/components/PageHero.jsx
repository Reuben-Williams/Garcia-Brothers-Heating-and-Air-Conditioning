export default function PageHero({ title, children, titleRegion, bodyRegion }) {
  return (
    <section className="page-hero">
      <div className="container">
        <h1 data-builder-region={titleRegion} data-builder-kind={titleRegion ? "text" : undefined}>{title}</h1>
        <p data-builder-region={bodyRegion} data-builder-kind={bodyRegion ? "richText" : undefined}>{children}</p>
      </div>
    </section>
  );
}
