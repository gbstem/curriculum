import React from 'react';
import LessonPage from '../../LessonPage';

const content = `
# Lesson 6: Intro to Classes & Objects (Object-Oriented Programming)

## Warm-up (5-10 min)
- Ask: "What is something in real life that has properties (like color, size) and can do actions (like move, make noise)?"
- Examples: A car, a dog, a phone. Discuss how these are like objects in programming.
- Quick review: What is a variable? What is a function?

## Interactive Lecture (15-20 min)
- Explain: In Python, we use **classes** to create our own types of objects.
- A **class** is like a blueprint. An **object** is something built from that blueprint.
- Each object can have its own **attributes** (data) and **methods** (actions).

### Example: Student Class
\`\`\`python
class Student:
    def __init__(self, name, grade, homeroom):
        self.name = name
        self.grade = grade
        self.homeroom = homeroom

student1 = Student("Bob", 8, "Fitzgerald")
print("name:", student1.name)
print("grade:", student1.grade)
print("homeroom:", student1.homeroom)
\`\`\`

**Ask students:**
- What does \`__init__\` do? (It's the constructor, runs when you make a new object)
- What does \`self\` mean? (It refers to the object itself)
- How would you add a new attribute, like \`favorite_subject\`?

### Looping through attributes
\`\`\`python
# Print all attributes using a loop
for attr in ["name", "grade", "homeroom"]:
    print(f"{attr}: {getattr(student1, attr)}")
\`\`\`

## Mini-Project: Create Your Own Class
1. Have students design a class for something in real life (e.g., Pet, Book, Car).
2. The class should have at least 3 attributes and 1 method (an action).
3. Create an object from the class and print all its attributes.

### Example Implementation: Pet Class
\`\`\`python
class Pet:
    def __init__(self, name, species, age):
        self.name = name
        self.species = species
        self.age = age
    def speak(self):
        if self.species == "dog":
            print("Woof!")
        elif self.species == "cat":
            print("Meow!")
        else:
            print("Hello!")

my_pet = Pet("Luna", "cat", 3)
print(f"Name: {my_pet.name}, Species: {my_pet.species}, Age: {my_pet.age}")
my_pet.speak()
\`\`\`

**Teacher Tips:**
- Walk around (virtually or in-person) and ask students what class they are making.
- Encourage creativity: pets, vehicles, superheroes, etc.
- If students finish early, challenge them to add more methods (e.g., \`birthday()\` to increase age).

## Sharing (5-10 min)
- Invite students to share their class and object code.
- Ask: What was easy? What was tricky?
- Show a few creative examples to the class.

## Summary
- Classes let us create our own types of objects.
- Objects have attributes (data) and methods (actions).
- We use \`__init__\` to set up new objects.

## Extension/Challenge
- Add a method to your class that changes one of the attributes (e.g., a \`birthday()\` method that increases age).
- Try making a list of objects and looping through them to print their info.

## Further Reading
- [W3Schools: Python Classes/Objects](https://www.w3schools.com/python/python_classes.asp)
`;

const Lesson6 = () => (
  <LessonPage
    title="Intro to Classes & Objects"
    moduleTitle="Object-Oriented Programming"
    lessonNumber={6}
    content={content}
    prevLesson="/cs/python2/lesson5"
    nextLesson="/cs/python2/lesson7"
  />
);

export default Lesson6; 
