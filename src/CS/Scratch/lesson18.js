import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson18 = () => {
    const content = `# Lesson 18: Flappy Bird-inspired Game

## Module 11: Advanced Game Design in Scratch (bonus lessons)

## Interactive Lecture (15-20 minutes)

### Step 1: Sharing Previous Projects

**If you haven't already, ask students to share their last project:**
- What did they create?
- What challenges did they face?
- What are they most proud of?
- What would they like to improve?

### Step 2: Understanding Flappy Bird Mechanics

**Ask students to play this game:** Flappy Bird Game - Example

**Discussion Questions:**
- What makes this game fun?
- How does the bird move?
- What are the obstacles?
- How does the scoring work?

### Step 3: Analyzing Game Mechanics

**Explain how this is quite similar to the last project, except using sensors to detect if the bird touches a pipe.**

**Key Game Elements:**
- **Bird Physics:** Gravity pulls the bird down, space bar makes it jump
- **Pipe Obstacles:** Pipes move from right to left
- **Collision Detection:** Bird dies when touching pipes or ground
- **Scoring:** Points for passing through pipes
- **Difficulty:** Pipes get closer together over time

## Project: Flappy Bird-inspired Game (30-35 minutes)

### Project Overview

Students should create their own games with a moving background, inspired by this game!

### Requirements

**Basic Requirements:**
- Moving background
- Multiple sprites
- Randomly generating parts
- Thoughtful artistic choices & design
- A user-controlled sprite

### Step-by-Step Development

1. **Create the Bird Character (10 minutes):**
   - Design or choose a bird sprite
   - Program gravity and jumping mechanics
   - Add collision detection

**Basic Bird Physics Code:**
\`\`\`scratch
when green flag clicked
go to x: (-200) y: (0)
set [velocity v] to (0)
forever
  change [velocity v] by (-0.5) // Gravity
  change y by (velocity)
  if <key [space v] pressed?> then
    set [velocity v] to (8) // Jump
  end
  if <touching [edge v] ?> then
    broadcast [game over v]
  end
  wait (0.1) seconds
end
\`\`\`

2. **Create Pipe Obstacles (15 minutes):**
   - Design pipe sprites
   - Program pipe movement and generation
   - Add collision detection with pipes

**Pipe Generation and Movement Code:**
\`\`\`scratch
when green flag clicked
forever
  create clone of [myself v]
  wait (pick random (2) to (4)) seconds
end

when I start as a clone
go to x: (240) y: (pick random (-100) to (100))
set [gap position v] to (pick random (-50) to (50))
forever
  change x by (-3)
  if <(x position) < (-240)> then
    change [score v] by (1)
    delete this clone
  end
  wait (0.1) seconds
end
\`\`\`

3. **Add Scoring and Game Over (5 minutes):**
   - Track score when passing pipes
   - Handle game over conditions
   - Display final score

**Scoring and Game Over Code:**
\`\`\`scratch
when green flag clicked
set [score v] to (0)
forever
  say (join [Score: ] (score))
end

when I receive [game over v]
say (join [Game Over! Final Score: ] (score)) for (3) seconds
stop [all v]
\`\`\`

### Advanced Features (for early finishers)

**Students can add these features to make their game more engaging:**

1. **Moving Background:**
\`\`\`scratch
when green flag clicked
forever
  change x by (-2)
  if <(x position) < (-480)> then
    go to x: (480) y: (0)
  end
  wait (0.1) seconds
end
\`\`\`

2. **Sound Effects:**
\`\`\`scratch
when green flag clicked
forever
  if <key [space v] pressed?> then
    play sound [jump v]
  end
  if <touching [pipe v] ?> then
    play sound [hit v]
  end
  wait (0.1) seconds
end
\`\`\`

3. **Visual Effects:**
\`\`\`scratch
when green flag clicked
forever
  if <key [space v] pressed?> then
    set [color v] effect to (20)
  else
    set [color v] effect to (0)
  end
  wait (0.1) seconds
end
\`\`\`

4. **Difficulty Progression:**
\`\`\`scratch
when green flag clicked
set [level v] to (1)
forever
  if <(score) > ((level) * (5))> then
    change [level v] by (1)
    say (join [Level ] (level)) for (2) seconds
  end
end

when I start as a clone
set [speed v] to ((3) + ((level) * (0.5)))
forever
  change x by ((speed) * (-1))
  wait (0.1) seconds
end
\`\`\`

### Teaching Tips

- Help students understand the physics of gravity and jumping
- Encourage students to test their collision detection thoroughly
- Remind students to balance difficulty with playability
- If students finish early, challenge them to add power-ups or different obstacles

## Key Learning Objectives

- Understand how to implement basic physics in games
- Know how to create randomly generating obstacles
- Be able to implement collision detection for game mechanics
- Understand how to create engaging gameplay loops
- Know how to balance difficulty and fun in games

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may make the bird too fast or too slow
- Some may not properly handle collision detection timing
- Students might create pipes that are impossible to pass through
- Some may not test their game thoroughly

**Teaching Tips:**
- Always emphasize the importance of testing gameplay balance
- Show students how to adjust physics values for better feel
- Encourage students to playtest their games frequently
- Help students who struggle with physics implementation

## Resources

- [Flappy Bird Example](https://scratch.mit.edu/projects/example)
- [Physics in Scratch Guide](https://scratch.mit.edu/help/scratch/2.0/Physics)
- [Game Design Principles](https://scratch.mit.edu/help/scratch/2.0/Game_Design)

## Next Steps

In the next lesson, we'll improve our games with better graphics, sound effects, and leaderboards!`;

    return (
        <LessonPage
            title="Flappy Bird-inspired Game"
            moduleTitle="Advanced Game Design in Scratch (bonus lessons)"
            lessonNumber={18}
            content={content}
            prevLesson="/cs/scratch/lesson17"
            nextLesson="/cs/scratch/lesson19"
            backToCurriculum="/cs/scratch"
        />
    );
};

export default ScratchLesson18; 
