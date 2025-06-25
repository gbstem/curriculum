import React from 'react';
import LessonPage from '../../LessonPage';

const content = `
# Lesson 17: Final Project — Research & Build

## Warm-up (5-10 min)
- Ask: "What was your favorite topic or project this semester?"
- Discuss: What would you like to explore or build for your final project?

## Project Planning (15-20 min)
- Brainstorm project ideas as a class or in small groups
- Encourage students to pick a topic that excites them (games, data science, machine learning, etc.)
- Remind students to use concepts from throughout the course: functions, classes, algorithms, data science, etc.

### Example Project Ideas
- Create a game using classes and functions (e.g., Tic Tac Toe, Hangman)
- Analyze a dataset and make predictions (e.g., weather, sports, grades)
- Build a simple chatbot or text-based adventure
- Use machine learning to classify images or text

## Project Proposal
1. Write a short description of your project idea
2. List the main features you want to include
3. Identify what concepts from the course you will use
4. Plan your timeline: What will you do each day/week?

**Sample Proposal:**
\`\`\`
Project: Movie Recommendation System
- Features: User inputs favorite genres, system suggests movies
- Concepts: Functions, dictionaries, file I/O, basic ML (optional)
- Timeline: Day 1 — Plan and set up; Day 2 — Build core features; Day 3 — Add recommendations; Day 4 — Polish and test
\`\`\`

## Building the Project (25-40 min)
- Students work on their projects individually or in pairs
- Teacher circulates to answer questions, give feedback, and encourage debugging
- Remind students to test their code often and document their work

### Example: Game Project Skeleton
\`\`\`
class Game:
    def __init__(self):
        self.is_running = True
    def start(self):
        print("Welcome to the game!")
        # Add game logic here
    def end(self):
        print("Thanks for playing!")

game = Game()
game.start()
\`\`\`

### Example: Data Analysis Project Skeleton
\`\`\`
import pandas as pd
import matplotlib.pyplot as plt

data = pd.read_csv('mydata.csv')
print(data.head())

# Analyze and visualize data
plt.plot(data['column1'], data['column2'])
plt.show()
\`\`\`

### Example: Machine Learning Project Skeleton
\`\`\`
import tensorflow as tf
import numpy as np

# Prepare data
X = np.array([...])
y = np.array([...])

# Build and train model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(units=1, input_shape=[1])
])
model.compile(optimizer='sgd', loss='mean_absolute_error')
model.fit(X, y, epochs=10)

# Make predictions
prediction = model.predict([new_value])
print(f"Prediction: {prediction[0][0]}")
\`\`\`

## Sharing & Reflection (10-15 min)
- Invite students to present their projects to the class
- Encourage students to explain their code, challenges, and what they learned
- Celebrate creativity and effort!

## Teacher Tips
- Help students scope their projects to fit the available time
- Encourage documentation and clear code
- Remind students to use version control (save versions, use comments)
- Offer extra challenges for early finishers (add features, improve UI, etc.)

## Extension Activities
1. Research a new Python library and use it in your project
2. Collaborate with a classmate on a larger project
3. Prepare a short presentation or demo video

## Summary
- The final project is a chance to apply everything learned in Python 2
- Planning, building, testing, and sharing are all important steps
- Creativity, problem-solving, and persistence are key!

## Further Reading
- [Python Project Ideas](https://www.upgrad.com/blog/python-projects-ideas-topics-beginners/)
- [How to Document Your Code](https://realpython.com/documenting-python-code/)
`;

const Lesson17 = () => (
  <LessonPage
    title="Final Project: Research & Build"
    moduleTitle="Final Project"
    lessonNumber={17}
    content={content}
    prevLesson="/cs/python2/lesson16"
    nextLesson={null}
  />
);

export default Lesson17; 
