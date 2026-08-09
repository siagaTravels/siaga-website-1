'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Tours', href: '/packages' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'background 0.4s, padding 0.3s, backdrop-filter 0.4s, border-color 0.4s',
        background: scrolled ? 'rgba(10,10,10,0.88)' : 'rgba(10,10,10,0.4)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.05)',
        padding: scrolled ? '12px 0' : '18px 0',
      }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
          <div style={{
            width: 50, height: 50, borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
          }}>
            <img src="/logo.png" alt="Siaga Travels Logo" style={{ width: 44, height: 44, objectFit: 'contain' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 26, color: '#FFFFFF', letterSpacing: '0.08em', lineHeight: 1 }}>
              SIAGA
            </span>
            <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: 11, color: '#FFFFFF', letterSpacing: '0.35em', marginTop: 4, paddingLeft: 2 }}>
              TRAVELS
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="hidden-mobile">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 14,
                color: '#E5E2E1',
                textDecoration: 'none',
                transition: 'color 0.2s',
                fontWeight: 500,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#E86A2A')}
              onMouseLeave={e => (e.currentTarget.style.color = '#E5E2E1')}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link
            href="/packages"
            style={{
              background: '#E86A2A', color: '#fff',
              padding: '10px 22px', borderRadius: 99,
              fontFamily: "'Bebas Neue', cursive", fontSize: 16,
              letterSpacing: '0.08em', textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(232,106,42,0.3)',
            }}
          >
            BOOK TOUR
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen(p => !p)}
            style={{ background: 'none', border: 'none', color: '#E5E2E1', cursor: 'pointer', padding: 4 }}
            className="show-mobile"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{
          background: 'rgba(10,10,10,0.98)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '20px 30px',
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, color: '#E5E2E1', textDecoration: 'none' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
