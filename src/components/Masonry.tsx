import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

export interface MasonryItem {
  id: string;
  img: string;
  title: string;
  detail?: string;
  /** width / height of the source image */
  aspect: number;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  onItemClick?: (item: MasonryItem) => void;
}

/** Columns are equalized by gently cropping (bg is object-cover); the stretch
 *  ratio is clamped so no image loses more than ~12% of its height. */
const STRETCH_MIN = 0.88;
const STRETCH_MAX = 1.12;

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  onItemClick
}) => {
  const columns = useMedia(
    ['(min-width:1280px)', '(min-width:768px)', '(min-width:480px)'],
    [3, 3, 2],
    2
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  const { grid, containerHeight } = useMemo(() => {
    if (!width) return { grid: [] as GridItem[], containerHeight: 0 };
    const colHeights = new Array(columns).fill(0);
    const gap = width < 640 ? 10 : 20;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    const colItems: GridItem[][] = new Array(columns).fill(null).map(() => []);

    items.forEach(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = columnWidth / child.aspect;
      const y = colHeights[col];

      const item = { ...child, x, y, w: columnWidth, h: height };
      colItems[col].push(item);
      colHeights[col] += height + gap;
    });

    const maxColHeight = Math.max(...colHeights);

    const adjustedGrid: GridItem[] = [];
    colItems.forEach((itemsInCol, colIndex) => {
      const currentHeight = colHeights[colIndex] - gap;
      const targetHeight = maxColHeight - gap;

      if (itemsInCol.length > 0 && currentHeight > 0) {
        const ratio = Math.min(STRETCH_MAX, Math.max(STRETCH_MIN, targetHeight / currentHeight));
        let currentY = 0;
        itemsInCol.forEach(item => {
          const newHeight = item.h * ratio;
          adjustedGrid.push({ ...item, y: currentY, h: newHeight });
          currentY += newHeight + gap;
        });
      }
    });

    return { grid: adjustedGrid, containerHeight: maxColHeight };
  }, [columns, items, width]);

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        gsap.fromTo(
          selector,
          { opacity: 0, x: item.x, y: item.y + 48, width: item.w, height: item.h },
          {
            opacity: 1,
            ...animProps,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger
          }
        );
      } else {
        gsap.to(selector, {
          opacity: 1,
          ...animProps,
          duration,
          ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, duration, ease]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: containerHeight }}>
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          role="button"
          tabIndex={0}
          aria-label={`View ${item.title}`}
          className="absolute box-border cursor-zoom-in overflow-hidden group opacity-0"
          style={{ willChange: 'transform, width, height, opacity', backgroundColor: '#101010' }}
          onClick={() => onItemClick?.(item)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onItemClick?.(item);
            }
          }}
        >
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {/* Caption */}
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/40 to-transparent pt-16 pb-4 px-5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-all duration-500">
            <p className="font-butler text-lg text-bone tracking-wide">{item.title}</p>
            {item.detail && (
              <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mt-1">{item.detail}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
