const WIDTHS = [640, 1024, 1600, 2200];

const unsplash = (id, width) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=70`;

// `src` is an Unsplash photo id or the path of a local file (see data/images.js).
// Training photos are shown in black and white so yellow stays the only colour.
export default function Photo({ src, alt, sizes = '100vw', mono = true, eager = false, className = '' }) {
  const remote = src.startsWith('photo-');
  return (
    <img
      src={remote ? unsplash(src, 1024) : src}
      srcSet={remote ? WIDTHS.map((width) => `${unsplash(src, width)} ${width}w`).join(', ') : undefined}
      sizes={remote ? sizes : undefined}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      className={`${mono ? 'grayscale contrast-[1.08]' : ''} ${className}`}
    />
  );
}
