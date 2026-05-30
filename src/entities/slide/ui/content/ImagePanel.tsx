interface ImagePanelProps {
  src: string;
  alt: string;
  caption?: string;
}

export const ImagePanel = ({ src, alt, caption }: ImagePanelProps) => (
  <figure className="flex flex-col items-center gap-3">
    <img src={src} alt={alt} className="rounded-2xl object-contain" />
    {caption && (
      <figcaption className="text-caption text-on-surface-variant">
        {caption}
      </figcaption>
    )}
  </figure>
);
