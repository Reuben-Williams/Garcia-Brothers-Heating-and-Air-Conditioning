export default function PageHero({ title, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
    </section>
  );
}
