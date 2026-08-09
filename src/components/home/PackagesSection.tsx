'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Tag, ArrowUpRight } from 'lucide-react';
import { Package } from '@/lib/api';

const DEFAULT_PACKAGES: Partial<Package>[] = [
  {
    id: '1',
    slug: 'classic-sri-lanka-7-days',
    title: 'Classic Sri Lanka — Highlights & Tea Hills',
    engaging_description: 'Journey through ancient kingdoms, misty tea plantations, scenic train rides and wildlife safaris.',
    main_image_url: '/hero-ella.jpg',
    duration_days: 7,
    duration_nights: 6,
    base_price: 1299,
    currency: 'USD',
    best_for: ['Couples', 'Families', 'First Timers'],
  },
  {
    id: '2',
    slug: 'wild-safari-coastal-escape',
    title: 'Wild Safari & Coastal Retreat',
    engaging_description: 'Spot leopards in Yala, witness blue whales in Mirissa, and unwind at luxury beach resorts.',
    main_image_url: '/exp-wild.jpg',
    duration_days: 10,
    duration_nights: 9,
    base_price: 1850,
    currency: 'USD',
    best_for: ['Wildlife', 'Luxury', 'Beach Lovers'],
  },
  {
    id: '3',
    slug: 'cultural-heritage-spices',
    title: 'Cultural Heritage & Ancient Wonders',
    engaging_description: 'Climb Sigiriya Rock fortress, explore Kandy Temple of the Tooth, and discover spice gardens.',
    main_image_url: '/dest-kandy.jpg',
    duration_days: 5,
    duration_nights: 4,
    base_price: 890,
    currency: 'USD',
    best_for: ['Culture', 'History', 'Adventure'],
  },
];

interface PackagesSectionProps {
  cmsPackages?: Package[];
}

export function PackagesSection({ cmsPackages }: PackagesSectionProps) {
  const packages = (cmsPackages && cmsPackages.length > 0) ? cmsPackages : DEFAULT_PACKAGES;

  return (
    <section className="w-full bg-zinc-950 py-24 px-6 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="section-tag">POPULAR ITINERARIES</span>
            <h2 className="font-display text-5xl sm:text-6xl text-white tracking-tight mt-2">
              FEATURED TOUR PACKAGES
            </h2>
          </div>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors group"
          >
            View All Tour Packages
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.slice(0, 3).map((pkg, idx) => (
            <motion.div
              key={pkg.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="pkg-card group flex flex-col"
            >
              {/* Cover Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={pkg.main_image_url || '/hero-ella.jpg'}
                  alt={pkg.title || 'Tour package'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-zinc-900/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-white font-bold text-sm">
                  <span className="text-orange-400 text-xs font-normal">From </span>
                  ${pkg.base_price?.toLocaleString()}
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-zinc-300 text-xs px-3 py-1 rounded-full border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  {pkg.duration_days} Days / {pkg.duration_nights} Nights
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                    {pkg.title}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3 mt-2 font-light">
                    {pkg.engaging_description}
                  </p>
                </div>

                {/* Tags */}
                {pkg.best_for && pkg.best_for.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {pkg.best_for.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 text-[11px] bg-white/5 text-zinc-400 px-2.5 py-1 rounded-full border border-white/5">
                        <Tag className="w-2.5 h-2.5 text-orange-400/70" /> {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA Link */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold">
                  <span className="text-zinc-400 group-hover:text-white transition-colors">Explore Itinerary</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-orange-500 text-white flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
