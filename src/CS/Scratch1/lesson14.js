import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson14 = () => {
    const content = `# Lesson 14: Moving Landscape Project

## Module 9: Rehashing the Basics

## Interactive Lecture (15-20 minutes)

### Step 1: Understanding Motion Illusion

**How do you create the illusion of motion in Scratch?**
- Moving sprites across the screen
- Changing backdrops
- Using loops to create continuous movement
- Creating parallax effects (different speeds for different layers)

**Have students take a look at this example:**
Moving Landscape Project (Simplified): https://scratch.mit.edu/projects/525598190/

**Ask students to explain how they think these projects work:**
- What makes the landscape appear to move?
- How do the sprites create the illusion of depth?
- What role do loops play in the animation?

### Step 2: Analyzing the Example

**Show them how the example works:**
- Sprites move from right to left across the screen
- When sprites reach the left edge, they reset to the right
- Different sprites move at different speeds
- This creates the illusion of a moving landscape

**Explain how the example uses random generation:**
- Sprites appear at random positions on the right side
- Random timing between sprite creation
- Random variations in sprite appearance

### Step 3: Copying Scripts to Multiple Sprites

**Show how to copy scripts to multiple sprites to make it easier for them to make:**
- Select a sprite with working code
- Right-click and choose "duplicate"
- Modify the duplicated sprite's properties
- This saves time and ensures consistency

## Project: Moving Landscape Project (25-30 minutes)

### Project Overview

Ask students to make their own moving landscapes!

### Requirements

**At this level, they should be able to make many different versions very quickly:**

**Basic Requirements:**
- Students should make at least one moving landscape
- Multiple different sprites should move across the screen
- There should be some kind of random generation of where the sprites show up on the right side of the screen
- There should be multiple costumes in at least one sprite that the sprite switches between

### Step-by-Step Development

1. **Create the Background Sprites (10 minutes):**
   - Design or choose sprites for different landscape elements
   - Create multiple costumes for animation
   - Position sprites at different layers (foreground, middle, background)

**Basic Moving Sprite Code:**
\`\`\`scratch
when green flag clicked
go to x: (240) y: (pick random (-180) to (180))
forever
  change x by (-3)
  if <(x position) < (-240)> then
    go to x: (240) y: (pick random (-180) to (180))
  end
  wait (0.1) seconds
end
\`\`\`

2. **Add Multiple Layers (10 minutes):**
   - Create sprites for different landscape layers
   - Use different speeds for each layer
   - Create parallax effect

**Parallax Effect Code:**
\`\`\`scratch
when green flag clicked
go to x: (240) y: (pick random (-180) to (180))
forever
  change x by (-1)
  if <(x position) < (-240)> then
    go to x: (240) y: (pick random (-180) to (180))
  end
  wait (0.1) seconds
end

when green flag clicked
go to x: (240) y: (pick random (-180) to (180))
forever
  change x by (-5)
  if <(x position) < (-240)> then
    go to x: (240) y: (pick random (-180) to (180))
  end
  wait (0.1) seconds
end
\`\`\`

3. **Add Animation and Random Generation (5 minutes):**
   - Switch between costumes for animated sprites
   - Add random timing for sprite appearance
   - Create variety in the landscape

**Animated Sprite Code:**
\`\`\`scratch
when green flag clicked
go to x: (240) y: (pick random (-180) to (180))
forever
  change x by (-2)
  switch costume to [costume1 v]
  wait (0.2) seconds
  switch costume to [costume2 v]
  wait (0.2) seconds
  if <(x position) < (-240)> then
    go to x: (240) y: (pick random (-180) to (180))
  end
end
\`\`\`

### Advanced Features (for early finishers)

**Students can add these features to make their landscapes more dynamic:**

1. **Random Sprite Generation:**
\`\`\`scratch
when green flag clicked
forever
  wait (pick random (1) to (3)) seconds
  create clone of [myself v]
end

when I start as a clone
go to x: (240) y: (pick random (-180) to (180))
set [speed v] to (pick random (1) to (5))
forever
  change x by ((speed) * (-1))
  if <(x position) < (-240)> then
    delete this clone
  end
  wait (0.1) seconds
end
\`\`\`

2. **Day/Night Cycle:**
\`\`\`scratch
when green flag clicked
set [time of day v] to (0)
forever
  change [time of day v] by (1)
  if <(time of day) > (100)> then
    set [time of day v] to (0)
  end
  if <(time of day) < (50)> then
    set [brightness v] effect to (0)
  else
    set [brightness v] effect to (-50)
  end
  wait (0.1) seconds
end
\`\`\`

3. **Weather Effects:**
\`\`\`scratch
when green flag clicked
forever
  if <(pick random (1) to (100)) < (20)> then
    create clone of [rain v]
  end
  wait (0.5) seconds
end

when I start as a clone
go to x: (pick random (-240) to (240)) y: (180)
forever
  change y by (-3)
  if <(y position) < (-180)> then
    delete this clone
  end
  wait (0.1) seconds
end
\`\`\`

4. **Interactive Elements:**
\`\`\`scratch
when green flag clicked
forever
  if <mouse down?> then
    create clone of [bird v]
  end
  wait (0.1) seconds
end

when I start as a clone
go to [mouse-pointer v]
set [direction v] to (pick random (-180) to (180))
forever
  move (3) steps
  if on edge, bounce
  wait (0.1) seconds
end
\`\`\`

### Teaching Tips

- Help students understand the concept of parallax scrolling
- Encourage students to experiment with different speeds
- Remind students to use the duplicate feature to save time
- If students finish early, challenge them to add more interactive elements

## Key Learning Objectives

- Understand how to create the illusion of motion in Scratch
- Know how to use loops for continuous animation
- Be able to create parallax effects with multiple layers
- Understand how to use random generation for variety
- Know how to efficiently duplicate and modify sprites

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may create sprites that move too fast or too slow
- Some may not understand the concept of resetting sprites
- Students might forget to use different speeds for parallax
- Some may not test their animations thoroughly

**Teaching Tips:**
- Always emphasize the importance of testing animation speed
- Show students how to use the "step" button to debug animations
- Encourage students to start simple and add complexity
- Help students who struggle with sprite positioning

## Resources

- [Moving Landscape Example](https://scratch.mit.edu/projects/525598190/)
- [Scratch Animation Guide](https://scratch.mit.edu/help/scratch1/2.0/Animation)
- [Parallax Scrolling Tutorial](https://scratch.mit.edu/help/videos/)

## Next Steps

In the next lesson, we'll explore Scratch extensions and add new capabilities to our projects!`;

    return (
        <LessonPage
            title="Moving Landscape Project"
            moduleTitle="Rehashing the Basics"
            lessonNumber={14}
            content={content}
            prevLesson="/cs/scratch1/lesson13"
            nextLesson="/cs/scratch1/lesson15"
            backToCurriculum="/cs/scratch1"
        />
    );
};

export default ScratchLesson14; 
