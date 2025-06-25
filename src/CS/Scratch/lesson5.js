import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson5 = () => {
    const content = `# Lesson 5: Storytelling Project

## Module 3: Looks and Sounds

## Interactive Lecture (15-20 minutes)

### Step 1: What Makes a Great Story?

Ask students what makes a great story. Encourage them to think about:
- Characters they care about
- Interesting plot twists
- Clear beginning, middle, and end
- Emotional connection
- Visual and audio elements

### Step 2: Understanding Plot Structure

Explain to them the basics of how a plot works:

**Story Structure:**
- **Beginning:** Introduce characters and setting
- **Middle:** The protagonist faces a problem or challenge
- **End:** There should be some sort of resolution

**Key Elements:**
- The protagonist should face a problem
- There should be some sort of resolution
- Characters should have clear motivations
- The story should be engaging and make sense

### Step 3: Exploring Story Examples

Show students this studio: [Story Projects Studio](https://scratch.mit.edu/studios/12345678)

**Discussion Points:**
- What makes these stories engaging?
- How do the creators use sprites and backdrops?
- What role does sound play in the storytelling?
- How do the stories create emotional connections?

### Step 4: Planning Your Story

Help students plan their stories by asking them to consider:
- Who are the main characters?
- What is the main problem or conflict?
- How will the story be resolved?
- What settings will the story take place in?
- What sounds and music will enhance the story?

## Project: Interactive Story Creation (25-30 minutes)

### Project Overview

Using motion, looks, and sound blocks, students should create a story. This is a longer project that may take more than one class period.

**Project Requirements:**
- **At least 2 sprites** need to interact with each other
- **There needs to be a backdrop** (or multiple backdrops for different scenes)
- **It should be at least 60 seconds long** when played through
- **Use motion blocks** to move characters around
- **Use looks blocks** for dialogue and visual effects
- **Use sound blocks** for audio enhancement

### Step-by-Step Development

1. **Planning Phase (5 minutes):**
   - Write down the basic plot
   - List the characters needed
   - Plan the scenes and backdrops
   - Think about what sounds will be needed

2. **Character Creation (5 minutes):**
   - Choose or create sprites for main characters
   - Add costumes if characters need to change appearance
   - Position characters in starting positions

3. **Backdrop Setup (5 minutes):**
   - Choose or create appropriate backdrops
   - Consider if you need multiple scenes
   - Make sure backdrops match the story setting

4. **Story Programming (10-15 minutes):**
   - Start with the first character's actions
   - Add dialogue using say blocks
   - Include character movements
   - Add sound effects and music
   - Program character interactions

**Example: Character introduction**

\`\`\`scratch
when flag clicked
go to x: (-150) y: (0)
show
say [Hello! I'm the main character.] for (3) secs
move (50) steps
say [I'm going on an adventure!] for (3) secs
\`\`\`

**Example: Character interaction**

\`\`\`scratch
when I receive [start conversation v]
go to x: (150) y: (0)
show
say [Hi there! How are you?] for (2) secs
wait (1) secs
say [That sounds exciting!] for (2) secs
\`\`\`

**Example: Scene change**

\`\`\`scratch
when I receive [change scene v]
switch backdrop to [backdrop2 v]
play sound [magic v] until done
say [We're in a new place!] for (2) secs
\`\`\`

### Advanced Features (for early finishers)

**If more comfortable, add unique sounds that can be played manually:**
- Add laugh track, sad trumpet noise, etc.
- Create interactive sound effects that respond to user input
- The funny sound effects will make the story less boring
- It will be SO MUCH more fun to make and watch!

**Example: Interactive sound effects**

\`\`\`scratch
when [l v] key pressed
play sound [laugh v] until done
say [Ha ha ha!] for (2) secs
\`\`\`

**Example: Character animation**

\`\`\`scratch
when I receive [dance v]
repeat (4)
  next costume
  wait (0.5) secs
end
\`\`\`

### Story Ideas for Inspiration

**Some story ideas to get started:**
- A day in the life of a pet
- A superhero's first mission
- A magical forest adventure
- A robot learning about emotions
- A detective solving a mystery
- A fairy tale retelling

### Technical Tips

- Use \`wait\` blocks to control timing
- Use \`broadcast\` blocks to coordinate multiple sprites
- Use \`next backdrop\` to change scenes
- Use \`next costume\` for character animations
- Test your story frequently as you build it

**Example: Coordinated story sequence**

\`\`\`scratch
when flag clicked
say [Once upon a time...] for (2) secs
broadcast [start story v]
wait (1) secs
switch backdrop to [forest v]
play sound [nature v] until done
\`\`\`

**Teaching Tips:**
- Encourage students to start simple and add complexity
- Help students who struggle with story ideas
- Remind students to test their stories as they build them
- Celebrate creative storytelling choices
- If students finish early, encourage them to add more scenes or characters

## Key Learning Objectives

- Understand basic story structure (beginning, middle, end)
- Be able to create interactive stories using Scratch
- Know how to coordinate multiple sprites in a project
- Understand how to use timing and sequencing in storytelling
- Be able to integrate motion, looks, and sound blocks effectively
- Know how to plan and structure a longer project

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may try to make stories too complex at first
- Some may forget to add timing between actions
- Students might not coordinate multiple sprites properly
- Some may forget to test their stories as they build them

**Teaching Tips:**
- Encourage students to start with a simple story and build up
- Remind students to use wait blocks for proper timing
- Show students how to use broadcast blocks for sprite coordination
- Have students test their stories frequently
- Help students who struggle with story ideas by providing examples

## Resources

- [Story Projects Studio](https://scratch.mit.edu/studios/12345678)
- [Scratch Ideas Page](https://scratch.mit.edu/ideas)
- [Scratch Help Center](https://scratch.mit.edu/help)

## Next Steps

In the next lesson, we'll learn about loops and create realistic animations!`;

    return (
        <LessonPage
            title="Storytelling Project"
            moduleTitle="Looks and Sounds"
            lessonNumber={5}
            content={content}
            prevLesson="/cs/scratch/lesson4"
            nextLesson="/cs/scratch/lesson6"
            backToCurriculum="/cs/scratch"
        />
    );
};

export default ScratchLesson5; 
