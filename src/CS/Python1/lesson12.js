import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson12 = () => {
    const content = `# Day 2: Trivia Game

## Project Overview

Create at least 10 trivia questions, and prompt the user. Count how many the user gets right, and if they get a score above 70%, they win! If the user fails, they have to redo the trivia quiz until they win.

## Project Requirements

**Basic Requirements:**
- At least 10 trivia questions
- Track correct answers
- Calculate percentage score
- Retry until 70% or higher
- Randomize question order

## Sample Implementation

\`\`\`python
import random

print("Welcome to the Trivia Game!")
print("=" * 30)

# Questions and answers
questions = [
    "What is the capital of France?",
    "How many planets are in our solar system?",
    "What is 2 + 2?",
    "What color is the sky?",
    "What is the largest ocean on Earth?",
    "How many days are in a week?",
    "What is the opposite of hot?",
    "What animal says 'meow'?",
    "What is the main ingredient in bread?",
    "How many fingers do you have on one hand?"
]

answers = [
    "paris",
    "8",
    "4",
    "blue",
    "pacific",
    "7",
    "cold",
    "cat",
    "flour",
    "5"
]

# Randomize questions
question_indices = list(range(len(questions)))
random.shuffle(question_indices)

correct = 0
total = len(questions)

for i in question_indices:
    print("\\nQuestion:", questions[i])
    user_answer = input("Your answer: ").lower()
    
    if user_answer == answers[i]:
        print("Correct!")
        correct += 1
    else:
        print("Wrong! The correct answer was:", answers[i])

# Calculate score
percentage = (correct / total) * 100
print("\\n" + "=" * 30)
print("Final Score:", correct, "out of", total)
print("Percentage:", percentage, "%")

if percentage >= 70:
    print("Congratulations! You win!")
else:
    print("You need 70% to win. Try again!")
\`\`\`

## Key Concepts Applied

**While Loops:**
- Retry mechanism until success
- Score tracking and calculation

**Lists and Random:**
- Question/answer pairs
- Randomizing question order

**Conditional Logic:**
- Score checking
- Win/lose conditions

## Resources

- Example: https://repl.it/talk/share/Trivia-Game/124997

## Next Steps

In the next lesson, we'll create a Caesar Cipher project!`;

    return (
        <LessonPage
            title="Trivia Game"
            moduleTitle="While Loops"
            lessonNumber={12}
            content={content}
            prevLesson="/cs/python1/lesson11"
            nextLesson="/cs/python1/lesson13"
        />
    );
};

export default Lesson12; 
