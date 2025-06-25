import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson24 = () => {
    const content = `# Final Project

## Project Overview

Use all the programming skills you've learned so far in the course to make a final project! Projects should be creative, feasible to make within the given timeframe, and representative of a student's programming skills (applying as much as what they have learned in the past 12 weeks as possible.)

## Project Ideas
- Connect 4
- Battleship
- Dinosaur game
- Any creative idea!

## Project Requirements
- Must use multiple concepts from the course
- Should be fun and engaging
- Should be possible to complete in the given time
- Should be your own work (no copying)

## Tips for Success
- Plan your project before coding
- Break your project into small steps
- Test as you go
- Ask for help if you get stuck
- Be creative and have fun!

## Presentation
- Be ready to present your project to the class
- Explain what you built and what you learned
- Show off your code and the final result

## Good Luck!

You've completed the Python 1 curriculum. We can't wait to see what you build!`;

    return (
        <LessonPage
            title="Final Project"
            moduleTitle="Final Project"
            lessonNumber={24}
            content={content}
            prevLesson="/cs/python1/lesson23"
            nextLesson={null}
        />
    );
};

export default Lesson24; 
