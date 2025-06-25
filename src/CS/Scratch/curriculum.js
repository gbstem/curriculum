import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../curriculum.css';

const ScratchCurriculum = () => {
    const modules = [
        {
            id: 1,
            title: "Scratch environment",
            description: "Introduction to Scratch interface, creating projects, and basic navigation",
            lessons: [
                { id: 1, title: "Scratch Environment & Scene Creation", path: "/cs/scratch/lesson1" }
            ]
        },
        {
            id: 2,
            title: "Motion",
            description: "Learning motion blocks, coordinate plane, and sprite movement",
            lessons: [
                { id: 2, title: "Motion Blocks & Simon Says", path: "/cs/scratch/lesson2" },
                { id: 3, title: "Coordinate Plane & Constellations", path: "/cs/scratch/lesson3" }
            ]
        },
        {
            id: 3,
            title: "Looks and Sounds",
            description: "Working with appearance changes, costumes, and audio",
            lessons: [
                { id: 4, title: "Looks & Sound Blocks", path: "/cs/scratch/lesson4" },
                { id: 5, title: "Storytelling Project", path: "/cs/scratch/lesson5" }
            ]
        },
        {
            id: 4,
            title: "Loops + Control Blocks",
            description: "Understanding loops, repeat blocks, and animation",
            lessons: [
                { id: 6, title: "Loops & Animation", path: "/cs/scratch/lesson6" }
            ]
        },
        {
            id: 5,
            title: "Conditionals with Sensing",
            description: "Using sensing blocks and conditional statements",
            lessons: [
                { id: 7, title: "Conditionals & Maze Game", path: "/cs/scratch/lesson7" }
            ]
        },
        {
            id: 6,
            title: "Conditionals with Operators and Variables",
            description: "Working with variables, operators, and user input",
            lessons: [
                { id: 8, title: "Variables & Guess My Number", path: "/cs/scratch/lesson8" }
            ]
        },
        {
            id: 7,
            title: "String manipulation from user input",
            description: "Creating interactive programs with user input",
            lessons: [
                { id: 9, title: "String Manipulation & Chatbot", path: "/cs/scratch/lesson9" },
                { id: 10, title: "Choose Your Own Adventure", path: "/cs/scratch/lesson10" }
            ]
        },
        {
            id: 8,
            title: "Clones and Broadcasting",
            description: "Creating multiple sprites and sprite communication",
            lessons: [
                { id: 11, title: "Clones & Broadcasting", path: "/cs/scratch/lesson11" },
                { id: 12, title: "Dodge the Obstacle Game", path: "/cs/scratch/lesson12" },
                { id: 13, title: "Custom Blocks & Racecar Game", path: "/cs/scratch/lesson13" }
            ]
        },
        {
            id: 9,
            title: "Rehashing the Basics",
            description: "Review and advanced techniques",
            lessons: [
                { id: 14, title: "Moving Landscapes", path: "/cs/scratch/lesson14" },
                { id: 15, title: "Scratch Extensions", path: "/cs/scratch/lesson15" }
            ]
        },
        {
            id: 10,
            title: "Refining our code",
            description: "Code efficiency and debugging",
            lessons: [
                { id: 16, title: "Code Efficiency", path: "/cs/scratch/lesson16" },
                { id: 17, title: "Debugging", path: "/cs/scratch/lesson17" }
            ]
        },
        {
            id: 11,
            title: "Advanced Game Design in Scratch (bonus lessons)",
            description: "Advanced game development techniques",
            lessons: [
                { id: 18, title: "Flappy Bird Game", path: "/cs/scratch/lesson18" },
                { id: 19, title: "Game Improvements", path: "/cs/scratch/lesson19" },
                { id: 20, title: "User Interface Design", path: "/cs/scratch/lesson20" },
                { id: 21, title: "Physics Engines", path: "/cs/scratch/lesson21" },
                { id: 22, title: "Platformer Games", path: "/cs/scratch/lesson22" },
                { id: 23, title: "In-Game Shop", path: "/cs/scratch/lesson23" },
                { id: 24, title: "Independent Exploration", path: "/cs/scratch/lesson24" }
            ]
        },
        {
            id: 12,
            title: "Final Projects",
            description: "Portfolio development and final project creation",
            lessons: [
                { id: 25, title: "Final Project Development", path: "/cs/scratch/lesson25" }
            ]
        }
    ];

    return (
        <div>
            <main>
                <div style={{ backgroundColor: "#67aeda" }} className="text-center p-5">
                    <h1>gbSTEM Scratch Curriculum</h1>
                    <h3 style={{ fontWeight: "200" }}>Teaching a Scratch class</h3>
                    <p className="mb-0">Visual Programming for Beginners</p>
                </div>

                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <div className="card shadow-sm mb-4">
                                <div className="card-header bg-primary text-white">
                                    <h4 className="mb-0">Our Goals</h4>
                                </div>
                                <div className="card-body">
                                    <ul>
                                        <li><strong>Subject matter fluency:</strong> Students should learn to make their Scratch projects utilizing the majority of the features included in our curriculum.</li>
                                        <li><strong>Joy in learning:</strong> Students should have fun through their learning.</li>
                                        <li><strong>Community building:</strong> Students should build interpersonal skills through a rich and inclusive classroom community.</li>
                                        <li><strong>Identity development:</strong> Students should understand that they are an engineer not despite their struggles, but because problem-solving is what engineers do, and that being an engineer can coexist with their own diverse identities.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="card shadow-sm mb-4">
                                <div className="card-header bg-success text-white">
                                    <h4 className="mb-0">Class Format</h4>
                                </div>
                                <div className="card-body">
                                    <p><strong>Warm-up (5-10 min):</strong> Review, introductions, question of the day, or open-ended investigation</p>
                                    <p><strong>Interactive lecture (5-15 min):</strong> Share your screen, explain new ideas, engage students</p>
                                    <p><strong>Mini-project/Project:</strong> Students work on their own Scratch projects</p>
                                    <p><strong>Sharing:</strong> Invite students to share their work</p>
                                </div>
                            </div>

                            <div className="card shadow-sm mb-4">
                                <div className="card-header bg-info text-white">
                                    <h4 className="mb-0">Teaching Tips</h4>
                                </div>
                                <div className="card-body">
                                    <ul>
                                        <li>Move at the right pace - customize the course!</li>
                                        <li>For younger students, understanding is more important than getting through all modules</li>
                                        <li>For more advanced students, skip early modules if they already know the content</li>
                                        <li>Have fun! Modify the course to make it enjoyable</li>
                                        <li>Always encourage questions</li>
                                        <li>Check up with students' progress regularly</li>
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
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ScratchCurriculum; 
