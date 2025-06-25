import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson24 = () => {
    const content = `# Lesson 24: Remixing and Independent Exploration

## Module 11: Advanced Game Design in Scratch (bonus lessons) (continued)

## Interactive Lecture (15-20 minutes)

### Step 1: What does it mean to remix something?

**What is remixing?**
- Taking an existing project and making it your own
- Adding new features, changing art, or improving code
- Learning by exploring and modifying others' work

**How do we do that in Scratch?**
- Click the "See Inside" button on any project
- Click the "Remix" button to create your own copy
- Make changes and save as a new project

**How do we read other peoples code (and make ours more readable)?**
- Explore scripts and see how things work
- Add comments to explain your code
- Organize code into sections

**Introduce making comments (on code, by right clicking a block) in scratch, show a sample usage**

**Show students the explore page and search for different projects just to show them what is out there**

## Project: Independent Exploration! (30-35 minutes)

### Project Overview

Ask them to play 3-5 different games and projects they find interesting, then take a look inside to try and understand how the code behind it works.
Ask students to pick one of those games and projects to remix- they should make a significant change (30+ min of work)
Students should remix each other's remixes if extra time!

### Requirements

**Basic Requirements:**
- Play and explore 3-5 different projects
- Remix at least one project and make significant changes
- Add comments to your code
- Share your remix with the class

### Step-by-Step Development

1. **Explore Projects (10 minutes):**
   - Browse the Scratch explore page
   - Play different games and projects
   - Take notes on interesting features

2. **Read and Analyze Code (10 minutes):**
   - Click "See Inside" on projects
   - Try to understand how scripts work
   - Look for creative solutions and techniques

3. **Remix and Modify (15 minutes):**
   - Click "Remix" to create your own version
   - Make significant changes (new features, art, levels, etc.)
   - Add comments to explain your changes

**Sample Comment Usage:**
\`\`\`scratch
// This block controls the jumping mechanic
when [space v] key pressed
if <touching [ground v] ?> then
  set [velocity y v] to (10)
end
\`\`\`

### Advanced Exploration (for early finishers)

**If more comfortable:**
- Replicate a game with minimal help from looking at the code in the original game - they should think through how the code might work, not copying.
- Remix multiple projects and combine features
- Share remixes with classmates and give feedback

### Teaching Tips

- Help students find interesting projects to explore
- Encourage students to read and comment code
- Remind students to make significant changes when remixing
- If students finish early, challenge them to remix multiple projects

## Key Learning Objectives

- Understand what remixing is and why it's valuable
- Know how to explore and analyze other people's code
- Be able to make significant changes to remixed projects
- Understand how to add comments and organize code
- Know how to share and present remixed projects

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may not make enough changes when remixing
- Some may not comment their code
- Students might not test their remixes thoroughly
- Some may not share their projects with the class

**Teaching Tips:**
- Always emphasize the importance of making projects your own
- Show students how to use comments for clarity
- Encourage students to present and explain their remixes
- Help students who struggle with code analysis

## Resources

- [Scratch Explore Page](https://scratch.mit.edu/explore)
- [Remixing Guide](https://scratch.mit.edu/help/scratch/2.0/Remixing)
- [Commenting Code Tutorial](https://scratch.mit.edu/help/videos/)

## Next Steps

In the next module, students will begin their final projects and portfolios!`;

    return (
        <LessonPage
            title="Remixing and Independent Exploration"
            moduleTitle="Advanced Game Design in Scratch (bonus lessons) (continued)"
            lessonNumber={24}
            content={content}
            prevLesson="/cs/scratch/lesson23"
            nextLesson={null}
            backToCurriculum="/cs/scratch"
        />
    );
};

export default ScratchLesson24; 
