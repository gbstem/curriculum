import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson6 = () => {
    const content = `# Day 2: Choose Your Own Adventure Game

## Project Overview

Have the students create a text-based adventure game! This can be as long or as short as the student would like it to be, but it should have at least 3 choices to win. Students can add any mechanisms they want to add once they finish the main project.

## Project Requirements

**Basic Requirements:**
- At least 3 different paths/choices
- Multiple endings (win/lose scenarios)
- Clear story progression
- User input for choices

## Sample Story Structure

\`\`\`python
print("Welcome to the Mysterious Cave Adventure!")
print("=" * 40)

print("You find yourself at the entrance of a dark cave.")
print("You can see two paths ahead of you.")

choice1 = input("Do you go LEFT or RIGHT? ").lower()

if choice1 == "left":
    print("You walk down the left path and find a treasure chest!")
    choice2 = input("Do you OPEN it or LEAVE it? ").lower()
    
    if choice2 == "open":
        print("You found gold! You win!")
    else:
        print("You leave the cave empty-handed. Game over.")
        
elif choice1 == "right":
    print("You walk down the right path and encounter a sleeping dragon.")
    choice2 = input("Do you FIGHT it or SNEAK past? ").lower()
    
    if choice2 == "sneak":
        print("You successfully sneak past the dragon and escape! You win!")
    else:
        print("The dragon wakes up and... well, you lose.")
        
else:
    print("Invalid choice. Game over.")
\`\`\`

## Key Concepts Applied

**Conditional Logic:**
- Multiple if-elif-else statements
- Nested conditions
- String comparison

**User Input:**
- Getting choices from the user
- Converting to lowercase for easier comparison
- Handling invalid input

**Storytelling:**
- Creating engaging narratives
- Multiple story branches
- Clear outcomes

## Project Extensions

**For Advanced Students:**
- Add inventory system
- Include character stats (health, strength)
- Add random events
- Create multiple levels
- Save/load game state

## Resources

- Example: https://repl.it/talk/share/Text-Based-Adventure/124964

## Next Steps

In the next module, we'll learn about string methods and manipulation!`;

    return (
        <LessonPage
            title="Choose Your Own Adventure Game"
            moduleTitle="If-Else Statements"
            lessonNumber={6}
            content={content}
            prevLesson="/cs/python1/lesson5"
            nextLesson="/cs/python1/lesson7"
        />
    );
};

export default Lesson6; 
