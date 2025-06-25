import React from 'react';
import LessonPage from '../../LessonPage';

const content = `
# Lesson 3: Logic Review

## Interactive Lecture
- Review if, elif, else statements and comparison operators (and, or, not, in, is, ==, !=).
- Discuss how a computer reads logic statements.

\`\`\`python
temperature = 75.2
weather = "sunny"
formal = False

if temperature > 70 and weather != "raining":
    print("Shorts and T-Shirt")
elif temperature > 70 and weather == "raining":
    print("Shorts and T-Shirt w/ Rain Jacket or Umbrella")
else:
    print("Pants and Sweater")
\`\`\`

**Ask students:**
- What will the code above print if the weather is "raining"?
- How would you add more conditions for different weather or temperature?

## Mini-Project: What To Wear?
- Have students create their own decision-making program for what to wear based on variables for temperature, weather, and formality.

## Extra Mini-Project: 4 Function Calculator
- Write a function called `calculate` that takes two numbers and an operator, and returns the result.

\`\`\`python
def calculate(num1, operator, num2):
    if operator == "+":
        return num1 + num2
    if operator == "-":
        return num1 - num2
    if operator == "/":
        return num1 / num2
    if operator == "*":
        return num1 * num2
    else:
        return "Invalid input"

print(calculate(4, "+", 5))  # Output: 9
\`\`\`

## Kahoot!
- Use Kahoot! to review logic and conditionals.
`;

const Lesson3 = () => (
  <LessonPage
    title="Logic Review"
    moduleTitle="Introduction/Review"
    lessonNumber={3}
    content={content}
    prevLesson="/cs/python2/lesson2"
    nextLesson="/cs/python2/lesson4"
  />
);

export default Lesson3; 
