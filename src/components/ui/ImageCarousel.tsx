import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/utils/cn";

export interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

const SWIPE_THRESHOLD = 50;
const DRAG_POWER = 1.5;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export function ImageCarousel({ images, alt, className }: ImageCarouselProps) {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const paginate = useCallback(
    (dir: number) => {
      setCurrent(([prev]) => {
        const next = (prev + dir + images.length) % images.length;
        return [next, dir];
      });
    },
    [images.length],
  );

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      const swipe =
        Math.abs(info.offset.x) * DRAG_POWER + Math.abs(info.velocity.x);
      if (swipe > SWIPE_THRESHOLD) {
        paginate(info.offset.x < 0 ? 1 : -1);
      }
    },
    [paginate],
  );

  // Close lightbox on Escape key
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, paginate]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [lightboxOpen]);

  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <>
        <div
          className={cn(
            "w-full aspect-video overflow-hidden bg-black/10 cursor-pointer",
            className,
          )}
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={images[0]}
            alt={alt}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <Lightbox
          open={lightboxOpen}
          src={images[0]}
          alt={alt}
          onClose={() => setLightboxOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <div
        className={cn(
          "group/carousel relative w-full aspect-video overflow-hidden bg-black/10",
          className,
        )}
      >
        {/* Slides */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={current}
            src={images[current]}
            alt={`${alt} ${current + 1}`}
            loading="lazy"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 w-full h-full object-cover object-top cursor-pointer"
          />
        </AnimatePresence>

        {/* Chevron buttons — visible on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            paginate(-1);
          }}
          className={cn(
            "absolute left-1.5 top-1/2 -translate-y-1/2 z-10",
            "w-6 h-6 rounded-full flex items-center justify-center",
            "bg-black/40 text-white/80 backdrop-blur-sm",
            "opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200",
            "hover:bg-black/60 hover:text-white",
          )}
          aria-label="Previous image"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            paginate(1);
          }}
          className={cn(
            "absolute right-1.5 top-1/2 -translate-y-1/2 z-10",
            "w-6 h-6 rounded-full flex items-center justify-center",
            "bg-black/40 text-white/80 backdrop-blur-sm",
            "opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200",
            "hover:bg-black/60 hover:text-white",
          )}
          aria-label="Next image"
        >
          <ChevronRight size={14} />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent([i, i > current ? 1 : -1]);
              }}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-200",
                i === current
                  ? "bg-white scale-110 shadow-[0_0_4px_rgba(0,0,0,0.3)]"
                  : "bg-white/50 hover:bg-white/75",
              )}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        src={images[current]}
        alt={`${alt} ${current + 1}`}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}

/* ── Lightbox overlay ── */

interface LightboxProps {
  open: boolean;
  src: string;
  alt: string;
  onClose: () => void;
}

function Lightbox({ open, src, alt, onClose }: LightboxProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={cn(
              "absolute top-4 right-4 z-10",
              "w-8 h-8 rounded-full flex items-center justify-center",
              "bg-white/10 text-white/80 backdrop-blur-sm",
              "hover:bg-white/20 hover:text-white transition-colors",
            )}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <motion.img
            key={src}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
