import React from 'react';
import LessonPage from '../../LessonPage';

const Lesson13 = () => {
    const content = `# Day 3: Caesar Cipher

## Project Overview

Create a Caesar Cipher encryption/decryption program. The Caesar Cipher shifts each letter in the alphabet by a certain number of positions.

## Project Requirements

**Basic Requirements:**
- Encrypt text by shifting letters
- Decrypt text by reverse shifting
- Handle both uppercase and lowercase
- Keep non-letters unchanged
- User choice between encrypt/decrypt

## Sample Implementation

\`\`\`python
def caesar_cipher(text, shift, mode):
    result = ""
    
    for char in text:
        if char.isalpha():
            # Determine the base (a=97, A=65)
            base = ord('a') if char.islower() else ord('A')
            
            if mode == "encrypt":
                # Shift forward
                shifted = (ord(char) - base + shift) % 26
            else:
                # Shift backward
                shifted = (ord(char) - base - shift) % 26
            
            result += chr(base + shifted)
        else:
            # Keep non-letters unchanged
            result += char
    
    return result

print("Caesar Cipher Tool")
print("=" * 20)

while True:
    print("\\n1. Encrypt")
    print("2. Decrypt")
    print("3. Exit")
    
    choice = input("Choose an option (1-3): ")
    
    if choice == "3":
        print("Goodbye!")
        break
    
    if choice in ["1", "2"]:
        text = input("Enter text: ")
        shift = int(input("Enter shift amount (1-25): "))
        
        if choice == "1":
            result = caesar_cipher(text, shift, "encrypt")
            print("Encrypted:", result)
        else:
            result = caesar_cipher(text, shift, "decrypt")
            print("Decrypted:", result)
    else:
        print("Invalid choice!")
\`\`\`

## Key Concepts Applied

**String Manipulation:**
- Character-by-character processing
- ASCII values and ord()/chr()
- Case handling

**Mathematical Operations:**
- Modulo arithmetic for wrapping
- Shift calculations

**Loops and Conditionals:**
- Character iteration
- Mode selection

## Next Steps

In the next module, we'll learn about for loops!`;

    return (
        <LessonPage
            title="Caesar Cipher"
            moduleTitle="While Loops"
            lessonNumber={13}
            content={content}
            prevLesson="/cs/python1/lesson12"
            nextLesson="/cs/python1/lesson14"
        />
    );
};

export default Lesson13; 
