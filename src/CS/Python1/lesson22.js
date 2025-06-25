import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson22 = () => {
    const content = `# Day 1: Library Basics

## Interactive Lecture

### What are Libraries?
Libraries are collections of pre-written code that you can use to add extra features to your programs. They save time and let you do more with less code.

**Examples:**
- random (random numbers)
- time (timing and delays)
- tkinter (simple GUIs)

### Importing Libraries

**Basic Import:**
\`\`\`python
import random
import time
\`\`\`

**Using Library Functions:**
\`\`\`python
# Random number between 1 and 10
num = random.randint(1, 10)
print(num)

# Wait for 2 seconds
time.sleep(2)
print("2 seconds later!")
\`\`\`

### Exploring the time Library
- [time library documentation](https://docs.python.org/3/library/time.html)

### Exploring the tkinter Library
- [tkinter documentation](https://docs.python.org/3/library/tkinter.html)

**Simple tkinter Example:**
\`\`\`python
import tkinter as tk

window = tk.Tk()
window.title("Hello Tkinter!")
label = tk.Label(window, text="Welcome to Tkinter!")
label.pack()
window.mainloop()
\`\`\`

## Key Learning Objectives

**Students should understand:**
- What libraries are and why we use them
- How to import and use library functions
- Where to find documentation
- How to experiment with new libraries

## Resources

- https://docs.python.org/3/library/index.html

## Next Steps

In the next lesson, we'll create a Timer project using the time library!`;

    return (
        <LessonPage
            title="Library Basics"
            moduleTitle="Libraries"
            lessonNumber={22}
            content={content}
            prevLesson="/cs/python1/lesson21"
            nextLesson="/cs/python1/lesson23"
        />
    );
};

export default Lesson22; 
