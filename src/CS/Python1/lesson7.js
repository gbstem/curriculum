import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson7 = () => {
    const content = `# Day 1: String Methods & Indexing

## Interactive Lecture (15-20 minutes)

### How Can We Modify String Variables?

**String Methods Introduction:**
Strings in Python have built-in methods that allow us to manipulate and analyze text.

### Basic String Methods

**Length:**
\`\`\`python
text = "Hello World"
length = len(text)
print(length)  # 11
\`\`\`

**Case Methods:**
\`\`\`python
text = "hello world"

# Capitalize first letter
print(text.capitalize())  # "Hello world"

# Convert to uppercase
print(text.upper())       # "HELLO WORLD"

# Convert to lowercase
print(text.lower())       # "hello world"

# Title case (capitalize each word)
print(text.title())       # "Hello World"
\`\`\`

### String Indexing

**Understanding Indexing:**
\`\`\`python
text = "Python"
print(text[0])    # "P" (first character)
print(text[1])    # "y" (second character)
print(text[5])    # "n" (last character)
print(text[-1])   # "n" (last character, negative indexing)
print(text[-2])   # "o" (second to last character)
\`\`\`

**Important Concept - Counting from 0:**
Students can get confused about counting from 0 rather than 1. Emphasize this concept!

**Index vs Length:**
\`\`\`python
text = "Hello"
length = len(text)        # 5
last_index = length - 1   # 4
print(text[last_index])   # "o"
print(text[length])       # Error! Index out of range
\`\`\`

### String Slicing

**Basic Slicing:**
\`\`\`python
text = "Hello World"

# Get first 5 characters
print(text[0:5])    # "Hello"

# Get characters from index 6 to end
print(text[6:])     # "World"

# Get first 5 characters (shorthand)
print(text[:5])     # "Hello"

# Get last 5 characters
print(text[-5:])    # "World"
\`\`\`

### Finding Characters

**Index Method:**
\`\`\`python
text = "Hello World"

# Find the position of 'o'
position = text.index('o')
print(position)  # 4 (first occurrence)

# Find the position of 'World'
position = text.index('World')
print(position)  # 6
\`\`\`

## Mini-Project: Splice and Dice (remainder of class)

**Project Overview:**
Have students create a program that takes in a string and a number, n. Then print a new string that moves the first n letters to the end of the original string.

**Sample Implementation:**
\`\`\`python
s = input("Please input a string: ")
n = int(input("Please input a number: "))

# Move first n letters to the end
result = s[n:] + s[:n]
print("Result:", result)
\`\`\`

**Examples:**
- Input: "Hello", 2 → Output: "lloHe"
- Input: "Python", 3 → Output: "honPyt"
- Input: "Programming", 4 → Output: "rammingProg"

## Key Learning Objectives

**Students should understand:**
- How string indexing works (starting from 0)
- How to use basic string methods
- How string slicing works
- The difference between index and length
- How to find characters in strings
- How to manipulate strings using slicing

## Common Mistakes to Watch For

- Confusing indexing (starting from 0 vs 1)
- Trying to access index equal to length
- Forgetting that strings are immutable
- Not understanding negative indexing
- Confusing index() with indexing

## Resources

- https://www.w3schools.com/python/python_ref_string.asp

## Next Steps

In the next lesson, we'll create a String Modifier project using all these string methods!`;

    return (
        <LessonPage
            title="String Methods & Indexing"
            moduleTitle="String Methods"
            lessonNumber={7}
            content={content}
            prevLesson="/cs/python1/lesson6"
            nextLesson="/cs/python1/lesson8"
        />
    );
};

export default Lesson7; 
