import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson3 = () => {
    const content = `# Lesson 3: Coordinate Plane & Constellations

## Module 2: Motion

## Warm-up (5-10 minutes)

**Do some icebreakers** and ask an open-ended prompt such as:
- What's your favorite constellation in the night sky?
- If you could travel anywhere in the world, where would you go?
- What's something you're curious about learning today?
- What's your favorite way to give directions to someone?

## Interactive Lecture (20-25 minutes)

### Step 1: Teaching the Coordinate Plane

If you are comfortable, get out a Zoom whiteboard and spend ~20 minutes teaching the coordinate plane. Be very detailed because this is likely the first time they've heard of x and y coordinates.

**Coordinate Plane Basics:**
- **X-axis:** Horizontal line (left to right)
- **Y-axis:** Vertical line (up and down)
- **Origin:** Point (0,0) where axes meet
- **Negative numbers:** Left of origin for x, below origin for y

**Alternative:**
If you are not comfortable teaching the coordinate plane, watch the first ~3:30 minutes of [this video](https://www.youtube.com/watch?v=9Uc62CuQjc4) with your students.

### Step 2: Using Coordinate Plane in Scratch

Next, use a coordinate plane backdrop in the Scratch library and go over coordinate-related blocks.

**Coordinate-Related Blocks:**
- \`change x by [10]\` - Moves sprite horizontally
- \`change y by [10]\` - Moves sprite vertically
- \`glide to x:[0] y:[0]\` - Smoothly moves to specific coordinates
- \`go to x:[0] y:[0]\` - Instantly moves to specific coordinates

**Example: Moving with coordinates**

\`\`\`scratch
when flag clicked
go to x: (0) y: (0)
change x by (50)
wait (1) secs
change y by (30)
wait (1) secs
glide (2) secs to x: (-50) y: (-30)
\`\`\`

### Step 3: Hands-on Practice

Have them use the coordinate blocks and see what happens:
- Have them use the "change x by" and the "change y by" blocks and see what happens
- Have them use the "glide to x, y" blocks and see what happens
- Have them use the "go to x, y" blocks and see what happens

**Example: Coordinate practice**

\`\`\`scratch
when [space v] key pressed
change x by (20)
change y by (15)
\`\`\`

**Example: Gliding to specific points**

\`\`\`scratch
when [g v] key pressed
glide (1) secs to x: (100) y: (100)
wait (0.5) secs
glide (1) secs to x: (-100) y: (-100)
\`\`\`

### Step 4: Understanding Check

Check understanding by placing a sprite in a location and having them try to figure out what coordinate it is at.

**Important Note:**
Not every kid will completely understand this, but they need to at minimum understand that y controls up and down, and x controls right and left.

## Mini-project: Constellation Creation (15-20 minutes)

### Project Overview

Ask students to recreate constellation projects with their own constellations by remixing the following projects. Make sure to show how to remix the project and duplicate sprites if necessary.

**Project Options:**
- **Beginner challenge:** https://scratch.mit.edu/projects/501255387/
- **Advanced challenge:** https://scratch.mit.edu/projects/501257333/

### Remixing Instructions

Show students how to remix a project:
1. Click the "Remix" button on the project page
2. This creates a copy in their account
3. They can then modify the project
4. Show how to duplicate sprites if needed

### Customization Requirements

Students should:
- Create their own constellation pattern
- Use coordinate blocks to position stars
- Add their own creative touches
- Test that their constellation works correctly

**Example: Creating a simple constellation**

\`\`\`scratch
when flag clicked
go to x: (0) y: (0)
show
wait (1) secs
go to x: (50) y: (30)
wait (1) secs
go to x: (100) y: (0)
wait (1) secs
go to x: (150) y: (-30)
\`\`\`

**Example: Constellation with multiple stars**

\`\`\`scratch
when flag clicked
go to x: (-100) y: (50)
show
wait (0.5) secs
go to x: (-50) y: (100)
wait (0.5) secs
go to x: (0) y: (50)
wait (0.5) secs
go to x: (50) y: (0)
wait (0.5) secs
go to x: (100) y: (-50)
\`\`\`

**Teaching Tips:**
- Encourage students to plan their constellation on paper first
- Have them write down the coordinates they want to use
- Remind them to test small movements before making large changes
- If students finish early, challenge them to add more stars or create multiple constellations

## Key Learning Objectives

- Understand the basic concept of the coordinate plane
- Know that x controls left/right movement and y controls up/down movement
- Be able to use coordinate-related motion blocks
- Understand the difference between "change x/y by" and "go to x,y"
- Be able to position sprites at specific coordinates
- Understand how to remix and modify existing projects

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may confuse x and y coordinates
- Some may not understand negative numbers in coordinates
- Students might forget that Scratch's coordinate system is different from math class
- Some may not realize the difference between "change by" and "go to"

**Teaching Tips:**
- Use the analogy of a map or GPS coordinates
- Emphasize that negative x means left, negative y means down
- Show students how to use the coordinate display in Scratch
- Have students practice with simple movements before complex projects
- Use visual aids like grid paper to help students understand coordinates

## Resources

- [Beginner Constellation Project](https://scratch.mit.edu/projects/501255387/)
- [Advanced Constellation Project](https://scratch.mit.edu/projects/501257333/)
- [Coordinate Plane Video Tutorial](https://www.youtube.com/watch?v=9Uc62CuQjc4)
- [Scratch Help Center](https://scratch.mit.edu/help)

## Next Steps

In the next lesson, we'll learn about looks and sound blocks and create a musical keyboard!`;

    return (
        <LessonPage
            title="Coordinate Plane & Constellations"
            moduleTitle="Motion"
            lessonNumber={3}
            content={content}
            prevLesson="/cs/scratch1/lesson2"
            nextLesson="/cs/scratch1/lesson4"
            backToCurriculum="/cs/scratch1"
        />
    );
};

export default ScratchLesson3; 
