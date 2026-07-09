"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function ProjectCarousel({ projects }) {
  const [index, setIndex] = useState(0);
  const project = projects[index];

  function showPrevious() {
    setIndex((current) => (current === 0 ? projects.length - 1 : current - 1));
  }

  function showNext() {
    setIndex((current) => (current + 1) % projects.length);
  }

  return (
    <section className="carousel" aria-label="Featured project carousel">
      <div className="carousel-image">
        <Image
          src={project.src}
          alt={project.alt}
          fill
          sizes="(max-width: 980px) 100vw, 58vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <div className="carousel-copy">
        <div>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
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
