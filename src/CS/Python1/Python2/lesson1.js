import React from 'react';
import LessonPage from '../../LessonPage';

const content = `
# Lesson 1: CodeSandbox & Python Review

## Warm-up (5-10 min)
- Introduce yourself and have students share their name, pronouns, and a fun fact (e.g., favorite animal).
- Play "Two Truths and a Lie" as an icebreaker.

## CodeSandbox Walkthrough
- How to create an account
- How to create a sandbox
- Where to edit and run code
- How to share/run a live session
- [CodeSandbox Tutorial](https://codesandbox.io/)

**Teacher Tip:** Share your screen and walk through each step. Have students follow along and create their own sandboxes.

## Python Review
- Data types: 
  - \`int\`, \`float\`, \`bool\`, \`str\`
- Variables store data and can be modified.

\`\`\`python
# Example: Variables and Data Types
name = "Alice"
age = 13
is_student = True
height = 1.6
print(f"Name: {name}, Age: {age}, Student: {is_student}, Height: {height}")
\`\`\`

**Ask students:**
- What data type is each variable above?
- Can you change the value of a variable after it is created?

## Kahoot!
- Use a Kahoot to review Python basics. Play at the end or as a warm-up next class.
`;

const Lesson1 = () => (
  <LessonPage
    title="CodeSandbox & Python Review"
    moduleTitle="Introduction/Review"
    lessonNumber={1}
    content={content}
    prevLesson={null}
    nextLesson="/cs/python2/lesson2"
  />
);

export default Lesson1; 
