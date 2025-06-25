import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson1 = () => {
    const content = `# Lesson 1: Scratch Environment & Scene Creation

## Module 1: Scratch Environment

## Warm-up (5-10 minutes)

**Do a round of introductions.** Each person should say their name and the answer to an open-ended prompt such as:

- What's your favorite food?
- If you could have any superpower, what would it be?
- What's the best book you've ever read?
- What's your dream vacation destination?
- If you could meet anyone from history, who would it be?

## Interactive Lecture (15-20 minutes)

### Step 1: Drawing Activity

Ask students to draw a background of a place they like and their favorite animal on a piece of paper. This will help them think about what they want to create in Scratch.

### Step 2: Screen Share and Demo

Screen share and demo the basics of navigating Scratch. Ask students to follow along.

**Essential Navigation Skills:**
- **How to sign in** to Scratch accounts
- **How to create a project** in two ways:
  - From the "create" tab
  - From the button in "my stuff"
- **How to access previous projects**
- **How to make a new project and name it**

### Step 3: Working with Sprites and Backdrops

Show students how to:
- **Select a backdrop** from the backdrop library
- **Select a sprite** from the sprite library
- **Basic sprite functions** that can be edited without blocks:
  - Name
  - Size
  - Position
  - Show/hide

Here's how to set up a basic scene:

\`\`\`scratch
when flag clicked
go to x: (0) y: (0)
set size to (100) %
show
\`\`\`

### Step 4: Custom Creation

Introduce making custom backgrounds and sprites as an extension of previous skills.

**Creating a custom sprite:**
1. Click the "Choose a Sprite" button
2. Select "Paint" to create a new sprite
3. Use the drawing tools to create your sprite
4. Name your sprite appropriately

**Creating a custom backdrop:**
1. Click the "Choose a Backdrop" button
2. Select "Paint" to create a new backdrop
3. Use the drawing tools to create your scene
4. Name your backdrop appropriately

### Step 5: Review and Questions

Ask students if they have questions, and review the "big ideas" of the lesson.

## Mini-project: Scene Creation (5-10 minutes)

### Basic Example

Spend 5-10 minutes making a few backdrops and sprites:

- The backdrop should be filled in completely (unless it's intentional blank space like for clouds)
- The sprites should be a mix of predetermined and created (such as drawing a hat on a Scratch cat)
- If more comfortable, ask them to recreate the drawing they made at the start of class

**Example: Creating a simple scene with a cat and a hat**

\`\`\`scratch
when flag clicked
go to x: (-100) y: (0)
set size to (80) %
show
\`\`\`

**Teaching Tips:**
- There are so many sprites and backgrounds, but if they aren't able to find the right ones, suggest they find the sprite/background with the closest resemblance
- If they finish early, they can make more detailed custom sprites or backgrounds using artistic principles like complimentary colors and shading

### Advanced Example (for early finishers)

Students can make more detailed custom sprites or backgrounds using artistic principles like:
- Complimentary colors
- Shading techniques
- Layering elements
- Creating depth and perspective

**Example: Creating a detailed character with multiple costumes**

\`\`\`scratch
when flag clicked
go to x: (0) y: (0)
set size to (100) %
show
switch costume to [costume1 v]
\`\`\`

## Key Learning Objectives

- Understand how to navigate the Scratch interface
- Know how to create and name projects
- Be able to select and customize sprites and backdrops
- Understand basic sprite properties (name, size, position, visibility)
- Begin creating custom sprites and backgrounds

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may forget to save their projects
- Some may struggle with the drawing tools initially
- Students might not understand the difference between sprites and backdrops

**Teaching Tips:**
- Always remind students to save their work frequently
- Encourage experimentation with the drawing tools
- Use analogies to explain sprites vs backdrops (actors vs stage)
- Celebrate all attempts, even if they're not "perfect"

## Resources

- [Scratch Official Website](https://scratch.mit.edu)
- [Scratch Ideas Page](https://scratch.mit.edu/ideas)
- [Scratch Help Center](https://scratch.mit.edu/help)

## Next Steps

In the next lesson, we'll learn about motion blocks and create our first interactive project!`;

    return (
        <LessonPage
            title="Scratch Environment & Scene Creation"
            moduleTitle="Scratch Environment"
            lessonNumber={1}
            content={content}
            prevLesson={null}
            nextLesson="/cs/scratch/lesson2"
            backToCurriculum="/cs/scratch"
        />
    );
};

export default ScratchLesson1; 
