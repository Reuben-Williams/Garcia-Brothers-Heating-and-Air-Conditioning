import Image from "next/image";

export default function BlurredPhoto({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  children,
}) {
  return (
    <div className={`blurred-photo ${className}`}>
      <Image
        className="blurred-photo-bg"
        src={src}
        alt=""
        fill
        sizes={sizes}
        aria-hidden="true"
      />
      <Image
        className="blurred-photo-main"
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
      />
      {children ? <div className="blurred-photo-overlay">{children}</div> : null}
    </div>
  );
}
