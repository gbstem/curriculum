import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson15 = () => {
    const content = `# Day 3-4: Pokemon Battle Simulator

## Project Overview

Have the students create a (simple and text-based) battle simulator! Students can pick any pokemon, moves, etc that they want. Don't show them the code - just make sure students get the basic idea of the game, then add their own flair.

## Project Requirements

**Basic Requirements:**
- Two Pokemon with health points
- Multiple moves with different damage
- Turn-based combat system
- Health tracking and display
- Win/lose conditions

## Sample Game Structure

\`\`\`python
import random

print("Pokemon Battle Simulator!")
print("=" * 30)

# Pokemon data
pokemon1 = {"name": "Pikachu", "hp": 100, "moves": ["Thunderbolt", "Quick Attack", "Tackle"]}
pokemon2 = {"name": "Charmander", "hp": 100, "moves": ["Flamethrower", "Scratch", "Ember"]}

# Battle loop
while pokemon1["hp"] > 0 and pokemon2["hp"] > 0:
    print("\\n" + pokemon1["name"] + " HP:", pokemon1["hp"])
    print(pokemon2["name"] + " HP:", pokemon2["hp"])
    
    # Player 1 turn
    print("\\n" + pokemon1["name"] + "'s turn!")
    for i, move in enumerate(pokemon1["moves"]):
        print(str(i+1) + ".", move)
    
    choice = int(input("Choose move (1-3): ")) - 1
    damage = random.randint(20, 40)
    pokemon2["hp"] -= damage
    print(pokemon1["name"], "used", pokemon1["moves"][choice], "for", damage, "damage!")
    
    if pokemon2["hp"] <= 0:
        break
    
    # Player 2 turn
    print("\\n" + pokemon2["name"] + "'s turn!")
    for i, move in enumerate(pokemon2["moves"]):
        print(str(i+1) + ".", move)
    
    choice = int(input("Choose move (1-3): ")) - 1
    damage = random.randint(20, 40)
    pokemon1["hp"] -= damage
    print(pokemon2["name"], "used", pokemon2["moves"][choice], "for", damage, "damage!")

# Determine winner
if pokemon1["hp"] <= 0:
    print("\\n" + pokemon2["name"], "wins!")
else:
    print("\\n" + pokemon1["name"], "wins!")
\`\`\`

## Key Concepts Applied

**For Loops:**
- Displaying move options
- Iterating through Pokemon data

**While Loops:**
- Battle continuation until someone wins

**Dictionaries:**
- Storing Pokemon information
- Accessing move lists

**Random:**
- Damage calculation
- Battle unpredictability

## Resources

- Example: https://repl.it/talk/share/Pokemon-Project/118948
- Alternate Example: https://trinket.io/python/41d3d7a25cbb

## Next Steps

In the next module, we'll learn about lists!`;

    return (
        <LessonPage
            title="Pokemon Battle Simulator"
            moduleTitle="For Loops"
            lessonNumber={15}
            content={content}
            prevLesson="/cs/python1/lesson14"
            nextLesson="/cs/python1/lesson16"
        />
    );
};

export default Lesson15; 
