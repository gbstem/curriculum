import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson8 = () => {
    const content = `# Day 2: String Modifier Project

## Project Overview

Have the user input a string and a number to apply one of the string methods to it. If the method chosen is index, ask for another number input and print that index letter out.

## Project Requirements

**Basic Requirements:**
- Ask user for a string
- Ask user for a number (1-7 to choose string method)
- Apply the chosen string method
- Handle the index method specially (ask for second number)
- Display results clearly

## Sample Implementation

\`\`\`python
print("String Modifier Tool")
print("=" * 30)

# Get user input
user_string = input("Enter a string: ")
method_choice = int(input("Choose a method (1-7): "))

# Apply chosen method
if method_choice == 1:
    result = len(user_string)
    print("Length of string:", result)
    
elif method_choice == 2:
    result = user_string.capitalize()
    print("Capitalized:", result)
    
elif method_choice == 3:
    result = user_string.lower()
    print("Lowercase:", result)
    
elif method_choice == 4:
    result = user_string.title()
    print("Title case:", result)
    
elif method_choice == 5:
    result = user_string.upper()
    print("Uppercase:", result)
    
elif method_choice == 6:
    letter = input("Enter a letter to find: ")
    result = user_string.index(letter)
    print("Index of", letter + ":", result)
    
elif method_choice == 7:
    position = int(input("Enter position to get letter: "))
    if position < len(user_string):
        result = user_string[position]
        print("Letter at position", position + ":", result)
    else:
        print("Position out of range!")
        
else:
    print("Invalid choice!")
\`\`\`

## Key Concepts Applied

**String Methods:**
- Length, case methods, indexing
- Error handling for invalid positions
- User input validation

## Resources

- Example: https://trinket.io/python/0adf1046f6a2
- Example: https://repl.it/talk/share/The-String-Modifier/124928

## Next Steps

In the next module, we'll learn about functions!`;

    return (
        <LessonPage
            title="String Modifier Project"
            moduleTitle="String Methods"
            lessonNumber={8}
            content={content}
            prevLesson="/cs/python1/lesson7"
            nextLesson="/cs/python1/lesson9"
        />
    );
};

export default Lesson8; 
