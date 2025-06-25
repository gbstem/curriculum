import React from 'react';
import LessonPage from '../../LessonPage';

const content = `
# Lesson 4: Loop Review

## Interactive Lecture
- Review for and while loops, and their syntax.
- Discuss the difference between for and while loops.

\`\`\`python
groceries = ["apples", "bananas", "carrots", "dragon fruits"]
for item in groceries:
    print(item)
\`\`\`

**Ask students:**
- What does the code above do?
- How would you print only items that start with the letter 'a'?

## Mini-Project: Grocery List
- Have students create a list of grocery items and print them using a loop.

## Homework
- Assign Loop HW on Replit (student copy in their sandbox).
- Use Kahoot! to review at the end or next class.
`;

const Lesson4 = () => (
  <LessonPage
    title="Loop Review"
    moduleTitle="Introduction/Review"
    lessonNumber={4}
    content={content}
    prevLesson="/cs/python2/lesson3"
    nextLesson="/cs/python2/lesson5"
  />
);

export default Lesson4; 
