'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import { useSession } from '@/lib/useSession';
import { tracks } from '../data/tracks';
import Footer from './Footer';

interface AuthGateProps {
  children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const { loading, logout } = useSession();
  const pathname = usePathname();

  // If on the login page, bypass layout (Navbar/Footer) entirely
  if (pathname === '/login') {
    return <>{children}</>;
  }

  // Show loading spinner while session is loading
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh', background: '#f8f9fa' }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-3">Loading gbSTEM Curriculum...</p>
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
    <div className="d-flex min-h-screen flex-col">
      <Navbar
        variant="dark"
        expand="lg"
        style={{ backgroundColor: '#1D2256' }}
        className="py-2 shadow-sm"
      >
        <Navbar.Brand as={Link} href="/" className="d-flex align-items-center ms-5">
          <img
            alt="gbSTEM Logo"
            src="/images/penguin.png"
            width="200"
            className="d-inline-block align-middle"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="align-items-center ms-4 me-auto">
            {navbarTracks.map((track) => (
              <NavDropdown
                key={track.id}
                title={track.shortTitle}
                id={track.dropdownId}
                className="mx-2 text-center font-mono"
              >
                {track.dropdownItems.map((item, idx) => (
                  <NavDropdown.Item
                    key={idx}
                    as={Link}
                    href={item.href}
                    className="text-lg-start text-center"
                  >
                    {item.title}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            ))}
          </Nav>

          <Nav className="ms-auto me-5">
            <Nav.Link
              onClick={logout}
              className="d-flex align-items-center text-white"
              style={{ cursor: 'pointer' }}
            >
              <i className="fas fa-sign-out-alt me-1"></i>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
}
