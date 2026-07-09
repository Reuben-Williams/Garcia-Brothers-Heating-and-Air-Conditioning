import ProjectCarousel from "@/components/ProjectCarousel";
import ProjectGallery from "@/components/ProjectGallery";
import { featuredProjects } from "@/content/siteData.mjs";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container projects-hero-grid">
          <div>
            <h1>Project Gallery</h1>
            <p>
              Real Garcia Brothers job photos from the project folder, organized
              as a featured carousel and a full gallery of installation,
              service, and maintenance work.
            </p>
          </div>
          <ProjectCarousel projects={featuredProjects} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>All project photos</h2>
              <p className="section-lead">
                Each card pairs an image with a short explanation of the job or
                equipment shown.
              </p>
            </div>
          </div>
          <ProjectGallery />
        </div>
      </section>
    </>
  );
}
