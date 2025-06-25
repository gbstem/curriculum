import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson3 = () => {
    const content = `# Day 3: Data Types & Operators

## Warm-up (5-10 minutes)

Review variables and ask how you would store hot food vs. cold food (containers).

This helps reinforce the concept of specialized containers for different types of data.

## Interactive Lecture (20-25 minutes)

### Data Types in Python

**The Container Analogy:**
Just like there are specialized containers for different purposes, Python stores different data in specialized types of variables.

**Main Data Types:**

**Integers (int):**
\`\`\`python
age = 15
temperature = -5
\`\`\`

**Strings (str):**
\`\`\`python
name = "Alice"
message = 'Hello World'
\`\`\`

**Floats (float):**
\`\`\`python
height = 5.5
pi = 3.14159
\`\`\`

**Booleans (bool):**
\`\`\`python
is_student = True
is_raining = False
\`\`\`

### Casting (Type Conversion)

**Converting Between Types:**

\`\`\`python
# String to integer
age_string = "15"
age_int = int(age_string)

# Integer to string
number = 42
number_string = str(number)

# String to float
price_string = "19.99"
price_float = float(price_string)
\`\`\`

**Important with input():**
\`\`\`python
# input() always returns a string
user_age = input("How old are you? ")  # This is a string
user_age_int = int(user_age)           # Convert to integer
\`\`\`

### Mathematical Operators

**Basic Operators:**
\`\`\`python
# Addition
result = 10 + 5    # 15

# Subtraction
result = 10 - 5    # 5

# Multiplication
result = 10 * 5    # 50

# Division
result = 10 / 5    # 2.0 (always returns float)

# Modulo (remainder)
result = 10 % 3    # 1

# Exponentiation
result = 2 ** 3    # 8
\`\`\`

**Important Distinction:**
\`\`\`python
print(10 * 4)    # Prints: 40
print(10 * 4.0)  # Prints: 40.0
\`\`\`

### Compound Assignment Operators

**Shorthand Operators:**
\`\`\`python
x = 10

# These are equivalent:
x = x + 5
x += 5

# Other compound operators:
x -= 3    # x = x - 3
x *= 2    # x = x * 2
x /= 4    # x = x / 4
x %= 3    # x = x % 3
\`\`\`

## Mini-Project: Math Challenge (remainder of class)

**Team Competition:**
Create two teams and send them into breakout rooms. The teams will have 3-4 minutes to answer the following questions. Whichever team answers the most questions correctly wins! Each question is worth two points - one for completing the question using mathematical operators, and another for completing the question using compound assignment operators.

**Challenge Questions:**

1. **Take in a user inputted number, divide it by four, multiply it by three, and then output it**

**Using regular operators:**
\`\`\`python
number = int(input("Enter a number: "))
result = (number / 4) * 3
print(result)
\`\`\`

**Using compound operators:**
\`\`\`python
number = int(input("Enter a number: "))
number /= 4
number *= 3
print(number)
\`\`\`

2. **Take in a user inputted number, and add one to it**

**Using regular operators:**
\`\`\`python
number = int(input("Enter a number: "))
result = number + 1
print(result)
\`\`\`

**Using compound operators:**
\`\`\`python
number = int(input("Enter a number: "))
number += 1
print(number)
\`\`\`

3. **Have the user input a number, convert it to a float, and modulo it by 2**

\`\`\`python
number = float(input("Enter a number: "))
result = number % 2
print(result)
\`\`\`

## Key Learning Objectives

**Students should understand:**
- Different data types and when to use each
- How to convert between data types using casting
- Mathematical operators and their precedence
- Compound assignment operators as shorthand
- The difference between integer and float division
- How input() always returns a string

## Common Mistakes to Watch For

- Forgetting to cast input() to the desired type
- Confusing integer division with float division
- Not understanding that division always returns a float
- Forgetting that input() returns a string

## Resources

- https://www.youtube.com/watch?v=xjZDZ1TJe4o (0:52 - 2:50 for Integer and String)
- https://www.youtube.com/watch?v=afJ2CuFbHKo (0:49 - 3:26 Make sure you pause the video to talk!)

## Next Steps

In the next lesson, we'll create a Restaurant Simulator project using all the concepts we've learned so far!`;

    return (
        <LessonPage
            title="Data Types & Operators"
            moduleTitle="Fundamentals"
            lessonNumber={3}
            content={content}
            prevLesson="/cs/python1/lesson2"
            nextLesson="/cs/python1/lesson4"
        />
    );
};

export default Lesson3; 
