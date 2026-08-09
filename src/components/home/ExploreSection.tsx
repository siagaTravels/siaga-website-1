'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronRight as ArrowIcon } from 'lucide-react';
import { Experience } from '@/lib/api';

const DEFAULT_EXPERIENCES = [
  {
    id: 'festive',
    title: 'FESTIVE',
    type: 'CULTURAL_HERITAGE',
    description: 'Experience the vibrant culture, colorful festivals and warm hospitality.',
    image: '/exp-festive.jpg',
  },
  {
    id: 'thrills',
    title: 'THRILLS',
    type: 'ADVENTURE',
    description: 'Feel the rush with adventure activities that get your heart racing.',
    image: '/exp-thrills.jpg',
  },
  {
    id: 'wild',
    title: 'WILD',
    type: 'NATURE_WILDLIFE',
    description: 'Discover incredible wildlife and unspoiled nature in their natural habitat.',
    image: '/exp-wild.jpg',
  },
  {
    id: 'wellness',
    title: 'WELLNESS',
    type: 'WELLNESS',
    description: 'Rejuvenate your soul with ancient Ayurvedic healing and tranquil retreats.',
    image: '/hero-ella.jpg',
  },
  {
    id: 'flavours',
    title: 'FLAVOURS',
    type: 'CULINARY',
    description: 'Savor aromatic Sri Lankan spices, tropical fruits, and seafood curries.',
    image: '/dest-kandy.jpg',
  },
];

interface ExploreSectionProps {
  cmsExperiences?: Experience[];
}

export function ExploreSection({ cmsExperiences }: ExploreSectionProps) {
  const experiences = (cmsExperiences && cmsExperiences.length >= 3)
    ? cmsExperiences.map(e => ({
        id: e.id,
        title: e.experience_type ? e.experience_type.replace('_', ' ') : e.name.toUpperCase(),
        type: e.experience_type,
        description: e.short_description || e.subtitle || 'Unforgettable experience in Sri Lanka.',
        image: e.main_image || '/exp-thrills.jpg',
      }))
    : DEFAULT_EXPERIENCES;

  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex(prev => (prev === 0 ? Math.max(0, experiences.length - 3) : prev - 1));
  };

  const handleNext = () => {
    setStartIndex(prev => (prev + 3 >= experiences.length ? 0 : prev + 1));
  };

  const visibleCards = experiences.slice(startIndex, startIndex + 3);

  return (
    <section className="w-full bg-white text-zinc-900 py-24 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Cards Row with Left/Right Arrows */}
        <div className="lg:col-span-7 relative">
          
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous cards"
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-xl border border-zinc-200 flex items-center justify-center text-zinc-800 hover:bg-zinc-100 transition-transform active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next cards"
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-xl border border-zinc-200 flex items-center justify-center text-zinc-800 hover:bg-zinc-100 transition-transform active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* 3 Tall Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 px-2">
            {visibleCards.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="explore-card-figma group"
              >
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="explore-card-overlay">
                  <h3 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase leading-none">
                    {exp.title}
                  </h3>
                  <p className="text-white/80 font-sans text-xs sm:text-sm mt-2 line-clamp-3 font-normal leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Copy & Dark Green Button */}
        <div className="lg:col-span-5 space-y-6 lg:pl-4">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-6xl sm:text-7xl xl:text-8xl text-[#1B3A2D] leading-[0.92] tracking-tight">
              EXPLORE<br />THE ISLAND
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-zinc-500 font-sans text-base sm:text-lg font-normal leading-relaxed max-w-md"
          >
            Each place, and each smile in Sri Lanka has a story to tell. We have so much to share with you, so come along to our island in paradise!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-2"
          >
            <Link
              href="/experiences"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1B3A2D] text-white rounded-2xl font-sans font-semibold text-base hover:bg-[#28503E] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Explore More <ArrowIcon className="w-5 h-5 ml-1" />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
