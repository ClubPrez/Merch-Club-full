import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  variant: string;
  sizes?: string;
};

/** Static, build-generated formats with the original image as a compatibility fallback. */
export function ResponsivePhoto({
  variant,
  sizes = "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 33vw",
  loading = "lazy",
  decoding = "async",
  ...props
}: Props) {
  const base = `${import.meta.env.BASE_URL}images/home/${variant}`;
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}-480.avif 480w, ${base}-960.avif 960w`} sizes={sizes} />
      <source type="image/webp" srcSet={`${base}-480.webp 480w, ${base}-960.webp 960w`} sizes={sizes} />
      <img loading={loading} decoding={decoding} {...props} />
    </picture>
  );
}