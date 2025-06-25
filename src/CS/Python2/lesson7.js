import React from 'react';
import LessonPage from '../../LessonPage';

const content = `
# Lesson 7: What are Algorithms?

## Warm-up (5-10 min)
- Ask: What is an algorithm? Can you think of any examples in real life?
- Have students share examples: following a recipe, tying shoes, solving a math problem.
- Quick activity: Ask students to write down the steps for making a peanut butter and jelly sandwich (or another simple task). Discuss how these steps are like an algorithm.

## Interactive Lecture (15-20 min)
- Explain: An \`algorithm\` is a set of steps to solve a problem or complete a task.
- Algorithms are everywhere: in computers, in daily life, in games, and more.
- Show how computers need very clear, step-by-step instructions.

### Example: Algorithm for Brushing Teeth
\`\`\`
1. Pick up toothbrush
2. Put toothpaste on toothbrush
3. Wet toothbrush
4. Brush teeth for 2 minutes
5. Rinse mouth
6. Rinse toothbrush
7. Put toothbrush away
\`\`\`

**Ask students:**
- What would happen if you skipped a step?
- How could you make this algorithm more efficient?

### Activity: Algorithm Race
- Present a real-world problem: How would you sort your books by genre?
- Have students write a 5-step algorithm for the task. Set a 1-minute timer.
- Invite a few students to share their algorithms. Discuss similarities and differences.

### Example: Sorting a List in Python
\`\`\`python
books = ["Harry Potter", "The Hobbit", "1984", "To Kill a Mockingbird"]
# Let's say we want to sort alphabetically
books.sort()
print(books)
\`\`\`

**Ask students:**
- What does the \`sort()\` function do?
- How would you sort by book length instead?

## Mini-Project: Algorithm Scavenger Hunt
- Have students list 3 algorithms they use in daily life (e.g., making breakfast, getting ready for school, searching for a file on their computer).
- Share and discuss as a class.

## Algorithm Puzzle
- Give students a scrambled set of steps for a task (e.g., making hot chocolate). Have them arrange the steps in the correct order.

### Example: Scrambled Steps
\`\`\`
A. Pour hot water into mug
B. Stir until mixed
C. Add hot chocolate powder to mug
D. Enjoy your drink!
E. Get a mug
\`\`\`
- Correct order: E, C, A, B, D

## Discussion: Why are Algorithms Important?
- Algorithms help us solve problems efficiently and consistently.
- In programming, writing a good algorithm is key to making your code work well.

## Extension/Challenge
- Try writing an algorithm for a more complex task (e.g., planning a birthday party, organizing a backpack).
- Discuss how you could turn your algorithm into a Python program.

## Further Reading
- [W3Schools: Python Functions and Algorithms](https://www.w3schools.com/python/python_functions.asp)
`;

const Lesson7 = () => (
  <LessonPage
    title="What are Algorithms?"
    moduleTitle="Algorithms"
    lessonNumber={7}
    content={content}
    prevLesson="/cs/python2/lesson6"
    nextLesson="/cs/python2/lesson8"
  />
);

export default Lesson7; 
