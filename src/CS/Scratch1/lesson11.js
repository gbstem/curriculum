import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson11 = () => {
    const content = `# Lesson 11: Whack a Mole Game

## Module 8: Clones and Broadcasting

## Interactive Lecture (15-20 minutes)

### Step 1: Understanding Clones

Go over clones by demonstrating:

**What are Clones?**
- \`create clone of [myself v]\` - Creates a copy of the current sprite
- \`when I start as a clone\` - Code that runs when a clone is created
- Clones are exact copies that can behave independently
- Great for creating multiple objects without duplicating sprites

**Basic Cloning Example:**
\`\`\`scratch
when green flag clicked
repeat (5)
  create clone of [myself v]
  wait (1) seconds
end

when I start as a clone
go to random position
say [Hello!] for (1) seconds
wait (2) seconds
delete this clone
\`\`\`

### Step 2: Understanding Broadcasting

Go over broadcasting (compare it to something like Simon Says, where you say it and when "Simon Says" is received by them, they do the action. They wouldn't do it if you said something else like Simon Sees):

**What is Broadcasting?**
- \`broadcast [message v]\` - Sends a message to all sprites
- \`when I receive [message v]\` - Runs when a message is received
- Like a radio system for sprites to communicate
- Essential for coordinating multiple sprites

**Broadcasting Example:**
\`\`\`scratch
when green flag clicked
broadcast [start game v]

when I receive [start game v]
say [Game started!] for (2) seconds
go to random position
\`\`\`

### Step 3: Demo with Previous Projects

**Demo:** A good demonstration of broadcasting can be made using the maze game or the guess my number games they made earlier. Having a message saying "they won" be broadcasted and switched to the end screen. Have them edit these projects to show them to use broadcasting.

**Maze Game with Broadcasting:**
\`\`\`scratch
when green flag clicked
forever
  if <touching [end color v]?> then
    broadcast [game won v]
  end
end

when I receive [game won v]
switch backdrop to [victory v]
say [Congratulations! You won!] for (3) seconds
stop [all v]
\`\`\`

## Mini-Project: Whack a Mole (25-30 minutes)

### Project Overview

Clones of an object randomly appear on the screen. When a clone is touched by mouse pointer, it disappears and the user gets a point.

### Step-by-Step Development

1. **Create the Mole Sprite (10 minutes):**
   - Design or choose a mole sprite
   - Create multiple costumes for different states (hidden, visible, hit)
   - Set up the basic cloning system

**Basic Mole Code:**
\`\`\`scratch
when green flag clicked
set [score v] to (0)
forever
  wait (pick random (1) to (3)) seconds
  create clone of [myself v]
end

when I start as a clone
go to random position
switch costume to [visible v]
wait (pick random (1) to (2)) seconds
delete this clone

when this sprite clicked
change [score v] by (1)
play sound [pop v]
delete this clone
\`\`\`

2. **Add Score Display (5 minutes):**
   - Create a variable to track score
   - Display the score on screen
   - Update score when moles are clicked

**Score Display Code:**
\`\`\`scratch
when green flag clicked
set [score v] to (0)
forever
  say (join [Score: ] (score))
end
\`\`\`

3. **Add Timer and Game Over (10 minutes):**
   - Create a countdown timer
   - End the game when time runs out
   - Show final score

**Timer and Game Over Code:**
\`\`\`scratch
when green flag clicked
set [time left v] to (30)
set [score v] to (0)
forever
  if <(time left) > (0)> then
    wait (1) seconds
    change [time left v] by (-1)
  else
    broadcast [game over v]
    stop [all v]
  end
end

when I receive [game over v]
say (join [Game Over! Final Score: ] (score)) for (3) seconds
\`\`\`

### Advanced Features (for early finishers)

**Advanced features to add:**

1. **Timer:**
\`\`\`scratch
when green flag clicked
set [time left v] to (60)
forever
  if <(time left) > (0)> then
    wait (1) seconds
    change [time left v] by (-1)
  else
    broadcast [game over v]
  end
end
\`\`\`

2. **Levels as time progresses:**
\`\`\`scratch
when green flag clicked
set [level v] to (1)
forever
  if <(time left) < (45)> then
    set [level v] to (2)
  end
  if <(time left) < (30)> then
    set [level v] to (3)
  end
  if <(time left) < (15)> then
    set [level v] to (4)
  end
end

when I start as a clone
if <(level) = (1)> then
  wait (pick random (2) to (3)) seconds
else
  if <(level) = (2)> then
    wait (pick random (1) to (2)) seconds
  else
    if <(level) = (3)> then
      wait (pick random (0.5) to (1.5)) seconds
    else
      wait (pick random (0.3) to (1)) seconds
    end
  end
end
delete this clone
\`\`\`

3. **Color changes of the sprite that appears:**
\`\`\`scratch
when I start as a clone
set [color v] effect to (pick random (1) to (200))
go to random position
switch costume to [visible v]
wait (pick random (1) to (2)) seconds
delete this clone
\`\`\`

4. **Different sprites appear and they give different points:**
\`\`\`scratch
when I start as a clone
set [mole type v] to (pick random (1) to (3))
if <(mole type) = (1)> then
  switch costume to [normal mole v]
  set [points v] to (1)
else
  if <(mole type) = (2)> then
    switch costume to [golden mole v]
    set [points v] to (5)
  else
    switch costume to [diamond mole v]
    set [points v] to (10)
  end
end

when this sprite clicked
change [score v] by (points)
play sound [pop v]
delete this clone
\`\`\`

5. **A play again button:**
\`\`\`scratch
when green flag clicked
set [game state v] to [playing]
broadcast [start game v]

when I receive [game over v]
set [game state v] to [ended]
say [Click the green flag to play again!] for (3) seconds
\`\`\`

6. **A high score feature:**
\`\`\`scratch
when green flag clicked
if <(score) > (high score)> then
  set [high score v] to (score)
  say [New High Score!] for (2) seconds
end
say (join [High Score: ] (high score)) for (2) seconds
\`\`\`

### Teaching Tips

- Help students understand the difference between the original sprite and clones
- Encourage students to test their game frequently
- Remind students to use variables for score and timer
- If students finish early, challenge them to add more advanced features

## Key Learning Objectives

- Understand how cloning creates multiple copies of sprites
- Know how to use broadcasting for sprite communication
- Be able to create interactive games with user input
- Understand how to manage game state with variables
- Know how to create engaging gameplay mechanics

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may forget to add "when I start as a clone" scripts
- Some may not understand the difference between original and clones
- Students might create too many clones without deleting them
- Some may not test their game thoroughly

**Teaching Tips:**
- Always emphasize the importance of the "when I start as a clone" block
- Show students how to use the "step" button to debug their code
- Encourage students to start simple and add complexity
- Help students who struggle with clone management

## Resources

- [Whack a Mole Examples](https://scratch.mit.edu/explore/projects/tag:whack-a-mole)
- [Scratch Cloning Guide](https://scratch.mit.edu/help/scratch1/2.0/Cloning)
- [Scratch Broadcasting Guide](https://scratch.mit.edu/help/scratch1/2.0/Events_Blocks)

## Next Steps

In the next lesson, we'll create a "Dodge the Obstacle" game!`;

    return (
        <LessonPage
            title="Whack a Mole Game"
            moduleTitle="Clones and Broadcasting"
            lessonNumber={11}
            content={content}
            prevLesson="/cs/scratch1/lesson10"
            nextLesson="/cs/scratch1/lesson12"
            backToCurriculum="/cs/scratch1"
        />
    );
};

export default ScratchLesson11; 
