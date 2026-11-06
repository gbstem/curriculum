'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from '@/lib/useSession';
import { tracks } from '../data/tracks';
import Footer from './Footer';
import Spinner from './Spinner';

// Shared by the dropdown toggles and the logout link so they line up.
const NAV_LINK =
  'mx-2.5 block py-2 font-space-mono text-[20px] font-bold text-white lowercase no-underline transition-colors duration-200 ease-in-out hover:opacity-80 lg:px-2';

interface NavDropdownProps {
  title: string;
  testId: string;
  items: { href: string; title: string }[];
  onNavigate: () => void;
}

function NavDropdown({ title, testId, items, onNavigate }: NavDropdownProps) {
  return (
    <Menu
      as="div"
      className="relative mx-2 flex flex-col text-center font-mono"
      data-testid={testId}
    >
      <MenuButton
        className={`${NAV_LINK} after:ml-[0.255em] after:inline-block after:border-x-[0.3em] after:border-t-[0.3em] after:border-x-transparent after:border-t-current after:align-[0.255em] after:content-['']`}
      >
        {title}
      </MenuButton>
      <MenuItems
        modal={false}
        className="z-1000 mt-0.5 min-w-40 rounded-[10px] bg-navy py-2 text-right font-space-mono font-bold text-white shadow-lift focus:outline-none lg:absolute lg:top-full lg:left-0 lg:text-left"
      >
        {items.map((item) => (
          <MenuItem key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="block w-full px-4 py-1 text-center font-space-mono whitespace-nowrap text-white no-underline transition-colors duration-200 ease-in-out data-focus:bg-light data-focus:text-dark lg:text-left"
            >
              {item.title}
            </Link>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

interface AuthGateProps {
  children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const { loading, logout } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // If on the login page, bypass layout (Navbar/Footer) entirely
  if (pathname === '/login') {
    return <>{children}</>;
  }

  // Show loading spinner while session is loading
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-light">
        <div className="text-center">
          <Spinner className="text-primary" />
          <p className="mt-4 text-muted">Loading gbSTEM Curriculum...</p>
        </div>
      </div>
    );
  }

  // Re-order tracks for the navigation bar to match original layout
  const navbarTracksOrder = ['cs', 'math', 'engineering', 'science'];
  const navbarTracks = navbarTracksOrder
    .map((id) => tracks.find((t) => t.id === id))
    .filter((t): t is (typeof tracks)[0] => !!t);

  return (
    <div className="flex min-h-screen flex-col">
      <nav
        className="relative flex flex-wrap items-center justify-between bg-navy py-2 shadow-sm lg:flex-nowrap lg:justify-start"
        data-testid="navbar"
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="ms-12 me-4 flex items-center py-1.25 font-space-mono text-[40px] whitespace-nowrap text-white no-underline"
          data-testid="nav-home"
        >
          <img alt="gbSTEM Logo" src="/images/penguin.png" width="200" />
        </Link>

        <button
          type="button"
          aria-controls="navbar-nav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-md border border-white/10 px-3 py-1 text-xl leading-none text-white/55 transition-shadow duration-150 ease-in-out focus:shadow-[0_0_0_0.25rem] focus:outline-0 lg:hidden"
        >
          {/* Three-bar "hamburger" icon. */}
          <svg viewBox="0 0 30 30" className="inline-block size-[1.5em] align-middle" aria-hidden>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M4 7h22M4 15h22M4 23h22"
            />
          </svg>
        </button>

        {/* Below lg the links collapse behind the button above; the grid rows animate the height. */}
        <div
          id="navbar-nav"
          className={`grid grow basis-full transition-[grid-template-rows,visibility] duration-350 ease-in-out lg:visible lg:flex lg:basis-auto lg:items-center ${menuOpen ? 'grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'}`}
        >
          <div className="min-h-0 overflow-hidden lg:flex lg:w-full lg:items-center lg:overflow-visible">
            <div className="ms-6 me-auto flex flex-col items-center lg:flex-row">
              {navbarTracks.map((track) => (
                <NavDropdown
                  key={track.id}
                  title={track.shortTitle}
                  testId={`nav-${track.id}`}
                  items={track.dropdownItems}
                  onNavigate={closeMenu}
                />
              ))}
            </div>

            <div className="ms-auto me-12 flex flex-col lg:flex-row">
              <button
                type="button"
                onClick={logout}
                data-testid="nav-logout"
                className={`${NAV_LINK} flex items-center text-left`}
              >
                <i className="fas fa-sign-out-alt me-1"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
}
