'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Destination } from '@/lib/api';

const DEFAULT_DESTINATIONS = [
  {
    id: 'ella',
    slug: 'ella',
    name: 'ELLA',
    description: "Discover the scenic beauty of Ella's lush highlands.",
    bgImage: '/hero-ella.jpg',
    cardImage: '/dest-ella.jpg',
  },
  {
    id: 'colombo',
    slug: 'colombo',
    name: 'COLOMBO',
    description: 'Experience the vibrant capital of Sri Lanka.',
    bgImage: '/dest-colombo.jpg',
    cardImage: '/dest-colombo.jpg',
  },
  {
    id: 'batticaloa',
    slug: 'batticaloa',
    name: 'BATTICALOA',
    description: 'Unwind by serene lagoons and stunning sunsets.',
    bgImage: '/dest-batticaloa.jpg',
    cardImage: '/dest-batticaloa.jpg',
  },
  {
    id: 'kandy',
    slug: 'kandy',
    name: 'KANDY',
    description: 'Explore the cultural heart of Sri Lanka.',
    bgImage: '/dest-kandy.jpg',
    cardImage: '/dest-kandy.jpg',
  },
];

interface HeroSectionProps {
  cmsDestinations?: Destination[];
}

export function HeroSection({ cmsDestinations }: HeroSectionProps) {
  // Use CMS items if available, otherwise default to exact Figma items
  const items = (cmsDestinations && cmsDestinations.length >= 3)
    ? cmsDestinations.map(d => ({
        id: d.id,
        slug: d.slug,
        name: d.name.toUpperCase(),
        description: d.subtitle || d.description || 'Discover breathtaking sights and authentic culture.',
        bgImage: d.image || '/hero-ella.jpg',
        cardImage: d.image || '/dest-ella.jpg',
      }))
    : DEFAULT_DESTINATIONS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto loop every 4.5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
  };

  const activeItem = items[currentIndex];

  // Reorder items starting from current index
  const carouselCards = items.map((_, idx) => items[(currentIndex + idx) % items.length]);

  return (
    <section 
      className="relative w-full h-[800px] overflow-hidden bg-[#131313] flex items-center"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* 1. Full-screen Background Image with Subtle 40% Dark Overlay */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={activeItem.bgImage}
            alt={activeItem.name}
            fill
            className="object-cover object-center"
            priority
          />
          {/* Exact Figma 40% dark overlay */}
          <div className="absolute inset-0 bg-black/40 z-10" />
        </motion.div>
      </AnimatePresence>

      {/* 2. Watermark Text sitting behind right-side cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.name}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.45, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
          className="hero-watermark absolute top-[450px] right-[80px] z-10 hidden md:block"
        >
          {activeItem.name}
        </motion.div>
      </AnimatePresence>

      {/* 3. Main Container */}
      <div className="relative z-20 max-w-[1320px] mx-auto w-full px-4 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side Copy (Shifted further Up & Left) */}
        <div className="lg:col-span-5 space-y-6 -translate-y-28 -translate-x-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-7xl sm:text-8xl lg:text-[96px] text-white leading-[0.92] tracking-tight drop-shadow-md">
              WELCOME<br />
              TO SRI LANKA
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/80 font-sans text-sm sm:text-[15px] leading-relaxed max-w-[420px] font-normal"
          >
            Lorem ipsum dolor sit amet consectetur. Duis bibendum eget porttitor enim viverra. Eleifend auctor blandit consequat elementum leo. Nunc vitae elit vitae pretium purus. Massa amet sed dignissim scelerisque erat facilisis proin massa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-2"
          >
            <Link href={`/destinations/${activeItem.slug}`} className="btn-pill-explore">
              Explore
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Card Carousel + Controls (Shifted further Down & Right) */}
        <div className="lg:col-span-7 flex flex-col items-end gap-4 relative translate-y-32 translate-x-6">
          
          {/* Arrow Buttons above/next to cards */}
          <div className="flex items-center gap-3 z-30 mb-2">
            <button
              onClick={handlePrev}
              aria-label="Previous card"
              className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all flex items-center justify-center border border-white/20 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next card"
              className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all flex items-center justify-center border border-white/20 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* 4 Cards Row */}
          <div className="flex items-center gap-4 overflow-x-visible py-2">
            <AnimatePresence mode="popLayout">
              {carouselCards.slice(0, 4).map((card, index) => (
                <motion.div
                  key={`${card.id}-${index}`}
                  layout
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  onClick={() => {
                    const targetIdx = items.findIndex(i => i.id === card.id);
                    if (targetIdx !== -1) setCurrentIndex(targetIdx);
                  }}
                  className="dest-card-figma group"
                >
                  {/* Card Background Image */}
                  <Image
                    src={card.cardImage}
                    alt={card.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Dark Bottom Overlay */}
                  <div className="dest-card-overlay">
                    <h3 className="font-display text-2xl text-white tracking-wide leading-none">
                      {card.name}
                    </h3>
                    <p className="text-white/80 font-sans text-xs line-clamp-2 mt-1.5 font-normal leading-snug">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
