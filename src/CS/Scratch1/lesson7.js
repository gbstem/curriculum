import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson7 = () => {
    const content = `# Lesson 7: Conditionals & Maze Game

## Module 5: Conditionals with Sensing

## Interactive Lecture (15-20 minutes)

### Step 1: Understanding Conditionals

Go over the following blocks with the whole class:

**Essential Conditional Blocks:**
- \`wait until [condition]\` - Waits until a condition is true
- \`repeat until [condition]\` - Repeats until a condition is met
- \`if [condition] then\` - Executes code only if condition is true
- \`if [condition] then ... else\` - Executes different code based on condition

**Sensing Blocks:**
- \`touching [color]?\` - Detects if sprite is touching a specific color
- \`key [space] pressed?\` - Detects if a specific key is pressed
- \`mouse down?\` - Detects if mouse button is pressed

### Step 2: Combining Conditionals with Sensing

Show students how to use these blocks in combination:

**Example 1: If then with key space pressed**
\`\`\`scratch
when green flag clicked
forever
  if <key [space v] pressed?> then
    move (10) steps
  end
end
\`\`\`

**Example 2: If then with mouse down**
\`\`\`scratch
when green flag clicked
forever
  if <mouse down?> then
    go to [mouse-pointer v]
  end
end
\`\`\`

**Example 3: If then with touching color**
\`\`\`scratch
when green flag clicked
forever
  if <touching [red v]?> then
    say [Ouch!] for (1) seconds
  end
end
\`\`\`

### Step 3: Examples and Resources

Some examples of these blocks being used (if needed): https://scratch.mit.edu/projects/673927792

### Step 4: Creating Maze Backgrounds

Show students how to use the shape tool to draw a maze background:
- Use the rectangle tool to create walls
- Use different colors for walls vs. path
- Make sure the maze has a clear start and end point
- Test that the sprite can navigate through the maze

## Project: Maze Game (20-25 minutes)

### Project Overview

Explain the necessary elements of the game (things they need to have but can make unique):

**Basic Requirements:**
- A backdrop with a solid color that resembles a maze
- Code that allows the user to move a sprite
- Something that happens when they reach the end of the maze

### Step-by-Step Development

1. **Create the Maze (5 minutes):**
   - Use the backdrop editor to draw a maze
   - Use one color for walls and another for the path
   - Make sure there's a clear start and end point

2. **Add the Player Sprite (5 minutes):**
   - Choose a sprite to be the player
   - Position it at the start of the maze
   - Make sure it's small enough to fit through the maze paths

3. **Program Player Movement (10 minutes):**
   - Use arrow keys to move the sprite
   - Add collision detection with walls
   - Make sure the sprite can't go through walls

**Basic Movement Code:**
\`\`\`scratch
when green flag clicked
go to x: (-200) y: (-150)
forever
  if <key [up arrow v] pressed?> then
    change y by (5)
    if <touching [wall color v]?> then
      change y by (-5)
    end
  end
  if <key [down arrow v] pressed?> then
    change y by (-5)
    if <touching [wall color v]?> then
      change y by (5)
    end
  end
  if <key [right arrow v] pressed?> then
    change x by (5)
    if <touching [wall color v]?> then
      change x by (-5)
    end
  end
  if <key [left arrow v] pressed?> then
    change x by (-5)
    if <touching [wall color v]?> then
      change x by (5)
    end
  end
end
\`\`\`

4. **Add Win Condition (5 minutes):**
   - Detect when the sprite reaches the end
   - Display a win message or change backdrop
   - Add sound effects for winning

**Win Detection Code:**
\`\`\`scratch
when green flag clicked
forever
  if <touching [end color v]?> then
    say [You won!] for (2) seconds
    stop [all v]
  end
end
\`\`\`

### Advanced Features (for early finishers)

**If more comfortable, add these features:**
- Add sounds when sprite is moved
- Add sounds when sprite touches sides of the maze
- Add sounds when the maze is finished
- Make it so the sprite can be moved with the cursor AND ALSO the arrow keys

**Cursor Movement Code:**
\`\`\`scratch
when green flag clicked
forever
  go to [mouse-pointer v]
  if <touching [wall color v]?> then
    go to [previous position v]
  end
end
\`\`\`

### Teaching Tips

- Help students who struggle with collision detection
- Encourage students to test their maze frequently
- Remind students to use different colors for walls and path
- If students finish early, challenge them to make the maze more complex

## Key Learning Objectives

- Understand how conditional blocks work
- Know how to use sensing blocks to detect user input
- Be able to create collision detection in games
- Understand how to combine multiple conditional statements
- Know how to create a complete game with win conditions

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may forget to add collision detection
- Some may not understand the difference between "if" and "if-else"
- Students might create mazes that are too complex or too simple
- Some may not test their movement code thoroughly

**Teaching Tips:**
- Always emphasize the importance of testing collision detection
- Show students how to use the "step" button to debug their code
- Encourage students to start with simple mazes and build complexity
- Help students who struggle with coordinate positioning

## Resources

- [Conditional Examples Project](https://scratch.mit.edu/projects/673927792)
- [Scratch Help Center](https://scratch.mit.edu/help)
- [Scratch Ideas Page](https://scratch.mit.edu/ideas)

## Next Steps

In the next lesson, we'll learn about variables and create a "Guess My Number" game!`;

    return (
        <LessonPage
            title="Conditionals & Maze Game"
            moduleTitle="Conditionals with Sensing"
            lessonNumber={7}
            content={content}
            prevLesson="/cs/scratch1/lesson6"
            nextLesson="/cs/scratch1/lesson8"
            backToCurriculum="/cs/scratch1"
        />
    );
};

export default ScratchLesson7; 
