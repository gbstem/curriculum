import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson15 = () => {
    const content = `# Lesson 15: Scratch Extensions

## Module 9: Rehashing the Basics (continued)

## Interactive Lecture (15-20 minutes)

### Step 1: Understanding Scratch Extensions

**What are Scratch extensions?**
- Additional blocks that add new capabilities to Scratch
- Extend Scratch beyond the basic block categories
- Allow for more advanced and creative projects
- Can include hardware integration, advanced sensors, and specialized tools

**Discussion Questions:**
- What kinds of new features might be useful in Scratch?
- How could extensions make our projects more interesting?
- What limitations do we currently have in Scratch?

### Step 2: Accessing Extensions

**Show students how extensions work:**
- Click on the "Choose an Extension" button (bottom left of block palette)
- Browse through available extensions
- Select an extension to add its blocks to your project
- Extensions appear as new categories in the block palette

**Demonstrate how to get to the "Choose an Extension" page:**
- Look for the blue button with a plus sign
- Click to open the extension library
- Browse categories like Music, Pen, Video Sensing, etc.

### Step 3: Introducing Key Extensions

**Introduce the usage of blocks from the first five extensions:**

1. **Music Extension:**
   - Play different instruments
   - Change tempo and volume
   - Create musical sequences

2. **Pen Extension:**
   - Draw on the stage
   - Create patterns and designs
   - Make art and graphics

3. **Video Sensing Extension:**
   - Detect motion with camera
   - Respond to hand movements
   - Create interactive experiences

4. **Text to Speech Extension:**
   - Make sprites speak aloud
   - Create narrated stories
   - Add voice to characters

5. **Translate Extension:**
   - Translate text between languages
   - Create multilingual projects
   - Learn about different languages

**Relate the extensions to content from previous lessons:**
- Music extension connects to sound projects
- Pen extension enhances art and animation
- Video sensing adds interactivity to games
- Text to speech improves storytelling
- Translate makes projects more accessible

## Mini Project: Scratch Extensions Project (25-30 minutes)

### Project Overview

Have students experiment with the Scratch extensions! They can either make a new project or modify a previous one.

### Requirements

**Basic Requirements:**
- Students should use at least one extension
- There should be multiple different sprites involved
- The project should involve user input or user interaction
- There should be sound effects

### Step-by-Step Development

1. **Choose and Explore an Extension (10 minutes):**
   - Browse available extensions
   - Select one that interests you
   - Experiment with the new blocks
   - Understand how the extension works

2. **Plan Your Project (5 minutes):**
   - Decide how to use the extension
   - Plan the interaction or feature
   - Sketch out the basic structure

3. **Build Your Project (15 minutes):**
   - Create sprites and backdrops
   - Implement the extension features
   - Add user interaction
   - Test and refine

### Extension-Specific Project Ideas

**Music Extension Projects:**
\`\`\`scratch
when green flag clicked
set instrument to (1)
forever
  if <key [1 v] pressed?> then
    play note (60) for (0.5) beats
  end
  if <key [2 v] pressed?> then
    play note (62) for (0.5) beats
  end
  if <key [3 v] pressed?> then
    play note (64) for (0.5) beats
  end
  wait (0.1) seconds
end
\`\`\`

**Pen Extension Projects:**
\`\`\`scratch
when green flag clicked
clear
pen down
forever
  if <mouse down?> then
    go to [mouse-pointer v]
  end
  wait (0.1) seconds
end

when [space v] key pressed
clear
\`\`\`

**Video Sensing Projects:**
\`\`\`scratch
when green flag clicked
set video transparency to (50)
forever
  if <(video [motion v] on [sprite1 v]) > (10)> then
    say [Motion detected!] for (1) seconds
    play sound [pop v]
  end
  wait (0.1) seconds
end
\`\`\`

**Text to Speech Projects:**
\`\`\`scratch
when green flag clicked
say [Hello! Welcome to my project!] using [text to speech v]
wait (2) seconds
ask [What's your name?] and wait
say (join [Nice to meet you, ] (answer)) using [text to speech v]
\`\`\`

**Translate Extension Projects:**
\`\`\`scratch
when green flag clicked
ask [Enter a word to translate:] and wait
set [translated v] to (translate [answer v] to [Spanish v])
say (join [In Spanish: ] (translated)) for (2) seconds
\`\`\`

### Advanced Extension Combinations

**Combining Multiple Extensions:**
\`\`\`scratch
when green flag clicked
clear
set instrument to (10)
forever
  if <mouse down?> then
    go to [mouse-pointer v]
    pen down
    play note (pick random (60) to (80)) for (0.2) beats
  else
    pen up
  end
  wait (0.1) seconds
end

when [space v] key pressed
clear
say [Drawing cleared!] using [text to speech v]
\`\`\`

### Teaching Tips

- Help students explore extensions that interest them
- Encourage experimentation with different extension combinations
- Remind students to test their projects thoroughly
- If students finish early, challenge them to combine multiple extensions

## Key Learning Objectives

- Understand what Scratch extensions are and how to access them
- Know how to use at least one extension effectively
- Be able to integrate extensions into existing projects
- Understand how extensions expand Scratch's capabilities
- Know how to create interactive projects with extensions

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may not understand how to access extensions
- Some may choose extensions that are too complex for their skill level
- Students might not test their extension features thoroughly
- Some may forget to save their projects with extensions

**Teaching Tips:**
- Always demonstrate how to access the extension library
- Help students choose appropriate extensions for their skill level
- Show students how to test extension features step by step
- Encourage students to explore and experiment

## Resources

- [Scratch Extensions Guide](https://scratch.mit.edu/help/scratch1/2.0/Extensions)
- [Extension Examples](https://scratch.mit.edu/explore/projects/tag:extensions)
- [Extension Tutorials](https://scratch.mit.edu/help/videos/)

## Next Steps

In the next lesson, we'll learn about code efficiency and debugging techniques!`;

    return (
        <LessonPage
            title="Scratch Extensions"
            moduleTitle="Rehashing the Basics (continued)"
            lessonNumber={15}
            content={content}
            prevLesson="/cs/scratch1/lesson14"
            nextLesson="/cs/scratch1/lesson16"
            backToCurriculum="/cs/scratch1"
        />
    );
};

export default ScratchLesson15; 
