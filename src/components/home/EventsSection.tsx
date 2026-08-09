'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Event } from '@/lib/api';

const DEFAULT_EVENTS: Partial<Event>[] = [
  {
    id: '1',
    slug: 'kandy-esala-perahera-2026',
    name: 'Kandy Esala Perahera',
    venue: 'Dalada Maligawa, Kandy',
    start_date: '2026-08-15',
    main_image_url: '/exp-festive.jpg',
    tags: ['Festival', 'Culture', 'Heritage'],
    description: 'The iconic grand festival of sacred tooth relic featuring grand elephant processions and traditional fire dancers.',
  },
  {
    id: '2',
    slug: 'colombo-gourmet-food-festival',
    name: 'Colombo Gourmet Food & Spice Fest',
    venue: 'Galle Face Green, Colombo',
    start_date: '2026-09-02',
    main_image_url: '/dest-kandy.jpg',
    tags: ['Culinary', 'Food', 'Nightlife'],
    description: 'Celebrating authentic Sri Lankan street food, celebrity chefs, and tropical mixology by the ocean.',
  },
  {
    id: '3',
    slug: 'galle-literary-cultural-festival',
    name: 'Galle International Cultural Festival',
    venue: 'Galle Fort Heritage Site',
    start_date: '2026-10-10',
    main_image_url: '/hero-ella.jpg',
    tags: ['Arts', 'Music', 'History'],
    description: 'Gathering world-class authors, artists, and musicians inside the historic 17th-century Dutch Fort.',
  },
];

interface EventsSectionProps {
  cmsEvents?: Event[];
}

export function EventsSection({ cmsEvents }: EventsSectionProps) {
  const events = (cmsEvents && cmsEvents.length > 0) ? cmsEvents : DEFAULT_EVENTS;

  return (
    <section className="w-full bg-zinc-900 py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="section-tag">ISLAND HAPPENINGS</span>
            <h2 className="font-display text-5xl sm:text-6xl text-white tracking-tight mt-2">
              UPCOMING EVENTS & FESTIVALS
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            Explore Calendar <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.slice(0, 3).map((event, idx) => {
            const dateObj = event.start_date ? new Date(event.start_date) : new Date();
            const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
            const day = dateObj.getDate();

            return (
              <motion.div
                key={event.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="event-card group flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={event.main_image_url || '/exp-festive.jpg'}
                    alt={event.name || 'Event image'}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90" />

                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-orange-500 text-white rounded-xl px-3 py-2 text-center shadow-lg font-display tracking-wider">
                    <div className="text-xl leading-none">{day}</div>
                    <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-orange-100">{month}</div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-orange-400 font-medium mb-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {event.venue || 'Sri Lanka'}
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                      {event.name}
                    </h3>
                    
                    <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3 mt-2 font-light">
                      {event.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {event.tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-white/5 text-zinc-400 px-2.5 py-0.5 rounded-full border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
