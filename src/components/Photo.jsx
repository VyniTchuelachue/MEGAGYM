import photoSizes from '../data/photo-sizes.json';

const UNSPLASH_WIDTHS = [640, 1024, 1600, 2200];

const unsplash = (id, width) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=70`;

const clubFile = (name, width) => `/images/club/${name}-${width}.jpg`;

// `src` is 'club/<name>' (a club photo prepared by `npm run images`), an
// Unsplash photo id, or the path of any file in public/ (see data/images.js).
function sources(src) {
  if (src.startsWith('club/')) {
    const name = src.slice('club/'.length);
    const widths = photoSizes[name];
    if (!widths) throw new Error(`Photo "${name}" is missing: add photos/club/${name}.jpg and run npm run images.`);
    return {
      src: clubFile(name, widths.at(-1)),
      srcSet: widths.map((width) => `${clubFile(name, width)} ${width}w`).join(', '),
    };
  }
  if (src.startsWith('photo-')) {
    return {
      src: unsplash(src, 1024),
      srcSet: UNSPLASH_WIDTHS.map((width) => `${unsplash(src, width)} ${width}w`).join(', '),
    };
  }
  return { src };
}

export default function Photo({ src, alt, sizes = '100vw', eager = false, className = '' }) {
  const files = sources(src);
  return (
    <img
      src={files.src}
      srcSet={files.srcSet}
      sizes={files.srcSet ? sizes : undefined}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      className={className}
    />
  );
}
