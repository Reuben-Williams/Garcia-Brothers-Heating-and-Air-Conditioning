import BlurredPhoto from "@/components/BlurredPhoto";
import { projectImages } from "@/content/siteData.mjs";

export default function ProjectGallery({ limit }) {
  const images = limit ? projectImages.slice(0, limit) : projectImages;

  return (
    <div className={limit ? "project-strip" : "gallery-grid"}>
      {images.map((project) => (
        <article className="project-card" key={project.id}>
          <div className="project-thumb">
            <BlurredPhoto
              src={project.src}
              alt={project.alt}
              sizes={
                limit
                  ? "(max-width: 980px) 50vw, 25vw"
                  : "(max-width: 980px) 100vw, 33vw"
              }
            />
          </div>
          <div className="project-copy">
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
