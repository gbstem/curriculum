import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { HashRouter } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Modal } from 'react-bootstrap';
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
function CS() {
  return (
    <div className="container mt-5">
      <h1>Computer Science Curriculum</h1>
      <ul>
        <li><a href="/#/cs/scratch1">View the Scratch Curriculum</a></li>
        <li><a href="/#/cs/scratch2">View the Scratch II Curriculum</a></li>
        <li><a href="/#/cs/python1">View the Python I Curriculum</a></li>
        <li><a href="/#/cs/python2">View the Python II Curriculum</a></li>
        <li><a href="/#/cs/webdev">View the Web Development Curriculum</a></li>
      </ul>
    </div>
  );
}
// Main site homepage
function Home() {
  return (
    <div className="container mt-5">
      <h1>Welcome to gbSTEM Curriculum</h1>
      <p>Select a track to explore:</p>
      <ul>
        <li><a href="/#/math">Math</a></li>
        <li><a href="/#/science">Science</a></li>
        <li><a href="/#/cs">Computer Science</a></li>
        <li><a href="/#/engineering">Engineering</a></li>
      </ul>
    </div>
  );
}

function App() {
  const [show, setShow] = useState(false);
  
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
      </Routes>
    </HashRouter >
  );
}

export default App;
