import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson9 = () => {
    const content = `# Day 1: Function Basics

## Interactive Lecture (10-15 minutes)

### Introduction to Functions

**What are Functions?**
Functions are reusable blocks of code that perform specific tasks. They help us avoid repeating code and make our programs more organized.

**Basic Function Syntax:**
\`\`\`python
def function_name():
    # code to run
    print("Hello from a function!")

# Call the function
function_name()
\`\`\`

**Simple Example:**
\`\`\`python
def say_hello():
    print("Hello!")
    print("How are you?")

# Call the function multiple times
say_hello()
say_hello()
\`\`\`

### Parameters

**What are Parameters?**
Parameters are placeholders that allow us to pass data into functions. They are NOT variables - they receive values when the function is called.

**Function with Parameters:**
\`\`\`python
def greet(name):
    print("Hello, " + name + "!")

# Call with different values
greet("Alice")
greet("Bob")
greet("Charlie")
\`\`\`

**Multiple Parameters:**
\`\`\`python
def add_numbers(a, b):
    result = a + b
    print("The sum is:", result)

add_numbers(5, 3)    # The sum is: 8
add_numbers(10, 20)  # The sum is: 30
\`\`\`

**Important:** Emphasize that parameters are placeholders, not variables. Students will get confused about variables vs parameters, so give lots of examples.

### Return Values

**What is Returning?**
Functions can send data back to the code that called them using the return statement.

**Function with Return:**
\`\`\`python
def add_numbers(a, b):
    result = a + b
    return result

# Store the returned value
sum_result = add_numbers(5, 3)
print(sum_result)  # 8

# Use the returned value in calculations
total = add_numbers(10, 20) + 5
print(total)  # 35
\`\`\`

**Printing vs Returning:**
\`\`\`python
# Function that prints
def print_sum(a, b):
    print(a + b)

# Function that returns
def return_sum(a, b):
    return a + b

# Using print function
print_sum(5, 3)  # Prints: 8

# Using return function
result = return_sum(5, 3)  # Stores 8 in result
print(result)  # Prints: 8
\`\`\`

## Mini-Project: String Manipulation Function (remainder of class)

**Project Overview:**
Create a function that takes in a string and an int n. Create a string that prints the last n letters of the inputted string, and then the rest of the string.

**Sample Implementation:**
\`\`\`python
def moveToEnd(str_input, n):
    s1 = str_input[n:] + str_input[:n]
    return s1

# Test the function
test_string = "Hello"
result = moveToEnd(test_string, 2)
print(result)  # "lloHe"

# Test with different inputs
print(moveToEnd("Python", 3))  # "honPyt"
print(moveToEnd("Programming", 4))  # "rammingProg"
\`\`\`

**Alternative Implementation (with user input):**
\`\`\`python
def moveToEnd(str_input, n):
    s1 = str_input[n:] + str_input[:n]
    return s1

# Get input from user
user_string = input("Enter a string: ")
user_number = int(input("Enter a number: "))

# Use the function
result = moveToEnd(user_string, user_number)
print("Result:", result)
\`\`\`

## Key Learning Objectives

**Students should understand:**
- What functions are and why we use them
- How to define and call functions
- How parameters work (as placeholders)
- The difference between printing and returning
- How to use return values in other calculations
- The concept of reusability

## Common Mistakes to Watch For

- Confusing parameters with variables
- Forgetting to call the function after defining it
- Not understanding the difference between print and return
- Forgetting the colon after the function definition
- Not indenting the function body properly

## Teaching Tips

**Emphasize:**
- Functions are reusable blocks of code
- Parameters are placeholders, not variables
- Return sends data back, print displays data
- Functions must be called to run
- Proper indentation is crucial

## Next Steps

In the next lesson, we'll create a Calculator project using multiple functions!`;

    return (
        <LessonPage
            title="Function Basics"
            moduleTitle="Functions"
            lessonNumber={9}
            content={content}
            prevLesson="/cs/python1/lesson8"
            nextLesson="/cs/python1/lesson10"
        />
    );
};

export default Lesson9; 
