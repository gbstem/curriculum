import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson20 = () => {
    const content = `# Day 1: Dictionary Basics

## Interactive Lecture (15-20 minutes)

### Introduction to Dictionaries

**What are Dictionaries?**
Dictionaries are collections of key-value pairs. They let you store and retrieve data using unique keys.

**Difference to Lists:**
- Lists: Ordered, use integer indices
- Dictionaries: Unordered, use keys (strings, numbers, etc.)

### Creating Dictionaries

**Basic Dictionary Creation:**
\`\`\`python
d = {}
student = {"name": "Mia", "age": 17, "fav-color": "green"}
\`\`\`

**Accessing Values:**
\`\`\`python
print(student["name"])      # "Mia"
print(student["age"])       # 17
print(student["fav-color"]) # "green"
\`\`\`

**Adding/Changing Values:**
\`\`\`python
student["grade"] = 12
student["age"] = 18
print(student)
\`\`\`

**Removing Values:**
\`\`\`python
del student["fav-color"]
print(student)
\`\`\`

### Looping Through Dictionaries

**Loop Through Keys:**
\`\`\`python
for key in student:
    print(key)
\`\`\`

**Loop Through Values:**
\`\`\`python
for key in student:
    print(student[key])
\`\`\`

## Mini-Project: Personal Info Dictionary (remainder of class)

**Project Overview:**
Create a dictionary containing your name, age, and favorite color. Then, loop through this dictionary, and print out each key name, and then loop through and print each value.

**Sample Implementation:**
\`\`\`python
d = {"name": "Mia", "age": 17, "fav-color": "green"}

print("Keys:")
for key in d:
    print(key)

print("Values:")
for key in d:
    print(d[key])
\`\`\`

## Key Learning Objectives

**Students should understand:**
- What dictionaries are and how to create them
- How to access, add, and remove values
- How to loop through keys and values
- The difference between lists and dictionaries

## Resources

- https://www.w3schools.com/python/python_dictionaries.asp

## Next Steps

In the next lesson, we'll create a Shopping Game using dictionaries!`;

    return (
        <LessonPage
            title="Dictionary Basics"
            moduleTitle="Dictionaries"
            lessonNumber={20}
            content={content}
            prevLesson="/cs/python1/lesson19"
            nextLesson="/cs/python1/lesson21"
        />
    );
};

export default Lesson20; 
