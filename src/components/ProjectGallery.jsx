import BlurredPhoto from "@/components/BlurredPhoto";
import { projectImages } from "@/content/siteData.mjs";
import { regionIds } from "@/builder/region-ids.mjs";

const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH || "";

function projectHref(projectId) {
  return `${siteBasePath}/projects/#${projectId}`;
}

export default function ProjectGallery({ limit, instance = limit ? "home-projects" : "projects-gallery", regionId }) {
  const images = limit ? projectImages.slice(0, limit) : projectImages;

  return (
    <div className={limit ? "project-strip" : "gallery-grid"} data-builder-region={regionId} data-builder-kind={regionId ? "sections" : undefined}>
      {images.map((project) => (
        <a
          aria-label={`View project details for ${project.title}`}
          className="project-card project-card-link"
          href={projectHref(project.id)}
          key={project.id}
          data-builder-item-id={project.id}
          data-builder-item-label={project.title}
        >
          <div className="project-thumb">
            <BlurredPhoto
              src={project.src}
              alt={project.alt}
              sizes={
                limit
                  ? "(max-width: 980px) 50vw, 25vw"
                  : "(max-width: 980px) 100vw, 33vw"
              }
              regionId={regionIds.project(project.id, "image")}
              regionScope="global"
              regionInstance={`${instance}-${project.id}-image`}
            />
          </div>
          <div className="project-copy">
            <h3 data-builder-region={regionIds.project(project.id, "title")} data-builder-kind="text" data-builder-scope="global" data-builder-instance={`${instance}-${project.id}-title`}>{project.title}</h3>
            <p data-builder-region={regionIds.project(project.id, "summary")} data-builder-kind="richText" data-builder-scope="global" data-builder-instance={`${instance}-${project.id}-summary`}>{project.summary}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
