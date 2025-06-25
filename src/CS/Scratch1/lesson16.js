import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson16 = () => {
    const content = `# Lesson 16: Code Efficiency

## Module 10: Refining our code

## Interactive Lecture (15-20 minutes)

### Step 1: Understanding Code Complexity

**Show students an example of a really complicated game, and ask whether the code makes any sense.**

**Discussion Questions:**
- Can you understand what this code does?
- Is it easy to read and follow?
- What makes it confusing?
- How could it be improved?

**Ask: How could it be more clear?**

### Step 2: Principles of Efficient Code

**Explain to students how they can and should make their code as short and simple as possible so other people can understand it.**

**Key Principles:**
- Use loops and repeat blocks instead of repeating code
- Use broadcast blocks for communication between sprites
- Create custom blocks for reusable actions
- Write clear comments explaining what code does
- Organize code logically

**Why does clear and efficient code matter?**
- Easier to debug and fix problems
- Easier for others to understand and modify
- Faster to write and test
- More professional and maintainable

### Step 3: Custom Blocks with Comments

**Explain how to make custom blocks with input (functions) and have students learn to write comments clarifying what their block does and how it works.**

**Custom Block Example:**
\`\`\`scratch
define move player (speed) // Moves the player sprite by the specified speed
change x by (speed)
play sound [footstep v]

define collect item (points) // Collects an item and adds points to score
change [score v] by (points)
play sound [collect v]
say (join [+] (points)) for (1) seconds
\`\`\`

**Adding Comments:**
- Right-click on any block to add a comment
- Comments explain what the code does
- Comments help others understand your logic
- Comments help you remember what you were thinking

## Project: Code Refinement (25-30 minutes)

### Project Overview

Integrate these techniques into their pre-existing projects to make them as efficient as possible, and easier to understand.

### Requirements

**Basic Requirements:**
- At least one custom block with a comment explaining how it works
- Loops and/or repeat blocks are used where appropriate
- Otherwise clear and efficient code!

### Step-by-Step Development

1. **Analyze Existing Code (10 minutes):**
   - Look for repeated code blocks
   - Identify actions that could be combined
   - Find opportunities to use loops
   - Plan custom blocks

2. **Create Custom Blocks (10 minutes):**
   - Convert repeated actions into custom blocks
   - Add parameters for flexibility
   - Write clear comments for each block

**Example: Converting Repeated Code to Custom Blocks**

**Before (Inefficient):**
\`\`\`scratch
when green flag clicked
forever
  if <key [up arrow v] pressed?> then
    change y by (5)
    play sound [footstep v]
  end
  if <key [down arrow v] pressed?> then
    change y by (-5)
    play sound [footstep v]
  end
  if <key [left arrow v] pressed?> then
    change x by (-5)
    play sound [footstep v]
  end
  if <key [right arrow v] pressed?> then
    change x by (5)
    play sound [footstep v]
  end
  wait (0.1) seconds
end
\`\`\`

**After (Efficient with Custom Blocks):**
\`\`\`scratch
define move in direction (direction) (distance) // Moves sprite in specified direction
if <(direction) = [up]> then
  change y by (distance)
else
  if <(direction) = [down]> then
    change y by ((distance) * (-1))
  else
    if <(direction) = [left]> then
      change x by ((distance) * (-1))
    else
      if <(direction) = [right]> then
        change x by (distance)
      end
    end
  end
end
play sound [footstep v]

when green flag clicked
forever
  if <key [up arrow v] pressed?> then
    move in direction [up] (5)
  end
  if <key [down arrow v] pressed?> then
    move in direction [down] (5)
  end
  if <key [left arrow v] pressed?> then
    move in direction [left] (5)
  end
  if <key [right arrow v] pressed?> then
    move in direction [right] (5)
  end
  wait (0.1) seconds
end
\`\`\`

3. **Add Loops and Optimization (5 minutes):**
   - Replace repeated blocks with loops
   - Use broadcast messages for sprite communication
   - Simplify complex conditions

**Using Loops for Efficiency:**
\`\`\`scratch
define create multiple sprites (count) (sprite type) // Creates multiple sprites of the same type
repeat (count)
  create clone of (sprite type)
  wait (0.1) seconds
end

define animate sprite (costume list) (speed) // Animates sprite through multiple costumes
set [current costume v] to (1)
repeat (length of (costume list))
  switch costume to (item (current costume) of (costume list))
  wait (speed) seconds
  change [current costume v] by (1)
end
\`\`\`

### Advanced Optimization Techniques

**Students can apply these techniques to make their code even more efficient:**

1. **Using Broadcast Messages:**
\`\`\`scratch
when green flag clicked
broadcast [start game v]

when I receive [start game v]
go to x: (-200) y: (0)
set [score v] to (0)

when I receive [game over v]
say (join [Final Score: ] (score)) for (3) seconds
stop [all v]
\`\`\`

2. **Simplifying Complex Conditions:**
\`\`\`scratch
define check win condition (target score) (current score) // Checks if player has won
if <(current score) >= (target score)> then
  broadcast [game won v]
  return [true]
else
  return [false]
end

when green flag clicked
forever
  if <(check win condition (100) (score)) = [true]> then
    say [You won!] for (2) seconds
  end
  wait (0.1) seconds
end
\`\`\`

3. **Using Variables for Configuration:**
\`\`\`scratch
when green flag clicked
set [player speed v] to (5)
set [enemy speed v] to (3)
set [game duration v] to (60)
set [points per item v] to (10)
start game

define start game // Initializes and starts the game
set [score v] to (0)
set [time left v] to (game duration)
broadcast [game started v]
\`\`\`

### Teaching Tips

- Help students identify opportunities for optimization
- Encourage students to write clear comments
- Remind students to test their optimized code thoroughly
- If students finish early, challenge them to optimize further

## Key Learning Objectives

- Understand the importance of code efficiency and readability
- Know how to create custom blocks with parameters and comments
- Be able to use loops and broadcast messages effectively
- Understand how to organize and structure code logically
- Know how to refactor existing code for better efficiency

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may create custom blocks that are too specific
- Some may not understand when to use loops vs. custom blocks
- Students might forget to add comments to their code
- Some may over-optimize and make code harder to understand

**Teaching Tips:**
- Always emphasize the balance between efficiency and readability
- Show students how to use the "step" button to debug optimized code
- Encourage students to explain their optimization choices
- Help students who struggle with code organization

## Resources

- [Scratch Custom Blocks Guide](https://scratch.mit.edu/help/scratch1/2.0/Custom_Blocks)
- [Code Organization Tips](https://scratch.mit.edu/help/scratch1/2.0/Code_Organization)
- [Debugging Techniques](https://scratch.mit.edu/help/videos/)

## Next Steps

In the next lesson, we'll learn about debugging techniques and how to fix broken code!`;

    return (
        <LessonPage
            title="Code Efficiency"
            moduleTitle="Refining our code"
            lessonNumber={16}
            content={content}
            prevLesson="/cs/scratch1/lesson15"
            nextLesson="/cs/scratch1/lesson17"
            backToCurriculum="/cs/scratch1"
        />
    );
};

export default ScratchLesson16; 
