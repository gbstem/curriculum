import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson4 = () => {
    const content = `# Lesson 4: Looks & Sound Blocks

## Module 3: Looks and Sounds

## Interactive Lecture (15-20 minutes)

### Step 1: Looks Blocks Overview

Go through most looks and sounds blocks with students. Show them how to:

**Essential Looks Blocks:**
- \`say [Hello!] for [2] seconds\` - Shows speech bubble temporarily
- \`say [Hello!]\` - Shows speech bubble until changed
- \`think [Hmm...] for [2] seconds\` - Shows thought bubble temporarily
- \`think [Hmm...]\` - Shows thought bubble until changed
- \`change [color] effect by [25]\` - Changes visual effects
- \`set [color] effect to [0]\` - Resets visual effects
- \`change size by [10]\` - Makes sprite bigger or smaller
- \`set size to [100]%\` - Sets exact sprite size
- \`show\` - Makes sprite visible
- \`hide\` - Makes sprite invisible
- \`go to front\` - Brings sprite to front layer
- \`go back [1] layers\` - Moves sprite back in layers

**Example: Basic looks blocks**

\`\`\`scratch
when flag clicked
say [Hello!] for (2) secs
think [I'm thinking...] for (3) secs
change size by (10)
\`\`\`

### Step 2: Costumes

Explain how different costumes work and how to switch between them:

**Costume Blocks:**
- \`next costume\` - Switches to next costume
- \`switch costume to [costume1]\` - Switches to specific costume
- \`switch backdrop to [backdrop1]\` - Changes the background
- \`next backdrop\` - Switches to next backdrop

**Example: Costume changes**

\`\`\`scratch
when flag clicked
switch costume to [costume1 v]
wait (2) secs
next costume
wait (2) secs
switch backdrop to [backdrop2 v]
\`\`\`

### Step 3: Sound Blocks

**Especially the play sound block!** Also show how to edit the sounds, record your own, or add new ones.

**Essential Sound Blocks:**
- \`play sound [meow] until done\` - Plays sound and waits for it to finish
- \`play sound [meow]\` - Plays sound without waiting
- \`stop all sounds\` - Stops all playing sounds
- \`change [volume] effect by [10]\` - Changes volume
- \`set [volume] effect to [100]%\` - Sets exact volume
- \`play drum [1] for [0.25] beats\` - Plays drum sounds
- \`play note [60] for [0.5] beats\` - Plays musical notes
- \`set instrument to [1]\` - Changes instrument sound

**Example: Sound effects**

\`\`\`scratch
when flag clicked
play sound [meow v] until done
wait (1) secs
play drum (1) for (0.25) beats
\`\`\`

**Example: Musical notes**

\`\`\`scratch
when [space v] key pressed
set instrument to (1)
play note (60) for (0.5) beats
play note (62) for (0.5) beats
play note (64) for (0.5) beats
\`\`\`

### Step 4: Important Distinctions

Make sure to explain the difference between:
- \`say [Hello] for [5] seconds\` vs \`say [Hello]\`
- \`play sound [meow] until done\` vs \`play sound [meow]\`
- How costumes can create animation effects
- How sound can enhance user experience

**Example: Temporary vs permanent effects**

\`\`\`scratch
when flag clicked
say [Hello!] for (3) secs
say [Goodbye!]
\`\`\`

### Step 5: Sound Management

Show students how to:
- Record their own sounds using the microphone
- Upload sound files from their computer
- Choose from the Scratch sound library
- Edit existing sounds (trim, adjust volume, etc.)

## Mini-project: Keyboard with Sounds (15-20 minutes)

### Project Overview

Have them create some sort of piano keys (5 white rectangle sprites and 4 smaller black rectangle sprites) and record some sounds, or if students are shy/can't record audio, choose premade noises.

**Basic Requirements:**
- Create 5 white rectangle sprites for white keys
- Create 4 smaller black rectangle sprites for black keys
- Use the \`when this sprite clicked\` event block
- Use \`play sound until done\` for each key
- Create a backdrop that matches the piano theme

### Step-by-Step Instructions

1. **Create the piano keys:**
   - Add 5 white rectangle sprites
   - Add 4 smaller black rectangle sprites
   - Position them to look like piano keys

2. **Add sounds:**
   - Record sounds or choose from Scratch library
   - Assign different sounds to each key
   - Make sure sounds are appropriate for a piano

3. **Add code:**
   - Use \`when this sprite clicked\` for each key
   - Add \`play sound [sound] until done\` block
   - Test each key to make sure it works

4. **Create backdrop:**
   - Design or choose a backdrop that fits the piano theme
   - Consider adding decorative elements

**Example: White piano key**

\`\`\`scratch
when this sprite clicked
play sound [C v] until done
change size by (5)
wait (0.1) secs
change size by (-5)
\`\`\`

**Example: Black piano key**

\`\`\`scratch
when this sprite clicked
play sound [C# v] until done
change size by (3)
wait (0.1) secs
change size by (-3)
\`\`\`

### Advanced Features (for early finishers)

**If students finish early, show them the sound extension with even more options:**
- Maybe they can create a whole band
- Or create a song with it
- Make it so the piano can be played from the keyboard (of the computer)
- Also make it so the rest of the instruments have the same ability

### Keyboard Control Extension

If more comfortable, make it so the piano can be played from the keyboard:
- Use \`when [key] pressed\` blocks
- Assign different keys to different piano notes
- Make sure the visual keys also respond when keyboard is pressed

**Example: Keyboard control for piano**

\`\`\`scratch
when [c v] key pressed
play sound [C v] until done
broadcast [play C v]
\`\`\`

**Example: Visual response to keyboard**

\`\`\`scratch
when I receive [play C v]
change size by (10)
wait (0.2) secs
change size by (-10)
\`\`\`

**Teaching Tips:**
- Encourage students to experiment with different sounds
- Help students who struggle with the drawing tools
- Remind students to test their piano frequently
- If students are shy about recording, encourage them to use the sound library

## Key Learning Objectives

- Understand how to use looks blocks to change sprite appearance
- Know how to work with costumes and backdrops
- Be able to add and control sounds in projects
- Understand the difference between temporary and permanent appearance changes
- Know how to create interactive elements that respond to user input
- Be able to record and edit custom sounds

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may forget to add event blocks to trigger sounds
- Some may not understand the difference between "until done" and regular sound blocks
- Students might create keys that are too small to click easily
- Some may not realize they can record their own sounds

**Teaching Tips:**
- Always test the clickable area of sprites to make sure they're easy to use
- Encourage students to use a variety of sounds
- Show students how to adjust sprite size for better usability
- Demonstrate the difference between sound blocks with and without "until done"
- Help students who are nervous about recording their voices

## Resources

- [Scratch Help Center](https://scratch.mit.edu/help)
- [Scratch Ideas Page](https://scratch.mit.edu/ideas)
- [Scratch Music Projects](https://scratch.mit.edu/explore/projects/music)

## Next Steps

In the next lesson, we'll create interactive stories using motion, looks, and sound blocks!`;

    return (
        <LessonPage
            title="Looks & Sound Blocks"
            moduleTitle="Looks and Sounds"
            lessonNumber={4}
            content={content}
            prevLesson="/cs/scratch1/lesson3"
            nextLesson="/cs/scratch1/lesson5"
            backToCurriculum="/cs/scratch1"
        />
    );
};

export default ScratchLesson4; 
