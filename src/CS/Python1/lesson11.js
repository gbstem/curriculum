import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson11 = () => {
    const content = `# Day 1: While Loop Basics

## Warm-up (5-10 minutes)

If you wrote a cookbook, and steps 1-3 needed to be repeated 5 times, how would you do that? Would you write out steps 1-3 five times?

This introduces the concept of repetition and efficiency in programming.

## Interactive Lecture (20-25 minutes)

### Introduction to Loops

**What are Loops?**
Loops allow us to repeat code multiple times without writing it over and over. They make our programs more efficient and powerful.

**Uses of Loops:**
- Repeating actions
- Processing lists of data
- Creating games
- Validating user input
- Counting and accumulating values

### While Loops

**Basic While Loop Structure:**
\`\`\`python
while condition:
    # code to repeat
    print("This will repeat while condition is True")
\`\`\`

**Simple Example:**
\`\`\`python
count = 1
while count <= 5:
    print("Count is:", count)
    count += 1

print("Loop finished!")
\`\`\`

**Output:**
\`\`\`
Count is: 1
Count is: 2
Count is: 3
Count is: 4
Count is: 5
Loop finished!
\`\`\`

### Comparing While Loops to If-Else

**Similarity:**
Both while loops and if-else statements check a condition to decide what to do.

**Difference:**
- If-else: Check condition once, run code once
- While loop: Check condition repeatedly, run code multiple times

**Example Comparison:**
\`\`\`python
# If-else (runs once)
number = 5
if number > 0:
    print("Number is positive")

# While loop (runs multiple times)
number = 5
while number > 0:
    print("Number is:", number)
    number -= 1
\`\`\`

### The Break Keyword

**What is Break?**
The break keyword allows us to exit a loop early, even if the condition is still True.

**Example with Break:**
\`\`\`python
count = 1
while count <= 10:
    print("Count is:", count)
    
    if count == 5:
        print("Breaking at 5!")
        break
    
    count += 1

print("Loop finished!")
\`\`\`

**Output:**
\`\`\`
Count is: 1
Count is: 2
Count is: 3
Count is: 4
Count is: 5
Breaking at 5!
Loop finished!
\`\`\`

### If-Else Statements Within Loops

**Using Conditions Inside Loops:**
\`\`\`python
count = 1
while count <= 10:
    if count % 2 == 0:
        print(count, "is even")
    else:
        print(count, "is odd")
    count += 1
\`\`\`

**Multiple Conditions:**
\`\`\`python
number = 1
while number <= 20:
    if number % 3 == 0 and number % 5 == 0:
        print(number, "is divisible by both 3 and 5")
    elif number % 3 == 0:
        print(number, "is divisible by 3")
    elif number % 5 == 0:
        print(number, "is divisible by 5")
    else:
        print(number, "is not divisible by 3 or 5")
    number += 1
\`\`\`

## Mini-Project: Simple Counter (remainder of class)

**Project Overview:**
Create a program that counts from 1 to a user-specified number, with some interactive features.

**Sample Implementation:**
\`\`\`python
print("Welcome to the Counter Program!")
print("=" * 30)

# Get user input
max_number = int(input("Count up to what number? "))

# Validate input
if max_number <= 0:
    print("Please enter a positive number!")
else:
    count = 1
    while count <= max_number:
        print("Count:", count)
        
        # Ask user if they want to continue
        if count < max_number:
            continue_choice = input("Continue? (y/n): ").lower()
            if continue_choice != 'y':
                print("Stopping early!")
                break
        
        count += 1
    
    print("Counting finished!")
\`\`\`

## Key Learning Objectives

**Students should understand:**
- What loops are and why we use them
- How while loops work (check condition, run code, repeat)
- The difference between if-else and while loops
- How to use the break keyword
- How to combine loops with conditional statements
- The importance of updating loop variables

## Common Mistakes to Watch For

- Creating infinite loops (forgetting to update loop variable)
- Not understanding the loop condition
- Confusing while loops with if-else statements
- Forgetting to initialize loop variables
- Not using break appropriately

## Teaching Tips

**Emphasize:**
- Loops make code more efficient
- While loops check conditions repeatedly
- Always update loop variables to avoid infinite loops
- Break can exit loops early
- Loops can contain any code, including if-else statements

## Next Steps

In the next lesson, we'll create a Trivia Game using while loops!`;

    return (
        <LessonPage
            title="While Loop Basics"
            moduleTitle="While Loops"
            lessonNumber={11}
            content={content}
            prevLesson="/cs/python1/lesson10"
            nextLesson="/cs/python1/lesson12"
        />
    );
};

export default Lesson11; 
