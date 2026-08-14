import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getEventBySlug, Event } from '@/lib/api';
import { Calendar, MapPin, Ticket, Clock, ArrowLeft, Share2, Sparkles, Building, ExternalLink, ShieldCheck, CheckCircle2, Phone, Mail } from 'lucide-react';
import { EventDetailClient } from './EventDetailClient';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event: Event | null = await getEventBySlug(slug);
  
  if (!event) {
    return {
      title: 'Event Not Found | Siaga Travels',
    };
  }

  return {
    title: `${event.name} | Sri Lanka Events`,
    description: event.description?.slice(0, 160) || `Experience ${event.name} with Siaga Travels in Sri Lanka.`,
    openGraph: {
      title: `${event.name} | Siaga Travels`,
      description: event.description?.slice(0, 160),
      images: [event.main_image_url || '/hero-ella.jpg'],
    },
  };
}

export default async function SingleEventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event: Event | null = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <main style={{ background: '#131313', color: '#fff', minHeight: '100vh', paddingTop: 90 }}>
      {/* ── CLIENT DETAIL WRAPPER (HERO, COUNTDOWN, AGENDA, TICKETS, GALLERY, FAQS) ──── */}
      <EventDetailClient event={event} />
    </main>
  );
}
