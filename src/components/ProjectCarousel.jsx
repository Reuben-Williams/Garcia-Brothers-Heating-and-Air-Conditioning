"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import BlurredPhoto from "@/components/BlurredPhoto";
import { regionIds } from "@/builder/region-ids.mjs";

function getProjectIndexFromHash(projects) {
  if (typeof window === "undefined") {
    return 0;
  }

  const projectId = window.location.hash.replace("#", "");
  const index = projects.findIndex((item) => item.id === projectId);
  return index >= 0 ? index : 0;
}

export default function ProjectCarousel({ projects }) {
  const [index, setIndex] = useState(0);
  const project = projects[index];

  useEffect(() => {
    function syncFromHash() {
      setIndex(getProjectIndexFromHash(projects));
    }

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [projects]);

  function updateProject(nextIndex) {
    const normalizedIndex = (nextIndex + projects.length) % projects.length;
    const nextProject = projects[normalizedIndex];

    setIndex(normalizedIndex);
    window.history.replaceState(null, "", `#${nextProject.id}`);
  }

  function showPrevious() {
    updateProject(index - 1);
  }

  function showNext() {
    updateProject(index + 1);
  }

  return (
    <section className="carousel" aria-label="Project photo spotlight">
      <div className="project-anchor-stack" aria-hidden="true">
        {projects.map((item) => (
          <span id={item.id} key={item.id} />
        ))}
      </div>

      <div className="carousel-image">
        <BlurredPhoto
          src={project.src}
          alt={project.alt}
          sizes="(max-width: 980px) 100vw, 58vw"
          priority
          regionId={regionIds.project(project.id, "image")}
          regionScope="global"
          regionInstance={`project-spotlight-${project.id}-image`}
        />
      </div>
      <div className="carousel-copy">
        <div>
          <h2 data-builder-region={regionIds.project(project.id, "title")} data-builder-kind="text" data-builder-scope="global" data-builder-instance={`project-spotlight-${project.id}-title`}>{project.title}</h2>
          <p data-builder-region={regionIds.project(project.id, "summary")} data-builder-kind="richText" data-builder-scope="global" data-builder-instance={`project-spotlight-${project.id}-summary`}>{project.summary}</p>
        </div>
        <div className="carousel-controls" aria-label="Carousel controls">
          <button
            className="icon-button"
            type="button"
            onClick={showPrevious}
            aria-label="Show previous project"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="icon-button"
            type="button"
            onClick={showNext}
            aria-label="Show next project"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
