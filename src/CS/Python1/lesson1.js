import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson1 = () => {
    const content = `# Day 1: Hello World & CodeSandbox

## Warm-up (20-25 minutes)

Start with some ice breakers to get to know each other! Ask for names and pronouns when students answer the questions.

### Icebreaker Questions
- What's the worst color? Why?
- What's your hidden talent?
- What's a hobby you have that you could do for the rest of your life?
- What's your favorite type of soup?

### Class Questions
- Ask students if they have any questions on how the structure of the class will be or examples of topics you'll be teaching
- Ask them about why they want to learn Python? Do they have other coding experience? What's their dream project?

## Interactive Lecture (remainder of class)

### How CodeSandbox Works

**Platform Introduction:**
This semester we are using an online development platform called CodeSandbox (https://codesandbox.io/) for our classes. Students and instructors should make an account prior to class.

**Key Features:**
- Access work from any device
- Collaborative editing - projects can be easily shared and edited by multiple people at once
- Real-time collaboration through live sessions

**Getting Started:**
1. How to create an account
2. How to create a sandbox
3. Where to edit code
4. How to run code
5. Where the output is
6. How to share/run a live session

### Hello World!

**Your First Python Program:**

Let's start with the traditional "Hello World" program. Have your students make a file and then show them how to print "Hello World" using the print() function.

\`\`\`python
print("Hello World")
\`\`\`

**Getting User Input:**

Show students how you can use input() to get input from the user. You can briefly explain a variable (it'll be explained in detail in the next lesson).

\`\`\`python
name = input("What's your name? ")
print("Hello " + name)
\`\`\`

**Key Concepts to Explain:**
- The print() function displays text on the screen
- The input() function gets information from the user
- Variables (like 'name') store information for later use
- The + operator can combine text (strings) together

## Teaching Tips

**For the Instructor:**
- Create a sandbox and share it with the class (create a live session and generate a shareable link)
- Ask students to share their sandboxes and create a live session so you can make sure they're taking notes or typing along
- Make sure the students are involved. Ask students questions, and leave time for self-exploration and trial
- We want students engaged so don't lecture them; make it more of a discussion

**Student Engagement:**
- Encourage students to experiment with different messages
- Have them try printing their own names
- Let them explore what happens if they forget the quotes around text
- Celebrate mistakes as learning opportunities!

## Resources

- CodeSandbox Tutorial: [Platform Basics Guide]
- Backup Platform: https://trinket.io/ (if CodeSandbox doesn't work)
- Python Documentation: https://docs.python.org/3/tutorial/

## Next Steps

In the next lesson, we'll dive deeper into variables and create our first project - a Mad Libs game!`;

    return (
        <LessonPage
            title="Hello World & CodeSandbox"
            moduleTitle="Fundamentals"
            lessonNumber={1}
            content={content}
            prevLesson={null}
            nextLesson="/cs/python1/lesson2"
        />
    );
};

export default Lesson1; 
