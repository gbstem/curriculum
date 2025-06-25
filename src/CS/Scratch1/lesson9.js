import React from 'react';
import LessonPage from '../../LessonPage';

const ScratchLesson9 = () => {
    const content = `# Lesson 9: Chatbot

## Module 7: String manipulation from user input

## Interactive Lecture (15-20 minutes)

### Step 1: Understanding String Manipulation

Explain how string manipulation works with operators:

**What are Strings?**
- Strings are text data (words, sentences, etc.)
- In Scratch, strings are always in quotes
- We can combine, compare, and modify strings

**String Operators:**
- \`join [hello] [world]\` - Combines two strings
- \`length of [hello]\` - Counts characters in a string
- \`letter (1) of [hello]\` - Gets a specific letter
- \`contains [hello] [lo]?\` - Checks if one string contains another

### Step 2: Basic String Operations

**Joining Strings:**
\`\`\`scratch
when green flag clicked
ask [What's your name?] and wait
say (join [Hi, ] (answer)) for (2) seconds
\`\`\`

**What This Does:**
- \`join [Hi, ] (answer)\` - Combines "Hi, " with the user's name
- If user types "Alice", it says "Hi, Alice"

**Getting String Length:**
\`\`\`scratch
when green flag clicked
ask [Type something!] and wait
say (join [Your message has ] (length of (answer))) for (2) seconds
say (join [ characters!] []) for (2) seconds
\`\`\`

### Step 3: String Comparison

**Comparing Strings:**
\`\`\`scratch
when green flag clicked
ask [What's your favorite color?] and wait
if <(answer) = [blue]> then
  say [I love blue too!] for (2) seconds
else
  say (join [I love ] (answer)) for (2) seconds
end
\`\`\`

**What This Does:**
- Compares the user's answer to "blue"
- Gives different responses based on the answer

## Project: Chatbot (25-30 minutes)

### Project Overview

Create a simple chatbot between the user and sprite that can:
- Ask for the user's name and respond personally
- Ask for favorite color and respond
- Use if loops to sense what the user writes and respond accordingly

### Step-by-Step Development

1. **Basic Chatbot Setup (10 minutes):**
   - Create a sprite for the chatbot
   - Set up basic conversation flow
   - Handle name input

**Basic Chatbot Code:**
\`\`\`scratch
when green flag clicked
say [Hello! I'm your chatbot friend!] for (2) seconds
ask [What's your name?] and wait
say (join [Hi, ] (answer)) for (2) seconds
ask [What's your favorite color?] and wait
say (join [I love ] (answer)) for (2) seconds
say [Nice to meet you!] for (2) seconds
\`\`\`

2. **Add Conditional Responses (10 minutes):**
   - Use if statements to give different responses
   - Handle multiple possible answers
   - Add more personality to the chatbot

**Enhanced Chatbot Code:**
\`\`\`scratch
when green flag clicked
say [Hello! I'm your chatbot friend!] for (2) seconds
ask [What's your name?] and wait
say (join [Hi, ] (answer)) for (2) seconds
ask [What's your favorite color?] and wait
if <(answer) = [blue]> then
  say [I love blue too! It's so calming!] for (2) seconds
else
  if <(answer) = [red]> then
    say [Red is so energetic! Great choice!] for (2) seconds
  else
    if <(answer) = [green]> then
      say [Green reminds me of nature! Beautiful!] for (2) seconds
    else
      say (join [I love ] (answer)) for (2) seconds
    end
  end
end
\`\`\`

3. **Add More Interactive Features (5 minutes):**
   - Ask multiple questions
   - Remember user preferences
   - Give personalized responses

**Interactive Chatbot Code:**
\`\`\`scratch
when green flag clicked
say [Hello! I'm your chatbot friend!] for (2) seconds
ask [What's your name?] and wait
set [user name v] to (answer)
say (join [Hi, ] (user name)) for (2) seconds
ask [What's your favorite color?] and wait
set [favorite color v] to (answer)
say (join [I love ] (favorite color)) for (2) seconds
ask [How old are you?] and wait
if <(answer) > (18)> then
  say [You're an adult!] for (2) seconds
else
  say [You're still young!] for (2) seconds
end
say (join [Thanks for chatting, ] (user name)) for (2) seconds
\`\`\`

### Advanced Features (for early finishers)

**Students should make their projects as complicated or polished as time permits!**

1. **Ask multiple questions:**
\`\`\`scratch
when green flag clicked
say [Let's get to know each other!] for (2) seconds
ask [What's your name?] and wait
set [name v] to (answer)
ask [What's your favorite food?] and wait
set [food v] to (answer)
ask [What's your favorite animal?] and wait
set [animal v] to (answer)
say (join [Nice to meet you, ] (name)) for (2) seconds
say (join [I love ] (food)) for (2) seconds
say (join [And ] (animal)) for (2) seconds
\`\`\`

2. **Randomize the type & order of questions using lists:**
\`\`\`scratch
when green flag clicked
set [questions v] to [What's your name?, What's your favorite color?, How old are you?, What's your favorite food?]
set [current question v] to (pick random (1) to (4))
ask (item (current question) of [questions v]) and wait
say (join [You said: ] (answer)) for (2) seconds
\`\`\`

3. **Use if loops to sense what the user writes and respond accordingly:**
\`\`\`scratch
when green flag clicked
forever
  ask [Tell me something!] and wait
  if <(answer) contains [hello]> then
    say [Hello there!] for (2) seconds
  else
    if <(answer) contains [how are you]> then
      say [I'm doing great, thanks for asking!] for (2) seconds
    else
      if <(answer) contains [bye]> then
        say [Goodbye! Come back soon!] for (2) seconds
      else
        say [That's interesting! Tell me more!] for (2) seconds
      end
    end
  end
end
\`\`\`

### If students are more comfortable:

**Use the Scratch sound recording option OR text to speech extension to give verbal instructions along with "say" blocks:**
\`\`\`scratch
when green flag clicked
say [Hello! I'm your chatbot friend!] for (2) seconds
play sound [hello v]
ask [What's your name?] and wait
say (join [Hi, ] (answer)) for (2) seconds
play sound [greeting v]
\`\`\`

### Basic Answer Key/Starter Code

Basic working example: https://scratch.mit.edu/projects/522590218

## Key Learning Objectives

- Understand how strings work in programming
- Know how to join and manipulate strings
- Be able to compare strings using operators
- Understand how to create interactive conversations
- Know how to use conditional logic with text input

## Common Mistakes & Teaching Tips

**Common Mistakes:**
- Students may forget to use quotes around string literals
- Some may not understand the difference between strings and numbers
- Students might not handle case sensitivity properly
- Some may create infinite loops in their chatbot

**Teaching Tips:**
- Always emphasize the importance of quotes around strings
- Show students how to test their chatbot with different inputs
- Encourage students to be creative with their responses
- Help students who struggle with string comparison

## Resources

- [Chatbot Example](https://scratch.mit.edu/projects/522590218)
- [Scratch String Operators](https://scratch.mit.edu/help/scratch1/2.0/Operators)
- [Scratch Sensing Blocks](https://scratch.mit.edu/help/scratch1/2.0/Sensing)

## Next Steps

In the next lesson, we'll create a "Choose Your Own Adventure" game!`;

    return (
        <LessonPage
            title="Chatbot"
            moduleTitle="String manipulation from user input"
            lessonNumber={9}
            content={content}
            prevLesson="/cs/scratch1/lesson8"
            nextLesson="/cs/scratch1/lesson10"
            backToCurriculum="/cs/scratch1"
        />
    );
};

export default ScratchLesson9; 
