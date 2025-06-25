import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson10 = () => {
    const content = `# Day 2: Calculator Project

## Project Overview

Have the students create functions for addition, subtraction, multiplication, division, and modulus. Ask the user what operation they would like to complete, numbers to complete it with, and complete it. Additionally, students should add more functions to their calculator (squaring the number, taking the square root of the number) once their calculator works.

## Project Requirements

**Basic Requirements:**
- Functions for basic operations (+, -, *, /, %)
- User input for operation choice
- User input for two numbers
- Display result clearly
- Additional functions (square, square root)

## Sample Implementation

\`\`\`python
import math

print("Python Calculator")
print("=" * 20)

# Basic operation functions
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Error: Cannot divide by zero"
    return a / b

def modulus(a, b):
    if b == 0:
        return "Error: Cannot divide by zero"
    return a % b

# Additional functions
def square(a):
    return a ** 2

def square_root(a):
    if a < 0:
        return "Error: Cannot take square root of negative number"
    return math.sqrt(a)

# Main calculator loop
while True:
    print("\\nOperations:")
    print("1. Addition (+)")
    print("2. Subtraction (-)")
    print("3. Multiplication (*)")
    print("4. Division (/)")
    print("5. Modulus (%)")
    print("6. Square (x²)")
    print("7. Square Root (√x)")
    print("8. Exit")
    
    choice = input("\\nChoose an operation (1-8): ")
    
    if choice == "8":
        print("Goodbye!")
        break
    
    if choice in ["1", "2", "3", "4", "5"]:
        num1 = float(input("Enter first number: "))
        num2 = float(input("Enter second number: "))
        
        if choice == "1":
            result = add(num1, num2)
            print(f"{num1} + {num2} = {result}")
        elif choice == "2":
            result = subtract(num1, num2)
            print(f"{num1} - {num2} = {result}")
        elif choice == "3":
            result = multiply(num1, num2)
            print(f"{num1} * {num2} = {result}")
        elif choice == "4":
            result = divide(num1, num2)
            print(f"{num1} / {num2} = {result}")
        elif choice == "5":
            result = modulus(num1, num2)
            print(f"{num1} % {num2} = {result}")
            
    elif choice in ["6", "7"]:
        num = float(input("Enter a number: "))
        
        if choice == "6":
            result = square(num)
            print(f"{num}² = {result}")
        elif choice == "7":
            result = square_root(num)
            print(f"√{num} = {result}")
            
    else:
        print("Invalid choice! Please try again.")
\`\`\`

## Advanced Extension: Multiple Calculations

**For students who want to expand:**
\`\`\`python
# Global variable to store running total
running_total = 0

def add_to_total(a):
    global running_total
    running_total += a
    return running_total

def reset_total():
    global running_total
    running_total = 0
    return running_total

# Add these options to the main menu
print("9. Add to running total")
print("10. Reset running total")
print("11. Show running total")

# Add these cases to the main loop
elif choice == "9":
    num = float(input("Enter number to add: "))
    result = add_to_total(num)
    print(f"Running total: {result}")
elif choice == "10":
    result = reset_total()
    print(f"Total reset to: {result}")
elif choice == "11":
    print(f"Current running total: {running_total}")
\`\`\`

## Key Concepts Applied

**Functions:**
- Function definition and calling
- Parameters and return values
- Multiple functions working together

**Error Handling:**
- Division by zero checks
- Invalid input validation
- Negative number handling for square root

**User Interface:**
- Menu-driven program
- Clear input/output
- Loop for continuous operation

**Advanced Concepts:**
- Global variables (for running total)
- Math library usage
- Complex conditional logic

## Project Extensions

**For Advanced Students:**
- Add more mathematical functions (power, factorial, etc.)
- Implement memory functions (M+, M-, MR, MC)
- Add scientific calculator functions
- Create a graphical interface
- Add history of calculations

## Teaching Tips

**Before Starting:**
- Review function concepts from previous lesson
- Discuss real-world calculator usage
- Show examples of different operations

**During Development:**
- Start with basic operations first
- Add error handling incrementally
- Encourage students to test edge cases
- Let students choose their own additional functions

**Common Issues:**
- Forgetting to import math library
- Not handling division by zero
- Confusing function parameters
- Not using global keyword correctly

## Resources

- Example: https://repl.it/talk/share/Calculator-Project/124983
- Example: https://trinket.io/python/d01ad62c8776

## Next Steps

In the next module, we'll learn about while loops!`;

    return (
        <LessonPage
            title="Calculator Project"
            moduleTitle="Functions"
            lessonNumber={10}
            content={content}
            prevLesson="/cs/python1/lesson9"
            nextLesson="/cs/python1/lesson11"
        />
    );
};

export default Lesson10; 
