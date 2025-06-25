import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson16 = () => {
    const content = `# Day 1: List Basics

## Interactive Lecture (20-25 minutes)

### Introduction to Lists

**What are Lists?**
Lists are collections of data that can store multiple values in a single variable. They're like containers that can hold many items.

**Uses of Lists:**
- Storing multiple related values
- Processing collections of data
- Creating games and applications
- Managing user data

### Creating Lists

**Basic List Creation:**
\`\`\`python
# Empty list
my_list = []

# List with values
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = ["hello", 42, True, 3.14]
\`\`\`

**Ask students to create their own lists:**
\`\`\`python
# Examples for students to try
favorite_colors = ["blue", "red", "green"]
test_scores = [95, 87, 92, 78]
class_names = ["Alice", "Bob", "Charlie"]
\`\`\`

### Accessing List Elements

**Indexing (same as strings):**
\`\`\`python
fruits = ["apple", "banana", "orange"]

print(fruits[0])    # "apple" (first element)
print(fruits[1])    # "banana" (second element)
print(fruits[-1])   # "orange" (last element)
\`\`\`

**Length of Lists:**
\`\`\`python
fruits = ["apple", "banana", "orange"]
length = len(fruits)
print("Number of fruits:", length)  # 3
\`\`\`

**Important:** Don't just show them - ask students how they would apply index and length to lists. It's the exact same as strings, so give them that hint if they get confused.

### List Methods

**Adding Elements:**
\`\`\`python
fruits = ["apple", "banana"]

# Append (add to end)
fruits.append("orange")
print(fruits)  # ["apple", "banana", "orange"]

# Insert (add at specific position)
fruits.insert(1, "grape")
print(fruits)  # ["apple", "grape", "banana", "orange"]
\`\`\`

**Removing Elements:**
\`\`\`python
fruits = ["apple", "banana", "orange", "grape"]

# Remove (by value)
fruits.remove("banana")
print(fruits)  # ["apple", "orange", "grape"]

# Pop (by index, returns the removed item)
removed = fruits.pop(1)
print("Removed:", removed)  # "orange"
print(fruits)  # ["apple", "grape"]

# Del (by index)
del fruits[0]
print(fruits)  # ["grape"]
\`\`\`

**Other Useful Methods:**
\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# Sort (in place)
numbers.sort()
print(numbers)  # [1, 1, 2, 3, 4, 5, 6, 9]

# Reverse (in place)
numbers.reverse()
print(numbers)  # [9, 6, 5, 4, 3, 2, 1, 1]
\`\`\`

## Mini-Project: List Iterator (remainder of class)

**Project Overview:**
Have students print out each item in a list. Iterating through lists can be confusing to students at first (even though it's the same as iterating through a string) so this can be helpful.

**Sample Implementation:**
\`\`\`python
# Create a list
li = ["hello", "hi", "ciao", "hola"]

# Method 1: Using range and len
for i in range(len(li)):
    print(li[i])

# Method 2: Direct iteration
for word in li:
    print(word)

# Method 3: With index
for i, word in enumerate(li):
    print("Word", i, ":", word)
\`\`\`

**Expected Output:**
\`\`\`
hello
hi
ciao
hola
\`\`\`

## Key Learning Objectives

**Students should understand:**
- What lists are and how to create them
- How to access list elements using indexing
- How to use list methods (append, remove, pop, etc.)
- How to iterate through lists
- The difference between lists and individual variables

## Common Mistakes to Watch For

- Confusing list indexing with string indexing
- Forgetting that lists are mutable (can be changed)
- Not understanding that some methods modify the list in place
- Confusing append() with insert()
- Trying to access index that doesn't exist

## Teaching Tips

**Emphasize:**
- Lists can hold multiple values
- Indexing works the same as strings (starting from 0)
- Lists are mutable (can be changed after creation)
- Different methods for different purposes
- Lists can contain any type of data

## Resources

- https://www.w3schools.com/python/python_lists.asp

## Next Steps

In the next lesson, we'll create a Tic Tac Toe game using lists!`;

    return (
        <LessonPage
            title="List Basics"
            moduleTitle="Lists"
            lessonNumber={16}
            content={content}
            prevLesson="/cs/python1/lesson15"
            nextLesson="/cs/python1/lesson17"
        />
    );
};

export default Lesson16; 
