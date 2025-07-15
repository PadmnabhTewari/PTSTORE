'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FadeIn, SlideIn, Pulse } from '@/components/AnimatedComponents';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gradient-to-r from-orange-600 to-red-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <FadeIn>
            <Link href="/" className="text-white text-2xl font-bold">
              PT-Store
            </Link>
          </FadeIn>

          <div className="flex items-center space-x-4">
            <SlideIn direction="right" delay={0.2}>
              <Link
                href="/products"
                className="text-white hover:text-orange-200 transition-colors"
              >
                Products
              </Link>
            </SlideIn>
            <SlideIn direction="right" delay={0.3}>
              <Link
                href="/categories"
                className="text-white hover:text-orange-200 transition-colors"
              >
                Categories
              </Link>
            </SlideIn>
            <SlideIn direction="right" delay={0.4}>
              <Link
                href="/about"
                className="text-white hover:text-orange-200 transition-colors"
              >
                About
              </Link>
            </SlideIn>
            <SlideIn direction="right" delay={0.5}>
              <Link
                href="/contact"
                className="text-white hover:text-orange-200 transition-colors"
              >
                Contact
              </Link>
            </SlideIn>
          </div>

          <div className="flex items-center space-x-4">
            <SlideIn direction="right" delay={0.6}>
              <Link
                href="/cart"
                className="text-white hover:text-orange-200 transition-colors"
              >
                Cart
              </Link>
            </SlideIn>
            {session ? (
              <SlideIn direction="right" delay={0.7}>
                <Pulse>
                  <button
                    onClick={() => signOut()}
                    className="text-white hover:text-orange-200 transition-colors"
                  >
                    Sign Out
                  </button>
                </Pulse>
              </SlideIn>
            ) : (
              <SlideIn direction="right" delay={0.7}>
                <Pulse>
                  <Link
                    href="/signin"
                    className="text-white hover:text-orange-200 transition-colors"
                  >
                    Sign In
                  </Link>
                </Pulse>
              </SlideIn>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 