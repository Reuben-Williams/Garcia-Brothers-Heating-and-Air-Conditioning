import Image from "next/image";
import { projectImages } from "@/content/siteData.mjs";

export default function ProjectGallery({ limit }) {
  const images = limit ? projectImages.slice(0, limit) : projectImages;

  return (
    <div className={limit ? "project-strip" : "gallery-grid"}>
      {images.map((project) => (
        <article className="project-card" key={project.id}>
          <div className="project-thumb">
            <Image
              src={project.src}
              alt={project.alt}
              fill
              sizes={
                limit
                  ? "(max-width: 980px) 50vw, 25vw"
                  : "(max-width: 980px) 100vw, 33vw"
              }
              style={{ objectFit: "cover" }}
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
