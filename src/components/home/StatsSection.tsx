'use client';

import { motion } from 'framer-motion';
import { MapPin, Star, Users, Award } from 'lucide-react';

const STATS = [
  { icon: MapPin, value: '50+', label: 'Curated Destinations' },
  { icon: Star, value: '4.9 ★', label: 'Traveler Satisfaction' },
  { icon: Users, value: '1,200+', label: 'Happy Explorers' },
  { icon: Award, value: '10+', label: 'Years Island Expertise' },
];

export function StatsSection() {
  return (
    <section className="w-full bg-zinc-900 border-y border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-2 p-4"
            >
              <div className="inline-flex p-3 rounded-2xl bg-orange-500/10 text-orange-400 mb-1 border border-orange-500/20">
                <Icon className="w-6 h-6" />
              </div>
              <div className="stat-num">{stat.value}</div>
              <div className="text-zinc-400 text-xs sm:text-sm font-medium tracking-wide uppercase">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
