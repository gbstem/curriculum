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
        
        {/* Curriculum routes */}
        <Route path="/cs/python1" element={<FirebaseCurriculum course="python1" courseTitle="Python 1" />} />
        <Route path="/cs/python2" element={<FirebaseCurriculum course="python2" courseTitle="Python 2" />} />
        <Route path="/cs/scratch" element={<FirebaseCurriculum course="scratch" courseTitle="Scratch" />} />
        <Route path="/cs/:course/lesson/:lessonNumber" element={<LessonPage useFirebase={true} />} />
        
        {/* Static curriculum files are kept in the file system for reference but not used in the app */}
      </Routes>
    </HashRouter >
  );
}

export default App;

