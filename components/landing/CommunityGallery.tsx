"use client";

import { useEffect, useState } from "react";

import ScrollReveal from "@/components/landing/ScrollReveal";
import type { CommunityGalleryPhoto } from "@/components/landing/communityGalleryData";

type CommunityGalleryProps = {
  photos: CommunityGalleryPhoto[];
};

export default function CommunityGallery({ photos }: CommunityGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<CommunityGalleryPhoto | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [unavailablePhotoIds, setUnavailablePhotoIds] = useState<string[]>([]);
  const visiblePhotos = showAllPhotos ? photos : photos.slice(0, 4);

  useEffect(() => {
    if (!selectedPhoto) return;

    const originalOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPhoto(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedPhoto]);

  const markPhotoUnavailable = (photoId: string) => {
    setUnavailablePhotoIds((current) => current.includes(photoId) ? current : [...current, photoId]);
  };

  return (
    <>
      <section id="gallery" className="scroll-mt-20 border-b border-white/10 bg-[#090a09] py-16 sm:py-24" aria-labelledby="gallery-title">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <ScrollReveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ccff00]">From the pitch</p>
              <h2 id="gallery-title" className="mt-3 text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl">Community Gallery</h2>
              <p className="mt-3 text-sm text-zinc-500">Relive moments from our weekly matches</p>
            </div>
            <p className="max-w-sm text-sm leading-6 text-zinc-500">Click a photo for a closer look at the people and moments behind every fixture.</p>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visiblePhotos.map((photo, index) => {
              const photoUnavailable = unavailablePhotoIds.includes(photo.id);

              return (
                <ScrollReveal key={photo.id} delay={index * 65}>
                  <button
                    type="button"
                    onClick={() => !photoUnavailable && setSelectedPhoto(photo)}
                    className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111411] text-left shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/40 focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:ring-offset-2 focus:ring-offset-[#090a09]"
                    aria-label={photoUnavailable ? `${photo.title} photo will be available soon` : `Open ${photo.title}`}
                    disabled={photoUnavailable}
                  >
                    {!photoUnavailable ? (
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                        onError={() => markPhotoUnavailable(photo.id)}
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col justify-end bg-[radial-gradient(circle_at_72%_20%,rgba(204,255,0,0.13),transparent_40%),linear-gradient(135deg,#181d16,#0b0d0b)] p-5">
                        <span className="mb-auto text-2xl text-[#ccff00]/70">⚽</span>
                        <p className="text-sm font-bold text-white">{photo.title}</p>
                        <p className="mt-1 text-xs text-zinc-500">Add this Weekly Footy photo</p>
                      </div>
                    )}
                    {!photoUnavailable && <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-transparent opacity-90 transition group-hover:from-black/85" />}
                    {!photoUnavailable && (
                      <span className="absolute inset-x-0 bottom-0 p-4">
                        <span className="block text-sm font-bold text-white">{photo.title}</span>
                        <span className="mt-0.5 block text-xs text-zinc-300">{photo.detail}</span>
                      </span>
                    )}
                  </button>
                </ScrollReveal>
              );
            })}
          </div>

          {photos.length > 4 && (
            <ScrollReveal delay={160} className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setShowAllPhotos((current) => !current)}
                className="rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white transition hover:border-[#ccff00]/45 hover:bg-[#ccff00]/10 focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:ring-offset-2 focus:ring-offset-[#090a09]"
              >
                {showAllPhotos ? "Show Fewer Photos" : "View All Photos"}
              </button>
            </ScrollReveal>
          )}
        </div>
      </section>

      {selectedPhoto && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={selectedPhoto.title} onClick={() => setSelectedPhoto(null)}>
          <div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} className="max-h-[78vh] w-full rounded-2xl object-contain" />
            <div className="mt-3 flex items-center justify-between gap-4 px-1">
              <div><p className="font-bold text-white">{selectedPhoto.title}</p><p className="mt-1 text-sm text-zinc-400">{selectedPhoto.detail}</p></div>
              <button type="button" onClick={() => setSelectedPhoto(null)} className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#ccff00]">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
