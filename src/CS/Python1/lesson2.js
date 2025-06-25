import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson2 = () => {
    const content = `# Day 2: Variables & Mad Libs

## Warm-up (5-10 minutes)

Another round of introductions + a question of the day: **Where do you keep your papers/worksheets from school?**

This question helps introduce the concept of variables as "containers" that hold information.

## Interactive Lecture (15-20 minutes)

### What is a Variable?

**The Container Analogy:**
Explain that variables "hold" values, like a backpack or folder. This allows you to use them later in your program.

**Basic Variable Examples:**

\`\`\`python
x = "hello"
print(x)
\`\`\`

**Ask students to create their own variables:**

\`\`\`python
# Examples for students to try
name = "Alice"
age = 12
favorite_color = "blue"
\`\`\`

### Data Types - Numbers vs Text

**Important Distinction:**
Give them the example of x = 1 and x = "1" and explain the difference.

\`\`\`python
# This is a number
number = 1

# This is text (string)
text = "1"

print(number + 5)  # This works! (6)
print(text + "5")  # This works! ("15")
print(text + 5)    # This will cause an error!
\`\`\`

**Key Concept:** Numbers and text are different types of data in Python.

### Concatenation with Variables

**How to Combine Variables and Text:**

\`\`\`python
name = input("What's your name? ")
age = input("How old are you? ")

# Using variables in print statements
print("Hello " + name)
print("You are " + age + " years old")
\`\`\`

**Common Confusion:**
Students will get confused by the difference between:
- \`print(x)\` - prints the value stored in variable x
- \`print("x")\` - prints the letter "x"

**Practice Examples:**

\`\`\`python
# Let's practice with different variables
first_name = "John"
last_name = "Doe"
age = 15

print("My name is " + first_name + " " + last_name)
print("I am " + str(age) + " years old")
\`\`\`

## Mini-Project: Mad Libs (remainder of class)

**Project Overview:**
Do this project as a class, and have everyone pitch in rather than working on their own individual project. The students can all collaborate to create the story, and can take turns writing each input line.

**Sample Mad Libs Code:**

\`\`\`python
print("Let's create a Mad Libs story!")
print("I'll ask you for some words, and then we'll make a funny story!")

# Get words from the user
adjective1 = input("Give me an adjective: ")
noun1 = input("Give me a noun: ")
verb1 = input("Give me a verb: ")
adjective2 = input("Give me another adjective: ")
noun2 = input("Give me another noun: ")

# Create the story
print("\\nHere's your Mad Libs story:")
print("The " + adjective1 + " " + noun1 + " decided to " + verb1 + ".")
print("It was a " + adjective2 + " day, and the " + noun2 + " was watching.")
print("What an adventure!")
\`\`\`

**Example Story Templates:**

**Space Adventure:**
"The [adjective] [noun] traveled to [planet] to find the [adjective] [noun]."

**School Day:**
"Today in [subject] class, the [adjective] [noun] taught us how to [verb] with [noun]."

**Teaching Tips for Mad Libs:**
- Let students choose the story theme
- Encourage creativity with their word choices
- Have them read the final story aloud
- Discuss how variables made the story dynamic and reusable

## Key Learning Objectives

**Students should understand:**
- Variables are containers that store information
- Different data types (numbers vs text)
- How to use input() to get user data
- How to combine variables with text using concatenation
- The difference between variables and the text that represents them

## Common Mistakes to Watch For

- Forgetting quotes around strings
- Confusing variable names with their values
- Trying to add numbers and text without conversion
- Not using the + operator for concatenation

## Resources

- https://www.w3schools.com/python/python_variables.asp
- https://www.w3schools.com/python/python_datatypes.asp
- https://www.w3schools.com/python/python_operators.asp
- https://www.youtube.com/watch?v=xjZDZ1TJe4o (0:52 - 2:50, but please give some context and guiding questions)

## Next Steps

In the next lesson, we'll learn about conditional logic with if-else statements!`;

    return (
        <LessonPage
            title="Variables & Mad Libs"
            moduleTitle="Fundamentals"
            lessonNumber={2}
            content={content}
            prevLesson="/cs/python1/lesson1"
            nextLesson="/cs/python1/lesson3"
        />
    );
};

export default Lesson2; 
