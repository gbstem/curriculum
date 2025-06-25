import React from 'react';
import LessonPage from '../../LessonPage';

const content = `
# Lesson 5: Dictionary Review

## Interactive Lecture
- Review dictionaries: keys, values, adding/removing, changing, and accessing values.

\`\`\`python
groceries = {"apples": 15, "bananas": 17, "carrots": 9}
for item in groceries:
    print(item)
    print(groceries[item])
\`\`\`

**Ask students:**
- How do you add a new item to the dictionary?
- How would you remove an item?

## Mini-Project: Shopping List
- Create a grocery dictionary and print each key and value using a loop.

## Kahoot!
- Use Kahoot! to review dictionaries.
`;

const Lesson5 = () => (
  <LessonPage
    title="Dictionary Review"
    moduleTitle="Introduction/Review"
    lessonNumber={5}
    content={content}
    prevLesson="/cs/python2/lesson4"
    nextLesson="/cs/python2/lesson6"
  />
);

export default Lesson5; 
