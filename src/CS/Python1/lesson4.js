import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson4 = () => {
    const content = `# Day 4: Restaurant Simulator Project

## Project Overview

Create a menu of at least three foods, and ask the user how much of each they'd like to purchase. Set a price for each item, and when the user is done ordering, print their total with and without tax. Then ask the user how much they'd like to tip (in percent). Then, apply that to the total.

## Project Requirements

**Basic Requirements:**
- Create a menu with at least 3 food items
- Ask user for quantity of each item
- Calculate subtotal
- Add tax (use a reasonable tax rate like 8.5%)
- Ask for tip percentage
- Calculate final total with tip
- Display all calculations clearly

## Sample Implementation

\`\`\`python
print("Welcome to Python Restaurant!")
print("=" * 30)

# Menu items and prices
menu = {
    "Burger": 12.99,
    "Pizza": 15.99,
    "Salad": 8.99,
    "Fries": 4.99
}

# Display menu
print("Our Menu:")
for item, price in menu.items():
    print(item + ": $" + str(price))

print("=" * 30)

# Get user orders
total = 0
for item, price in menu.items():
    quantity = int(input("How many " + item + "s would you like? "))
    item_total = price * quantity
    total += item_total
    print(str(quantity) + " " + item + "(s): $" + str(item_total))

# Calculate tax
tax_rate = 0.085  # 8.5%
tax = total * tax_rate

print("=" * 30)
print("Subtotal: $" + str(total))
print("Tax (8.5%): $" + str(tax))
print("Total with tax: $" + str(total + tax))

# Get tip
tip_percent = float(input("What percentage would you like to tip? "))
tip = (total + tax) * (tip_percent / 100)

# Final total
final_total = total + tax + tip

print("=" * 30)
print("Tip (" + str(tip_percent) + "%): $" + str(tip))
print("Final Total: $" + str(final_total))
print("Thank you for dining with us!")
\`\`\`

## Key Concepts Applied

**Variables and Data Types:**
- Using integers for quantities
- Using floats for prices and calculations
- Using strings for menu items

**Input and Output:**
- Getting user input with input()
- Converting input to appropriate data types
- Formatting output with string concatenation

**Mathematical Operations:**
- Multiplication for item totals
- Addition for running totals
- Percentage calculations for tax and tip

**String Formatting:**
- Using string concatenation for clean output
- Converting numbers to strings for display

## Project Extensions

**For Advanced Students:**
- Add a discount system (e.g., 10% off orders over $50)
- Implement a loyalty program
- Add multiple tax rates for different items
- Create a receipt that can be saved to a file
- Add input validation (no negative quantities)

## Teaching Tips

**Before Starting:**
- Review the concepts from previous lessons
- Discuss real-world applications of this project
- Show examples of restaurant receipts

**During Development:**
- Encourage students to plan their menu first
- Have them test with different quantities
- Remind them to handle edge cases (zero quantities, etc.)

**Common Issues:**
- Forgetting to convert input to integers/floats
- Not formatting currency properly
- Confusing percentage calculations
- Not handling division by zero for tip calculations

## Resources

- Example: https://trinket.io/python/0c791ecedcb1
- Example: https://repl.it/talk/share/Restaurant-Simulator/124916

## Next Steps

In the next module, we'll learn about conditional logic with if-else statements!`;

    return (
        <LessonPage
            title="Restaurant Simulator Project"
            moduleTitle="Fundamentals"
            lessonNumber={4}
            content={content}
            prevLesson="/cs/python1/lesson3"
            nextLesson="/cs/python1/lesson5"
        />
    );
};

export default Lesson4; 
