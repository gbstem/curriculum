import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson8 = () => {
    const content = `# Lesson 8: Guess My Number Game

## Module 6: Conditionals with Operators and Variables

## Warm-up (5-10 minutes)

**Play a few rounds of a guess my number game as a group**

- Think of a number between 1-100
- Students ask yes/no questions to guess the number
- Demonstrate the strategy of narrowing down the range
- Example: "Is it bigger than 50?" → "Is it bigger than 75?" etc.

**Discussion Questions:**
- What strategy did you use to guess the number?
- How did you decide what question to ask next?
- What if we could make a computer play this game?

## Interactive Lecture (15-20 minutes)

### Step 1: Understanding the Ask Block

Go through the ask block and some basic non-string related operators:

**The Ask Block:**
- \`ask [What's your guess?] and wait\` - Asks user for input
- \`answer\` - Contains the user's response
- \`answer\` is always a string, so we need to convert it to a number

**Converting Strings to Numbers:**
\`\`\`scratch
when green flag clicked
ask [What's your guess?] and wait
set [guess v] to (answer)
say (join [You guessed: ] (guess)) for (2) seconds
\`\`\`

### Step 2: Basic Operators for Comparison

**Comparison Operators:**
- \`(a) > (b)\` - Greater than
- \`(a) < (b)\` - Less than
- \`(a) = (b)\` - Equal to
- \`(a) >= (b)\` - Greater than or equal to
- \`(a) <= (b)\` - Less than or equal to

### Step 3: Understanding Variables

**What are Variables?**
- A variable is like a container; it can store different values
- Those values can change based on what you put inside or take out
- Variables help us remember information in our programs

**Creating and Using Variables:**
\`\`\`scratch
when green flag clicked
set [secret number v] to (pick random (1) to (100))
set [guesses v] to (0)
say [I'm thinking of a number 1-100!] for (2) seconds
\`\`\`

### Step 4: Building the Guess My Number Logic

Walk through the details in coding the guess my number game:

**The Game Logic:**
- Generate a random secret number
- Ask player for their guess
- Compare guess to secret number
- Give feedback (higher/lower)
- Keep track of number of guesses
- Repeat until correct

**This is similar to what they just did** since they are using details from the answer to the previous question to form the next one.

**Example:** If you ask if the number is bigger than 50 and they say yes, you know that you can ask if it's bigger than 70. (you shouldn't ask if it's smaller than 40)

## Project: Guess My Number Game (25-30 minutes)

### Project Overview

Students should make a simple guess my number game, then add different features like score and feedback.

### Step-by-Step Development

1. **Basic Game Setup (10 minutes):**
   - Create variables for secret number and guesses
   - Generate random number
   - Set up the main game loop

**Basic Game Code:**
\`\`\`scratch
when green flag clicked
set [secret v] to (pick random (1) to (100))
set [guesses v] to (0)
say [I'm thinking of a number 1-100!] for (2) seconds
forever
  ask [What's your guess?] and wait
  change [guesses v] by (1)
  if <(answer) = (secret)> then
    say (join [You got it in ] (guesses)) for (2) seconds
    stop [all v]
  else
    if <(answer) > (secret)> then
      say [Too high!] for (1) seconds
    else
      say [Too low!] for (1) seconds
    end
  end
end
\`\`\`

2. **Add Feedback System (10 minutes):**
   - Give hints based on how close the guess is
   - Add encouraging messages
   - Show remaining guesses

**Enhanced Feedback Code:**
\`\`\`scratch
when green flag clicked
set [secret v] to (pick random (1) to (100))
set [guesses v] to (0)
set [max guesses v] to (10)
say [I'm thinking of a number 1-100!] for (2) seconds
forever
  if <(guesses) >= (max guesses)> then
    say (join [Game Over! The number was ] (secret)) for (2) seconds
    stop [all v]
  end
  ask [What's your guess?] and wait
  change [guesses v] by (1)
  if <(answer) = (secret)> then
    say (join [You got it in ] (guesses)) for (2) seconds
    stop [all v]
  else
    if <(answer) > (secret)> then
      if <((answer) - (secret)) > (20)> then
        say [Way too high!] for (1) seconds
      else
        say [Too high!] for (1) seconds
      end
    else
      if <((secret) - (answer)) > (20)> then
        say [Way too low!] for (1) seconds
      else
        say [Too low!] for (1) seconds
      end
    end
    say (join [Guesses left: ] ((max guesses) - (guesses))) for (1) seconds
  end
end
\`\`\`

3. **Add Visual Feedback (5 minutes):**
   - Change sprite appearance based on accuracy
   - Add animations for correct/incorrect guesses

**Visual Feedback Code:**
\`\`\`scratch
when green flag clicked
switch costume to [normal v]
forever
  if <(answer) = (secret)> then
    switch costume to [happy v]
    play sound [cheer v]
  else
    if <(answer) > (secret)> then
      switch costume to [thinking v]
    else
      switch costume to [thinking v]
    end
  end
end
\`\`\`

### Advanced Features (for early finishers)

**Add as many of the following advanced features as time permits:**

1. **Color change of sprite depending on the accuracy:**
\`\`\`scratch
when green flag clicked
forever
  if <(answer) = (secret)> then
    set [color v] effect to (0)
  else
    if <((answer) - (secret)) > (20)> then
      set [color v] effect to (180)
    else
      set [color v] effect to (90)
    end
  end
end
\`\`\`

2. **Varied hints depending on accuracy:**
\`\`\`scratch
when green flag clicked
forever
  if <(answer) > (secret)> then
    if <((answer) - (secret)) > (30)> then
      say [You are way too high!] for (1) seconds
    else
      if <((answer) - (secret)) > (10)> then
        say [You're a bit high!] for (1) seconds
      else
        say [Just a little high!] for (1) seconds
      end
    end
  end
end
\`\`\`

3. **Animate another sprite showing how many guesses left:**
\`\`\`scratch
when green flag clicked
forever
  set [guesses left v] to ((max guesses) - (guesses))
  if <(guesses left) > (5)> then
    switch costume to [5+ v]
  else
    if <(guesses left) > (3)> then
      switch costume to [3-5 v]
    else
      switch costume to [1-2 v]
    end
  end
end
\`\`\`

4. **Encouraging statements after each guess:**
\`\`\`scratch
when green flag clicked
set [encouragements v] to [you got this, keep going, you are a superstar, almost there, great try]
forever
  if <(answer) = (secret)> then
    say [Amazing job!] for (1) seconds
  else
    say (item (pick random (1) to (5)) of [encouragements v]) for (1) seconds
  end
end
\`\`\`

### If students are more comfortable:

**Allow the player to choose how big the range of numbers can be:**
\`\`\`scratch
when green flag clicked
ask [What's the highest number? (1-1000)] and wait
set [max number v] to (answer)
set [secret v] to (pick random (1) to (max number))
say (join [I'm thinking of a number 1-] (max number)) for (2) seconds
\`\`\`

**Use the Scratch sound recording option OR text to speech extension to give verbal instructions**

**Change the sprite depending on the accuracy of your answer:**
\`\`\`scratch
when green flag clicked
forever
  if <(answer) = (secret)> then
    switch costume to [smiling v]
  else
    if <(answer) > (secret)> then
      switch costume to [frowning v]
    else
      switch costume to [frowning v]
    end
  end
end
\`\`\`

### Answer Key

Basic working example: https://scratch.mit.edu/projects/492915111

## Key Learning Objectives

- Understand how variables store and change values
- Know how to use the ask block to get user input
- Be able to compare values using operators
- Understand how to create conditional logic for games
- Know how to give appropriate feedback based on user input

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may forget to convert the answer to a number
- Some may not understand variable scope and initialization
- Students might create infinite loops without proper exit conditions
- Some may not test their game with edge cases

**Teaching Tips:**
- Always emphasize the difference between strings and numbers
- Show students how to use the "step" button to debug their code
- Encourage students to test their game with different ranges
- Help students who struggle with the logic flow

## Resources

- [Guess My Number Example](https://scratch.mit.edu/projects/492915111)
- [Scratch Variables Guide](https://scratch.mit.edu/help/scratch/2.0/Variables)
- [Scratch Operators Guide](https://scratch.mit.edu/help/scratch/2.0/Operators)

## Next Steps

In the next lesson, we'll learn about string manipulation and create a chatbot!`;

    return (
        <LessonPage
            title="Guess My Number Game"
            moduleTitle="Conditionals with Operators and Variables"
            lessonNumber={8}
            content={content}
            prevLesson="/cs/scratch/lesson7"
            nextLesson="/cs/scratch/lesson9"
            backToCurriculum="/cs/scratch"
        />
    );
};

export default ScratchLesson8; 
