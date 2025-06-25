import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { HashRouter } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles.css'
import penguin from './penguin.png'

// Import Python 1 Curriculum components
import Python1Curriculum from './CS/Python1/curriculum';
import Lesson1 from './CS/Python1/lesson1';
import Lesson2 from './CS/Python1/lesson2';
import Lesson3 from './CS/Python1/lesson3';
import Lesson4 from './CS/Python1/lesson4';
import Lesson5 from './CS/Python1/lesson5';
import Lesson6 from './CS/Python1/lesson6';
import Lesson7 from './CS/Python1/lesson7';
import Lesson8 from './CS/Python1/lesson8';
import Lesson9 from './CS/Python1/lesson9';
import Lesson10 from './CS/Python1/lesson10';
import Lesson11 from './CS/Python1/lesson11';
import Lesson12 from './CS/Python1/lesson12';
import Lesson13 from './CS/Python1/lesson13';
import Lesson14 from './CS/Python1/lesson14';
import Lesson15 from './CS/Python1/lesson15';
import Lesson16 from './CS/Python1/lesson16';
import Lesson17 from './CS/Python1/lesson17';
import Lesson18 from './CS/Python1/lesson18';
import Lesson19 from './CS/Python1/lesson19';
import Lesson20 from './CS/Python1/lesson20';
import Lesson21 from './CS/Python1/lesson21';
import Lesson22 from './CS/Python1/lesson22';
import Lesson23 from './CS/Python1/lesson23';
import Lesson24 from './CS/Python1/lesson24';

// Import Python 2 Curriculum components
import Python2Curriculum from './CS/Python2/curriculum';
import Python2Lesson1 from './CS/Python2/lesson1';
import Python2Lesson2 from './CS/Python2/lesson2';
import Python2Lesson3 from './CS/Python2/lesson3';
import Python2Lesson4 from './CS/Python2/lesson4';
import Python2Lesson5 from './CS/Python2/lesson5';
import Python2Lesson6 from './CS/Python2/lesson6';
import Python2Lesson7 from './CS/Python2/lesson7';
import Python2Lesson8 from './CS/Python2/lesson8';
import Python2Lesson9 from './CS/Python2/lesson9';
import Python2Lesson10 from './CS/Python2/lesson10';
import Python2Lesson11 from './CS/Python2/lesson11';
import Python2Lesson12 from './CS/Python2/lesson12';
import Python2Lesson13 from './CS/Python2/lesson13';
import Python2Lesson14 from './CS/Python2/lesson14';
import Python2Lesson15 from './CS/Python2/lesson15';
import Python2Lesson16 from './CS/Python2/lesson16';
import Python2Lesson17 from './CS/Python2/lesson17';

// Import Scratch Curriculum component
import ScratchCurriculum from './CS/Scratch/curriculum';
import ScratchLesson1 from './CS/Scratch/lesson1';
import ScratchLesson2 from './CS/Scratch/lesson2';
import ScratchLesson3 from './CS/Scratch/lesson3';
import ScratchLesson4 from './CS/Scratch/lesson4';
import ScratchLesson5 from './CS/Scratch/lesson5';
import ScratchLesson6 from './CS/Scratch/lesson6';
import ScratchLesson7 from './CS/Scratch/lesson7';
import ScratchLesson8 from './CS/Scratch/lesson8';
import ScratchLesson9 from './CS/Scratch/lesson9';
import ScratchLesson10 from './CS/Scratch/lesson10';
import ScratchLesson11 from './CS/Scratch/lesson11';
import ScratchLesson12 from './CS/Scratch/lesson12';
import ScratchLesson13 from './CS/Scratch/lesson13';
import ScratchLesson14 from './CS/Scratch/lesson14';
import ScratchLesson15 from './CS/Scratch/lesson15';
import ScratchLesson16 from './CS/Scratch/lesson16';
import ScratchLesson17 from './CS/Scratch/lesson17';
import ScratchLesson18 from './CS/Scratch/lesson18';
import ScratchLesson19 from './CS/Scratch/lesson19';
import ScratchLesson20 from './CS/Scratch/lesson20';
import ScratchLesson21 from './CS/Scratch/lesson21';
import ScratchLesson22 from './CS/Scratch/lesson22';
import ScratchLesson23 from './CS/Scratch/lesson23';
import ScratchLesson24 from './CS/Scratch/lesson24';

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
    <div className="container mt-5">
      <h1>Math Curriculum</h1>
      <ul>
        <li><a href="/#/math/2a">View the Mathematics 2a Curriculum</a></li>
        <li><a href="/#/math/3a">View the Mathematics 3a Curriculum</a></li>
        <li><a href="/#/math/4a">View the Mathematics 4a Curriculum</a></li>
        <li><a href="/#/math/5a">View the Mathematics 5a Curriculum</a></li>
      </ul>
    </div>
  );
}
function Science() {
  return (
    <div className="container mt-5">
      <h1>Science Curriculum</h1>
      <ul>
        <li><a href="/#/science/environmental">View the Environmental Science Curriculum</a></li>
        <li><a href="/#/science/physics">View the Physics Curriculum</a></li>
      </ul>
    </div>
  );
}
function Engineering() {
  return (
    <div className="container mt-5">
      <h1>Engineering Curriculum</h1>
      <ul>
        <li><a href="/#/engineering/1">View the Engineering I Curriculum</a></li>
        <li><a href="/#/engineering/2">View the Engineering II Curriculum</a></li>
        <li><a href="/#/engineering/3">View the Engineering III Curriculum</a></li>
      </ul>
    </div>
  );
}

// Main site homepage
function Home() {
  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div className="bg-primary text-white py-5" style={{ backgroundColor: '#1D2256' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">Welcome to gbSTEM Curriculum</h1>
              <p className="mb-4">Choose a track below to begin your teaching journey!</p>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src={penguin}
                alt="gbSTEM Logo"
                className="img-fluid"
                style={{ maxWidth: '300px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tracks Section */}
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <i className="fas fa-laptop-code fa-3x text-primary"></i>
                </div>
                <h5 className="card-title fw-bold">Computer Science</h5>
                <p className="card-text text-muted">Learn programming with Python and Scratch, build games, and create interactive projects.</p>
                <a href="/#/cs" className="btn btn-primary">Explore CS</a>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <i className="fas fa-calculator fa-3x text-success"></i>
                </div>
                <h5 className="card-title fw-bold">Mathematics</h5>
                <p className="card-text text-muted">Teach mathematical concepts through interactive lessons and real-world applications.</p>
                <a href="/#/math" className="btn btn-success">Explore Math</a>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <i className="fas fa-flask fa-3x text-info"></i>
                </div>
                <h5 className="card-title fw-bold">Science</h5>
                <p className="card-text text-muted">Discover physics, environmental science, and conduct virtual experiments.</p>
                <a href="/#/science" className="btn btn-info text-white">Explore Science</a>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <i className="fas fa-cogs fa-3x text-warning"></i>
                </div>
                <h5 className="card-title fw-bold">Engineering</h5>
                <p className="card-text text-muted">Design, build, and test solutions to real-world engineering challenges.</p>
                <a href="/#/engineering" className="btn btn-warning text-white">Explore Engineering</a>
              </div>
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
          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-warning bg-opacity-10 p-3 rounded me-3">
                    <i className="fas fa-puzzle-piece fa-2x text-warning"></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Scratch Programming</h4>
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
                <a href="/#/cs/scratch" className="btn btn-warning text-white">Start Teaching</a>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded me-3">
                    <i className="fab fa-python fa-2x text-primary"></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Python I</h4>
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
                <a href="/#/cs/python1" className="btn btn-primary">Start Teaching</a>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-success bg-opacity-10 p-3 rounded me-3">
                    <i className="fab fa-python fa-2x text-success"></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Python II</h4>
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
                <a href="/#/cs/python2" className="btn btn-success">Start Teaching</a>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-info bg-opacity-10 p-3 rounded me-3">
                    <i className="fas fa-globe fa-2x text-info"></i>
                  </div>
                  <div>
                    <h4 className="card-title fw-bold mb-1">Web Development</h4>
                    <span className="badge bg-info">Coming Soon</span>
                  </div>
                </div>
                <p className="card-text text-muted mb-3">
                  Learn to build modern websites using HTML, CSS, and JavaScript. Create responsive designs and interactive web applications.
                </p>
                <ul className="list-unstyled mb-4">
                  <li><i className="fas fa-clock text-muted me-2"></i>HTML & CSS fundamentals</li>
                  <li><i className="fas fa-clock text-muted me-2"></i>JavaScript programming</li>
                  <li><i className="fas fa-clock text-muted me-2"></i>Responsive design</li>
                  <li><i className="fas fa-clock text-muted me-2"></i>Web applications</li>
                </ul>
                <button className="btn btn-secondary" disabled>Coming Soon</button>
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
          <div className="row align-items-center">
            <div className="col-md-3 text-center">
              <div className="bg-warning bg-opacity-10 p-4 rounded-circle d-inline-block mb-3">
                <i className="fas fa-puzzle-piece fa-2x text-warning"></i>
              </div>
              <h5>1. Scratch</h5>
              <p className="text-muted">Learn programming concepts visually</p>
            </div>
            <div className="col-md-1 text-center">
              <i className="fas fa-arrow-right fa-2x text-muted"></i>
            </div>
            <div className="col-md-3 text-center">
              <div className="bg-primary bg-opacity-10 p-4 rounded-circle d-inline-block mb-3">
                <i className="fab fa-python fa-2x text-primary"></i>
              </div>
              <h5>2. Python I</h5>
              <p className="text-muted">Learn text-based programming</p>
            </div>
            <div className="col-md-1 text-center">
              <i className="fas fa-arrow-right fa-2x text-muted"></i>
            </div>
            <div className="col-md-3 text-center">
              <div className="bg-success bg-opacity-10 p-4 rounded-circle d-inline-block mb-3">
                <i className="fab fa-python fa-2x text-success"></i>
              </div>
              <h5>3. Python II</h5>
              <p className="text-muted">Advanced programming concepts</p>
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
              <NavDropdown.Item as={Link} to="/cs/python1" className="text-center text-lg-start">Python 1</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cs/python2" className="text-center text-lg-start">Python 2</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cs/scratch" className="text-center text-lg-start">Scratch</NavDropdown.Item>
            </NavDropdown>
            {/* Math Dropdown */}
            <NavDropdown title="Math" id="math-dropdown" className="text-center">
              <NavDropdown.Item disabled>Coming Soon</NavDropdown.Item>
            </NavDropdown>
            {/* Engineering Dropdown */}
            <NavDropdown title="Engineering" id="engineering-dropdown" className="text-center">
              <NavDropdown.Item disabled>Coming Soon</NavDropdown.Item>
            </NavDropdown>
            {/* Science Dropdown */}
            <NavDropdown title="Science" id="science-dropdown" className="text-center">
              <NavDropdown.Item disabled>Coming Soon</NavDropdown.Item>
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
        <Route path="/cs/python1/" element={<Python1Curriculum />} />
        <Route path="/cs/python1/lesson1" element={<Lesson1 />} />
        <Route path="/cs/python1/lesson2" element={<Lesson2 />} />
        <Route path="/cs/python1/lesson3" element={<Lesson3 />} />
        <Route path="/cs/python1/lesson4" element={<Lesson4 />} />
        <Route path="/cs/python1/lesson5" element={<Lesson5 />} />
        <Route path="/cs/python1/lesson6" element={<Lesson6 />} />
        <Route path="/cs/python1/lesson7" element={<Lesson7 />} />
        <Route path="/cs/python1/lesson8" element={<Lesson8 />} />
        <Route path="/cs/python1/lesson9" element={<Lesson9 />} />
        <Route path="/cs/python1/lesson10" element={<Lesson10 />} />
        <Route path="/cs/python1/lesson11" element={<Lesson11 />} />
        <Route path="/cs/python1/lesson12" element={<Lesson12 />} />
        <Route path="/cs/python1/lesson13" element={<Lesson13 />} />
        <Route path="/cs/python1/lesson14" element={<Lesson14 />} />
        <Route path="/cs/python1/lesson15" element={<Lesson15 />} />
        <Route path="/cs/python1/lesson16" element={<Lesson16 />} />
        <Route path="/cs/python1/lesson17" element={<Lesson17 />} />
        <Route path="/cs/python1/lesson18" element={<Lesson18 />} />
        <Route path="/cs/python1/lesson19" element={<Lesson19 />} />
        <Route path="/cs/python1/lesson20" element={<Lesson20 />} />
        <Route path="/cs/python1/lesson21" element={<Lesson21 />} />
        <Route path="/cs/python1/lesson22" element={<Lesson22 />} />
        <Route path="/cs/python1/lesson23" element={<Lesson23 />} />
        <Route path="/cs/python1/lesson24" element={<Lesson24 />} />
        <Route path="/cs/python2" element={<Python2Curriculum />} />
        <Route path="/cs/python2/lesson1" element={<Python2Lesson1 />} />
        <Route path="/cs/python2/lesson2" element={<Python2Lesson2 />} />
        <Route path="/cs/python2/lesson3" element={<Python2Lesson3 />} />
        <Route path="/cs/python2/lesson4" element={<Python2Lesson4 />} />
        <Route path="/cs/python2/lesson5" element={<Python2Lesson5 />} />
        <Route path="/cs/python2/lesson6" element={<Python2Lesson6 />} />
        <Route path="/cs/python2/lesson7" element={<Python2Lesson7 />} />
        <Route path="/cs/python2/lesson8" element={<Python2Lesson8 />} />
        <Route path="/cs/python2/lesson9" element={<Python2Lesson9 />} />
        <Route path="/cs/python2/lesson10" element={<Python2Lesson10 />} />
        <Route path="/cs/python2/lesson11" element={<Python2Lesson11 />} />
        <Route path="/cs/python2/lesson12" element={<Python2Lesson12 />} />
        <Route path="/cs/python2/lesson13" element={<Python2Lesson13 />} />
        <Route path="/cs/python2/lesson14" element={<Python2Lesson14 />} />
        <Route path="/cs/python2/lesson15" element={<Python2Lesson15 />} />
        <Route path="/cs/python2/lesson16" element={<Python2Lesson16 />} />
        <Route path="/cs/python2/lesson17" element={<Python2Lesson17 />} />
        <Route path="/cs/scratch" element={<ScratchCurriculum />} />
        <Route path="/cs/scratch/lesson1" element={<ScratchLesson1 />} />
        <Route path="/cs/scratch/lesson2" element={<ScratchLesson2 />} />
        <Route path="/cs/scratch/lesson3" element={<ScratchLesson3 />} />
        <Route path="/cs/scratch/lesson4" element={<ScratchLesson4 />} />
        <Route path="/cs/scratch/lesson5" element={<ScratchLesson5 />} />
        <Route path="/cs/scratch/lesson6" element={<ScratchLesson6 />} />
        <Route path="/cs/scratch/lesson7" element={<ScratchLesson7 />} />
        <Route path="/cs/scratch/lesson8" element={<ScratchLesson8 />} />
        <Route path="/cs/scratch/lesson9" element={<ScratchLesson9 />} />
        <Route path="/cs/scratch/lesson10" element={<ScratchLesson10 />} />
        <Route path="/cs/scratch/lesson11" element={<ScratchLesson11 />} />
        <Route path="/cs/scratch/lesson12" element={<ScratchLesson12 />} />
        <Route path="/cs/scratch/lesson13" element={<ScratchLesson13 />} />
        <Route path="/cs/scratch/lesson14" element={<ScratchLesson14 />} />
        <Route path="/cs/scratch/lesson15" element={<ScratchLesson15 />} />
        <Route path="/cs/scratch/lesson16" element={<ScratchLesson16 />} />
        <Route path="/cs/scratch/lesson17" element={<ScratchLesson17 />} />
        <Route path="/cs/scratch/lesson18" element={<ScratchLesson18 />} />
        <Route path="/cs/scratch/lesson19" element={<ScratchLesson19 />} />
        <Route path="/cs/scratch/lesson20" element={<ScratchLesson20 />} />
        <Route path="/cs/scratch/lesson21" element={<ScratchLesson21 />} />
        <Route path="/cs/scratch/lesson22" element={<ScratchLesson22 />} />
        <Route path="/cs/scratch/lesson23" element={<ScratchLesson23 />} />
        <Route path="/cs/scratch/lesson24" element={<ScratchLesson24 />} />
      </Routes>
    </HashRouter >
  );
}

export default App;

