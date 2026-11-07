import type { Photo as PhotoType } from "@config";

type Props = {
  photo: PhotoType;
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** Override alt, e.g. "" for decorative backdrops. */
  alt?: string;
};

/** A photo that fills its positioned parent (like next/image with `fill`). */
export function Photo({ photo, sizes = "100vw", className = "", priority = false, alt }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={photo.srcSet ? sizes : undefined}
      alt={alt ?? photo.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
      style={{ position: "absolute", inset: 0, height: "100%", width: "100%", color: "transparent" }}
    />
  );
}
