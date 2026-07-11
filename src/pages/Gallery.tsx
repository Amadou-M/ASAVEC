import { useState } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_IMAGES, CATEGORY_COLORS } from '../data';

const GALLERY_CATS = ['Tous', 'Environnement', 'Santé', 'Éducation', 'Agriculture', 'Eau', 'Femmes', 'Événements', 'Bénévolat'];

function PageHero() {
  return (
    <section className="relative pt-32 pb-20 bg-[#1B6B2F] overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('https://images.pexels.com/photos/296888/pexels-photo-296888.jpeg?auto=compress&cs=tinysrgb&w=1920')` }} />
      <div className="tricolor-border-thick absolute bottom-0 left-0 right-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="badge bg-white/20 text-white mb-4">Nos images du terrain</span>
        <h1 className="font-serif font-bold text-white text-5xl sm:text-6xl mb-4">Galerie Photos</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Des moments forts capturés lors de nos missions et événements à travers le Mali.
        </p>
      </div>
    </section>
  );
}

interface LightboxProps {
  images: typeof GALLERY_IMAGES;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const img = images[currentIndex];
  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={onClose}>
      <button
        className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 rounded-full bg-white/10"
        onClick={onClose}
      >
        <X size={24} />
      </button>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        <ChevronLeft size={28} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        <ChevronRight size={28} />
      </button>
      <div className="max-w-5xl max-h-[90vh] px-16" onClick={e => e.stopPropagation()}>
        <img
          src={img.src.replace('w=800', 'w=1200')}
          alt={img.caption}
          className="max-h-[80vh] w-full object-contain rounded-xl"
        />
        <div className="text-center mt-4">
          <p className="text-white font-medium">{img.caption}</p>
          <p className="text-white/50 text-sm mt-1">{currentIndex + 1} / {images.length}</p>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [category, setCategory] = useState('Tous');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = GALLERY_IMAGES.filter(img =>
    category === 'Tous' || img.category === category
  );

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null);
  const nextImage = () => setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : null);

  return (
    <main>
      <PageHero />

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {GALLERY_CATS.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  category === cat
                    ? 'bg-[#1B6B2F] text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300 hover:text-green-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry-like grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <div
                key={img.id}
                className="break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
                  <ZoomIn size={28} className="text-white" />
                  <p className="text-white text-sm font-medium text-center leading-tight">{img.caption}</p>
                  <span className={`badge ${CATEGORY_COLORS[img.category] || 'bg-white/20 text-white'} text-xs`}>{img.category}</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg font-medium">Aucune photo dans cette catégorie</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
