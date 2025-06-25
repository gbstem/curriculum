import React from 'react';
import LessonPage from '../../LessonPage';

const content = `
# Lesson 9: Binary Search

## Warm-up (5-10 min)
- Ask: "Have you ever looked for a book in a library? How do you find it quickly?"
- Ask: "When you play a number guessing game (1-100), what's your strategy?"
- Discuss how organizing things (like alphabetical order) makes searching faster.

## Interactive Lecture (15-20 min)
- Explain: **Binary Search** is a method for finding an item quickly in a sorted list.
- It's like a smart guessing game where each guess eliminates half the possibilities!
- Key requirement: The list must be **sorted** first.

### Real-World Example: Dictionary Search
Imagine you're looking for the word "giraffe" in a dictionary:
1. Open to the middle of the dictionary
2. If "giraffe" comes before the current page, go to the left half
3. If "giraffe" comes after the current page, go to the right half
4. Keep narrowing it down until you find "giraffe"

### Why is it called "Binary"?
- "Binary" means "two parts"
- We always split the list into two halves
- It's a "two-way" decision each time: left or right

### How Binary Search Works:
\`\`\`
Step 1: Start in the middle of the list
Step 2: Compare the middle item with what you're looking for
  - If it's exactly the middle item, you're done!
  - If the target is smaller, look at the left half
  - If the target is larger, look at the right half
Step 3: Repeat the process on the chosen half
Step 4: Keep going until you find the item or run out of places to look
\`\`\`

### Visual Example
Let's search for the number 15 in this sorted list:
\`\`\`
[1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21]
 0  1  2  3  4   5   6   7   8   9  10  (indices)
\`\`\`

**Step 1:** Middle index = 5, value = 11. Is 15 > 11? Yes! Look right.
**Step 2:** New range [13, 15, 17, 19, 21], middle = 17. Is 15 < 17? Yes! Look left.
**Step 3:** New range [13, 15], middle = 15. Found it!

## Interactive Activity: Number Guessing
- Teacher picks a number 1-100
- Students use binary search strategy to guess
- Each guess, teacher says "higher" or "lower"
- Count how many guesses it takes vs random guessing

## Mini-Project: Implement Binary Search
Create a function that performs binary search on a sorted list.

### Step-by-Step Implementation:
\`\`\`python
def binary_search(sorted_list, target):
    """
    Performs binary search on a sorted list to find the target value.
    
    Parameters:
    - sorted_list: A list of numbers sorted in ascending order
    - target: The number we want to find
    
    Returns:
    - The index of the target if found, otherwise -1
    """
    left = 0  # Start of search range
    right = len(sorted_list) - 1  # End of search range
    
    while left <= right:
        # Find the middle index
        middle = (left + right) // 2
        
        # Compare middle element with target
        if sorted_list[middle] == target:
            return middle  # Found it!
        elif sorted_list[middle] < target:
            left = middle + 1  # Target is in right half
        else:
            right = middle - 1  # Target is in left half
    
    return -1  # Target not found

# Test the function
numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21]
target = 15

index = binary_search(numbers, target)

if index != -1:
    print(f"Number {target} found at index {index}")
else:
    print(f"Number {target} not found in the list")
\`\`\`

**Ask students:**
- What does \`//\` do in \`middle = (left + right) // 2\`?
- Why do we check \`left <= right\` in the while loop?
- What happens if the target is not in the list?

### Tracing Binary Search
Let's trace searching for 7 in [1, 3, 5, 7, 9, 11, 13]:

\`\`\`
Initial: left=0, right=6, list=[1, 3, 5, 7, 9, 11, 13]

Iteration 1:
  middle = (0 + 6) // 2 = 3
  list[3] = 7
  7 == 7? YES! Found at index 3
\`\`\`

Let's trace searching for 11:
\`\`\`
Initial: left=0, right=6, list=[1, 3, 5, 7, 9, 11, 13]

Iteration 1:
  middle = (0 + 6) // 2 = 3
  list[3] = 7
  11 > 7? YES! Search right half
  left = 4, right = 6

Iteration 2:
  middle = (4 + 6) // 2 = 5
  list[5] = 11
  11 == 11? YES! Found at index 5
\`\`\`

## Extended Example: Name Search
\`\`\`python
def binary_search_names(name_list, target_name):
    """Binary search for names in alphabetical order"""
    left = 0
    right = len(name_list) - 1
    
    while left <= right:
        middle = (left + right) // 2
        
        if name_list[middle] == target_name:
            return middle
        elif name_list[middle] < target_name:
            left = middle + 1
        else:
            right = middle - 1
    
    return -1

# Test with names
students = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"]
result = binary_search_names(students, "Diana")
print(f"Diana found at index: {result}")
\`\`\`

## Efficiency Discussion
**Ask students:** How many guesses does it take to find a number 1-100?
- Random guessing: Could take up to 100 tries (worst case)
- Binary search: Maximum 7 tries!

**Why is binary search so fast?**
- Each step eliminates half the remaining possibilities
- For 1000 items, maximum 10 steps needed
- For 1,000,000 items, maximum 20 steps needed

### Time Complexity:
\`\`\`
Linear search (checking each item): O(n)
Binary search: O(log n)

For 1,000,000 items:
- Linear: up to 1,000,000 comparisons
- Binary: up to 20 comparisons!
\`\`\`

## Hands-On Challenge Activities:
1. **Word Search:** Use binary search to find words in a sorted dictionary list
2. **Grade Lookup:** Search for student grades in a sorted grade list
3. **Modified Search:** Find the position where a target should be inserted

### Challenge: Find Insert Position
\`\`\`python
def find_insert_position(sorted_list, target):
    """Find where target should be inserted to keep list sorted"""
    left = 0
    right = len(sorted_list)
    
    while left < right:
        middle = (left + right) // 2
        if sorted_list[middle] < target:
            left = middle + 1
        else:
            right = middle
    
    return left

# Test it
numbers = [1, 3, 7, 10, 15, 20]
position = find_insert_position(numbers, 12)
print(f"Insert 12 at position: {position}")  # Should be index 4
\`\`\`

## Common Mistakes to Avoid:
1. **Forgetting to sort the list first** - binary search only works on sorted data
2. **Off-by-one errors** - be careful with \`left\` and \`right\` boundaries
3. **Infinite loops** - make sure \`left\` and \`right\` get updated correctly

## Sharing (5-10 min)
- Have students share their binary search implementations
- Ask: "When would you use binary search vs linear search?"
- Discuss real-world applications

## Summary
- Binary search works only on sorted lists
- It's much faster than checking every item one by one
- Key idea: eliminate half the possibilities with each comparison
- Useful for large datasets where speed matters

## Further Reading
- [Binary Search Visualization](https://www.cs.usfca.edu/~galles/visualization/Search.html)
- [Python Bisect Module](https://docs.python.org/3/library/bisect.html)
`;

const Lesson9 = () => (
  <LessonPage
    title="Binary Search"
    moduleTitle="Algorithms"
    lessonNumber={9}
    content={content}
    prevLesson="/cs/python2/lesson8"
    nextLesson="/cs/python2/lesson10"
  />
);

export default Lesson9; 
