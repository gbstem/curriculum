import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson2 = () => {
    const content = `# Lesson 2: Motion Blocks & Simon Says

## Module 2: Motion

## Warm-up (5-10 minutes)

**As students arrive, get them talking about their Scratch experience** and invite them to share previous projects in the chat. If students don't want to share, share one of your own.

**Do some icebreakers** and ask an open-ended prompt such as:
- What's the most interesting thing you've ever programmed?
- If you could make any game, what would it be?
- What's your favorite way to learn new things?
- What's something you're excited to learn in Scratch?

## Interactive Lecture (15-20 minutes)

### Step 1: Simon Says Game

Play a couple of minutes of Simon says. Start simple, then start giving compound steps.

**Example commands:**
- "Simon says clap your hands"
- "Simon says turn around and jump"
- "Simon says touch your nose, then your ears"

**If you want to make it more interactive, allow the students to be the ones who give the commands!**

### Step 2: Connecting Simon Says to Scratch

Explain how this relates to Scratch. When you use a "when flag is clicked block" it's like saying "Simon Says".

**Key Concept:**
In Simon Says, you only follow commands that start with "Simon says". In Scratch, sprites only follow commands that start with specific event blocks.

### Step 3: Demo Scratch Blocks

Demo how to access different types of blocks in Scratch and navigate the menu:
- Show the different block categories (Events, Motion, Looks, etc.)
- Explain how to drag blocks from the menu to the coding area
- Show how blocks snap together

### Step 4: Event Blocks

Demo and explain how the event blocks work. You can show as many as you want, but the important one that they must thoroughly understand is the **"when flag is clicked"** block.

**Essential Event Blocks:**
- \`when flag clicked\` - Starts the program
- \`when [key] pressed\` - Responds to keyboard input
- \`when this sprite clicked\` - Responds to mouse clicks

**Example: Basic event block setup**

\`\`\`scratch
when flag clicked
move (10) steps
\`\`\`

### Step 5: Motion Blocks

Demo and explain how some of the motion blocks work (excluding any that involve the coordinate plane for now):

**Basic Motion Blocks:**
- \`move [10] steps\` - Moves sprite forward
- \`turn [15] degrees\` - Rotates sprite
- \`point in direction [90]\` - Sets sprite direction
- \`go to [random position]\` - Moves to random location

**Example: Simple motion sequence**

\`\`\`scratch
when flag clicked
move (20) steps
turn cw (15) degrees
move (10) steps
\`\`\`

### Step 6: Wait Block

Introduce the \`wait [1] seconds\` block and how the sprite will complete the tasks in order.

**Important Concept:**
Without the wait block, all commands happen instantly. The wait block creates pauses between actions, making them visible to the user.

**Example: Motion with timing**

\`\`\`scratch
when flag clicked
move (10) steps
wait (1) secs
turn cw (90) degrees
wait (0.5) secs
move (15) steps
\`\`\`

## Mini-project: Simon Says with Sprites (15-20 minutes)

### Project Requirements

Give students a combination of steps for their sprite to perform. Example built off previous project: https://scratch.mit.edu/projects/717654166

**Example Commands:**
- Move forward 11 steps, turn 20 degrees and glide backward 20 steps when the letter "a" is pressed
- Move forward 10 steps when the letter "a" is clicked
- Turn 90 degrees when the space bar is pressed
- Go to random position when the sprite is clicked

**Example: Simon Says with keyboard controls**

\`\`\`scratch
when [a v] key pressed
move (11) steps
turn cw (20) degrees
wait (0.5) secs
move (-20) steps
\`\`\`

**Example: Simon Says with sprite clicks**

\`\`\`scratch
when this sprite clicked
go to [random position v]
\`\`\`

**Example: Simon Says with spacebar**

\`\`\`scratch
when [space v] key pressed
turn cw (90) degrees
\`\`\`

### Required Events

Give them certain events they need to have the changes happen with:
- When flag is clicked
- When specific keys are pressed
- When sprite is clicked

### Advanced Challenge

If finished, tell them to incorporate the wait block into their commands to create more complex sequences.

**Example: Complex Simon Says sequence**

\`\`\`scratch
when [b v] key pressed
move (15) steps
wait (1) secs
turn cw (45) degrees
wait (0.5) secs
move (10) steps
turn ccw (90) degrees
wait (1) secs
move (-5) steps
\`\`\`

**Teaching Tips:**
- Encourage students to experiment with different numbers in the motion blocks
- Have students test their programs frequently
- If students finish early, challenge them to create more complex sequences

## Key Learning Objectives

- Understand how event blocks trigger program execution
- Know how to use basic motion blocks (move, turn, point)
- Understand the importance of the wait block for timing
- Be able to create simple sprite movements in response to events
- Understand the concept of sequential programming

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may forget to add event blocks to start their programs
- Some may not understand that blocks execute in order from top to bottom
- Students might not realize they need wait blocks to see the motion
- Some may confuse positive and negative numbers in motion blocks

**Teaching Tips:**
- Always emphasize that every program needs an event block to start
- Use the "step" button in Scratch to show how blocks execute one at a time
- Encourage students to test small pieces of code before building complex sequences
- Use real-world analogies (like Simon Says) to explain programming concepts

## Resources

- [Example Simon Says Project](https://scratch.mit.edu/projects/717654166)
- [Scratch Help Center](https://scratch.mit.edu/help)
- [Scratch Ideas Page](https://scratch.mit.edu/ideas)

## Next Steps

In the next lesson, we'll learn about the coordinate plane and create constellation projects!`;

    return (
        <LessonPage
            title="Motion Blocks & Simon Says"
            moduleTitle="Motion"
            lessonNumber={2}
            content={content}
            prevLesson="/cs/scratch1/lesson1"
            nextLesson="/cs/scratch1/lesson3"
            backToCurriculum="/cs/scratch1"
        />
    );
};

export default ScratchLesson2; 
