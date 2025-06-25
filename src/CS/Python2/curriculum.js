import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const modules = [
  {
    id: 1,
    title: 'Introduction/Review',
    description: 'Review Python basics, CodeSandbox, and foundational concepts.',
    lessons: [
      { id: 1, title: 'CodeSandbox & Python Review', path: '/cs/python2/lesson1' },
      { id: 2, title: 'Fun with Functions', path: '/cs/python2/lesson2' },
      { id: 3, title: 'Logic Review', path: '/cs/python2/lesson3' },
      { id: 4, title: 'Loop Review', path: '/cs/python2/lesson4' },
      { id: 5, title: 'Dictionary Review', path: '/cs/python2/lesson5' },
    ]
  },
  {
    id: 2,
    title: 'Object-Oriented Programming',
    description: 'Learn about classes, objects, and OOP principles.',
    lessons: [
      { id: 6, title: 'Intro to Classes & Objects', path: '/cs/python2/lesson6' },
    ]
  },
  {
    id: 3,
    title: 'Algorithms',
    description: 'Explore algorithms, recursion, binary search, and greedy algorithms.',
    lessons: [
      { id: 7, title: 'What are Algorithms?', path: '/cs/python2/lesson7' },
      { id: 8, title: 'Recursion', path: '/cs/python2/lesson8' },
      { id: 9, title: 'Binary Search', path: '/cs/python2/lesson9' },
      { id: 10, title: 'Greedy Algorithms', path: '/cs/python2/lesson10' },
    ]
  },
  {
    id: 4,
    title: 'Introduction to Data Science',
    description: 'Work with data and machine learning using TensorFlow and Colab.',
    lessons: [
      { id: 11, title: 'What is Machine Learning?', path: '/cs/python2/lesson11' },
      { id: 12, title: 'Google Colab & Getting Data', path: '/cs/python2/lesson12' },
      { id: 13, title: 'Key Concepts & Understanding Data', path: '/cs/python2/lesson13' },
      { id: 14, title: 'Modeling', path: '/cs/python2/lesson14' },
      { id: 15, title: 'Improving a Model', path: '/cs/python2/lesson15' },
      { id: 16, title: 'Evaluating Models & AI Applications', path: '/cs/python2/lesson16' },
    ]
  },
  {
    id: 5,
    title: 'Final Project',
    description: 'Research and build a project using advanced Python topics.',
    lessons: [
      { id: 17, title: 'Final Project: Research & Build', path: '/cs/python2/lesson17' },
    ]
  }
];

const Python2Curriculum = () => (
  <div>
    <main>
      <div style={{ backgroundColor: '#67aeda' }} className="text-center p-5">
        <h1>Python II Curriculum</h1>
        <h3 style={{ fontWeight: '200' }}>Advanced Programming, Algorithms, and Data Science</h3>
      </div>
      <div className="container mt-5">
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h4>Course Goals</h4>
            <ul>
              <li><b>Community:</b> Foster a collaborative, supportive environment.</li>
              <li><b>Understanding:</b> Enable students to master advanced Python and algorithms.</li>
              <li><b>Joy in Learning:</b> Make learning fun and rewarding.</li>
            </ul>
            <h4>Teaching Philosophy</h4>
            <ul>
              <li>Encourage exploration and creativity in problem-solving.</li>
              <li>Promote discussion, not just lecture.</li>
              <li>Celebrate mistakes as learning opportunities.</li>
            </ul>
            <h4>Platform</h4>
            <p>We use <a href="https://codesandbox.io/" target="_blank" rel="noopener noreferrer">CodeSandbox</a> for coding and collaboration. See the curriculum for platform tips and links.</p>
            <h4>Class Format</h4>
            <ul>
              <li>Warm-up (5-10 min): Review, question of the day, or ice-breaker.</li>
              <li>Interactive Lecture (15-20 min): Share a sandbox, discuss new concepts, ask questions.</li>
              <li>Mini-project/Demo (25-30 min): Students code and share progress live.</li>
              <li>Sharing (5-10 min): Invite students to present their work and discuss solutions.</li>
            </ul>
            <h4>General Guidelines</h4>
            <ul>
              <li>Encourage students to try their own solutions before showing answers.</li>
              <li>Promote a positive, fun, and inclusive classroom.</li>
              <li>Use resources, but focus on learning and understanding, not just answers.</li>
            </ul>
          </div>
        </div>
        {modules.map((module) => (
          <div key={module.id} className="card shadow-sm mb-4 module-card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Module {module.id}: {module.title}</h4>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">{module.description}</p>
              <div className="row">
                {module.lessons.map((lesson) => (
                  <div key={lesson.id} className="col-md-6 mb-2">
                    <Link 
                      to={lesson.path}
                      className="btn text-white btn-outline-primary btn-sm w-100 lesson-link"
                    >
                      Lesson {lesson.id}: {lesson.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="text-center mt-5 mb-4">
          <Link to="/cs" className="btn btn-secondary me-3">
            ← Back to CS Courses
          </Link>
        </div>
      </div>
    </main>
  </div>
);

export default Python2Curriculum; 
