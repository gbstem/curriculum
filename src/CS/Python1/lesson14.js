import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson14 = () => {
    const content = `# Day 2: For Loop Basics

## Interactive Lecture (15-20 minutes)

### For Loops vs While Loops

**Key Differences:**
- For loop: Run a certain number of times (will always have an end)
- While loop: Run until a condition is met

### For Loops with Numbers

**Using range():**
\`\`\`python
# Count from 0 to 4
for i in range(5):
    print(i)

# Count from 1 to 5
for i in range(1, 6):
    print(i)

# Count by 2s from 0 to 10
for i in range(0, 11, 2):
    print(i)
\`\`\`

**Understanding range():**
Students will get confused by the concept of range() so use an example of for i in range(0, 5), and ask students to guess what it will print.

### For Loops with Strings

**Iterating through strings:**
\`\`\`python
text = "Hello"

# Print each character
for char in text:
    print(char)

# Print each character with its position
for i in range(len(text)):
    print("Position", i, ":", text[i])
\`\`\`

**Using length method:**
\`\`\`python
word = "Python"
length = len(word)

for i in range(length):
    print("Letter", i + 1, "is", word[i])
\`\`\`

## Mini-Project: Powers Function

**Project Overview:**
Create a function that takes in two parameters, a base and a range, and will print out all the exponents of that number to the inputted range.

**Sample Implementation:**
\`\`\`python
def powers(base, count):
    for i in range(count):
        result = base ** i
        print(base, "to the power of", i, "=", result)

# Test the function
powers(3, 4)
\`\`\`

**Expected Output:**
\`\`\`
3 to the power of 0 = 1
3 to the power of 1 = 3
3 to the power of 2 = 9
3 to the power of 3 = 27
\`\`\`

## Key Learning Objectives

**Students should understand:**
- How for loops work with range()
- The difference between for and while loops
- How to iterate through strings
- How to use range() with different parameters
- How to combine for loops with functions

## Common Mistakes to Watch For

- Confusing range() parameters
- Not understanding that range() starts from 0 by default
- Forgetting to use len() when iterating through strings
- Confusing for loops with while loops

## Next Steps

In the next lesson, we'll create a Pokemon Battle Simulator using for loops!`;

    return (
        <LessonPage
            title="For Loop Basics"
            moduleTitle="For Loops"
            lessonNumber={14}
            content={content}
            prevLesson="/cs/python1/lesson13"
            nextLesson="/cs/python1/lesson15"
        />
    );
};

export default Lesson14; 
