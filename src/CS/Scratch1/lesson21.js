import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson21 = () => {
    const content = `# Lesson 21: Physics Engines

## Module 11: Advanced Game Design in Scratch (bonus lessons) (continued)

## Interactive Lecture (15-20 minutes)

### Step 1: Understanding Physics Engines

**Ask students what they think a physics engine is, before sharing the following definition:**

**Physics Engine Definition:** "A physics engine is computer software that provides an approximate simulation of certain physical systems. This might include simulating gravity, jumping, bouncing, splashing, and more! It is often complex to make, so usually, physics engines are recycled in lots of different projects."

**Discussion Questions:**
- What games do you know that use physics?
- What physical behaviors do you see in games?
- Why might we want realistic physics in games?

### Step 2: Examples of Physics in Games

**Explain games they might know of that use a physics engine, does our flappy bird example have a physics engine? (hint: yes!!)**

**Examples of Physics in Games:**
- **Gravity:** Objects falling naturally
- **Bouncing:** Objects rebounding off surfaces
- **Collision:** Objects interacting when they touch
- **Momentum:** Objects continuing to move after force is applied
- **Friction:** Objects slowing down over time

### Step 3: Exploring Physics Examples

**Share the following studio with students, and ask them to identify the most realistic jumping motion:** Physics-In-Scratch Lessons

**Walk students through each part of how the two projects work, explaining how variables are important in physics engines.**

**Key Concepts:**
- **Variables:** Store values like velocity, acceleration, and position
- **Realistic Motion:** The more realistic it looks, the more code (generally) it needs to work
- **Reusability:** Most people reuse the same couple of physics engines that are all over in Scratch!

**Tip:** This lesson + project may take longer, so you may want to assign more homework or potentially plan to use more class time another day.

## Project: Applying a Physics Engine to your Game (30-35 minutes)

### Project Overview

Ask students to search up 'Physics Engine' in Scratch and explore more complex Physics Engines- try remixing them and making changes. Does it still work? What difference did it make?

Ask students to use any physics engine (either from the aforementioned studio or anywhere else on scratch) to make a project or game of their choice.

### Requirements

**Basic Requirements:**
- Use an existing physics engine or create a simple one
- Apply physics to at least one sprite
- Test and modify the physics behavior
- Document what changes you made

### Step-by-Step Development

1. **Explore Existing Physics Engines (10 minutes):**
   - Search for physics engines on Scratch
   - Remix and test different engines
   - Understand how they work

2. **Choose and Implement Physics (15 minutes):**
   - Select a physics engine to use
   - Apply it to your game sprites
   - Test the behavior

3. **Modify and Experiment (10 minutes):**
   - Change physics parameters
   - Test different values
   - Document your findings

### Example Physics Engine Implementation

**Basic Gravity Physics:**
\`\`\`scratch
when green flag clicked
set [velocity y v] to (0)
set [gravity v] to (-0.5)
forever
  change [velocity y v] by (gravity)
  change y by (velocity y)
  if <touching [ground v] ?> then
    set [velocity y v] to (0)
    go to x: (x position) y: (y position)
  end
  wait (0.1) seconds
end
\`\`\`

**Jumping with Physics:**
\`\`\`scratch
when [space v] key pressed
if <touching [ground v] ?> then
  set [velocity y v] to (10)
  play sound [jump v]
end
\`\`\`

**Bouncing Physics:**
\`\`\`scratch
when green flag clicked
set [velocity y v] to (0)
set [bounce factor v] to (0.8)
forever
  change [velocity y v] by (-0.5)
  change y by (velocity y)
  if <touching [ground v] ?> then
    set [velocity y v] to ((velocity y) * (bounce factor))
    if <(velocity y) > (-1)> then
      set [velocity y v] to (0)
    end
  end
  wait (0.1) seconds
end
\`\`\`

### Advanced Physics Features

**Students can implement these more complex physics behaviors:**

1. **Friction and Air Resistance:**
\`\`\`scratch
when green flag clicked
set [velocity x v] to (10)
set [friction v] to (0.95)
forever
  change x by (velocity x)
  set [velocity x v] to ((velocity x) * (friction))
  if <(velocity x) < (0.1)> then
    set [velocity x v] to (0)
  end
  wait (0.1) seconds
end
\`\`\`

2. **Collision Response:**
\`\`\`scratch
when green flag clicked
forever
  if <touching [wall v] ?> then
    set [velocity x v] to ((velocity x) * (-1))
    play sound [bounce v]
  end
  wait (0.1) seconds
end
\`\`\`

3. **Spring Physics:**
\`\`\`scratch
when green flag clicked
set [spring length v] to (100)
set [spring force v] to (0.1)
forever
  set [distance v] to ([sqrt v] of ((((x position) - (anchor x)) * ((x position) - (anchor x))) + (((y position) - (anchor y)) * ((y position) - (anchor y)))))
  set [spring effect v] to (((distance) - (spring length)) * (spring force))
  change [velocity x v] by (spring effect)
  change [velocity y v] by (spring effect)
  wait (0.1) seconds
end
\`\`\`

4. **Pendulum Physics:**
\`\`\`scratch
when green flag clicked
set [angle v] to (45)
set [angular velocity v] to (0)
set [gravity v] to (0.1)
set [length v] to (100)
forever
  change [angular velocity v] by (((gravity) / (length)) * ([sin v] of (angle)))
  change [angle v] by (angular velocity)
  set [x v] to ((length) * ([cos v] of (angle)))
  set [y v] to ((length) * ([sin v] of (angle)))
  go to x: (x) y: (y)
  wait (0.1) seconds
end
\`\`\`

### Teaching Tips

- Help students understand the relationship between code complexity and realism
- Encourage students to experiment with different physics values
- Remind students to test their physics thoroughly
- If students finish early, challenge them to combine multiple physics behaviors

## Key Learning Objectives

- Understand what physics engines are and how they work
- Know how to implement basic physics behaviors like gravity and bouncing
- Be able to modify existing physics engines
- Understand the relationship between code complexity and realism
- Know how to apply physics to game development

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may make physics too complex for their skill level
- Some may not understand the relationship between variables and behavior
- Students might not test their physics thoroughly
- Some may get frustrated with the complexity of realistic physics

**Teaching Tips:**
- Always start with simple physics and build complexity
- Show students how to use the "step" button to debug physics
- Encourage students to experiment with different values
- Help students who struggle with mathematical concepts

## Resources

- [Physics Engine Examples](https://scratch.mit.edu/explore/projects/tag:physics)
- [Physics in Scratch Guide](https://scratch.mit.edu/help/scratch1/2.0/Physics)
- [Physics Engine Tutorial](https://scratch.mit.edu/help/videos/)

## Next Steps

In the next lesson, we'll create platformer games using physics engines!`;

    return (
        <LessonPage
            title="Physics Engines"
            moduleTitle="Advanced Game Design in Scratch (bonus lessons) (continued)"
            lessonNumber={21}
            content={content}
            prevLesson="/cs/scratch1/lesson20"
            nextLesson="/cs/scratch1/lesson22"
            backToCurriculum="/cs/scratch1"
        />
    );
};

export default ScratchLesson21; 
