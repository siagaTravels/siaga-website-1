'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/contact';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  ArrowUpRight,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      handle: '@siagatravels.srilanka',
      url: CONTACT_INFO.socialMedia.facebook,
      color: '#1877F2',
      bg: 'rgba(24, 119, 242, 0.1)',
      icon: (
        <svg style={{ width: 22, height: 22, fill: 'currentColor' }} viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      handle: '@siagatravels',
      url: CONTACT_INFO.socialMedia.instagram,
      color: '#E4405F',
      bg: 'rgba(228, 64, 95, 0.1)',
      icon: (
        <svg style={{ width: 22, height: 22, fill: 'currentColor' }} viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: 'TikTok',
      handle: '@siaga.travels',
      url: CONTACT_INFO.socialMedia.tiktok,
      color: '#00F2FE',
      bg: 'rgba(0, 242, 254, 0.1)',
      icon: (
        <svg style={{ width: 22, height: 22, fill: 'currentColor' }} viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 003 15.65 6.34 6.34 0 009.35 22a6.33 6.33 0 006.33-6.33V9.4a8.16 8.16 0 004.91 1.62V7.58a4.85 4.85 0 01-1-.89z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      handle: 'Siaga Travels',
      url: CONTACT_INFO.socialMedia.linkedin,
      color: '#0A66C2',
      bg: 'rgba(10, 102, 194, 0.1)',
      icon: (
        <svg style={{ width: 22, height: 22, fill: 'currentColor' }} viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{ background: '#0D0D0D', color: '#E5E2E1', minHeight: '100vh', fontFamily: 'Manrope, sans-serif' }}>

      {/* Hero Header */}
      <section style={{ position: 'relative', paddingTop: 160, paddingBottom: 80, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 1400, height: 500,
          background: 'radial-gradient(circle at 50% 20%, rgba(232, 106, 42, 0.15) 0%, rgba(13, 13, 13, 0) 70%)',
          pointerEvents: 'none', zIndex: 0
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 99,
            background: 'rgba(232, 106, 42, 0.1)', border: '1px solid rgba(232, 106, 42, 0.25)',
            color: '#E86A2A', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em',
            marginBottom: 20
          }}>
            <Sparkles size={14} /> GET IN TOUCH
          </div>

          <h1 style={{
            fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.15
          }}>
            Let&apos;s Plan Your <span style={{ color: '#E86A2A', fontStyle: 'italic' }}>Next Journey</span>
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)', color: '#A09D9A', maxWidth: 640,
            margin: '0 auto', lineHeight: 1.6, fontWeight: 400
          }}>
            {CONTACT_INFO.slogan} Reach out to our dedicated travel experts for personalized itineraries, bookings, and island advice.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'start' }}>
          
          {/* Left Column: Contact Cards & Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Direct Channels Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 24, padding: 32,
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFF', margin: '0 0 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <MessageSquare size={20} style={{ color: '#E86A2A' }} /> Contact Channels
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Phone */}
                <a href={`tel:${CONTACT_INFO.phoneRaw}`} style={{
                  display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none',
                  padding: 16, borderRadius: 16, background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s ease',
                  color: 'inherit'
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(232, 106, 42, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(232, 106, 42, 0.3)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(232, 106, 42, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E86A2A', flexShrink: 0 }}>
                    <Phone size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone & WhatsApp</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#FFF', marginTop: 2 }}>{CONTACT_INFO.phoneFormatted}</div>
                  </div>
                  <ArrowUpRight size={18} style={{ color: '#666' }} />
                </a>

                {/* Email */}
                <a href={`mailto:${CONTACT_INFO.email}`} style={{
                  display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none',
                  padding: 16, borderRadius: 16, background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s ease',
                  color: 'inherit'
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(232, 106, 42, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(232, 106, 42, 0.3)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(232, 106, 42, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E86A2A', flexShrink: 0 }}>
                    <Mail size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Official Email</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#FFF', marginTop: 2 }}>{CONTACT_INFO.email}</div>
                  </div>
                  <ArrowUpRight size={18} style={{ color: '#666' }} />
                </a>

                {/* Address */}
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: 16,
                  padding: 16, borderRadius: 16, background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(232, 106, 42, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E86A2A', flexShrink: 0, marginTop: 2 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Office Location</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#FFF', marginTop: 4, lineHeight: 1.5 }}>
                      {CONTACT_INFO.address.street},<br />
                      {CONTACT_INFO.address.city}, {CONTACT_INFO.address.country}, {CONTACT_INFO.address.zipCode}
                    </div>
                  </div>
                </div>

                {/* Website & Hours */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 4 }}>
                  <div style={{ padding: 14, borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#888', fontSize: 12, marginBottom: 4 }}>
                      <Globe size={14} style={{ color: '#E86A2A' }} /> Website
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#FFF' }}>{CONTACT_INFO.websiteDomain}</div>
                  </div>
                  <div style={{ padding: 14, borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#888', fontSize: 12, marginBottom: 4 }}>
                      <Clock size={14} style={{ color: '#E86A2A' }} /> Support
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#FFF' }}>24/7 Concierge</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Social Media Grid Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 24, padding: 28,
              backdropFilter: 'blur(20px)',
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#FFF', margin: '0 0 16px' }}>Follow Our Journey</h3>
              <p style={{ fontSize: 13, color: '#888', margin: '0 0 20px', lineHeight: 1.5 }}>
                Connect with us on social media for daily Sri Lanka travel inspiration, video tours, and special offers.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {socialPlatforms.map(platform => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: 14,
                      borderRadius: 14, background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      textDecoration: 'none', color: '#FFF', transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = platform.bg;
                      e.currentTarget.style.borderColor = platform.color;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ color: platform.color, flexShrink: 0 }}>
                      {platform.icon}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>{platform.name}</div>
                      <div style={{ fontSize: 11, color: '#777', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{platform.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 24, padding: '36px 32px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#FFF', margin: '0 0 8px' }}>
              Send Us a Message
            </h2>
            <p style={{ fontSize: 14, color: '#888', margin: '0 0 28px', lineHeight: 1.6 }}>
              Have questions about a tour package or customized itinerary? Fill in the details below and our experts will get back to you within 2 hours.
            </p>

            {submitted ? (
              <div style={{
                padding: 40, textAlign: 'center', background: 'rgba(34, 197, 94, 0.08)',
                border: '1px solid rgba(34, 197, 94, 0.25)', borderRadius: 20,
              }}>
                <CheckCircle2 size={48} style={{ color: '#22c55e', margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#FFF', margin: '0 0 8px' }}>Message Received!</h3>
                <p style={{ fontSize: 14, color: '#AAA', margin: '0 0 24px', lineHeight: 1.5 }}>
                  Thank you for reaching out to Siaga Travels. Our travel team will review your inquiry and contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)', color: '#FFF', border: 'none',
                    padding: '10px 20px', borderRadius: 99, fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.2s ease'
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#AAA', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12, padding: '12px 16px', color: '#FFF', fontSize: 14,
                        fontFamily: 'Manrope, sans-serif', outline: 'none', boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#AAA', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12, padding: '12px 16px', color: '#FFF', fontSize: 14,
                        fontFamily: 'Manrope, sans-serif', outline: 'none', boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#AAA', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 234 567 890"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12, padding: '12px 16px', color: '#FFF', fontSize: 14,
                        fontFamily: 'Manrope, sans-serif', outline: 'none', boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#AAA', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Topic</label>
                    <select
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      style={{
                        width: '100%', background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12, padding: '12px 16px', color: '#FFF', fontSize: 14,
                        fontFamily: 'Manrope, sans-serif', outline: 'none', boxSizing: 'border-box'
                      }}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Custom Tour Planning">Custom Tour Planning</option>
                      <option value="Booking Confirmation">Booking Confirmation</option>
                      <option value="Vehicle Hire">Vehicle & Chauffeur Hire</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#AAA', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Message *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your trip dates, preferred activities, or any questions..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 12, padding: '14px 16px', color: '#FFF', fontSize: 14,
                      fontFamily: 'Manrope, sans-serif', outline: 'none', resize: 'vertical', boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: '#E86A2A', color: '#FFF', border: 'none',
                    borderRadius: 12, padding: '14px 24px', fontSize: 15, fontWeight: 700,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    transition: 'all 0.2s ease', marginTop: 8,
                    boxShadow: '0 8px 24px rgba(232, 106, 42, 0.3)',
                    opacity: submitting ? 0.7 : 1,
                  }}
                  onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = '#d25b1f'; }}
                  onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = '#E86A2A'; }}
                >
                  {submitting ? 'Sending...' : <>Send Message <Send size={16} /></>}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
