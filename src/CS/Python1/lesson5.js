import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson5 = () => {
    const content = `# Day 1: Comparison Operators & Logic

## Warm-Up (5-10 minutes)

How do you make the decision of what to wear outside?

Example: If it's warm and dry out, I wear flip flops. Else, if it's cold and rainy, I wear boots and a rain jacket. Else, I wear sneakers and a sweatshirt.

This introduces the concept of conditional decision-making.

## Interactive Lecture (20-25 minutes)

### Comparison Operators

**Basic Comparison Operators:**
\`\`\`python
# Equal to
x == 5    # True if x equals 5

# Not equal to
x != 5    # True if x does not equal 5

# Greater than
x > 5     # True if x is greater than 5

# Less than
x < 5     # True if x is less than 5

# Greater than or equal to
x >= 5    # True if x is greater than or equal to 5

# Less than or equal to
x <= 5    # True if x is less than or equal to 5
\`\`\`

**Important Examples:**
\`\`\`python
print(4 == 4.0)    # True
print(4 == "4")    # False (different types)
print(10 > 5)      # True
print(5 <= 5)      # True
\`\`\`

### Boolean Values

**Review Booleans:**
\`\`\`python
is_sunny = True
is_raining = False

# Comparison operators return boolean values
temperature = 75
is_warm = temperature > 70    # True
is_hot = temperature > 90     # False
\`\`\`

### If-Else Statements

**Basic Structure:**
\`\`\`python
if condition:
    # code to run if condition is True
    print("Condition is True")
else:
    # code to run if condition is False
    print("Condition is False")
\`\`\`

**Example with Weather:**
\`\`\`python
temperature = int(input("What's the temperature? "))

if temperature > 80:
    print("It's hot! Wear shorts and a t-shirt.")
elif temperature > 60:
    print("It's nice! Wear a light jacket.")
elif temperature > 40:
    print("It's cool! Wear a warm jacket.")
else:
    print("It's cold! Wear a heavy coat.")
\`\`\`

### Logical Operators

**AND Operator:**
\`\`\`python
# Both conditions must be True
is_sunny = True
is_warm = True

if is_sunny and is_warm:
    print("Perfect day for a picnic!")
\`\`\`

**OR Operator:**
\`\`\`python
# At least one condition must be True
is_weekend = True
is_holiday = False

if is_weekend or is_holiday:
    print("No school today!")
\`\`\`

**NOT Operator:**
\`\`\`python
# Inverts the boolean value
is_raining = True

if not is_raining:
    print("Let's go outside!")
else:
    print("Stay inside and read a book.")
\`\`\`

### Random Numbers

**Using randint():**
\`\`\`python
import random

# Generate a random number between 1 and 10
random_number = random.randint(1, 10)
print("Random number:", random_number)

# Generate a random number between 0 and 100
score = random.randint(0, 100)
print("Your score:", score)
\`\`\`

## Mini-Project: In Common Quiz (remainder of class)

**Project Overview:**
Make a program that asks the user a series of multiple choice questions. Count how many answers the user answers the same as the student or differently than the student, and at the end present them with the number of things they have in common.

**Sample Implementation:**
\`\`\`python
import random

print("Let's see how much we have in common!")
print("=" * 40)

# Questions and possible answers
questions = [
    "What's your favorite color? (red/blue/green/yellow)",
    "What's your favorite food? (pizza/burger/salad/pasta)",
    "What's your favorite season? (spring/summer/fall/winter)",
    "Do you prefer cats or dogs? (cats/dogs)",
    "What's your favorite subject? (math/science/english/history)"
]

# Student's answers (instructor can change these)
student_answers = ["blue", "pizza", "summer", "dogs", "math"]

# User's answers
user_answers = []

# Ask questions and get answers
for i in range(len(questions)):
    answer = input(questions[i] + " ").lower()
    user_answers.append(answer)

# Count common answers
common_count = 0
for i in range(len(questions)):
    if user_answers[i] == student_answers[i]:
        common_count += 1

# Display results
print("=" * 40)
print("Results:")
print("You answered", common_count, "questions the same as me!")
print("We have", common_count, "things in common!")

if common_count >= 3:
    print("We have a lot in common!")
elif common_count >= 1:
    print("We have some things in common!")
else:
    print("We're very different!")
\`\`\`

## Key Learning Objectives

**Students should understand:**
- How comparison operators work
- The difference between == and =
- How if-elif-else statements work
- How logical operators (and, or, not) work
- How to use random.randint()
- How to compare user input with expected values

## Common Mistakes to Watch For

- Using = instead of == for comparison
- Forgetting to convert input to appropriate type
- Not understanding that comparison operators return booleans
- Confusing and/or logic
- Not handling case sensitivity in string comparisons

## Resources

- https://www.w3schools.com/python/python_conditions.asp

## Next Steps

In the next lesson, we'll create a Choose Your Own Adventure game using if-else statements!`;

    return (
        <LessonPage
            title="Comparison Operators & Logic"
            moduleTitle="If-Else Statements"
            lessonNumber={5}
            content={content}
            prevLesson="/cs/python1/lesson4"
            nextLesson="/cs/python1/lesson6"
        />
    );
};

export default Lesson5; 
