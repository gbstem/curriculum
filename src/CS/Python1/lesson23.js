import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson23 = () => {
    const content = `# Day 2: Timer Project

## Project Overview

With the time library, create a timer. User will input a given amount of seconds, and the timer should run for the specified amount of time.

## Project Requirements

**Basic Requirements:**
- Ask user for number of seconds
- Use time.sleep() to wait
- Print countdown or message
- End with a notification

## Sample Implementation

\`\`\`python
import time

print("Python Timer!")
seconds = int(input("Enter number of seconds: "))

for i in range(seconds, 0, -1):
    print(i)
    time.sleep(1)

print("Time's up!")
\`\`\`

## Key Concepts Applied

**Libraries:**
- Importing and using time
- sleep() function

**Loops:**
- Countdown with for loop

**User Input:**
- Input validation

## Resources

- Example: https://repl.it/talk/share/Timer/124080

## Next Steps

In the next module, you'll work on your final project!`;

    return (
        <LessonPage
            title="Timer Project"
            moduleTitle="Libraries"
            lessonNumber={23}
            content={content}
            prevLesson="/cs/python1/lesson22"
            nextLesson="/cs/python1/lesson24"
        />
    );
};

export default Lesson23; 
