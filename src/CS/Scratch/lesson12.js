import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson12 = () => {
    const content = `# Lesson 12: Dodge the Obstacle Game

## Module 8: Clones and Broadcasting (continued)

## Interactive Lecture (15-20 minutes)

### Step 1: Understanding Dodgeball Mechanics

**What makes dodgeball a fun game?**
- Fast-paced action
- Quick reflexes needed
- Multiple objects to avoid
- Increasing difficulty
- Clear win/lose conditions

**Discussion Questions:**
- What makes a good dodgeball game?
- How can we make it challenging but fair?
- What elements create excitement?

### Step 2: Translating to Single-Player Environment

**How can we emulate that in a single-player scratch environment?**

**Key Elements:**
- Player-controlled character
- Randomly generating obstacles
- Collision detection
- Score tracking
- Increasing difficulty over time

**Group brainstorming session for a dodge the obstacle game:**
- What should the player control?
- How should obstacles move?
- What makes the game fun?
- How do we make it progressively harder?

### Step 3: Game Design Principles

**Tip:** This lesson + project may take longer, so you may want to assign more homework or potentially plan to use more class time another day.

**Essential Game Elements:**
- Clear player character
- Predictable but challenging obstacles
- Fair collision detection
- Visual feedback for hits
- Progressive difficulty scaling

## Project: Dodge the Obstacle Game (30-35 minutes)

### Project Overview

Students should make a game where there are randomly generating obstacles.

### Requirements

**Basic Requirements:**
- The obstacles should be clones
- There must be a score
- Something player-controlled needs to be dodging

### Step-by-Step Development

1. **Create the Player Character (10 minutes):**
   - Design or choose a player sprite
   - Program player movement (arrow keys or mouse)
   - Add collision detection

**Player Movement Code:**
\`\`\`scratch
when green flag clicked
go to x: (-200) y: (0)
forever
  if <key [up arrow v] pressed?> then
    change y by (5)
  end
  if <key [down arrow v] pressed?> then
    change y by (-5)
  end
  if <key [left arrow v] pressed?> then
    change x by (-5)
  end
  if <key [right arrow v] pressed?> then
    change x by (5)
  end
end
\`\`\`

2. **Create Obstacle System (15 minutes):**
   - Design obstacle sprites
   - Set up cloning system for obstacles
   - Program obstacle movement

**Obstacle Cloning Code:**
\`\`\`scratch
when green flag clicked
forever
  wait (pick random (1) to (3)) seconds
  create clone of [myself v]
end

when I start as a clone
go to x: (240) y: (pick random (-180) to (180))
set [speed v] to (pick random (3) to (8))
forever
  change x by ((speed) * (-1))
  if <(x position) < (-240)> then
    change [score v] by (1)
    delete this clone
  end
end
\`\`\`

3. **Add Collision Detection and Game Over (10 minutes):**
   - Detect when player hits obstacles
   - End game on collision
   - Display final score

**Collision Detection Code:**
\`\`\`scratch
when green flag clicked
set [lives v] to (3)
forever
  if <touching [obstacle v] ?> then
    change [lives v] by (-1)
    play sound [hit v]
    if <(lives) < (1)> then
      broadcast [game over v]
      stop [all v]
    end
  end
  wait (0.1) seconds
end

when I receive [game over v]
say (join [Game Over! Final Score: ] (score)) for (3) seconds
\`\`\`

### Advanced Features (for early finishers)

**If more comfortable, add these features:**

1. **More rounds with increasing difficulty:**
\`\`\`scratch
when green flag clicked
set [level v] to (1)
set [difficulty v] to (1)
forever
  if <(score) > ((level) * (10))> then
    change [level v] by (1)
    change [difficulty v] by (0.5)
    say (join [Level ] (level)) for (2) seconds
  end
end

when I start as a clone
set [speed v] to ((pick random (3) to (8)) * (difficulty))
\`\`\`

2. **Display the level on the screen:**
\`\`\`scratch
when green flag clicked
forever
  say (join [Level: ] (level))
end
\`\`\`

3. **Create a health bar:**
\`\`\`scratch
when green flag clicked
set [health v] to (100)
forever
  say (join [Health: ] (health))
end

when green flag clicked
forever
  if <touching [obstacle v] ?> then
    change [health v] by (-20)
    if <(health) < (1)> then
      broadcast [game over v]
    end
  end
  wait (0.1) seconds
end
\`\`\`

**Make it actually functional, you should start the game with a certain amount of health, and lose it when hit with objects.**

4. **Different objects could take away different amounts of health, or give you more health:**
\`\`\`scratch
when I start as a clone
set [obstacle type v] to (pick random (1) to (3))
if <(obstacle type) = (1)> then
  switch costume to [dangerous v]
  set [damage v] to (30)
else
  if <(obstacle type) = (2)> then
    switch costume to [very dangerous v]
    set [damage v] to (50)
  else
    switch costume to [health pack v]
    set [damage v] to (-20)
  end
end

when green flag clicked
forever
  if <touching [obstacle v] ?> then
    change [health v] by (damage)
    if <(damage) < (0)> then
      say [Health restored!] for (1) seconds
    end
    delete this clone
  end
  wait (0.1) seconds
end
\`\`\`

### Example Project

**Example project:** https://scratch.mit.edu/projects/280832011/editor/

### Teaching Tips

- Help students understand the cloning system for obstacles
- Encourage students to test collision detection thoroughly
- Remind students to balance difficulty with playability
- If students finish early, challenge them to add power-ups or different obstacle types

## Key Learning Objectives

- Understand how to create dynamic obstacle systems with cloning
- Know how to implement collision detection in games
- Be able to create progressive difficulty systems
- Understand how to manage game state and scoring
- Know how to create engaging gameplay mechanics

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may create obstacles that are too fast or too slow
- Some may not properly handle collision detection timing
- Students might forget to delete clones when they go off-screen
- Some may not balance the difficulty progression

**Teaching Tips:**
- Always emphasize the importance of testing gameplay balance
- Show students how to use variables to adjust difficulty
- Encourage students to start simple and add complexity
- Help students who struggle with clone management

## Resources

- [Dodge Game Examples](https://scratch.mit.edu/explore/projects/tag:dodge)
- [Scratch Game Design Guide](https://scratch.mit.edu/help/scratch/2.0/Game_Design)
- [Collision Detection Tutorial](https://scratch.mit.edu/help/videos/)

## Next Steps

In the next lesson, we'll learn about custom blocks and create a racecar game!`;

    return (
        <LessonPage
            title="Dodge the Obstacle Game"
            moduleTitle="Clones and Broadcasting (continued)"
            lessonNumber={12}
            content={content}
            prevLesson="/cs/scratch/lesson11"
            nextLesson="/cs/scratch/lesson13"
            backToCurriculum="/cs/scratch"
        />
    );
};

export default ScratchLesson12; 
