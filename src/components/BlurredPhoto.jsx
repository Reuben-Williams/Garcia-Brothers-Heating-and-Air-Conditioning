const IMAGE_CACHE_VERSION = "20260709";
const SITE_BASE_PATH = process.env.NEXT_PUBLIC_SITE_BASE_PATH || "";

function withCacheVersion(src) {
  const resolvedSrc =
    SITE_BASE_PATH && src.startsWith("/") && !src.startsWith(SITE_BASE_PATH)
      ? `${SITE_BASE_PATH}${src}`
      : src;

  return resolvedSrc.includes("?")
    ? `${resolvedSrc}&v=${IMAGE_CACHE_VERSION}`
    : `${resolvedSrc}?v=${IMAGE_CACHE_VERSION}`;
}

export default function BlurredPhoto({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  children,
  regionId,
  regionScope,
  regionInstance,
}) {
  const versionedSrc = withCacheVersion(src);
  const fetchPriority = priority ? "high" : "auto";

  return (
    <div
      className={`blurred-photo ${className}`}
      data-builder-region={regionId}
      data-builder-kind={regionId ? "image" : undefined}
      data-builder-scope={regionId ? regionScope : undefined}
      data-builder-instance={regionId ? regionInstance : undefined}
    >
      <img
        aria-hidden="true"
        alt=""
        className="blurred-photo-bg"
        decoding="async"
        fetchPriority={fetchPriority}
        loading="eager"
        sizes={sizes}
        src={versionedSrc}
      />
      <img
        alt={alt}
        className="blurred-photo-main"
        decoding="async"
        fetchPriority={fetchPriority}
        loading="eager"
        sizes={sizes}
        src={versionedSrc}
      />
      {children ? <div className="blurred-photo-overlay">{children}</div> : null}
    </div>
  );
}
