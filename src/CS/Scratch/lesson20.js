import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson20 = () => {
    const content = `# Lesson 20: UI Design

## Module 11: Advanced Game Design in Scratch (bonus lessons) (continued)

## Interactive Lecture (15-20 minutes)

### Step 1: Understanding UI (User Interface)

**Ask students, then explain, what is UI (user interface)?**

**UI Definition:** The visual elements and controls that allow users to interact with a program or game.

**Discussion Questions:**
- What UI elements do you see in games?
- Why is UI important?
- What makes a good UI?

### Step 2: Importance of UI in Games

**Explain why is it important in making a polished game?**

**Key UI Elements:**
- **Start Screens:** Welcome players and provide options
- **Menus:** Navigate between different parts of the game
- **Buttons:** Interactive elements for user input
- **HUD (Heads-Up Display):** Show game information (score, health, etc.)
- **Pause Screens:** Allow players to take breaks
- **Game Over Screens:** Show results and restart options

### Step 3: Demo UI Implementation

**Demo: How do we use broadcasts and button sprites to make UI?**

**Key Techniques:**
- **Broadcast Messages:** Communicate between different UI elements
- **Button Sprites:** Interactive elements that respond to clicks
- **State Management:** Track what screen the game is on
- **Visual Feedback:** Show when buttons are pressed

**How do we design UI?**
- **Consistency:** Use similar styles throughout
- **Clarity:** Make it obvious what each element does
- **Accessibility:** Ensure buttons are easy to click
- **Visual Hierarchy:** Organize information by importance

## Project: Gotta have UI! (30-35 minutes)

### Project Overview

Take their games from yesterday, and add UI!

### Requirements

**Basic Requirements:**
- There has to be some kind of start screen, and a restart option at the end of the game
- There must be a start game button
- There must be an about the author button, or credits button
- The buttons must 'click' or look slightly different when pressed so that the user knows their click was registered
- All the buttons have to work as intended

### Step-by-Step Development

1. **Create Start Screen (15 minutes):**
   - Design a welcome screen
   - Add title and game description
   - Create start button sprite

**Start Screen Code:**
\`\`\`scratch
when green flag clicked
set [game state v] to [start screen]
switch backdrop to [start screen v]
show
say [Welcome to My Game!] for (2) seconds
say [Click Start to Play!] for (2) seconds

when this sprite clicked
if <(game state) = [start screen]> then
  if <touching [mouse-pointer v] ?> then
    switch costume to [pressed v]
    wait (0.1) seconds
    switch costume to [normal v]
    broadcast [start game v]
  end
end
\`\`\`

2. **Add Game State Management (10 minutes):**
   - Track current game state
   - Handle transitions between screens
   - Manage button visibility

**Game State Management:**
\`\`\`scratch
when I receive [start game v]
set [game state v] to [playing]
switch backdrop to [game background v]
hide
broadcast [hide UI v]

when I receive [game over v]
set [game state v] to [game over]
switch backdrop to [game over v]
show
say [Game Over!] for (2) seconds
say [Click Restart to Play Again!] for (2) seconds

when I receive [restart game v]
set [game state v] to [playing]
switch backdrop to [game background v]
hide
broadcast [reset game v]
\`\`\`

3. **Create Interactive Buttons (10 minutes):**
   - Design button sprites with multiple costumes
   - Add click animations
   - Implement button functionality

**Button Implementation:**
\`\`\`scratch
when green flag clicked
switch costume to [normal v]

when this sprite clicked
if <touching [mouse-pointer v] ?> then
  switch costume to [pressed v]
  play sound [click v]
  wait (0.1) seconds
  switch costume to [normal v]
  if <(costume name) = [start button v]> then
    broadcast [start game v]
  else
    if <(costume name) = [restart button v]> then
      broadcast [restart game v]
    else
      if <(costume name) = [credits button v]> then
        broadcast [show credits v]
      end
    end
  end
end
\`\`\`

### Advanced UI Features (for early finishers)

**Students can add these features to make their UI more polished:**

1. **Animated Buttons:**
\`\`\`scratch
when green flag clicked
forever
  if <touching [mouse-pointer v] ?> then
    set [brightness v] effect to (20)
  else
    set [brightness v] effect to (0)
  end
  wait (0.1) seconds
end
\`\`\`

2. **Settings Menu:**
\`\`\`scratch
when this sprite clicked
if <touching [mouse-pointer v] ?> then
  broadcast [show settings v]
end

when I receive [show settings v]
set [game state v] to [settings]
switch backdrop to [settings v]
say [Settings Menu] for (2) seconds
say [Volume: Use arrow keys to adjust] for (2) seconds
\`\`\`

3. **Pause Menu:**
\`\`\`scratch
when [p v] key pressed
if <(game state) = [playing]> then
  set [game state v] to [paused]
  switch backdrop to [pause v]
  say [Game Paused] for (2) seconds
  say [Press P to resume] for (2) seconds
else
  if <(game state) = [paused]> then
    set [game state v] to [playing]
    switch backdrop to [game background v]
  end
end
\`\`\`

4. **Loading Screen:**
\`\`\`scratch
when I receive [start game v]
set [game state v] to [loading]
switch backdrop to [loading v]
say [Loading...] for (1) seconds
repeat (3)
  say [.] for (0.5) seconds
end
broadcast [game loaded v]
\`\`\`

5. **Tutorial Screen:**
\`\`\`scratch
when this sprite clicked
if <touching [mouse-pointer v] ?> then
  broadcast [show tutorial v]
end

when I receive [show tutorial v]
set [game state v] to [tutorial]
switch backdrop to [tutorial v]
say [How to Play:] for (2) seconds
say [Press SPACE to jump] for (2) seconds
say [Avoid the pipes!] for (2) seconds
say [Click Start when ready!] for (2) seconds
\`\`\`

### Teaching Tips

- Help students plan their UI layout before coding
- Encourage students to test their buttons thoroughly
- Remind students to make buttons visually distinct
- If students finish early, challenge them to add more UI features

## Key Learning Objectives

- Understand what UI is and why it's important in games
- Know how to create interactive buttons and menus
- Be able to manage game states and screen transitions
- Understand how to provide visual feedback for user interactions
- Know how to design clear and intuitive user interfaces

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may make buttons too small to click easily
- Some may not provide enough visual feedback
- Students might forget to handle all game states
- Some may not test their UI on different screen sizes

**Teaching Tips:**
- Always emphasize the importance of user experience
- Show students how to test their UI with different users
- Encourage students to make their UI accessible and clear
- Help students who struggle with visual design

## Resources

- [Scratch UI Design Guide](https://scratch.mit.edu/help/scratch/2.0/UI_Design)
- [Button Design Examples](https://scratch.mit.edu/explore/projects/tag:ui)
- [Game State Management Tutorial](https://scratch.mit.edu/help/videos/)

## Next Steps

In the next lesson, we'll learn about physics engines and create more realistic game mechanics!`;

    return (
        <LessonPage
            title="UI Design"
            moduleTitle="Advanced Game Design in Scratch (bonus lessons) (continued)"
            lessonNumber={20}
            content={content}
            prevLesson="/cs/scratch/lesson19"
            nextLesson="/cs/scratch/lesson21"
            backToCurriculum="/cs/scratch"
        />
    );
};

export default ScratchLesson20; 
