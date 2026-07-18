import ProjectCarousel from "@/components/ProjectCarousel";
import ProjectGallery from "@/components/ProjectGallery";
import { projectImages } from "@/content/siteData.mjs";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container projects-hero-grid">
          <div>
            <h1 data-builder-region="projects.hero.title" data-builder-kind="text">Project Gallery</h1>
            <p data-builder-region="projects.hero.body" data-builder-kind="richText">
              Real Garcia Brothers job photos from the project folder, organized
              as a project spotlight and a full gallery of installation,
              service, and maintenance work.
            </p>
          </div>
          <div data-builder-region="projects.hero.spotlight" data-builder-kind="sections"><ProjectCarousel projects={projectImages} /></div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2 data-builder-region="projects.gallery.title" data-builder-kind="text">All project photos</h2>
              <p className="section-lead" data-builder-region="projects.gallery.body" data-builder-kind="richText">
                Each card pairs an image with a short explanation of the job or
                equipment shown.
              </p>
            </div>
          </div>
          <div data-builder-region="projects.gallery.items" data-builder-kind="sections"><ProjectGallery /></div>
        </div>
      </section>
    </>
  );
}
