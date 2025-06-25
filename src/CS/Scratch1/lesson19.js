import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson19 = () => {
    const content = `# Lesson 19: Improving Games

## Module 11: Advanced Game Design in Scratch (bonus lessons) (continued)

## Interactive Lecture (15-20 minutes)

### Step 1: Understanding Game Quality

**Ask students: what makes the best games so great?**

**Potential ideas include:**
- **Pixel Art:** Clean, consistent visual style
- **Graphics:** High-quality sprites and backgrounds
- **Animations:** Smooth, engaging character movements
- **Level Design:** Well-thought-out game progression
- **Sound Effects:** Audio feedback for actions
- **Leaderboards:** Competition and replayability
- **High Scores:** Personal achievement tracking
- **Collectibles:** Items to find and gather
- **Visual Effects:** Particle effects, screen shakes, etc.

### Step 2: Demo Advanced Features

**Next, demo some of their ideas implemented in their flappy bird game.**

**Examples to demonstrate:**
- **Adding a high score with cloud variables:** Persistent score tracking
- **Tutorial on making good color palettes and gradients:** Visual design principles
- **Teaching complementary colors:** Color theory for games
- **Showing how to make collectible coins for extra score:** Additional gameplay elements

### Step 3: Game Polish Techniques

**Key areas for improvement:**
- **Visual Polish:** Better sprites, backgrounds, and effects
- **Audio Design:** Sound effects and music
- **User Experience:** Clear feedback and intuitive controls
- **Performance:** Smooth gameplay and responsive controls

## Project: Improve that Game! (30-35 minutes)

### Project Overview

Students should find ways to improve their game using your (hopefully amazing) demo.

### Requirements

**Basic Requirements:**
- Some form of high score or leaderboard
- At least 2 unique features and/or improvements

### Step-by-Step Development

1. **Add High Score System (15 minutes):**
   - Create variables to track high scores
   - Update high score when beaten
   - Display high score on screen

**High Score Implementation:**
\`\`\`scratch
when green flag clicked
set [score v] to (0)
set [high score v] to (0)
forever
  say (join [Score: ] (score))
  say (join [High Score: ] (high score))
end

when I receive [game over v]
if <(score) > (high score)> then
  set [high score v] to (score)
  say [New High Score!] for (2) seconds
end
say (join [Final Score: ] (score)) for (3) seconds
\`\`\`

2. **Add Visual Improvements (10 minutes):**
   - Improve sprite designs
   - Add particle effects
   - Create better backgrounds

**Particle Effect System:**
\`\`\`scratch
when green flag clicked
forever
  if <key [space v] pressed?> then
    create clone of [particle v]
  end
  wait (0.1) seconds
end

when I start as a clone
go to [bird v]
set [life v] to (10)
set [velocity x v] to (pick random (-5) to (5))
set [velocity y v] to (pick random (-5) to (5))
forever
  change x by (velocity x)
  change y by (velocity y)
  change [life v] by (-1)
  change [ghost v] effect by (10)
  if <(life) < (1)> then
    delete this clone
  end
  wait (0.1) seconds
end
\`\`\`

3. **Add Sound Effects and Music (5 minutes):**
   - Add sound effects for actions
   - Include background music
   - Create audio feedback

**Sound System:**
\`\`\`scratch
when green flag clicked
play sound [background music v] until done

when green flag clicked
forever
  if <key [space v] pressed?> then
    play sound [jump v]
  end
  if <touching [pipe v] ?> then
    play sound [hit v]
  end
  if <touching [coin v] ?> then
    play sound [collect v]
  end
  wait (0.1) seconds
end
\`\`\`

### Advanced Features (for early finishers)

**Students can add these features to make their games even better:**

1. **Collectible Items:**
\`\`\`scratch
when green flag clicked
forever
  wait (pick random (3) to (8)) seconds
  create clone of [coin v]
end

when I start as a clone
go to x: (240) y: (pick random (-180) to (180))
forever
  change x by (-2)
  if <(x position) < (-240)> then
    delete this clone
  end
  wait (0.1) seconds
end

when green flag clicked
forever
  if <touching [coin v] ?> then
    change [score v] by (5)
    play sound [collect v]
    delete this clone
  end
  wait (0.1) seconds
end
\`\`\`

2. **Screen Shake Effect:**
\`\`\`scratch
define screen shake (intensity) (duration)
repeat (duration)
  change x by (pick random ((intensity) * (-1)) to (intensity))
  change y by (pick random ((intensity) * (-1)) to (intensity))
  wait (0.05) seconds
end
go to x: (0) y: (0)

when I receive [game over v]
screen shake (10) (20)
\`\`\`

3. **Color Gradients and Effects:**
\`\`\`scratch
when green flag clicked
set [color effect v] to (0)
forever
  change [color effect v] by (1)
  if <(color effect) > (200)> then
    set [color effect v] to (0)
  end
  wait (0.1) seconds
end
\`\`\`

4. **Level Progression with Visual Changes:**
\`\`\`scratch
when green flag clicked
set [level v] to (1)
forever
  if <(score) > ((level) * (10))> then
    change [level v] by (1)
    change [brightness v] effect by (10)
    say (join [Level ] (level)) for (2) seconds
  end
end
\`\`\`

5. **Achievement System:**
\`\`\`scratch
when green flag clicked
set [achievements v] to [0]
forever
  if <(score) > (50)> then
    if <not <(achievements) contains [50 points]>>> then
      add [50 points] to [achievements v]
      say [Achievement: 50 Points!] for (2) seconds
    end
  end
  if <(score) > (100)> then
    if <not <(achievements) contains [100 points]>>> then
      add [100 points] to [achievements v]
      say [Achievement: 100 Points!] for (2) seconds
    end
  end
  wait (0.1) seconds
end
\`\`\`

### Teaching Tips

- Help students prioritize which improvements to make first
- Encourage students to test their improvements thoroughly
- Remind students that polish takes time and iteration
- If students finish early, challenge them to add more advanced features

## Key Learning Objectives

- Understand what makes games visually appealing and engaging
- Know how to implement high score systems and leaderboards
- Be able to add visual effects and polish to games
- Understand how sound design enhances gameplay
- Know how to create collectible items and achievement systems

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may add too many effects at once
- Some may not test their improvements thoroughly
- Students might forget to save their work frequently
- Some may focus on quantity over quality

**Teaching Tips:**
- Always emphasize the importance of testing each improvement
- Show students how to use the "step" button to debug new features
- Encourage students to iterate and refine their improvements
- Help students who struggle with visual design

## Resources

- [Scratch Visual Effects Guide](https://scratch.mit.edu/help/scratch1/2.0/Visual_Effects)
- [Game Design Principles](https://scratch.mit.edu/help/scratch1/2.0/Game_Design)
- [Sound Design Tutorial](https://scratch.mit.edu/help/videos/)

## Next Steps

In the next lesson, we'll learn about UI design and create polished game interfaces!`;

    return (
        <LessonPage
            title="Improving Games"
            moduleTitle="Advanced Game Design in Scratch (bonus lessons) (continued)"
            lessonNumber={19}
            content={content}
            prevLesson="/cs/scratch1/lesson18"
            nextLesson="/cs/scratch1/lesson20"
            backToCurriculum="/cs/scratch1"
        />
    );
};

export default ScratchLesson19; 
