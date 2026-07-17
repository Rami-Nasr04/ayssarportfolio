import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchRef
} from 'react-zoom-pan-pinch';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import type { WorkPiece } from '@/assets/work';

interface LightboxProps {
  items: WorkPiece[];
  /** Index into items, or null when closed */
  index: number | null;
  /** Show the "01 / 02" position counter (hidden for the open-ended gallery) */
  showCounter?: boolean;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

const SWIPE_THRESHOLD = 60;

const Lightbox: React.FC<LightboxProps> = ({ items, index, showCounter = false, onClose, onNavigate }) => {
  const transformRef = useRef<ReactZoomPanPinchRef>(null);
  const [scale, setScale] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const isOpen = index !== null && items[index] !== undefined;
  const item = isOpen ? items[index] : null;

  const goNext = useCallback(() => {
    if (index === null || items.length < 2) return;
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (index === null || items.length < 2) return;
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  // Keyboard: Esc closes, arrows navigate
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, goNext, goPrev]);

  // Lock scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Swipe navigation — only when not zoomed in
  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale <= 1.02) touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || scale > 1.02) {
      touchStartX.current = null;
      return;
    }
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (delta < -SWIPE_THRESHOLD) goNext();
    else if (delta > SWIPE_THRESHOLD) goPrev();
  };

  const lightboxContent = (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* CONTROL LAYER */}
          <div className="absolute inset-0 z-50 pointer-events-none">
            {/* Close */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 pointer-events-auto" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
              <motion.button
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onClick={onClose}
                aria-label="Close viewer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gold text-black shadow-[0_10px_40px_rgba(212,175,55,0.35)] active:scale-90 transition-transform cursor-pointer"
              >
                <X size={22} />
              </motion.button>
            </div>

            {/* Prev / Next */}
            {items.length > 1 && (
              <>
                <div className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 pointer-events-auto">
                  <button
                    onClick={goPrev}
                    aria-label="Previous piece"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-black/50 border border-white/15 text-bone/80 hover:text-gold hover:border-gold/50 backdrop-blur-md active:scale-90 transition-all cursor-pointer"
                  >
                    <ChevronLeft size={24} />
                  </button>
                </div>
                <div className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 pointer-events-auto">
                  <button
                    onClick={goNext}
                    aria-label="Next piece"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-black/50 border border-white/15 text-bone/80 hover:text-gold hover:border-gold/50 backdrop-blur-md active:scale-90 transition-all cursor-pointer"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </>
            )}

            {/* Bottom bar: title + counter + zoom */}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none bg-linear-to-t from-black/80 to-transparent px-5 pb-5 pt-16 md:px-8 md:pb-6 flex items-end justify-between gap-4"
              style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.25rem)' }}
            >
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="min-w-0"
              >
                <p className="font-butler text-xl md:text-2xl text-bone truncate">{item.title}</p>
                <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-[0.25em] mt-1 truncate">
                  {item.detail}
                </p>
              </motion.div>

              <div className="flex items-center gap-4 shrink-0 pointer-events-auto">
                {showCounter && items.length > 1 && (
                  <span className="text-gold/70 font-mono text-xs tracking-widest">
                    {String((index ?? 0) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                  </span>
                )}
                <div className="hidden md:flex items-center gap-2 bg-black/50 border border-white/10 px-3 py-2 rounded-full backdrop-blur-md">
                  <button
                    onClick={() => transformRef.current?.zoomOut()}
                    aria-label="Zoom out"
                    className="text-white/50 hover:text-gold transition-colors p-1 cursor-pointer"
                  >
                    <ZoomOut size={18} />
                  </button>
                  <span className="text-gold font-mono text-xs w-12 text-center">{Math.round(scale * 100)}%</span>
                  <button
                    onClick={() => transformRef.current?.zoomIn()}
                    aria-label="Zoom in"
                    className="text-white/50 hover:text-gold transition-colors p-1 cursor-pointer"
                  >
                    <ZoomIn size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ZOOM LAYER — remounts per image so zoom resets */}
          <TransformWrapper
            key={item.id}
            ref={transformRef}
            initialScale={1}
            minScale={1}
            maxScale={8}
            centerOnInit={true}
            onInit={(ref) => setScale(ref.state.scale)}
            onTransformed={(ref) => setScale(ref.state.scale)}
            doubleClick={{ disabled: false }}
          >
            <TransformComponent
              wrapperClass="!w-screen !h-screen bg-transparent"
              contentClass="!w-screen !h-screen flex items-center justify-center"
            >
              <div
                className="w-screen h-screen flex items-center justify-center cursor-grab active:cursor-grabbing p-4 md:p-16"
                onClick={(e) => {
                  if (e.target === e.currentTarget) onClose();
                }}
              >
                <img
                  src={item.img}
                  alt={`${item.title} — ${item.detail}`}
                  className="max-w-[92vw] max-h-[80vh] md:max-h-[85vh] object-contain shadow-[0_0_120px_rgba(0,0,0,0.9)] select-none border border-white/5"
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
            </TransformComponent>
          </TransformWrapper>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(lightboxContent, document.body);
};

export default Lightbox;
