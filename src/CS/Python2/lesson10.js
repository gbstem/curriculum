import React from 'react';
import LessonPage from '../../LessonPage';

const content = `
# Lesson 10: Greedy Algorithms

## Warm-up (5-10 min)
- Ask: "If you're at a candy store and can only pick one piece at a time, what strategy would you use?"
- Ask: "When packing for a trip, how do you decide what to pack first?"
- Discuss how sometimes choosing the "best" option at each step can lead to good overall results.

## Interactive Lecture (15-20 min)
- Explain: A **greedy algorithm** makes the most optimal choice at each step, hoping to find the best overall solution.
- Key idea: Always pick what seems best right now, without worrying about future consequences.

### Real-World Analogy: The Candy Bowl
Imagine you're picking candy from a bowl, and you want the most candy possible:
- **Greedy strategy:** Always pick the biggest piece available
- **Result:** You might get a lot of candy quickly, but maybe not the absolute maximum possible

### Why Use Greedy Algorithms?

**Pros:**
- **Easy to understand:** Make the best choice at each step
- **Efficient:** Usually fast and uses less memory
- **Sometimes perfect:** For some problems, gives the optimal solution

**Cons:**
- **Not always optimal:** Doesn't guarantee the best overall solution
- **Short-sighted:** Only considers immediate benefits

**Ask students:** Can you think of situations where being "greedy" might not give the best result?

## Interactive Activity: Coin Change Problem
Let's explore greedy algorithms with making change for money.

**Problem:** You need to make $0.67 using the fewest coins possible.
**Available coins:** Quarters ($0.25), Dimes ($0.10), Nickels ($0.05), Pennies ($0.01)

### Greedy Strategy:
1. Use as many quarters as possible
2. Then use as many dimes as possible  
3. Then use as many nickels as possible
4. Finally use pennies for the remainder

**Let's trace through $0.67:**
\`\`\`
$0.67 ÷ $0.25 = 2 quarters, remainder $0.17
$0.17 ÷ $0.10 = 1 dime, remainder $0.07
$0.07 ÷ $0.05 = 1 nickel, remainder $0.02
$0.02 ÷ $0.01 = 2 pennies, remainder $0.00

Result: 2 quarters + 1 dime + 1 nickel + 2 pennies = 6 coins total
\`\`\`

**Ask students:** Is this the minimum number of coins? Can you do better?

## Mini-Project: Money Conversion Program
Create a program that converts any amount of money into the fewest bills and coins using a greedy algorithm.

### Step-by-Step Implementation:
\`\`\`python
def make_change(amount):
    """
    Convert an amount of money into fewest bills/coins using greedy algorithm.
    
    Parameters:
    - amount: The amount of money to convert (in dollars)
    
    Returns:
    - Dictionary showing count of each denomination used
    """
    # Available denominations from largest to smallest
    denominations = {
        '20-dollar bills': 20.00,
        '10-dollar bills': 10.00,
        '5-dollar bills': 5.00,
        '1-dollar bills': 1.00,
        'quarters': 0.25,
        'dimes': 0.10,
        'nickels': 0.05,
        'pennies': 0.01
    }
    
    result = {}
    remaining = round(amount, 2)  # Round to avoid floating point errors
    
    for name, value in denominations.items():
        count = int(remaining // value)  # How many of this denomination
        if count > 0:
            result[name] = count
            remaining = round(remaining - (count * value), 2)
    
    return result

# Test the function
amount = 67.43
change = make_change(amount)

print(f"Making change for \${amount}:")
for denomination, count in change.items():
    print(f"{count} {denomination}")

total_items = sum(change.values())
print(f"Total items used: {total_items}")
\`\`\`

**Expected Output:**
\`\`\`
Making change for $67.43:
3 20-dollar bills
1 5-dollar bills
2 1-dollar bills
1 quarters
1 dimes
1 nickels
3 pennies
Total items used: 12
\`\`\`

### Enhanced Version with Detailed Breakdown:
\`\`\`python
def make_change_detailed(amount):
    """Enhanced version that shows the step-by-step process"""
    denominations = [
        ('20-dollar bills', 20.00),
        ('10-dollar bills', 10.00),
        ('5-dollar bills', 5.00),
        ('1-dollar bills', 1.00),
        ('quarters', 0.25),
        ('dimes', 0.10),
        ('nickels', 0.05),
        ('pennies', 0.01)
    ]
    
    result = {}
    remaining = round(amount, 2)
    
    print(f"Starting with: \${remaining}")
    print("-" * 40)
    
    for name, value in denominations:
        count = int(remaining // value)
        if count > 0:
            result[name] = count
            remaining = round(remaining - (count * value), 2)
            print(f"Use {count} {name}: \${remaining} remaining")
    
    print("-" * 40)
    return result

# Test with detailed output
print("Detailed breakdown:")
change = make_change_detailed(23.67)
\`\`\`

**Ask students:**
- Why do we start with the largest denomination first?
- What would happen if we used pennies first?
- Why do we use \`round()\` in the calculations?

## Challenge Activity: Different Coin Systems
**What if we had different coin denominations?**

Let's say we have coins worth: 1¢, 3¢, and 4¢, and we want to make 6¢.

**Greedy approach:**
\`\`\`
6¢ ÷ 4¢ = 1 coin (4¢), remainder 2¢
2¢ ÷ 3¢ = 0 coins, remainder 2¢  
2¢ ÷ 1¢ = 2 coins (1¢), remainder 0¢

Result: 1×4¢ + 2×1¢ = 3 coins total
\`\`\`

**Optimal solution:**
\`\`\`
6¢ = 2×3¢ = 2 coins total
\`\`\`

**Discussion:** Why didn't the greedy algorithm find the optimal solution here?

### When Greedy Works vs When It Doesn't:
\`\`\`python
def test_coin_systems():
    """Test greedy algorithm with different coin systems"""
    
    # Standard US coins - greedy works perfectly
    us_coins = [0.25, 0.10, 0.05, 0.01]
    
    # Custom system - greedy might not be optimal
    custom_coins = [0.04, 0.03, 0.01]
    
    def greedy_change(amount, coins):
        result = []
        remaining = amount
        for coin in coins:
            while remaining >= coin:
                result.append(coin)
                remaining = round(remaining - coin, 2)
        return result
    
    amount = 0.06
    
    print(f"Making {amount} with US coins:")
    us_result = greedy_change(amount, us_coins)
    print(f"Coins used: {us_result} (Total: {len(us_result)})")
    
    print(f"\\nMaking {amount} with custom coins:")
    custom_result = greedy_change(amount, custom_coins)
    print(f"Coins used: {custom_result} (Total: {len(custom_result)})")
    
    print(f"\\nOptimal for custom: [0.03, 0.03] (Total: 2)")

test_coin_systems()
\`\`\`

## Real-World Applications Discussion
**Where do we see greedy algorithms in real life?**

1. **GPS Navigation:** Often chooses the road that seems fastest right now
2. **Cashiers making change:** Usually give largest bills/coins first  
3. **Huffman Coding:** Used in file compression
4. **Activity Selection:** Choosing non-overlapping activities to maximize count

### Activity Selection Problem:
\`\`\`python
def activity_selection(activities):
    """
    Select maximum number of non-overlapping activities.
    Greedy strategy: Always pick activity that ends earliest.
    
    activities: List of (start_time, end_time) tuples
    """
    # Sort by end time (greedy choice: pick earliest ending)
    sorted_activities = sorted(activities, key=lambda x: x[1])
    
    selected = [sorted_activities[0]]  # Always pick first activity
    last_end_time = sorted_activities[0][1]
    
    for start, end in sorted_activities[1:]:
        if start >= last_end_time:  # No overlap
            selected.append((start, end))
            last_end_time = end
    
    return selected

# Test with activities (start_time, end_time)
activities = [(1, 3), (2, 5), (4, 7), (6, 8), (8, 10)]
result = activity_selection(activities)

print("Activities (start, end):", activities)
print("Selected activities:", result)
print(f"Maximum activities: {len(result)}")
\`\`\`

## Hands-On Challenge: Fractional Knapsack
**Problem:** You have a knapsack that can hold 10 kg. You have items with different weights and values. Maximize the total value (you can take fractions of items).

\`\`\`python
def fractional_knapsack(capacity, items):
    """
    Solve fractional knapsack using greedy algorithm.
    Strategy: Take items with highest value-to-weight ratio first.
    
    items: List of (value, weight) tuples
    """
    # Calculate value-to-weight ratio and sort by it (descending)
    items_with_ratio = [(value, weight, value/weight) for value, weight in items]
    items_with_ratio.sort(key=lambda x: x[2], reverse=True)
    
    total_value = 0
    remaining_capacity = capacity
    result = []
    
    print(f"Knapsack capacity: {capacity} kg")
    print("Items sorted by value/weight ratio:")
    
    for value, weight, ratio in items_with_ratio:
        print(f"  Item: value={value}, weight={weight}, ratio={ratio:.2f}")
        
        if weight <= remaining_capacity:
            # Take the whole item
            total_value += value
            remaining_capacity -= weight
            result.append(f"Take full item (value={value}, weight={weight})")
        elif remaining_capacity > 0:
            # Take fraction of the item
            fraction = remaining_capacity / weight
            value_taken = value * fraction
            total_value += value_taken
            result.append(f"Take {fraction:.2f} of item (value={value_taken:.2f})")
            remaining_capacity = 0
            break
    
    print("\\nSolution:")
    for item in result:
        print(f"  {item}")
    print(f"Total value: {total_value:.2f}")
    
    return total_value

# Test the knapsack
items = [(60, 10), (100, 20), (120, 30)]  # (value, weight)
fractional_knapsack(50, items)
\`\`\`

## Common Mistakes and Tips:
1. **Assuming greedy is always optimal** - Test with examples!
2. **Wrong greedy choice** - Make sure your "greedy criterion" makes sense
3. **Not considering edge cases** - What if inputs are empty or invalid?

## Extension Activities:
1. **Huffman Coding:** Research how greedy algorithms compress text
2. **Minimum Spanning Tree:** Look up Kruskal's algorithm
3. **Job Scheduling:** Maximize profit with deadlines and penalties

## Sharing (5-10 min)
- Have students share their money conversion programs
- Ask: "When might a greedy approach not work well?"
- Discuss real-world examples they can think of

## Summary
- Greedy algorithms make locally optimal choices at each step
- They're fast and easy to implement
- They don't always give the globally optimal solution
- Useful for many practical problems where "good enough" solutions work
- Always test if your greedy strategy actually works for the problem!

## Further Reading
- [Greedy Algorithm Examples](https://www.geeksforgeeks.org/greedy-algorithms/)
- [When Greedy Works](https://en.wikipedia.org/wiki/Greedy_algorithm)
`;

const Lesson10 = () => (
  <LessonPage
    title="Greedy Algorithms"
    moduleTitle="Algorithms"
    lessonNumber={10}
    content={content}
    prevLesson="/cs/python2/lesson9"
    nextLesson="/cs/python2/lesson11"
  />
);

export default Lesson10; 
