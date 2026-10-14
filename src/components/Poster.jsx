import { useLayoutEffect, useRef } from 'react';

// The two ends of Archivo's width axis.
const NARROW = 62;
const WIDE = 125;

// A headline set like a fight poster: every line fills the same measure at the
// same height. The longest line runs fully condensed and the shorter lines are
// widened (font-stretch) until they reach it. A line too short to get there
// even at full width is enlarged instead.
export default function Poster({
  as: Tag = 'h2',
  lines,
  surface = 'dark',
  animate = false,
  maxSize = 170,
  className = '',
}) {
  const ref = useRef(null);
  const text = lines.map((line) => line.text).join('\n');

  useLayoutEffect(() => {
    const el = ref.current;
    const rows = [...el.children];
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;
    let fittedWidth = 0;

    const widthAt = (row, stretch) => {
      row.firstElementChild.style.fontStretch = `${stretch}%`;
      return row.firstElementChild.getBoundingClientRect().width;
    };

    const fit = () => {
      const measure = el.clientWidth;
      if (!measure) return [];
      fittedWidth = measure;

      rows.forEach((row) => {
        row.style.fontSize = '100px';
        row.firstElementChild.style.transition = 'none';
      });
      const narrow = rows.map((row) => widthAt(row, NARROW));
      const longest = Math.max(...narrow);
      const size = Math.min((measure / longest) * 100, maxSize);

      return rows.map((row, i) => {
        let stretch = NARROW;
        if (narrow[i] < longest - 0.5) {
          if (widthAt(row, WIDE) <= longest) {
            stretch = WIDE;
          } else {
            let low = NARROW;
            let high = WIDE;
            for (let step = 0; step < 8; step += 1) {
              const middle = (low + high) / 2;
              if (widthAt(row, middle) > longest) high = middle;
              else low = middle;
            }
            stretch = low;
          }
        }
        const reached = widthAt(row, stretch);
        row.style.fontSize = `${(size * longest) / reached}px`;
        return stretch;
      });
    };

    // One "rep": lines start contracted and extend out to the full measure.
    const extend = (stretches) => {
      rows.forEach((row) => {
        row.firstElementChild.style.fontStretch = `${NARROW}%`;
      });
      el.getBoundingClientRect();
      rows.forEach((row, i) => {
        const line = row.firstElementChild;
        line.style.transition = `font-stretch 900ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms`;
        line.style.fontStretch = `${stretches[i]}%`;
      });
    };

    if (animate) el.style.visibility = 'hidden';
    fit();

    // Fit again once Archivo has loaded; widths measured on the fallback font are wrong.
    const fontReady = document.fonts?.load('800 100px "Archivo Variable"', text) ?? Promise.resolve();
    const timeout = new Promise((resolve) => setTimeout(resolve, 1500));
    const settle = () => {
      if (cancelled) return;
      const stretches = fit();
      el.style.visibility = '';
      if (animate && !still && stretches.length) extend(stretches);
    };
    Promise.race([fontReady, timeout]).then(settle, settle);

    const observer = new ResizeObserver(() => {
      if (Math.abs(el.clientWidth - fittedWidth) > 0.5) fit();
    });
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [text, animate, maxSize]);

  return (
    <Tag ref={ref} data-surface={surface} className={`poster ${className}`}>
      {lines.map((line) => (
        <span key={line.text} className={`poster-row ${line.accent ? 'poster-accent' : ''}`}>
          <span className="poster-line">{line.text}</span>
        </span>
      ))}
    </Tag>
  );
}
