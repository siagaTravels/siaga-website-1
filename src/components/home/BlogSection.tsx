'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Calendar, ArrowRight } from 'lucide-react';
import { Blog } from '@/lib/api';

const DEFAULT_BLOGS: Partial<Blog>[] = [
  {
    id: '1',
    slug: 'ultimate-ella-travel-guide',
    title: 'The Ultimate Guide to Ella: Nine Arch Bridge & Peak Treks',
    excerpt: 'Everything you need to know about train timings, secret viewpoints, tea estate walks and cozy cafes in Ella.',
    author_name: 'Siaga Travel Team',
    main_image_url: '/hero-ella.jpg',
    created_at: '2026-08-01T00:00:00Z',
    tags: ['Travel Tips', 'Highlands', 'Trekking'],
  },
  {
    id: '2',
    slug: 'top-10-wildlife-safaris-in-sri-lanka',
    title: 'Top 10 Wildlife Safaris: Leopards, Elephants & Whales',
    excerpt: 'Compare Yala, Udawalawe, Minneriya, and Sinharaja birdwatching reserves to pick your perfect safari experience.',
    author_name: 'Wild Specialist',
    main_image_url: '/exp-wild.jpg',
    created_at: '2026-07-28T00:00:00Z',
    tags: ['Safari', 'Wildlife', 'Guide'],
  },
  {
    id: '3',
    slug: 'sri-lankan-street-food-culture',
    title: 'Spices & Flavors: What to Eat in Sri Lanka',
    excerpt: 'From hot Kottu Roti to String Hoppers and fresh King Coconut water — a foodie journey across the island.',
    author_name: 'Culinary Explorer',
    main_image_url: '/dest-kandy.jpg',
    created_at: '2026-07-15T00:00:00Z',
    tags: ['Food', 'Culture', 'Local Life'],
  },
];

interface BlogSectionProps {
  cmsBlogs?: Blog[];
}

export function BlogSection({ cmsBlogs }: BlogSectionProps) {
  const blogs = (cmsBlogs && cmsBlogs.length > 0) ? cmsBlogs : DEFAULT_BLOGS;

  return (
    <section className="w-full bg-zinc-950 py-24 px-6 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="section-tag">INSIGHTS & GUIDES</span>
            <h2 className="font-display text-5xl sm:text-6xl text-white tracking-tight mt-2">
              TRAVEL STORIES & JOURNAL
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog, idx) => (
            <motion.div
              key={blog.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="blog-card group flex flex-col"
            >
              {/* Cover Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={blog.main_image_url || '/hero-ella.jpg'}
                  alt={blog.title || 'Blog article'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-[11px] text-zinc-400 font-light">
                    <span className="inline-flex items-center gap-1">
                      <User className="w-3 h-3 text-orange-400" />
                      {blog.author_name || 'Admin'}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-orange-400" />
                      {new Date(blog.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors leading-snug line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3 font-light">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 group-hover:text-orange-300 transition-colors"
                  >
                    Read Full Story <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
