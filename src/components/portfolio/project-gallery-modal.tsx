"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Play, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface MediaItem {
  type: "image" | "video";
  url: string;
}

interface ProjectGalleryModalProps {
  project: {
    id: string;
    title: string;
    imageUrl: string;
    videoUrl: string;
    images: string;
  } | null;
  onClose: () => void;
}

function getMediaItems(project: ProjectGalleryModalProps["project"]): MediaItem[] {
  if (!project) return [];
  const items: MediaItem[] = [];
  if (project.videoUrl) items.push({ type: "video", url: project.videoUrl });
  if (project.imageUrl) items.push({ type: "image", url: project.imageUrl });
  try {
    const additional = JSON.parse(project.images || "[]");
    additional.forEach((img: string) => items.push({ type: "image", url: img }));
  } catch {}
  return items;
}

export function ProjectGalleryModal({ project, onClose }: ProjectGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isBrowser, setIsBrowser] = useState(false);

  const mediaItems = getMediaItems(project);

  useEffect(() => {
    setIsBrowser(true);
    return () => setIsBrowser(false);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (mediaItems.length <= 1) return;
      if (e.key === "ArrowLeft") setCurrentIndex((p) => (p === 0 ? mediaItems.length - 1 : p - 1));
      if (e.key === "ArrowRight") setCurrentIndex((p) => (p === mediaItems.length - 1 ? 0 : p + 1));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, mediaItems.length]);

  if (!project || mediaItems.length === 0) return null;

  const current = mediaItems[currentIndex];

  const modal = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10">
        <X className="w-6 h-6" />
      </button>

      {mediaItems.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrentIndex((p) => (p === 0 ? mediaItems.length - 1 : p - 1)); }}
            className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrentIndex((p) => (p === mediaItems.length - 1 ? 0 : p + 1)); }}
            className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {current.type === "video" ? (
              <div className="relative">
                <video
                  src={current.url}
                  className="max-h-[80vh] max-w-[90vw] rounded-lg"
                  controls
                  muted={isMuted}
                  autoPlay
                  loop
                />
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            ) : (
              <img src={current.url} alt={`${project.title} - ${currentIndex + 1}`} className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain" />
            )}
          </motion.div>
        </AnimatePresence>

        {mediaItems.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 text-white text-sm">
            <Play className="w-4 h-4" />
            {currentIndex + 1} / {mediaItems.length}
          </div>
        )}
      </div>
    </motion.div>
  );

  return isBrowser ? createPortal(modal, document.body) : null;
}