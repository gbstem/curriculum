import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson22 = () => {
    const content = `# Lesson 22: Platformer Game

## Module 11: Advanced Game Design in Scratch (bonus lessons) (continued)

## Interactive Lecture (15-20 minutes)

### Step 1: What is a Platformer?

**Ask: What do you think is a platformer?**

**Show students this sample platformer:** [Auralyst](https://scratch.mit.edu/projects/auralyst)

**Explain how this platformer, too, uses a physics engine.**
- Unlike Flappy Bird, this one has levels instead of a scrolling design
- Explain how to make levels using a level variable!

**Discussion Questions:**
- What makes platformers fun?
- What challenges do players face?
- How do levels work in platformers?

## Project: Platformer (30-35 minutes)

### Project Overview

Ask students to remix this project: [Sample platformer physics engine!](https://scratch.mit.edu/projects/auralyst)
They should make their own level-based platformer.

### Requirements

**Basic Requirements:**
- At least 5 levels
- Custom backdrops
- Some kind of challenge
- At least 2 custom features

### Step-by-Step Development

1. **Create the Player and Physics (10 minutes):**
   - Design or choose a player sprite
   - Implement gravity and jumping
   - Add collision detection with platforms

**Basic Platformer Physics Code:**
\`\`\`scratch
when green flag clicked
set [velocity y v] to (0)
set [gravity v] to (-0.5)
forever
  change [velocity y v] by (gravity)
  change y by (velocity y)
  if <touching [platform v] ?> then
    set [velocity y v] to (0)
    if <key [up arrow v] pressed?> then
      set [velocity y v] to (10)
      play sound [jump v]
    end
  end
  wait (0.1) seconds
end
\`\`\`

2. **Create Levels and Level Progression (10 minutes):**
   - Use a variable to track the current level
   - Change backdrops for each level
   - Add new challenges for each level

**Level Progression Code:**
\`\`\`scratch
when green flag clicked
set [level v] to (1)
switch backdrop to (join [level ] (level))
forever
  if <touching [goal v] ?> then
    change [level v] by (1)
    switch backdrop to (join [level ] (level))
    go to x: (start x) y: (start y)
  end
  wait (0.1) seconds
end
\`\`\`

3. **Add Challenges and Custom Features (10 minutes):**
   - Add moving platforms, enemies, or collectibles
   - Create custom blocks for reusable mechanics
   - Add sound and visual effects

**Moving Platform Code:**
\`\`\`scratch
when green flag clicked
go to x: (start x) y: (start y)
forever
  glide (2) secs to x: (end x) y: (end y)
  glide (2) secs to x: (start x) y: (start y)
end
\`\`\`

**Collectible Item Code:**
\`\`\`scratch
when green flag clicked
forever
  if <touching [player v] ?> then
    change [score v] by (1)
    play sound [collect v]
    hide
  end
  wait (0.1) seconds
end
\`\`\`

### Advanced Features (for early finishers)

**Students can add these features to make their platformers more interesting:**

1. **Enemies and Hazards:**
\`\`\`scratch
when green flag clicked
forever
  if <touching [enemy v] ?> then
    broadcast [game over v]
  end
  wait (0.1) seconds
end
\`\`\`

2. **Power-ups:**
\`\`\`scratch
when green flag clicked
forever
  if <touching [power up v] ?> then
    set [velocity y v] to (15)
    play sound [power up v]
    hide
  end
  wait (0.1) seconds
end
\`\`\`

3. **Teleporters:**
\`\`\`scratch
when green flag clicked
forever
  if <touching [teleporter v] ?> then
    go to x: (teleport x) y: (teleport y)
    play sound [teleport v]
  end
  wait (0.1) seconds
end
\`\`\`

4. **Level Timer:**
\`\`\`scratch
when green flag clicked
set [timer v] to (0)
forever
  change [timer v] by (1)
  wait (1) seconds
end
\`\`\`

### Teaching Tips

- Help students plan their level progression before coding
- Encourage students to test each level thoroughly
- Remind students to use variables for level and score
- If students finish early, challenge them to add more custom features

## Key Learning Objectives

- Understand how to implement platformer physics
- Know how to use variables for level progression
- Be able to create custom challenges and features
- Understand how to structure multi-level games
- Know how to remix and extend existing projects

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may make levels too hard or too easy
- Some may not test all level transitions
- Students might forget to reset player position between levels
- Some may not use variables consistently

**Teaching Tips:**
- Always emphasize the importance of playtesting
- Show students how to use the "step" button to debug level transitions
- Encourage students to start simple and add complexity
- Help students who struggle with level design

## Resources

- [Sample Platformer Physics Engine](https://scratch.mit.edu/projects/auralyst)
- [Platformer Game Examples](https://scratch.mit.edu/explore/projects/tag:platformer)
- [Level Design Tutorial](https://scratch.mit.edu/help/videos/)

## Next Steps

In the next lesson, we'll learn about in-game currencies and shops!`;

    return (
        <LessonPage
            title="Platformer Game"
            moduleTitle="Advanced Game Design in Scratch (bonus lessons) (continued)"
            lessonNumber={22}
            content={content}
            prevLesson="/cs/scratch1/lesson21"
            nextLesson="/cs/scratch1/lesson23"
            backToCurriculum="/cs/scratch1"
        />
    );
};

export default ScratchLesson22; 
