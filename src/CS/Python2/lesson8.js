import React from 'react';
import LessonPage from '../../LessonPage';

const content = `
# Lesson 8: Recursion

## Warm-up (5-10 min)
- Ask: "What happens if you point a camera at a TV screen showing the camera's view?"
- Discuss how this creates an infinite loop of reflections.
- Ask: "Have you ever seen Russian nesting dolls? Each doll contains a smaller one inside."
- Explain that recursion in programming is similar - a function that calls itself.

## Interactive Lecture (15-20 min)
- Explain: **Recursion** is when a function calls itself to solve a smaller version of the same problem.
- Every recursive function needs two parts:
  1. **Base condition** - when to stop calling itself
  2. **Recursive step** - how the function calls itself with a smaller input

### Poll Activity
Start with a quick poll: "What do you think happens if a function calls itself over and over again?"
- A. It keeps going forever
- B. It stops when a condition is met
- C. It crashes the program
- D. I'm not sure

**Discuss the results:** Guide students to understand that recursion needs a base condition to stop.

### Visual Comparison: Iterative vs Recursive
**Iterative Loop (using for/while):**
- Like walking up stairs - each step is one iteration
- Goes step by step until reaching the top

**Recursive Loop:**
- Like Russian nesting dolls - each doll contains a smaller one
- Keeps opening dolls until reaching the smallest one (base condition)

### Example: Recursive Sum Function
\`\`\`python
def recursive_sum(n):
    # Base condition - stop here!
    if n == 1:
        return 1
    # Recursive step - call itself with smaller input
    else:
        return n + recursive_sum(n-1)

# Test it out
result = recursive_sum(5)
print(f"Sum of 1 to 5: {result}")  # Output: 15
\`\`\`

**Ask students:**
- What happens when we call \`recursive_sum(5)\`?
- Why is the base condition \`if n == 1\` important?
- What would happen if we forgot the base condition?

### Step-by-Step Breakdown
Let's trace through \`recursive_sum(5)\`:
\`\`\`
recursive_sum(5) = 5 + recursive_sum(4)
recursive_sum(4) = 4 + recursive_sum(3)
recursive_sum(3) = 3 + recursive_sum(2)
recursive_sum(2) = 2 + recursive_sum(1)
recursive_sum(1) = 1  # Base condition reached!

Working backwards:
recursive_sum(2) = 2 + 1 = 3
recursive_sum(3) = 3 + 3 = 6
recursive_sum(4) = 4 + 6 = 10
recursive_sum(5) = 5 + 10 = 15
\`\`\`

## Mini-Project: Power Function
Create a recursive function that calculates x^y (x to the power of y).

**Example:** 2^3 = 2 × 2 × 2 = 8

### Step-by-Step Instructions:
1. Function signature: \`def power(x, y):\`
2. Base condition: When \`y == 0\`, return 1 (any number to the power of 0 is 1)
3. Recursive case: \`x * power(x, y-1)\`

### Sample Implementation:
\`\`\`python
def power(x, y):
    # Base condition
    if y == 0:
        return 1
    # Recursive step
    else:
        return x * power(x, y-1)

# Test examples
print(f"2^3 = {power(2, 3)}")  # Output: 8
print(f"5^2 = {power(5, 2)}")  # Output: 25
print(f"3^0 = {power(3, 0)}")  # Output: 1
\`\`\`

**Teacher Tips:**
- Have students trace through \`power(2, 3)\` step by step
- Ask: "Why does \`power(3, 0)\` return 1?"
- Challenge early finishers to create a recursive factorial function

### Tracing Power Function
Let's trace \`power(2, 3)\`:
\`\`\`
power(2, 3) = 2 * power(2, 2)
power(2, 2) = 2 * power(2, 1)
power(2, 1) = 2 * power(2, 0)
power(2, 0) = 1  # Base condition!

Working backwards:
power(2, 1) = 2 * 1 = 2
power(2, 2) = 2 * 2 = 4
power(2, 3) = 2 * 4 = 8
\`\`\`

## Sharing (5-10 min)
- Have students share their power function implementations
- Ask: "What was challenging about writing a recursive function?"
- Discuss different approaches and solutions

## Common Mistakes to Avoid:
1. **Forgetting the base condition** - causes infinite recursion
2. **Wrong base condition** - function never stops or gives wrong answer
3. **Not making progress toward base** - input doesn't get smaller each time

### Example of Infinite Recursion (DON'T DO THIS):
\`\`\`python
def bad_countdown(n):
    print(n)
    return bad_countdown(n)  # Never gets smaller!
\`\`\`

## Extension/Challenge Activities:
1. **Fibonacci Sequence:** Write a recursive function to find the nth Fibonacci number
2. **Countdown Function:** Create a recursive function that counts down from n to 1
3. **String Reversal:** Use recursion to reverse a string

### Fibonacci Challenge:
\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Test it
for i in range(6):
    print(f"F({i}) = {fibonacci(i)}")
\`\`\`

## Summary
- Recursion is when a function calls itself
- Always need a base condition to stop
- Each recursive call should work on a smaller problem
- Recursion can be elegant but also tricky to debug

## Further Reading
- [Python Recursion Examples](https://www.programiz.com/python-programming/recursion)
`;

const Lesson8 = () => (
  <LessonPage
    title="Recursion"
    moduleTitle="Algorithms"
    lessonNumber={8}
    content={content}
    prevLesson="/cs/python2/lesson7"
    nextLesson="/cs/python2/lesson9"
  />
);

export default Lesson8; 
