import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { HashRouter } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles.css'
import penguin from './penguin.png'

// Import Firebase components
import FirebaseCurriculum from './components/FirebaseCurriculum';
import LessonPage from './LessonPage';

// Login Modal Component
function LoginModal({ show, onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'antarctica') {
      localStorage.setItem('gbstem_authenticated', 'true');
      onLogin();
      setPassword('');
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={() => {}} backdrop="static" keyboard={false} centered>
      <Modal.Header className="bg-primary text-white">
        <Modal.Title>
          <i className="fas fa-lock me-2"></i>
          gbSTEM Curriculum Access
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-4">
          <img
            src={penguin}
            alt="gbSTEM Logo"
            className="img-fluid mb-3"
            style={{ maxWidth: '150px' }}
          />
          <h4>Welcome to gbSTEM Curriculum</h4>
          <p className="text-muted">Please enter the password to access the curriculum.</p>
        </div>
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoFocus
            />
            {error && <div className="text-danger mt-2">{error}</div>}
          </Form.Group>
          
          <div className="d-grid">
            <Button type="submit" variant="primary" size="lg">
              <i className="fas fa-sign-in-alt me-2"></i>
              Access Curriculum
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

// Track homepages
function Math() {
  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div className="bg-success text-white py-5" style={{ backgroundColor: '#198754' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4">Mathematics Curriculum</h1>
              <p className="lead mb-4">Teach mathematical concepts through interactive lessons and real-world applications.</p>
            </div>
            <div className="col-lg-4 text-center">
              <i className="fas fa-calculator fa-5x"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(25,135,84,0.10)' }}>
                    <i className="fas fa-calculator fa-2x" style={{ color: '#198754' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Math 1A</h4>
                    <span className="badge" style={{ background: '#198754', color: '#fff' }}>Foundation</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Build a strong foundation in mathematical concepts and problem-solving skills.
                </p>
                <Link to="/math/math1A" className="btn w-100" style={{ background: '#198754', color: '#fff' }}>Start Teaching</Link>
              </div>
            </div>
          </div>

           <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(25,135,84,0.10)' }}>
                    <i className="fas fa-calculator fa-2x" style={{ color: '#198754' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Math 1B</h4>
                    <span className="badge" style={{ background: '#198754', color: '#fff' }}>Foundation</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Build a strong foundation in mathematical concepts and problem-solving skills.
                </p>
                <Link to="/math/math1B" className="btn w-100" style={{ background: '#198754', color: '#fff' }}>Start Teaching</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(13,110,253,0.10)' }}>
                    <i className="fas fa-chart-line fa-2x" style={{ color: '#0d6efd' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Math 2A</h4>
                    <span className="badge" style={{ background: '#0d6efd', color: '#fff' }}>Intermediate</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Explore advanced mathematical concepts and analytical thinking.
                </p>
                <Link to="/math/math2A" className="btn w-100" style={{ background: '#0d6efd', color: '#fff' }}>Start Teaching</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(13,110,253,0.10)' }}>
                    <i className="fas fa-chart-line fa-2x" style={{ color: '#0d6efd' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Math 2B</h4>
                    <span className="badge" style={{ background: '#0d6efd', color: '#fff' }}>Intermediate</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Explore advanced mathematical concepts and analytical thinking.
                </p>
                <Link to="/math/math2B" className="btn w-100" style={{ background: '#0d6efd', color: '#fff' }}>Start Teaching</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(111,66,193,0.10)' }}>
                    <i className="fas fa-square-root-alt fa-2x" style={{ color: '#6f42c1' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Math 3A</h4>
                    <span className="badge" style={{ background: '#6f42c1', color: '#fff' }}>Advanced</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Master complex mathematical theories and applications.
                </p>
                <Link to="/math/math3A" className="btn w-100" style={{ background: '#6f42c1', color: '#fff' }}>Start Teaching</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(111,66,193,0.10)' }}>
                    <i className="fas fa-square-root-alt fa-2x" style={{ color: '#6f42c1' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Math 3B</h4>
                    <span className="badge" style={{ background: '#6f42c1', color: '#fff' }}>Advanced</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Master complex mathematical theories and applications.
                </p>
                <Link to="/math/math3B" className="btn w-100" style={{ background: '#6f42c1', color: '#fff' }}>Start Teaching</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(32,201,151,0.10)' }}>
                    <i className="fas fa-infinity fa-2x" style={{ color: '#20c997' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Math 4A</h4>
                    <span className="badge" style={{ background: '#20c997', color: '#fff' }}>Expert</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Delve into advanced mathematical analysis and proofs.
                </p>
                <Link to="/math/math4B" className="btn w-100" style={{ background: '#20c997', color: '#fff' }}>Start Teaching</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(32,201,151,0.10)' }}>
                    <i className="fas fa-infinity fa-2x" style={{ color: '#20c997' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Math 4B</h4>
                    <span className="badge" style={{ background: '#20c997', color: '#fff' }}>Expert</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Delve into advanced mathematical analysis and proofs.
                </p>
                <Link to="/math/math4B" className="btn w-100" style={{ background: '#20c997', color: '#fff' }}>Start Teaching</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(253,126,20,0.10)' }}>
                    <i className="fas fa-brain fa-2x" style={{ color: '#fd7e14' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Math 5A</h4>
                    <span className="badge" style={{ background: '#fd7e14', color: '#fff' }}>Master</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Explore the frontiers of mathematical knowledge and research.
                </p>
                <Link to="/math/math5A" className="btn w-100" style={{ background: '#fd7e14', color: '#fff' }}>Start Teaching</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(253,126,20,0.10)' }}>
                    <i className="fas fa-brain fa-2x" style={{ color: '#fd7e14' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Math 5B</h4>
                    <span className="badge" style={{ background: '#fd7e14', color: '#fff' }}>Master</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Explore the frontiers of mathematical knowledge and research.
                </p>
                <Link to="/math/math5B" className="btn w-100" style={{ background: '#fd7e14', color: '#fff' }}>Start Teaching</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Science() {
  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div className="text-white py-5" style={{ backgroundColor: '#20c997' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4">Science Curriculum</h1>
              <p className="lead mb-4">Discover physics, environmental science, and conduct virtual experiments.</p>
            </div>
            <div className="col-lg-4 text-center">
              <i className="fas fa-flask fa-5x"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(32,201,151,0.10)' }}>
                    <i className="fas fa-leaf fa-2x" style={{ color: '#20c997' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Environmental Science A</h4>
                    <span className="badge" style={{ background: '#20c997', color: '#fff' }}>Ecology</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Explore environmental systems, sustainability, and the impact of human activities on our planet.
                </p>
                <Link to="/science/environmentalA" className="btn w-100 text-white" style={{ background: '#20c997' }}>Start Teaching</Link>
              </div>
            </div>
          </div>

           <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(32,201,151,0.10)' }}>
                    <i className="fas fa-leaf fa-2x" style={{ color: '#20c997' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Environmental Science B</h4>
                    <span className="badge" style={{ background: '#20c997', color: '#fff' }}>Ecology</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Explore environmental systems, sustainability, and the impact of human activities on our planet.
                </p>
                <Link to="/science/environmentalB" className="btn w-100 text-white" style={{ background: '#20c997' }}>Start Teaching</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(13,110,253,0.10)' }}>
                    <i className="fas fa-atom fa-2x" style={{ color: '#0d6efd' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Physics A</h4>
                    <span className="badge" style={{ background: '#0d6efd', color: '#fff' }}>Mechanics</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Understand the fundamental laws of nature, motion, energy, and the universe around us.
                </p>
                <Link to="/science/physicsA" className="btn w-100 text-white" style={{ background: '#0d6efd' }}>Start Teaching</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(13,110,253,0.10)' }}>
                    <i className="fas fa-atom fa-2x" style={{ color: '#0d6efd' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Physics B</h4>
                    <span className="badge" style={{ background: '#0d6efd', color: '#fff' }}>Mechanics</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Understand the fundamental laws of nature, motion, energy, and the universe around us.
                </p>
                <Link to="/science/physicsB" className="btn w-100 text-white" style={{ background: '#0d6efd' }}>Start Teaching</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Engineering() {
  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div className="bg-warning text-white py-5" style={{ backgroundColor: '#ffc107' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4">Engineering Curriculum</h1>
              <p className="lead mb-4">Design, build, and test solutions to real-world engineering challenges.</p>
            </div>
            <div className="col-lg-4 text-center">
              <i className="fas fa-cogs fa-5x"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(255,193,7,0.10)' }}>
                    <i className="fas fa-cogs fa-2x" style={{ color: '#ffc107' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Engineering 1A</h4>
                    <span className="badge" style={{ background: '#ffc107', color: '#212529' }}>Intro</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Introduction to engineering principles and hands-on projects.
                </p>
                <Link to="/engineering/engineering1A" className="btn w-100 text-dark" style={{ background: '#ffc107' }}>Start Teaching</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(255,193,7,0.10)' }}>
                    <i className="fas fa-cogs fa-2x" style={{ color: '#ffc107' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Engineering 1B</h4>
                    <span className="badge" style={{ background: '#ffc107', color: '#212529' }}>Intro</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Introduction to engineering principles and hands-on projects.
                </p>
                <Link to="/engineering/engineering1B" className="btn w-100 text-dark" style={{ background: '#ffc107' }}>Start Teaching</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(253,126,20,0.10)' }}>
                    <i className="fas fa-tools fa-2x" style={{ color: '#fd7e14' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Engineering 2A</h4>
                    <span className="badge" style={{ background: '#fd7e14', color: '#fff' }}>Intermediate</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Dive deeper into engineering design, prototyping, and teamwork.
                </p>
                <Link to="/engineering/engineering2A" className="btn w-100 text-white" style={{ background: '#fd7e14' }}>Start Teaching</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(253,126,20,0.10)' }}>
                    <i className="fas fa-tools fa-2x" style={{ color: '#fd7e14' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Engineering 2B</h4>
                    <span className="badge" style={{ background: '#fd7e14', color: '#fff' }}>Intermediate</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Dive deeper into engineering design, prototyping, and teamwork.
                </p>
                <Link to="/engineering/engineering2B" className="btn w-100 text-white" style={{ background: '#fd7e14' }}>Start Teaching</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(111,66,193,0.10)' }}>
                    <i className="fas fa-drafting-compass fa-2x" style={{ color: '#6f42c1' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Engineering 3A</h4>
                    <span className="badge" style={{ background: '#6f42c1', color: '#fff' }}>Advanced</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Advanced engineering concepts, innovation, and real-world problem solving.
                </p>
                <Link to="/engineering/engineering3A" className="btn w-100 text-white" style={{ background: '#6f42c1' }}>Start Teaching</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(111,66,193,0.10)' }}>
                    <i className="fas fa-drafting-compass fa-2x" style={{ color: '#6f42c1' }}></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Engineering 3B</h4>
                    <span className="badge" style={{ background: '#6f42c1', color: '#fff' }}>Advanced</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Advanced engineering concepts, innovation, and real-world problem solving.
                </p>
                <Link to="/engineering/engineering3B" className="btn w-100 text-white" style={{ background: '#6f42c1' }}>Start Teaching</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main site homepage
function Home() {
  return (
    <div className="container py-5" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="row w-100 justify-content-center g-4">
        <div className="col-12 mb-4 text-center">
          <h1 className="fw-bold mb-2">Choose a Curriculum Track</h1>
          <p className="text-muted mb-0">Select a subject to get started.</p>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center p-4">
              <i className="fas fa-laptop-code fa-3x text-primary mb-3"></i>
              <h5 className="card-title fw-bold mb-2">Computer Science</h5>
              <p className="card-text text-muted mb-3">Learn programming with Python and Scratch, build games, and create interactive projects.</p>
              <Link to="/cs" className="btn btn-primary w-100">Explore CS</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center p-4">
              <i className="fas fa-calculator fa-3x text-success mb-3"></i>
              <h5 className="card-title fw-bold mb-2">Mathematics</h5>
              <p className="card-text text-muted mb-3">Teach mathematical concepts through interactive lessons and real-world applications.</p>
              <Link to="/math" className="btn btn-success w-100">Explore Math</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center p-4">
              <i className="fas fa-flask fa-3x text-info mb-3"></i>
              <h5 className="card-title fw-bold mb-2">Science</h5>
              <p className="card-text text-muted mb-3">Discover physics, environmental science, and conduct virtual experiments.</p>
              <Link to="/science" className="btn btn-info text-white w-100">Explore Science</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center p-4">
              <i className="fas fa-cogs fa-3x text-warning mb-3"></i>
              <h5 className="card-title fw-bold mb-2">Engineering</h5>
              <p className="card-text text-muted mb-3">Design, build, and test solutions to real-world engineering challenges.</p>
              <Link to="/engineering" className="btn btn-warning text-white w-100">Explore Engineering</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CS() {
  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div className="bg-primary text-white py-5" style={{ backgroundColor: '#1D2256' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4">Computer Science Curriculum</h1>
              <p className="lead mb-4">Teach programming fundamentals and advanced concepts through hands-on projects and interactive learning experiences.</p>
            </div>
            <div className="col-lg-4 text-center">
              <i className="fas fa-laptop-code fa-5x"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Scratch 1A */}
          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-warning bg-opacity-10 p-3 rounded me-3">
                    <i className="fas fa-puzzle-piece fa-2x text-warning"></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Scratch 1A</h4>
                    <span className="badge bg-warning text-dark">Beginner Friendly</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Learn programming fundamentals through visual block-based coding. Create games, animations, and interactive stories while developing computational thinking skills.
                </p>
                <ul className="list-unstyled mb-4">
                  <li><i className="fas fa-check text-success me-2"></i>24 comprehensive lessons</li>
                  <li><i className="fas fa-check text-success me-2"></i>Visual programming concepts</li>
                  <li><i className="fas fa-check text-success me-2"></i>Game development projects</li>
                  <li><i className="fas fa-check text-success me-2"></i>Interactive storytelling</li>
                </ul>
                <Link to="/cs/scratch1A" className="btn btn-warning text-white">Start Teaching</Link>
              </div>
            </div>
          </div>
          {/* Scratch 1B */}
          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-warning bg-opacity-10 p-3 rounded me-3">
                    <i className="fas fa-puzzle-piece fa-2x text-warning"></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Scratch 1B</h4>
                    <span className="badge bg-warning text-dark">Beginner Friendly</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Learn programming fundamentals through visual block-based coding. Create games, animations, and interactive stories while developing computational thinking skills.
                </p>
                <ul className="list-unstyled mb-4">
                  <li><i className="fas fa-check text-success me-2"></i>24 comprehensive lessons</li>
                  <li><i className="fas fa-check text-success me-2"></i>Visual programming concepts</li>
                  <li><i className="fas fa-check text-success me-2"></i>Game development projects</li>
                  <li><i className="fas fa-check text-success me-2"></i>Interactive storytelling</li>
                </ul>
                <Link to="/cs/scratch1B" className="btn btn-warning text-white">Start Teaching</Link>
              </div>
            </div>
          </div>
          {/* Scratch 2A */}
          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(255,193,7,0.10)', color: '#fd7e14' }}>
                    <i className="fas fa-puzzle-piece fa-2x"></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Scratch 2A</h4>
                    <span className="badge text-dark" style={{background: '#fd7e14'}}>Beginner Friendly</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Learn programming fundamentals through visual block-based coding. Create games, animations, and interactive stories while developing computational thinking skills.
                </p>
                <ul className="list-unstyled mb-4">
                  <li><i className="fas fa-check text-success me-2"></i>24 comprehensive lessons</li>
                  <li><i className="fas fa-check text-success me-2"></i>Visual programming concepts</li>
                  <li><i className="fas fa-check text-success me-2"></i>Game development projects</li>
                  <li><i className="fas fa-check text-success me-2"></i>Interactive storytelling</li>
                </ul>
                <Link to="/cs/scratch2A" className="btn text-white" style={{background: '#fd7e14'}}>Start Teaching</Link>
              </div>
            </div>
          </div>
          {/* Scratch 2B */}
          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded me-3" style={{ background: 'rgba(255,193,7,0.10)', color: '#fd7e14' }}>
                    <i className="fas fa-puzzle-piece fa-2x"></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Scratch 2B</h4>
                    <span className="badge text-dark" style={{background: '#fd7e14'}}>Beginner Friendly</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Learn programming fundamentals through visual block-based coding. Create games, animations, and interactive stories while developing computational thinking skills.
                </p>
                <ul className="list-unstyled mb-4">
                  <li><i className="fas fa-check text-success me-2"></i>24 comprehensive lessons</li>
                  <li><i className="fas fa-check text-success me-2"></i>Visual programming concepts</li>
                  <li><i className="fas fa-check text-success me-2"></i>Game development projects</li>
                  <li><i className="fas fa-check text-success me-2"></i>Interactive storytelling</li>
                </ul>
                <Link to="/cs/scratch2B" className="btn text-white" style={{background: '#fd7e14'}}>Start Teaching</Link>
              </div>
            </div>
          </div>
          {/* Python 1A */}
          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded me-3">
                    <i className="fab fa-python fa-2x text-primary"></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Python 1A</h4>
                    <span className="badge bg-primary">Intermediate</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Dive into text-based programming with Python. Learn syntax, data structures, and problem-solving techniques through engaging projects.
                </p>
                <ul className="list-unstyled mb-4">
                  <li><i className="fas fa-check text-success me-2"></i>24 structured lessons</li>
                  <li><i className="fas fa-check text-success me-2"></i>Python fundamentals</li>
                  <li><i className="fas fa-check text-success me-2"></i>Data structures & algorithms</li>
                  <li><i className="fas fa-check text-success me-2"></i>Real-world applications</li>
                </ul>
                <Link to="/cs/python1A" className="btn btn-primary">Start Teaching</Link>
              </div>
            </div>
          </div>
          {/* Python 1B */}
          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded me-3">
                    <i className="fab fa-python fa-2x text-primary"></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Python 1B</h4>
                    <span className="badge bg-primary">Intermediate</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Dive into text-based programming with Python. Learn syntax, data structures, and problem-solving techniques through engaging projects.
                </p>
                <ul className="list-unstyled mb-4">
                  <li><i className="fas fa-check text-success me-2"></i>24 structured lessons</li>
                  <li><i className="fas fa-check text-success me-2"></i>Python fundamentals</li>
                  <li><i className="fas fa-check text-success me-2"></i>Data structures & algorithms</li>
                  <li><i className="fas fa-check text-success me-2"></i>Real-world applications</li>
                </ul>
                <Link to="/cs/python1B" className="btn btn-primary">Start Teaching</Link>
              </div>
            </div>
          </div>
          {/* Python 2A */}
          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-success bg-opacity-10 p-3 rounded me-3">
                    <i className="fab fa-python fa-2x text-success"></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Python 2A</h4>
                    <span className="badge bg-success">Advanced</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Advanced Python programming concepts including object-oriented programming, file handling, and complex data manipulation.
                </p>
                <ul className="list-unstyled mb-4">
                  <li><i className="fas fa-check text-success me-2"></i>17 advanced lessons</li>
                  <li><i className="fas fa-check text-success me-2"></i>Object-oriented programming</li>
                  <li><i className="fas fa-check text-success me-2"></i>File I/O & data processing</li>
                  <li><i className="fas fa-check text-success me-2"></i>Advanced algorithms</li>
                </ul>
                <Link to="/cs/python2A" className="btn btn-success">Start Teaching</Link>
              </div>
            </div>
          </div>
          {/* Python 2B */}
          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-success bg-opacity-10 p-3 rounded me-3">
                    <i className="fab fa-python fa-2x text-success"></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Python 2B</h4>
                    <span className="badge bg-success">Advanced</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Advanced Python programming concepts including object-oriented programming, file handling, and complex data manipulation.
                </p>
                <ul className="list-unstyled mb-4">
                  <li><i className="fas fa-check text-success me-2"></i>17 advanced lessons</li>
                  <li><i className="fas fa-check text-success me-2"></i>Object-oriented programming</li>
                  <li><i className="fas fa-check text-success me-2"></i>File I/O & data processing</li>
                  <li><i className="fas fa-check text-success me-2"></i>Advanced algorithms</li>
                </ul>
                <Link to="/cs/python2B" className="btn btn-success">Start Teaching</Link>
              </div>
            </div>
          </div>
          {/* Web Development */}
          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded me-3">
                    <i className="fas fa-globe fa-2x text-primary"></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Web Development</h4>
                    <span className="badge bg-primary">Modern Web</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Learn to build modern websites using HTML, CSS, and JavaScript. Create responsive designs and interactive web applications.
                </p>
                <ul className="list-unstyled mb-4">
                  <li><i className="fas fa-check text-success me-2"></i>HTML & CSS fundamentals</li>
                  <li><i className="fas fa-check text-success me-2"></i>JavaScript programming</li>
                  <li><i className="fas fa-check text-success me-2"></i>Responsive design</li>
                  <li><i className="fas fa-check text-success me-2"></i>Web applications</li>
                </ul>
                <Link to="/cs/webdev" className="btn btn-primary">Start Teaching</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path Section */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="row text-center mb-4">
            <div className="col-12">
              <h2 className="fw-bold">Recommended Learning Path</h2>
              <p className="lead text-muted">Follow this progression to build your programming skills</p>
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            {/* Scratch I */}
            <div className="col-md-2 text-center">
              <div className="bg-warning bg-opacity-10 p-4 rounded-circle d-inline-block mb-3">
                <i className="fas fa-puzzle-piece fa-2x text-warning"></i>
              </div>
              <h5>1. Scratch I</h5>
              <p className="text-muted mb-1">Scratch 1A</p>
              <p className="text-muted mb-1">Scratch 1B</p>
            </div>
            <div className="col-md-1 text-center">
              <i className="fas fa-arrow-right fa-2x text-muted"></i>
            </div>
            {/* Scratch II */}
            <div className="col-md-2 text-center">
              <div className="bg-opacity-10 p-4 rounded-circle d-inline-block mb-3" style={{ backgroundColor: 'rgba(253, 126, 20, 0.1)', color: '#fd7e14' }}>
                <i className="fas fa-puzzle-piece fa-2x"></i>
              </div>
              <h5>2. Scratch II</h5>
              <p className="text-muted mb-1">Scratch 2A</p>
              <p className="text-muted mb-1">Scratch 2B</p>
            </div>
            <div className="col-md-1 text-center">
              <i className="fas fa-arrow-right fa-2x text-muted"></i>
            </div>
            {/* Python I */}
            <div className="col-md-2 text-center">
              <div className="bg-primary bg-opacity-10 p-4 rounded-circle d-inline-block mb-3">
                <i className="fab fa-python fa-2x text-primary"></i>
              </div>
              <h5>3. Python I</h5>
              <p className="text-muted mb-1">Python 1A</p>
              <p className="text-muted mb-1">Python 1B</p>
            </div>
            <div className="col-md-1 text-center">
              <i className="fas fa-arrow-right fa-2x text-muted"></i>
            </div>
            {/* Python II */}
            <div className="col-md-2 text-center">
              <div className="bg-success bg-opacity-10 p-4 rounded-circle d-inline-block mb-3">
                <i className="fab fa-python fa-2x text-success"></i>
              </div>
              <h5>4. Python II</h5>
              <p className="text-muted mb-1">Python 2A</p>
              <p className="text-muted mb-1">Python 2B</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authenticated = localStorage.getItem('gbstem_authenticated') === 'true';
    setIsAuthenticated(authenticated);
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading gbSTEM Curriculum...</p>
        </div>
      </div>
    );
  }

  // Show login modal if not authenticated
  if (!isAuthenticated) {
    return <LoginModal show={true} onLogin={handleLogin} />;
  }

  return (
    <HashRouter>
      <Navbar variant="dark" expand="lg" style={{ backgroundColor: '#1D2256' }}>
        <Navbar.Brand as={Link} to="/" className="ms-5" style={{ fontWeight: 700 }}>
          <img
            alt=""
            src={penguin}
            width="200"
            className="d-inline-block align-center"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto align-items-center">
            {/* CS Dropdown */}
            <NavDropdown title="CS" id="cs-dropdown" className="text-center">
              <NavDropdown.Item as={Link} to="/cs/python1A" className="text-center text-lg-start">Python 1A</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cs/python1B" className="text-center text-lg-start">Python 1B</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cs/python2A" className="text-center text-lg-start">Python 2A</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cs/python2B" className="text-center text-lg-start">Python 2B</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cs/scratch1A" className="text-center text-lg-start">Scratch 1A</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cs/scratch1B" className="text-center text-lg-start">Scratch 1B</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cs/scratch2A" className="text-center text-lg-start">Scratch 2A</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cs/scratch2B" className="text-center text-lg-start">Scratch 2B</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cs/python1" className="text-center text-lg-start">Python I</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cs/python2" className="text-center text-lg-start">Python II</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cs/scratch" className="text-center text-lg-start">Scratch</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cs/webdev" className="text-center text-lg-start">Web Development</NavDropdown.Item>
            </NavDropdown>
            {/* Math Dropdown */}
            <NavDropdown title="Math" id="math-dropdown" className="text-center">
              <NavDropdown.Item as={Link} to="/math/math1A" className="text-center text-lg-start">Math 1A</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/math/math1B" className="text-center text-lg-start">Math 1B</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/math/math2A" className="text-center text-lg-start">Math 2A</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/math/math2B" className="text-center text-lg-start">Math 2B</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/math/math3A" className="text-center text-lg-start">Math 3A</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/math/math3B" className="text-center text-lg-start">Math 3B</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/math/math4A" className="text-center text-lg-start">Math 4A</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/math/math4B" className="text-center text-lg-start">Math 4B</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/math/math5A" className="text-center text-lg-start">Math 5A</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/math/math5B" className="text-center text-lg-start">Math 5B</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/math/math1" className="text-center text-lg-start">Math I</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/math/math2" className="text-center text-lg-start">Math II</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/math/math3" className="text-center text-lg-start">Math III</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/math/math4" className="text-center text-lg-start">Math IV</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/math/math5" className="text-center text-lg-start">Math V</NavDropdown.Item>
            </NavDropdown>
            {/* Engineering Dropdown */}
            <NavDropdown title="Engineering" id="engineering-dropdown" className="text-center">
              <NavDropdown.Item as={Link} to="/engineering/engineering1A" className="text-center text-lg-start">Engineering 1A</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/engineering/engineering1B" className="text-center text-lg-start">Engineering 1B</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/engineering/engineering2A" className="text-center text-lg-start">Engineering 2A</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/engineering/engineering2B" className="text-center text-lg-start">Engineering 2B</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/engineering/engineering3A" className="text-center text-lg-start">Engineering 3A</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/engineering/engineering3B" className="text-center text-lg-start">Engineering 3B</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/engineering/engineering1" className="text-center text-lg-start">Engineering I</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/engineering/engineering2" className="text-center text-lg-start">Engineering II</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/engineering/engineering3" className="text-center text-lg-start">Engineering III</NavDropdown.Item>
            </NavDropdown>
            {/* Science Dropdown */}
            <NavDropdown title="Science" id="science-dropdown" className="text-center">
              <NavDropdown.Item as={Link} to="/science/environmental" className="text-center text-lg-start">Environmental Science</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/science/physics" className="text-center text-lg-start">Physics</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/science/environmentalA" className = "text-center text-lg-start">Environmental Science A</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/science/physicsA" className = "text-center text-lg-start">Physics A</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/science/environmentalB" className = "text-center text-lg-start">Environmental Science B</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/science/physicsB" className = "text-center text-lg-start">Physics B</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link 
              onClick={() => {
                localStorage.removeItem('gbstem_authenticated');
                setIsAuthenticated(false);
              }}
              className="text-white"
            >
              <i className="fas fa-sign-out-alt me-1"></i>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/math" element={<Math />} />
        <Route path="/science" element={<Science />} />
        <Route path="/cs" element={<CS />} />
        <Route path="/engineering" element={<Engineering />} />
        
        {/* CS Curriculum routes */}
        <Route path="/cs/python1A" element={<FirebaseCurriculum course="python1A" courseTitle="Python 1A" />} />
        <Route path="/cs/python1B" element={<FirebaseCurriculum course="python1B" courseTitle="Python 1B" />} />
        <Route path="/cs/python2A" element={<FirebaseCurriculum course="python2A" courseTitle="Python 2A" />} />
        <Route path="/cs/python2B" element={<FirebaseCurriculum course="python2B" courseTitle="Python 2B" />} />
        <Route path="/cs/scratch1A" element={<FirebaseCurriculum course="scratch1A" courseTitle="Scratch 1A" />} />
        <Route path="/cs/scratch1B" element={<FirebaseCurriculum course="scratch1B" courseTitle="Scratch 1B" />} />
        <Route path="/cs/webdev" element={<FirebaseCurriculum course="webdev" courseTitle="Web Development" />} />
        <Route path="/cs/python1" element={<FirebaseCurriculum course="python1" courseTitle="Python I" />} />
        <Route path="/cs/python2" element={<FirebaseCurriculum course="python2" courseTitle="Python II" />} />
        <Route path="/cs/scratch" element={<FirebaseCurriculum course="scratch" courseTitle="Scratch" />} />

        <Route path="/cs/:course/lesson/:lessonNumber" element={<LessonPage useFirebase={true} />} />
        
        {/* Math Curriculum routes */}
        <Route path="/math/math1A" element={<FirebaseCurriculum course="math1A" courseTitle="Math 1A" backToCourses="/math" />} />
        <Route path="/math/math1B" element={<FirebaseCurriculum course="math1B" courseTitle="Math 1B" backToCourses="/math" />} />
        <Route path="/math/math2A" element={<FirebaseCurriculum course="math2A" courseTitle="Math 2A" backToCourses="/math" />} />
        <Route path="/math/math2B" element={<FirebaseCurriculum course="math2B" courseTitle="Math 2B" backToCourses="/math" />} />
        <Route path="/math/math3A" element={<FirebaseCurriculum course="math3A" courseTitle="Math 3A" backToCourses="/math" />} />
        <Route path="/math/math3B" element={<FirebaseCurriculum course="math3B" courseTitle="Math 3B" backToCourses="/math" />} />
        <Route path="/math/math4A" element={<FirebaseCurriculum course="math4A" courseTitle="Math 4A" backToCourses="/math" />} />
        <Route path="/math/math4B" element={<FirebaseCurriculum course="math4B" courseTitle="Math 4B" backToCourses="/math" />} />
        <Route path="/math/math5A" element={<FirebaseCurriculum course="math5A" courseTitle="Math 5A" backToCourses="/math" />} />
        <Route path="/math/math5B" element={<FirebaseCurriculum course="math5B" courseTitle="Math 5B" backToCourses="/math" />} />
        <Route path="/math/math1" element={<FirebaseCurriculum course="math1" courseTitle="Math I" backToCourses="/math" />} />
        <Route path="/math/math2" element={<FirebaseCurriculum course="math2" courseTitle="Math II" backToCourses="/math" />} />
        <Route path="/math/math3" element={<FirebaseCurriculum course="math3" courseTitle="Math III" backToCourses="/math" />} />
        <Route path="/math/math4" element={<FirebaseCurriculum course="math4" courseTitle="Math IV" backToCourses="/math" />} />
        <Route path="/math/math5" element={<FirebaseCurriculum course="math5" courseTitle="Math V" backToCourses="/math" />} />

        
        <Route path="/math/:course/lesson/:lessonNumber" element={<LessonPage useFirebase={true} />} />
        
        {/* Engineering Curriculum routes */}
        <Route path="/engineering/engineering1" element={<FirebaseCurriculum course="engineering1" courseTitle="Engineering I" backToCourses="/engineering" />} />
        <Route path="/engineering/engineering2" element={<FirebaseCurriculum course="engineering2" courseTitle="Engineering II" backToCourses="/engineering" />} />
        <Route path="/engineering/engineering3" element={<FirebaseCurriculum course="engineering3" courseTitle="Engineering III" backToCourses="/engineering" />} />
        <Route path="/engineering/engineering1A" element={<FirebaseCurriculum course="engineering1A" courseTitle="Engineering 1A" backToCourses="/engineering" />} />
        <Route path="/engineering/engineering1B" element={<FirebaseCurriculum course="engineering1B" courseTitle="Engineering 1B" backToCourses="/engineering" />} />
        <Route path="/engineering/engineering2A" element={<FirebaseCurriculum course="engineering2A" courseTitle="Engineering 2A" backToCourses="/engineering" />} />
        <Route path="/engineering/engineering2B" element={<FirebaseCurriculum course="engineering2B" courseTitle="Engineering 2B" backToCourses="/engineering" />} />
        <Route path="/engineering/engineering3A" element={<FirebaseCurriculum course="engineering3A" courseTitle="Engineering 3A" backToCourses="/engineering" />} />
        <Route path="/engineering/engineering3B" element={<FirebaseCurriculum course="engineering3B" courseTitle="Engineering 3B" backToCourses="/engineering" />} />
        <Route path="/engineering/:course/lesson/:lessonNumber" element={<LessonPage useFirebase={true} />} />
        
        {/* Science Curriculum routes */}
        <Route path="/science/environmental" element={<FirebaseCurriculum course="environmental" courseTitle="Environmental Science" backToCourses="/science" />} />
        <Route path="/science/physics" element={<FirebaseCurriculum course="physics" courseTitle="Physics" backToCourses="/science" />} />
        <Route path="/science/environmentalA" element={<FirebaseCurriculum course="environmentalA" courseTitle="Environmental Science A" backToCourses="/science" />} />
        <Route path="/science/physicsA" element={<FirebaseCurriculum course="physicsA" courseTitle="Physics A" backToCourses="/science" />} />
        <Route path="/science/environmentalB" element={<FirebaseCurriculum course="environmentalB" courseTitle="Environmental Science B" backToCourses="/science" />} />
        <Route path="/science/physicsB" element={<FirebaseCurriculum course="physicsB" courseTitle="Physics B" backToCourses="/science" />} />
        <Route path="/science/:course/lesson/:lessonNumber" element={<LessonPage useFirebase={true} />} />
        
        {/* Static curriculum files are kept in the file system for reference but not used in the app */}
      </Routes>
    </HashRouter >
  );
}

export default App;

