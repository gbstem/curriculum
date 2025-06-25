/* eslint-disable no-undef */
import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson19 = () => {
    const content = `# Day 5-6: Tiny Tower Project

## Project Overview

Students will create a text-based version of the Tiny Tower game (look up the app) using 2D arrays. Students may expand however they want to, but at the very least need to complete the basic function.

## Project Requirements

**Basic Requirements:**
- Multi-story building using 2D arrays
- Different room types on each floor
- Building management system
- Income generation
- Floor construction

## Sample Implementation

\`\`\`python
import random

class TinyTower:
    def __init__(self):
        self.floors = 5
        self.width = 3
        self.building = [["Empty" for _ in range(self.width)] for _ in range(self.floors)]
        self.money = 1000
        self.room_types = ["Apartment", "Office", "Restaurant", "Shop", "Entertainment"]
        
    def display_building(self):
        print("\\nTiny Tower - Money: $" + str(self.money))
        print("=" * 30)
        for floor in range(self.floors - 1, -1, -1):
            print(f"Floor {floor + 1}:", end=" ")
            for room in range(self.width):
                print(self.building[floor][room][:8].ljust(8), end=" ")
            print()
    
    def add_room(self, floor, room, room_type):
        if 0 <= floor < self.floors and 0 <= room < self.width:
            if self.building[floor][room] == "Empty":
                cost = 100
                if self.money >= cost:
                    self.building[floor][room] = room_type
                    self.money -= cost
                    print(f"Added {room_type} to floor {floor + 1}, room {room + 1}")
                else:
                    print("Not enough money!")
            else:
                print("Room is already occupied!")
        else:
            print("Invalid floor or room!")
    
    def collect_income(self):
        income = 0
        for floor in range(self.floors):
            for room in range(self.width):
                if self.building[floor][room] != "Empty":
                    income += random.randint(10, 50)
        self.money += income
        print(f"Collected ${income} in rent!")
    
    def play(self):
        while True:
            self.display_building()
            print("\\nActions:")
            print("1. Add room")
            print("2. Collect income")
            print("3. Quit")
            
            choice = input("Choose action (1-3): ")
            
            if choice == "1":
                floor = int(input("Enter floor (1-5): ")) - 1
                room = int(input("Enter room (1-3): ")) - 1
                print("Room types:", ", ".join(self.room_types))
                room_type = input("Enter room type: ")
                self.add_room(floor, room, room_type)
            elif choice == "2":
                self.collect_income()
            elif choice == "3":
                print("Thanks for playing!")
                break
            else:
                print("Invalid choice!")

# Start the game
game = TinyTower()
game.play()
\`\`\`

## Key Concepts Applied

**2D Arrays:**
- Building representation
- Floor and room management

**Classes:**
- Game state management
- Methods for different actions

**Random:**
- Income generation
- Game unpredictability

## Resources

- Example: https://replit.com/@nateeparryluff/Tiny-Tower-v2?v=1

## Next Steps

In the next module, we'll learn about dictionaries!`;

    return (
        <LessonPage
            title="Tiny Tower Project"
            moduleTitle="2D Arrays and Nested Iteration"
            lessonNumber={19}
            content={content}
            prevLesson="/cs/python1/lesson18"
            nextLesson="/cs/python1/lesson20"
        />
    );
};

export default Lesson19; 
