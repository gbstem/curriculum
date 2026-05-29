'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { verifyAccessPassword } from '../actions';
import { tracks } from '../data/tracks';

interface AuthGateProps {
  children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Check if user is already authenticated
    const authenticated = localStorage.getItem('gbstem_authenticated') === 'true';
    setIsAuthenticated(authenticated);
    setIsLoading(false);
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isValid = await verifyAccessPassword(password);
      if (isValid) {
        localStorage.setItem('gbstem_authenticated', 'true');
        setIsAuthenticated(true);
        setPassword('');
        setError('');
      } else {
        setError('Incorrect password. Please try again.');
      }
    } catch (err: any) {
      setError('An error occurred during verification.');
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('gbstem_authenticated');
    setIsAuthenticated(false);
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
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

  // Show login modal if not authenticated
  if (!isAuthenticated) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh', background: '#f4f6f9' }}
      >
        <Modal show={true} onHide={() => {}} backdrop="static" keyboard={false} centered>
          <Modal.Header className="bg-primary py-4 text-center text-white">
            <Modal.Title className="fs-4 fw-bold w-100">
              <i className="fas fa-lock me-2"></i>
              gbSTEM Curriculum Access
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div className="mb-4 text-center">
              <img
                src="/images/penguin.png"
                alt="gbSTEM Logo"
                className="img-fluid mb-3"
                style={{ maxWidth: '150px' }}
              />
              <h4 className="fw-bold">Welcome to gbSTEM Curriculum</h4>
              <p className="text-muted">Please enter the password to access the curriculum.</p>
            </div>

            <Form onSubmit={handleLoginSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoFocus
                  size="lg"
                />
                {error && <div className="text-danger fw-medium mt-2">{error}</div>}
              </Form.Group>

              <div className="d-grid mt-4">
                <Button type="submit" variant="primary" size="lg" className="fw-semibold py-2">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Access Curriculum
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
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
              onClick={handleLogout}
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
    </div>
  );
}
