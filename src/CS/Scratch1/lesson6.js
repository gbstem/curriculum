import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson6 = () => {
    const content = `# Lesson 6: Loops & Animation

## Module 4: Loops + Control Blocks

## Interactive Lecture (15-20 minutes)

### Step 1: Understanding Loops

Show students how loop and repeat blocks work, and why they are different:

**Types of Loops:**
- \`repeat [10]\` - Repeats a block of code a specific number of times
- \`forever\` - Repeats a block of code indefinitely
- \`repeat until [condition]\` - Repeats until a condition is met

**Example: Basic repeat loop**

\`\`\`scratch
when flag clicked
repeat (5)
  move (10) steps
  wait (0.5) secs
end
\`\`\`

**Example: Forever loop**

\`\`\`scratch
when flag clicked
forever
  move (1) steps
  wait (0.1) secs
end
\`\`\`

### Step 2: Hands-on Loop Experimentation

Ask students to try to add a unique block inside of a loop or repeat block. After they see it loops very quickly, introduce the wait one second block.

**Key Discovery:**
Without the wait block, loops execute so fast that you can't see what's happening. The wait block creates pauses between iterations.

**Example: Loop without wait (too fast)**

\`\`\`scratch
when flag clicked
repeat (10)
  move (5) steps
end
\`\`\`

**Example: Loop with wait (visible)**

\`\`\`scratch
when flag clicked
repeat (10)
  move (5) steps
  wait (0.5) secs
end
\`\`\`

### Step 3: Creating Walking Animation

Have them test out using loops to change the costumes and wait one second block to make it look like the sprite is moving (ex: walking).

**Animation Technique:**
- Use \`next costume\` in a loop
- Add \`wait [0.1] seconds\` between costume changes
- This creates the illusion of movement

**Example: Walking animation**

\`\`\`scratch
when flag clicked
forever
  next costume
  wait (0.2) secs
end
\`\`\`

**Example: Walking with movement**

\`\`\`scratch
when flag clicked
forever
  next costume
  move (2) steps
  wait (0.1) secs
end
\`\`\`

### Step 4: Why Loops Are Important

Emphasize why loops are important. Show them these two example projects to compare:
- [Example without loops](https://scratch.mit.edu/projects/example1)
- [Example with loops](https://scratch.mit.edu/projects/example2)

**Benefits of Loops:**
- Makes code shorter and easier to read
- Reduces repetition in programming
- Makes animations smoother and more realistic
- Allows for continuous actions

**Example: Without loops (repetitive)**

\`\`\`scratch
when flag clicked
move (10) steps
wait (1) secs
move (10) steps
wait (1) secs
move (10) steps
wait (1) secs
move (10) steps
wait (1) secs
move (10) steps
\`\`\`

**Example: With loops (clean)**

\`\`\`scratch
when flag clicked
repeat (5)
  move (10) steps
  wait (1) secs
end
\`\`\`

### Step 5: Exploring Animations

Have students check out some animations on Scratch for animation before moving on to their project!

**Animation Examples to Explore:**
- Walking characters
- Flying objects
- Growing and shrinking
- Color changes
- Rotating objects

## Project: Realistic Animation (20-25 minutes)

### Project Overview

Students should try making their animation, using loops. They cannot just put all their code in a loop; sprites need to loop at different rates.

**Project Requirements:**
- **Use loops** to create animations
- **More than one sprite** should be animated
- **Sprites need to loop at different rates** (not all synchronized)
- **Focus on quality rather than quantity** (length of time)
- **Use wait blocks** to control timing

### Animation Ideas

**Some animation ideas to get started:**
- A character walking across the screen
- Clouds floating in the sky
- A bouncing ball
- A growing and shrinking flower
- A rotating windmill
- A day/night cycle

### Step-by-Step Animation Creation

1. **Choose Your Animation (2 minutes):**
   - Decide what you want to animate
   - Think about what sprites you'll need
   - Plan the movement patterns

2. **Create Your Sprites (3 minutes):**
   - Choose or create sprites for your animation
   - Add costumes if needed for movement
   - Position sprites in starting positions

3. **Program the First Animation (5 minutes):**
   - Start with one sprite
   - Use a loop to create the movement
   - Add wait blocks for proper timing
   - Test the animation

4. **Add More Animations (10 minutes):**
   - Add animations to other sprites
   - Use different loop rates for variety
   - Make sure animations work together
   - Test the overall effect

**Example: Bouncing ball**

\`\`\`scratch
when flag clicked
forever
  change y by (5)
  wait (0.1) secs
  if <(y position) > [180]> then
    set y to (180)
    change y by (-5)
  end
end
\`\`\`

**Example: Floating cloud**

\`\`\`scratch
when flag clicked
go to x: (-240) y: (100)
forever
  move (1) steps
  wait (0.2) secs
  if <(x position) > [240]> then
    go to x: (-240) y: (100)
  end
end
\`\`\`

**Example: Growing flower**

\`\`\`scratch
when flag clicked
set size to (50) %
forever
  change size by (1)
  wait (0.5) secs
  if <(size) > [150]> then
    set size to (50) %
  end
end
\`\`\`

### Advanced Challenge (for early finishers)

**If more comfortable, encourage students to make multiple sprites which creatively interact with each other using animations:**
- Like a mini-story with animated characters
- Characters that respond to each other's movements
- Complex scenes with multiple animated elements
- Animations that change based on user input

**Example: Interactive animation**

\`\`\`scratch
when flag clicked
forever
  next costume
  wait (0.3) secs
  if <touching [mouse-pointer v]?> then
    change size by (10)
  else
    set size to (100) %
  end
end
\`\`\`

### Technical Tips

- Use \`forever\` loops for continuous animations
- Use \`repeat [number]\` for limited animations
- Add \`wait\` blocks to control speed
- Use \`next costume\` for sprite animations
- Use \`change [effect] by [amount]\` for visual effects
- Test your animations frequently

**Example: Color changing animation**

\`\`\`scratch
when flag clicked
forever
  change [color v] effect by (25)
  wait (0.5) secs
end
\`\`\`

**Teaching Tips:**
- Encourage students to start with simple animations
- Help students who struggle with timing
- Remind students to test their animations as they build them
- Celebrate creative animation choices
- If students finish early, encourage them to add more complex interactions

## Key Learning Objectives

- Understand how different types of loops work
- Know how to use loops to create animations
- Understand the importance of timing in animations
- Be able to coordinate multiple animated sprites
- Know how to use wait blocks to control animation speed
- Understand the difference between synchronized and independent animations

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may forget to add wait blocks, making animations too fast
- Some may put all sprites in the same loop, making them move together
- Students might not understand the difference between loop types
- Some may create animations that are too complex to manage

**Teaching Tips:**
- Always emphasize the importance of wait blocks for visible animations
- Show students how to create independent loops for different sprites
- Demonstrate the difference between forever and repeat loops
- Encourage students to start simple and build complexity
- Help students who struggle with timing by providing examples

## Resources

- [Example without loops](https://scratch.mit.edu/projects/example1)
- [Example with loops](https://scratch.mit.edu/projects/example2)
- [Scratch Ideas Page](https://scratch.mit.edu/ideas)
- [Scratch Help Center](https://scratch.mit.edu/help)

## Next Steps

In the next lesson, we'll learn about conditionals and create a maze game!`;

    return (
        <LessonPage
            title="Loops & Animation"
            moduleTitle="Loops + Control Blocks"
            lessonNumber={6}
            content={content}
            prevLesson="/cs/scratch1/lesson5"
            nextLesson="/cs/scratch1/lesson7"
            backToCurriculum="/cs/scratch1"
        />
    );
};

export default ScratchLesson6; 
