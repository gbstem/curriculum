import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson23 = () => {
    const content = `# Lesson 23: In-game Shop

## Module 11: Advanced Game Design in Scratch (bonus lessons) (continued)

## Interactive Lecture (15-20 minutes)

### Step 1: Understanding Currencies in Games

**What are currencies? What do you do with them?**
- Currencies are points, coins, or items you collect in a game
- You can use them to buy upgrades, unlock new features, or personalize your character

**How can games use currency systems?**
- Players earn currency by playing
- Spend currency in shops for power-ups, decorations, or new levels
- Currency adds goals and motivation

**How can the player gain currencies by playing the game?**
- Collecting coins or items
- Completing levels or challenges
- Defeating enemies

### Step 2: Project Overview

Have students choose one of their previously created games to build their own in-game shop into.

**Shop Ideas:**
- Upgrades/personalizations to the characters
- Decorations for the screen
- New levels to unlock

**This project can be used as an example of what an in-game shop would look like.**

## Project: In-game Shop (30-35 minutes)

### Requirements

**Basic Requirements:**
- A currency variable (coins, points, etc.)
- A shop screen or menu
- Items to buy with currency
- Deduct currency when items are purchased
- Add purchased items to the game

### Step-by-Step Development

1. **Create Currency System (10 minutes):**
   - Add a variable for currency (e.g., coins)
   - Increase currency when player collects items or completes tasks

**Currency System Code:**
\`\`\`scratch
when green flag clicked
set [coins v] to (0)
forever
  if <touching [coin v] ?> then
    change [coins v] by (1)
    play sound [collect v]
    delete this clone
  end
  wait (0.1) seconds
end
\`\`\`

2. **Create Shop Screen (10 minutes):**
   - Design a shop backdrop or menu
   - Add button sprites for items
   - Show current currency

**Shop Screen Code:**
\`\`\`scratch
when I receive [open shop v]
switch backdrop to [shop v]
show
say (join [Coins: ] (coins)) for (2) seconds
\`\`\`

3. **Implement Purchasing Logic (10 minutes):**
   - Deduct currency when item is bought
   - Add item to inventory or activate feature
   - Prevent purchase if not enough currency

**Purchasing Logic Code:**
\`\`\`scratch
when this sprite clicked
if <(coins) >= (item cost)> then
  change [coins v] by ((item cost) * (-1))
  broadcast [item purchased v]
  say [Purchased!] for (1) seconds
else
  say [Not enough coins!] for (1) seconds
end
\`\`\`

4. **Add Purchased Items to Game (5 minutes):**
   - Unlock new features, levels, or decorations
   - Show purchased items in inventory

**Unlock Feature Code:**
\`\`\`scratch
when I receive [item purchased v]
show
switch costume to [unlocked v]
say [New feature unlocked!] for (2) seconds
\`\`\`

### Advanced Features (for early finishers)

**Students can add these features to make their shops more interesting:**

1. **Multiple Items and Prices:**
\`\`\`scratch
when this sprite clicked
if <(coins) >= (item1 cost)> then
  change [coins v] by ((item1 cost) * (-1))
  broadcast [item1 purchased v]
end
if <(coins) >= (item2 cost)> then
  change [coins v] by ((item2 cost) * (-1))
  broadcast [item2 purchased v]
end
\`\`\`

2. **Inventory System:**
\`\`\`scratch
when I receive [item purchased v]
add [item name] to [inventory v]
say (join [Inventory: ] (inventory)) for (2) seconds
\`\`\`

3. **Shop Upgrades:**
\`\`\`scratch
when I receive [item purchased v]
change [shop level v] by (1)
say (join [Shop Level: ] (shop level)) for (2) seconds
\`\`\`

4. **Special Offers and Discounts:**
\`\`\`scratch
when green flag clicked
set [discount v] to (pick random (1) to (5))
if <(discount) = (1)> then
  set [item cost v] to ((item cost) - (1))
  say [Special offer! 1 coin off!] for (2) seconds
end
\`\`\`

### Teaching Tips

- Help students plan their shop items and prices
- Encourage students to test purchasing logic thoroughly
- Remind students to update currency and inventory correctly
- If students finish early, challenge them to add more shop features

## Key Learning Objectives

- Understand how to implement a currency system
- Know how to create a shop menu and purchase logic
- Be able to add purchased items to the game
- Understand how to manage inventory and upgrades
- Know how to design engaging shop experiences

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may forget to deduct currency after purchase
- Some may not prevent purchases with insufficient funds
- Students might not update inventory correctly
- Some may not test all shop features

**Teaching Tips:**
- Always emphasize the importance of testing shop logic
- Show students how to use variables for inventory and upgrades
- Encourage students to start simple and add complexity
- Help students who struggle with menu design

## Resources

- [Scratch Shop Examples](https://scratch.mit.edu/explore/projects/tag:shop)
- [Inventory System Tutorial](https://scratch.mit.edu/help/videos/)
- [Game Economy Design](https://scratch.mit.edu/help/scratch/2.0/Game_Design)

## Next Steps

In the next lesson, we'll learn about remixing and independent exploration!`;

    return (
        <LessonPage
            title="In-game Shop"
            moduleTitle="Advanced Game Design in Scratch (bonus lessons) (continued)"
            lessonNumber={23}
            content={content}
            prevLesson="/cs/scratch/lesson22"
            nextLesson="/cs/scratch/lesson24"
            backToCurriculum="/cs/scratch"
        />
    );
};

export default ScratchLesson23; 
