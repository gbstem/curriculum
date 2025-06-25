import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson17 = () => {
    const content = `# Lesson 17: Debugging

## Module 10: Refining our code (continued)

## Interactive Lecture (15-20 minutes)

### Step 1: Understanding Debugging

**Ask: What is debugging?**

**Answer:** Debugging is the process of removing 'bugs', or tiny issues and inconsistencies in our code. Debugging can be difficult, but it is an important skill both inside and out of the Scratch platform.

**Discussion Questions:**
- What kinds of problems can occur in code?
- Why is debugging important?
- What strategies do you use when something doesn't work?

### Step 2: Debugging Strategies

**Explain: Some strategies for debugging include testing and disabling parts of your code until it works.**

**Key Debugging Strategies:**
1. **Systematic Testing:** Test each part of your code step by step
2. **Disable and Test:** Turn off parts of your code to isolate the problem
3. **Use the Step Button:** Run code slowly to see what's happening
4. **Check Variables:** Monitor variable values to see if they're correct
5. **Simplify:** Break complex problems into smaller parts

### Step 3: Common Types of Bugs

**Types of Bugs Students Might Encounter:**
- **Logic Errors:** Code runs but doesn't do what you expect
- **Syntax Errors:** Code won't run due to incorrect structure
- **Timing Issues:** Code runs too fast or too slow
- **Variable Problems:** Variables not set or updated correctly
- **Sprite Issues:** Sprites not positioned or behaving correctly

## Project: Debugging Practice (25-30 minutes)

### Project Overview

Students should fix this project, without adding or removing any blocks. They can move around and change blocks that are already there to fix it!

### Requirements

**Basic Requirements:**
- Fix the broken project using only existing blocks
- Move blocks around as needed
- Change block values if necessary
- Test the fix thoroughly

### Step-by-Step Debugging Process

1. **Identify the Problem (5 minutes):**
   - Run the project and observe what's wrong
   - Note specific issues (sprites not moving, wrong behavior, etc.)
   - Make a list of problems to fix

2. **Analyze the Code (10 minutes):**
   - Look at each script carefully
   - Identify blocks that might be causing problems
   - Think about what the code should do vs. what it's doing

3. **Make Fixes (10 minutes):**
   - Move blocks to correct positions
   - Change values in blocks if needed
   - Test each fix as you make it

### Example Debugging Scenarios

**Scenario 1: Sprite Not Moving**
\`\`\`scratch
// BROKEN CODE - Sprite doesn't move when arrow keys pressed
when green flag clicked
go to x: (0) y: (0)
forever
  if <key [up arrow v] pressed?> then
    change y by (5)
  end
  if <key [down arrow v] pressed?> then
    change y by (-5)
  end
  // Missing wait block causes sprite to move too fast
end

// FIXED CODE
when green flag clicked
go to x: (0) y: (0)
forever
  if <key [up arrow v] pressed?> then
    change y by (5)
  end
  if <key [down arrow v] pressed?> then
    change y by (-5)
  end
  wait (0.1) seconds // Added wait block to control speed
end
\`\`\`

**Scenario 2: Score Not Updating**
\`\`\`scratch
// BROKEN CODE - Score doesn't increase when touching items
when green flag clicked
set [score v] to (0)
forever
  if <touching [coin v] ?> then
    change [score v] by (10)
    // Missing hide block - coin doesn't disappear
  end
  wait (0.1) seconds
end

// FIXED CODE
when green flag clicked
set [score v] to (0)
forever
  if <touching [coin v] ?> then
    change [score v] by (10)
    hide // Added hide block to make coin disappear
  end
  wait (0.1) seconds
end
\`\`\`

**Scenario 3: Game Loop Issues**
\`\`\`scratch
// BROKEN CODE - Game doesn't restart properly
when green flag clicked
set [lives v] to (3)
forever
  if <(lives) < (1)> then
    say [Game Over!] for (2) seconds
    // Missing stop block - game continues after game over
  end
  wait (0.1) seconds
end

// FIXED CODE
when green flag clicked
set [lives v] to (3)
forever
  if <(lives) < (1)> then
    say [Game Over!] for (2) seconds
    stop [all v] // Added stop block to end game
  end
  wait (0.1) seconds
end
\`\`\`

### Advanced Debugging Techniques

**Students can use these techniques for more complex debugging:**

1. **Using the Step Button:**
\`\`\`scratch
// Use step button to run this code slowly and see what happens
when green flag clicked
set [counter v] to (0)
repeat (5)
  change [counter v] by (1)
  say (counter) for (1) seconds
end
\`\`\`

2. **Adding Debug Messages:**
\`\`\`scratch
when green flag clicked
set [score v] to (0)
forever
  if <touching [coin v] ?> then
    change [score v] by (10)
    say (join [Score: ] (score)) for (1) seconds // Debug message
  end
  wait (0.1) seconds
end
\`\`\`

3. **Testing Individual Parts:**
\`\`\`scratch
// Test movement separately
when [space v] key pressed
change x by (10)
say [Moved right] for (1) seconds

// Test collision separately
when [c v] key pressed
if <touching [coin v] ?> then
  say [Touching coin!] for (1) seconds
else
  say [Not touching coin] for (1) seconds
end
\`\`\`

### Answer Key

**Basic working example:** [Link to working project]

### Teaching Tips

- Help students develop a systematic approach to debugging
- Encourage students to test their fixes immediately
- Remind students to look for common patterns in bugs
- If students finish early, challenge them to create their own broken code for others to fix

## Key Learning Objectives

- Understand what debugging is and why it's important
- Know how to systematically identify and fix code problems
- Be able to use debugging tools like the step button
- Understand common types of bugs and how to fix them
- Know how to test code thoroughly after making fixes

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may try to fix everything at once instead of systematically
- Some may not test their fixes thoroughly
- Students might get frustrated when debugging takes time
- Some may not understand the difference between different types of bugs

**Teaching Tips:**
- Always emphasize the importance of systematic debugging
- Show students how to use the step button effectively
- Encourage students to take breaks when debugging gets frustrating
- Help students who struggle with identifying the root cause of problems

## Resources

- [Scratch Debugging Guide](https://scratch.mit.edu/help/scratch1/2.0/Debugging)
- [Common Scratch Bugs](https://scratch.mit.edu/help/scratch1/2.0/Common_Problems)
- [Debugging Tutorial](https://scratch.mit.edu/help/videos/)

## Next Steps

In the next lesson, we'll start working on advanced game design with Flappy Bird-inspired games!`;

    return (
        <LessonPage
            title="Debugging"
            moduleTitle="Refining our code (continued)"
            lessonNumber={17}
            content={content}
            prevLesson="/cs/scratch1/lesson16"
            nextLesson="/cs/scratch1/lesson18"
            backToCurriculum="/cs/scratch1"
        />
    );
};

export default ScratchLesson17; 
