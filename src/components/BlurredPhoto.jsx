import Image from "next/image";

const IMAGE_CACHE_VERSION = "20260709";

export default function BlurredPhoto({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  children,
}) {
  const versionedSrc = src.includes("?")
    ? `${src}&v=${IMAGE_CACHE_VERSION}`
    : `${src}?v=${IMAGE_CACHE_VERSION}`;

  return (
    <div className={`blurred-photo ${className}`}>
      <Image
        className="blurred-photo-bg"
        src={versionedSrc}
        alt=""
        fill
        sizes={sizes}
        aria-hidden="true"
        loading={priority ? undefined : "eager"}
      />
      <Image
        className="blurred-photo-main"
        src={versionedSrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "eager"}
      />
      {children ? <div className="blurred-photo-overlay">{children}</div> : null}
    </div>
  );
}
