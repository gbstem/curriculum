import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson10 = () => {
    const content = `# Lesson 10: Choose Your Own Adventure Game

## Module 7: String manipulation from user input (continued)

## Interactive Lecture (15-20 minutes)

### Step 1: Understanding Choose Your Own Adventure Games

**What is a Choose Your Own Adventure Game?**
- A story where the reader makes choices that affect the outcome
- Each choice leads to different paths and endings
- The story branches based on user decisions
- Popular in books, games, and interactive media

**Discussion Questions:**
- Have you ever played a choose your own adventure game?
- What makes a good storyline?
- How do choices affect the story?

### Step 2: Elements of a Good Story

**Remind students of what makes a good storyline:**
- **Beginning:** Introduce characters and setting
- **Middle:** Present problems and choices
- **End:** Resolve the story based on choices
- **Goal:** Clear objective for the player to achieve

**Story Structure:**
- Start with an interesting situation
- Present clear choices to the player
- Make each choice meaningful
- Create different outcomes for different paths

### Step 3: Demo Example Games

**Demo a very short example of a choose your own adventure game from this studio:**
- Show students how choices work
- Demonstrate branching storylines
- Explain how user input affects the story
- Show different endings

## Project: Choose Your Own Adventure Game (25-30 minutes)

### Project Overview

Students should create their own, custom version of a choose your own adventure game.

### Requirements

**Basic Requirements:**
- At least 3 sprites
- At least 3 backdrops
- Sprites must move and change looks
- There must be a "goal" in the game (ex: find the treasure)
- Sprites must ask the user questions, and the user's response must impact the outcome

### Step-by-Step Development

1. **Plan Your Story (5 minutes):**
   - Decide on a theme (adventure, mystery, fantasy, etc.)
   - Create a main character and supporting characters
   - Plan at least 3 different story paths
   - Design a clear goal for the player

2. **Create Sprites and Backdrops (10 minutes):**
   - Design or choose sprites for your characters
   - Create or select backdrops for different scenes
   - Make sure sprites can change costumes for different emotions

3. **Program the Main Story Flow (10 minutes):**
   - Start with an introduction scene
   - Present the first choice to the player
   - Create different paths based on choices
   - Add movement and visual changes

**Basic Story Structure Code:**
\`\`\`scratch
when green flag clicked
switch backdrop to [intro v]
say [Welcome to the Adventure!] for (2) seconds
say [You find yourself at a crossroads...] for (2) seconds
ask [Do you want to go left or right?] and wait
if <(answer) = [left]> then
  switch backdrop to [forest v]
  say [You enter a mysterious forest...] for (2) seconds
  ask [Do you want to explore deeper or turn back?] and wait
  if <(answer) = [explore]> then
    switch backdrop to [cave v]
    say [You found a treasure! You win!] for (3) seconds
  else
    switch backdrop to [home v]
    say [You return home safely.] for (2) seconds
  end
else
  switch backdrop to [mountain v]
  say [You climb the mountain...] for (2) seconds
  ask [Do you want to climb higher or rest?] and wait
  if <(answer) = [climb]> then
    switch backdrop to [summit v]
    say [You reached the top! Amazing view!] for (3) seconds
  else
    switch backdrop to [home v]
    say [You decide to rest and go home.] for (2) seconds
  end
end
\`\`\`

4. **Add Character Interactions (5 minutes):**
   - Make sprites move between scenes
   - Change sprite costumes for different emotions
   - Add dialogue between characters

**Character Movement Code:**
\`\`\`scratch
when green flag clicked
go to x: (-200) y: (0)
switch costume to [normal v]
forever
  if <(backdrop name) = [forest v]> then
    glide (2) secs to x: (0) y: (0)
    switch costume to [excited v]
  else
    if <(backdrop name) = [cave v]> then
      glide (1) secs to x: (200) y: (0)
      switch costume to [happy v]
    end
  end
end
\`\`\`

### Advanced Features (for early finishers)

**If students are more comfortable, add these features:**

1. **Create an adventure story based on a piece of media:**
\`\`\`scratch
when green flag clicked
say [Welcome to the Star Wars Adventure!] for (2) seconds
ask [Are you a Jedi or a Sith?] and wait
if <(answer) = [Jedi]> then
  switch backdrop to [jedi temple v]
  say [You train in the ways of the Force...] for (2) seconds
  ask [Do you want to use the light side or dark side?] and wait
  if <(answer) = [light]> then
    say [You become a great Jedi Master!] for (2) seconds
  else
    say [You are tempted by the dark side...] for (2) seconds
  end
else
  switch backdrop to [sith temple v]
  say [You embrace the power of the dark side...] for (2) seconds
end
\`\`\`

2. **Use the Scratch sound recording option OR text to speech extension to read out loud & add sound effects:**
\`\`\`scratch
when green flag clicked
play sound [intro music v]
say [Welcome to the Adventure!] for (2) seconds
ask [What's your name, brave adventurer?] and wait
set [player name v] to (answer)
say (join [Welcome, ] (player name)) for (2) seconds
play sound [greeting v]
\`\`\`

3. **Add some randomized elements - for example, multiple options for dialogue, using random number generation:**
\`\`\`scratch
when green flag clicked
set [responses v] to [That's interesting!, Tell me more!, Wow!, Amazing!]
ask [What do you want to do?] and wait
say (item (pick random (1) to (4)) of [responses v]) for (1) seconds
\`\`\`

4. **Add collectible items that can unlock storylines later on:**
\`\`\`scratch
when green flag clicked
set [items v] to [0]
forever
  if <touching [key v] ?> then
    change [items v] by (1)
    say [You found a key!] for (1) seconds
    hide
  end
  if <(items) > (0)> then
    if <touching [door v] ?> then
      say [You use the key to open the door!] for (2) seconds
      switch backdrop to [treasure room v]
    end
  end
end
\`\`\`

### Teaching Tips

- Help students plan their story structure before coding
- Encourage creativity in story themes and characters
- Remind students to test all story paths
- Suggest using variables to track player progress
- Help students who struggle with branching logic

## Key Learning Objectives

- Understand how to create branching storylines
- Know how to use user input to affect story outcomes
- Be able to manage multiple sprites and backdrops
- Understand how to create engaging interactive stories
- Know how to structure a complete game with multiple paths

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may create stories that are too linear
- Some may not test all possible story paths
- Students might forget to change backdrops or sprites
- Some may create stories that are too complex or too simple

**Teaching Tips:**
- Always emphasize the importance of planning the story first
- Show students how to use flowcharts to plan branching stories
- Encourage students to start simple and add complexity
- Help students who struggle with story structure

## Resources

- [Choose Your Own Adventure Examples](https://scratch.mit.edu/studios/example-studio)
- [Scratch Storytelling Guide](https://scratch.mit.edu/help/scratch/2.0/Storytelling)
- [Interactive Fiction Examples](https://scratch.mit.edu/explore/projects/tag:interactive-fiction)

## Next Steps

In the next lesson, we'll learn about cloning and broadcasting to create more complex games!`;

    return (
        <LessonPage
            title="Choose Your Own Adventure Game"
            moduleTitle="String manipulation from user input (continued)"
            lessonNumber={10}
            content={content}
            prevLesson="/cs/scratch/lesson9"
            nextLesson="/cs/scratch/lesson11"
            backToCurriculum="/cs/scratch"
        />
    );
};

export default ScratchLesson10; 
