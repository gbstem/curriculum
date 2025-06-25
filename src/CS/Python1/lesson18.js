import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson18 = () => {
    const content = `# Day 3-4: 2D Arrays

## Interactive Lecture (30-40 minutes)

### Introduction to 2D Arrays

**What are 2D Arrays?**
2D arrays are arrays within arrays - they create a grid-like structure with rows and columns.

**Uses of 2D Arrays:**
- Game boards (chess, tic-tac-toe)
- Image processing
- Spreadsheet data
- Matrix operations
- Grid-based games

### Creating 2D Arrays

**Basic 2D Array Creation:**
\`\`\`python
# Method 1: List of lists
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Method 2: Using loops
rows = 3
cols = 3
grid = []
for i in range(rows):
    row = []
    for j in range(cols):
        row.append(0)
    grid.append(row)

# Method 3: List comprehension
grid = [[0 for j in range(cols)] for i in range(rows)]
\`\`\`

### Accessing 2D Array Elements

**Indexing in 2D Arrays:**
\`\`\`python
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Access element at row 1, column 2
print(grid[1][2])  # 6

# Access element at row 0, column 0
print(grid[0][0])  # 1

# Access element at row 2, column 1
print(grid[2][1])  # 8
\`\`\`

**Important Concept:** Array inside of an array concept (important to explain this well, as it can be very confusing for some students)

### Nested Iteration

**Loops Inside of Loops:**
\`\`\`python
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Print all elements
for row in grid:
    for element in row:
        print(element, end=" ")
    print()  # New line after each row

# Print with row and column indices
for i in range(len(grid)):
    for j in range(len(grid[i])):
        print(f"grid[{i}][{j}] = {grid[i][j]}")
\`\`\`

**Uses of Nested Iteration:**
- Processing grid data
- Matrix operations
- Game board manipulation
- Image processing

### Nested Iteration with Strings and Numbers

**Processing Different Data Types:**
\`\`\`python
# 2D array with mixed data
data = [
    [1, "a", 2],
    [3, "b", 4],
    [5, "c", 6]
]

# Process each element
for row in data:
    for element in row:
        if isinstance(element, int):
            print("Number:", element)
        elif isinstance(element, str):
            print("String:", element)
\`\`\`

## Mini-Project: Sorting 2D Array (remainder of class)

**Project Overview:**
Given a 2D array, one row with numbers and one row with letters, make a new array that sorts them by alphabetical order and then print it.

**Sample Implementation:**
\`\`\`python
# Given data
alphanum_list = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ['a', 'b', 'c', 'b', 'a', 'a', 'b', 'c', 'b', 'a']
]

print("Original data:")
for i in range(len(alphanum_list[0])):
    print(f"Number: {alphanum_list[0][i]}, Letter: {alphanum_list[1][i]}")

# Create pairs and sort by letter
pairs = []
for i in range(len(alphanum_list[0])):
    pairs.append([alphanum_list[0][i], alphanum_list[1][i]])

# Sort by letter (second element)
pairs.sort(key=lambda x: x[1])

print("\\nSorted by letter:")
for pair in pairs:
    print(f"Number: {pair[0]}, Letter: {pair[1]}")

# Extract just the numbers in sorted order
sorted_numbers = [pair[0] for pair in pairs]
print("\\nNumbers in sorted order:", sorted_numbers)
\`\`\`

**Expected Output:**
\`\`\`
Original data:
Number: 1, Letter: a
Number: 2, Letter: b
Number: 3, Letter: c
...

Sorted by letter:
Number: 1, Letter: a
Number: 5, Letter: a
Number: 6, Letter: a
Number: 10, Letter: a
...

Numbers in sorted order: [1, 5, 6, 10, 2, 4, 7, 9, 3, 8]
\`\`\`

## Key Learning Objectives

**Students should understand:**
- What 2D arrays are and how to create them
- How to access elements using two indices
- How nested iteration works
- How to process 2D arrays with loops
- The relationship between rows and columns

## Common Mistakes to Watch For

- Confusing row and column indices
- Not understanding nested structure
- Forgetting to use nested loops
- Confusing 2D arrays with regular lists
- Not handling different data types properly

## Teaching Tips

**Emphasize:**
- 2D arrays are lists within lists
- First index is row, second is column
- Nested loops are essential for processing
- Grid structure is common in programming
- Practice with simple examples first

## Resources

- Python Nested Loops
- Python - 2-D Array

## Next Steps

In the next lesson, we'll create a Tiny Tower project using 2D arrays!`;

    return (
        <LessonPage
            title="2D Arrays"
            moduleTitle="2D Arrays and Nested Iteration"
            lessonNumber={18}
            content={content}
            prevLesson="/cs/python1/lesson17"
            nextLesson="/cs/python1/lesson19"
        />
    );
};

export default Lesson18; 
