import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson13 = () => {
    const content = `# Lesson 13: Racecar Game with Custom Blocks

## Module 8: Clones and Broadcasting (continued)

## Interactive Lecture (15-20 minutes)

### Step 1: Understanding Custom Blocks (Functions)

**How do custom blocks (functions) work?**
- Custom blocks are reusable pieces of code
- They help organize and simplify complex programs
- You can create your own blocks with specific names
- Custom blocks can take input parameters
- They make code more readable and maintainable

**When might that be useful?**
- When you have code that repeats often
- When you want to organize related actions
- When you want to make your code easier to understand
- When you want to create reusable game mechanics

**How do these custom blocks take input?**
- Custom blocks can accept parameters (inputs)
- Parameters make blocks more flexible
- You can pass different values to the same block
- This allows for dynamic behavior

### Step 2: Creating Custom Blocks

**Basic Custom Block:**
\`\`\`scratch
define move car (speed)
change x by (speed)
play sound [engine v]

when green flag clicked
move car (10)
wait (1) seconds
move car (15)
\`\`\`

**Custom Block with Multiple Parameters:**
\`\`\`scratch
define accelerate (power) (duration)
repeat (duration)
  change x by (power)
  play sound [engine v]
  wait (0.1) seconds
end

when green flag clicked
accelerate (5) (10)
\`\`\`

### Step 3: Custom Blocks in Games

**Why Custom Blocks are Great for Games:**
- Organize different game actions
- Make code easier to debug
- Create reusable game mechanics
- Improve code readability

## Project: Racecar Game (25-30 minutes)

### Project Overview

Make some kind of race car game!

### Requirements

**Basic Requirements:**
- Point system
- The car should have animations and sounds
- Many different blocks to show off their skills
- Lots of custom features!

### Step-by-Step Development

1. **Create the Basic Car Movement (10 minutes):**
   - Design or choose a car sprite
   - Create custom blocks for movement
   - Add basic controls

**Basic Car Movement Code:**
\`\`\`scratch
define move forward (speed)
change x by (speed)
play sound [engine v]

define move backward (speed)
change x by ((speed) * (-1))
play sound [reverse v]

when green flag clicked
go to x: (-200) y: (0)
forever
  if <key [up arrow v] pressed?> then
    move forward (5)
  end
  if <key [down arrow v] pressed?> then
    move backward (3)
  end
  if <key [left arrow v] pressed?> then
    change y by (3)
  end
  if <key [right arrow v] pressed?> then
    change y by (-3)
  end
end
\`\`\`

2. **Add Racing Elements (10 minutes):**
   - Create track or obstacles
   - Add scoring system
   - Implement race mechanics

**Racing Game Code:**
\`\`\`scratch
define check finish line
if <(x position) > (200)> then
  change [score v] by (100)
  say [Lap Complete!] for (2) seconds
  go to x: (-200) y: (0)
end

define collect power up
change [score v] by (10)
play sound [collect v]
say [Power up!] for (1) seconds

when green flag clicked
set [score v] to (0)
forever
  check finish line
  if <touching [power up v] ?> then
    collect power up
  end
  wait (0.1) seconds
end
\`\`\`

3. **Add Advanced Features (5 minutes):**
   - Multiple car costumes for animation
   - Sound effects for different actions
   - Visual effects and particles

**Advanced Car Features:**
\`\`\`scratch
define car animation
switch costume to [normal v]
wait (0.1) seconds
switch costume to [speed v]
wait (0.1) seconds

define create exhaust
create clone of [exhaust v]

when green flag clicked
forever
  if <key [up arrow v] pressed?> then
    car animation
    create exhaust
  end
end

when I start as a clone
go to [car v]
set [life v] to (10)
forever
  change [life v] by (-1)
  change [ghost v] effect by (10)
  if <(life) < (1)> then
    delete this clone
  end
  wait (0.1) seconds
end
\`\`\`

### Advanced Features (for early finishers)

**If more comfortable, add these features:**

1. **Make it so the car moves backward (forever loop!) and you have to rapidly press a button to "overcome" the backward movement:**
\`\`\`scratch
when green flag clicked
set [backward force v] to (2)
forever
  change x by ((backward force) * (-1))
  if <key [space v] pressed?> then
    change x by (5)
    play sound [boost v]
  end
  wait (0.1) seconds
end
\`\`\`

2. **Add multiple cars that compete with you:**
\`\`\`scratch
when green flag clicked
create clone of [opponent car v]

when I start as a clone
go to x: (-200) y: (pick random (-100) to (100))
forever
  change x by (pick random (3) to (8))
  if <(x position) > (240)> then
    go to x: (-240) y: (pick random (-100) to (100))
  end
  wait (0.1) seconds
end
\`\`\`

3. **Add additional levels with different backgrounds:**
\`\`\`scratch
define change level (level number)
if <(level number) = (1)> then
  switch backdrop to [track 1 v]
  set [difficulty v] to (1)
else
  if <(level number) = (2)> then
    switch backdrop to [track 2 v]
    set [difficulty v] to (1.5)
  else
    switch backdrop to [track 3 v]
    set [difficulty v] to (2)
  end
end

when green flag clicked
set [current level v] to (1)
change level (current level)
forever
  if <(score) > ((current level) * (100))> then
    change [current level v] by (1)
    change level (current level)
    say (join [Level ] (current level)) for (2) seconds
  end
end
\`\`\`

4. **Also, different ranges of difficulty of opponents:**
\`\`\`scratch
when I start as a clone
set [opponent speed v] to ((pick random (3) to (8)) * (difficulty))
set [opponent skill v] to (pick random (1) to (3))
if <(opponent skill) = (1)> then
  switch costume to [slow car v]
else
  if <(opponent skill) = (2)> then
    switch costume to [medium car v]
  else
    switch costume to [fast car v]
  end
end
forever
  change x by (opponent speed)
  if <(x position) > (240)> then
    go to x: (-240) y: (pick random (-100) to (100))
  end
  wait (0.1) seconds
end
\`\`\`

### Teaching Tips

- Help students understand the benefits of custom blocks
- Encourage students to create meaningful block names
- Remind students to test their custom blocks thoroughly
- If students finish early, challenge them to add more custom blocks

## Key Learning Objectives

- Understand how custom blocks organize and simplify code
- Know how to create custom blocks with parameters
- Be able to use custom blocks in game development
- Understand how to create reusable game mechanics
- Know how to structure complex programs with custom blocks

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may forget to define custom blocks before using them
- Some may not understand parameter scope
- Students might create too many custom blocks unnecessarily
- Some may not test their custom blocks thoroughly

**Teaching Tips:**
- Always emphasize the importance of meaningful block names
- Show students how to use the "step" button to debug custom blocks
- Encourage students to start simple and add complexity
- Help students who struggle with parameter usage

## Resources

- [Custom Blocks Guide](https://scratch.mit.edu/help/scratch1/2.0/Custom_Blocks)
- [Racing Game Examples](https://scratch.mit.edu/explore/projects/tag:racing)
- [Game Development Tutorial](https://scratch.mit.edu/help/videos/)

## Next Steps

In the next lesson, we'll learn about moving landscapes and create dynamic backgrounds!`;

    return (
        <LessonPage
            title="Racecar Game with Custom Blocks"
            moduleTitle="Clones and Broadcasting (continued)"
            lessonNumber={13}
            content={content}
            prevLesson="/cs/scratch1/lesson12"
            nextLesson="/cs/scratch1/lesson14"
            backToCurriculum="/cs/scratch1"
        />
    );
};

export default ScratchLesson13; 
