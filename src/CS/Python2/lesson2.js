import React from 'react';
import LessonPage from '../../LessonPage';

const content = `
# Lesson 2: Fun with Functions

## Interactive Lecture
- Review functions and their syntax in Python.
- Discuss why functions are useful (reuse, organization, clarity).

\`\`\`python
# Example: Simple Function
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
\`\`\`

**Ask students:**
- What does the function above do?
- How would you write a function that returns the square of a number?

## Practice: Write Your Own Function
- Have students write a function that takes two numbers and returns their sum.

\`\`\`python
def add(a, b):
    return a + b

print(add(3, 5))  # Output: 8
\`\`\`

## Homework
- Assign the Functions HW on Replit (student copy in their sandbox).
- Encourage students to share their code and ask questions.
- Use Kahoot! to review at the end or next class.
`;

const Lesson2 = () => (
  <LessonPage
    title="Fun with Functions"
    moduleTitle="Introduction/Review"
    lessonNumber={2}
    content={content}
    prevLesson="/cs/python2/lesson1"
    nextLesson="/cs/python2/lesson3"
  />
);

export default Lesson2; 
