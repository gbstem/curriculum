import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson21 = () => {
    const content = `# Day 2: Shopping Game

## Project Overview

Create a dictionary with certain items in a store, and the amount of each item. User will be able to shop and items should be updated every time the user buys something. Students should feel free to expand on this game any way they choose, but the basic mechanism should stay the same, and dictionaries should be used.

## Project Requirements

**Basic Requirements:**
- Store inventory as a dictionary
- User can buy items
- Update inventory after each purchase
- Display inventory after each transaction
- End game when all items are sold out

## Sample Implementation

\`\`\`python
store = {"apple": 5, "banana": 3, "orange": 4}

print("Welcome to the Shopping Game!")
print("=" * 30)

while True:
    print("\nCurrent inventory:")
    for item, amount in store.items():
        print(item + ":", amount)
    
    choice = input("What would you like to buy? (type 'exit' to quit): ").lower()
    if choice == "exit":
        print("Thanks for shopping!")
        break
    
    if choice in store and store[choice] > 0:
        store[choice] -= 1
        print("You bought a", choice + "!")
    else:
        print("Sorry, that item is not available or sold out.")
    
    # Check if all items are sold out
    if all(amount == 0 for amount in store.values()):
        print("All items are sold out! Game over.")
        break
\`\`\`

## Key Concepts Applied

**Dictionaries:**
- Inventory management
- Key-value updates
- Looping through items

**User Input:**
- Case-insensitive input
- Exit condition

**Game Logic:**
- End game when inventory is empty
- Error handling for unavailable items

## Resources

- Example: https://repl.it/talk/share/Shopping-Simulator/124990

## Next Steps

In the next module, we'll learn about libraries!`;

    return (
        <LessonPage
            title="Shopping Game"
            moduleTitle="Dictionaries"
            lessonNumber={21}
            content={content}
            prevLesson="/cs/python1/lesson20"
            nextLesson="/cs/python1/lesson22"
        />
    );
};

export default Lesson21; 
