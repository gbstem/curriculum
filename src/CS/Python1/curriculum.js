import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../curriculum.css';

const Python1Curriculum = () => {
    const modules = [
        {
            id: 1,
            title: "Fundamentals",
            description: "Introduction to Python, variables, data types, and basic concepts",
            lessons: [
                { id: 1, title: "Hello World & CodeSandbox", path: "/cs/python1/lesson1" },
                { id: 2, title: "Variables & Mad Libs", path: "/cs/python1/lesson2" },
                { id: 3, title: "Data Types & Operators", path: "/cs/python1/lesson3" },
                { id: 4, title: "Restaurant Simulator Project", path: "/cs/python1/lesson4" }
            ]
        },
        {
            id: 3,
            title: "If-Else Statements",
            description: "Conditional logic, comparison operators, and decision making",
            lessons: [
                { id: 5, title: "Comparison Operators & Logic", path: "/cs/python1/lesson5" },
                { id: 6, title: "Choose Your Own Adventure Game", path: "/cs/python1/lesson6" }
            ]
        },
        {
            id: 4,
            title: "String Methods",
            description: "Working with text, string manipulation, and indexing",
            lessons: [
                { id: 7, title: "String Methods & Indexing", path: "/cs/python1/lesson7" },
                { id: 8, title: "String Modifier Project", path: "/cs/python1/lesson8" }
            ]
        },
        {
            id: 5,
            title: "Functions",
            description: "Creating reusable code blocks with parameters and return values",
            lessons: [
                { id: 9, title: "Function Basics", path: "/cs/python1/lesson9" },
                { id: 10, title: "Calculator Project", path: "/cs/python1/lesson10" }
            ]
        },
        {
            id: 6,
            title: "While Loops",
            description: "Repeating code with conditions and the break keyword",
            lessons: [
                { id: 11, title: "While Loop Basics", path: "/cs/python1/lesson11" },
                { id: 12, title: "Trivia Game", path: "/cs/python1/lesson12" },
                { id: 13, title: "Caesar Cipher", path: "/cs/python1/lesson13" }
            ]
        },
        {
            id: 7,
            title: "For Loops",
            description: "Iterating through sequences with range() and strings",
            lessons: [
                { id: 14, title: "For Loop Basics", path: "/cs/python1/lesson14" },
                { id: 15, title: "Pokemon Battle Simulator", path: "/cs/python1/lesson15" }
            ]
        },
        {
            id: 8,
            title: "Lists",
            description: "Working with collections of data and list methods",
            lessons: [
                { id: 16, title: "List Basics", path: "/cs/python1/lesson16" },
                { id: 17, title: "Tic Tac Toe", path: "/cs/python1/lesson17" }
            ]
        },
        {
            id: 9,
            title: "2D Arrays and Nested Iteration",
            description: "Multi-dimensional data structures and nested loops",
            lessons: [
                { id: 18, title: "2D Arrays", path: "/cs/python1/lesson18" },
                { id: 19, title: "Tiny Tower Project", path: "/cs/python1/lesson19" }
            ]
        },
        {
            id: 10,
            title: "Dictionaries",
            description: "Key-value data structures and dictionary operations",
            lessons: [
                { id: 20, title: "Dictionary Basics", path: "/cs/python1/lesson20" },
                { id: 21, title: "Shopping Game", path: "/cs/python1/lesson21" }
            ]
        },
        {
            id: 11,
            title: "Libraries",
            description: "Using external Python libraries like time and tkinter",
            lessons: [
                { id: 22, title: "Library Basics", path: "/cs/python1/lesson22" },
                { id: 23, title: "Timer Project", path: "/cs/python1/lesson23" }
            ]
        },
        {
            id: 12,
            title: "Final Project",
            description: "Comprehensive project using all learned skills",
            lessons: [
                { id: 24, title: "Final Project", path: "/cs/python1/lesson24" }
            ]
        }
    ];

    return (
        <div>
            <main>
                <div style={{ backgroundColor: "#67aeda" }} className="text-center p-5">
                    <h1>Python 1 Curriculum</h1>
                    <h3 style={{ fontWeight: "200" }}>Complete Course Guide</h3>
                </div>

                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <div className="card shadow-sm mb-4">
                                <div className="card-body">
                                    <h2 className="card-title text-primary mb-3">Course Overview</h2>
                                    <p className="lead">
                                        Welcome to the gbSTEM Python 1 curriculum! This course is designed to introduce students 
                                        to programming fundamentals through Python, using an interactive and project-based approach.
                                    </p>
                                    
                                    <div className="alert alert-info">
                                        <h5>📚 Course Goals</h5>
                                        <ul className="mb-0">
                                            <li><strong>Understanding:</strong> Students will gain a solid foundation in Python programming</li>
                                            <li><strong>Communication:</strong> Foster a collaborative learning environment</li>
                                            <li><strong>Fun:</strong> Make learning enjoyable through hands-on projects</li>
                                            <li><strong>Community:</strong> Build connections between coding and real-world experiences</li>
                                        </ul>
                                    </div>

                                    <div className="alert alert-warning">
                                        <h5>⚠️ Important Notes</h5>
                                        <ul className="mb-0">
                                            <li>Questions? Contact <strong>Shaun Ng</strong> on Slack</li>
                                            <li>Platform: <a href="https://codesandbox.io/" target="_blank" rel="noopener noreferrer">CodeSandbox</a> (backup: <a href="https://trinket.io/" target="_blank" rel="noopener noreferrer">Trinket.io</a>)</li>
                                            <li>Class format: Interactive lectures with hands-on projects</li>
                                            <li>If students excel, consider moving to Python 2 curriculum</li>
                                            <li>If students struggle, contact <strong>Tumi Ogunyankin</strong> on Slack</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-center mb-4">Module Structure</h2>
                            
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
                                <Link to="/cs/python1" className="btn btn-primary">
                                    View Course Page
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Python1Curriculum; 
