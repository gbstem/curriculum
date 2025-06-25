import React from 'react';
import LessonPage from '../../LessonPage';

const content = `
# Lesson 11: What is Machine Learning?

## Warm-up (5-10 min)
- Ask: "Do you think it'll be possible to replicate a person with robotics and AI?"
- Ask: "What's the difference between a calculator and a smartphone's voice assistant?"
- Discuss how some programs follow exact instructions, while others seem to "learn" and adapt.

## Interactive Lecture (15-20 min)
- Explain: **Machine Learning** allows software to "learn" to predict outcomes without being explicitly programmed for every situation.
- Key idea: Instead of writing rules for every possible case, we show the computer examples and let it find patterns.

### Traditional Programming vs Machine Learning

**Traditional Programming:**
\`\`\`
Input + Program → Output

Example:
Temperature + "If temp > 80, wear shorts" → Clothing choice
\`\`\`

**Machine Learning:**
\`\`\`
Input + Output Examples → Program (Model)

Example:  
Temperature data + Clothing choices → Pattern that can predict new choices
\`\`\`

### Examples of Machine Learning in Daily Life
**Ask students:** "Where do you encounter AI or machine learning?"

Common examples:
- **Siri/Alexa:** Voice recognition and understanding
- **Email spam filters:** Learning what emails are spam
- **Netflix/YouTube recommendations:** Suggesting content you might like
- **Google Photos:** Recognizing faces and objects
- **Social media algorithms:** Deciding what posts to show you
- **Autonomous cars:** Learning to drive safely
- **Online shopping:** "People who bought this also bought..."

### AI vs Machine Learning vs Deep Learning
**Ask the class:** "What do we think of when we think of Artificial Intelligence?"

Let's break down the differences:

**Artificial Intelligence (AI):**
- Broad concept: Making machines act intelligently
- Includes automated calculations, decision-making, chatbots
- Example: A chess-playing computer

**Machine Learning (ML):**
- Subset of AI: Learning patterns from data to make predictions
- Example: Predicting house prices based on size, location, etc.
- Uses algorithms to find patterns in data

**Deep Learning (DL):**
- Subset of ML: Uses neural networks with many layers
- Example: Image recognition, language translation
- Mimics how the human brain processes information

### Visual Representation:
\`\`\`
AI (Artificial Intelligence)
├── Machine Learning
│   ├── Deep Learning
│   │   └── Neural Networks
│   └── Other ML methods
└── Non-ML AI (rule-based systems)
\`\`\`

## Interactive Discussion: Types of Machine Learning

### 1. Supervised Learning
- **What it is:** Learning from examples with known answers
- **Example:** Showing the computer 1000 photos labeled "cat" or "dog" to teach it to recognize cats and dogs
- **Real-world use:** Email spam detection, medical diagnosis

### 2. Unsupervised Learning  
- **What it is:** Finding hidden patterns in data without labels
- **Example:** Grouping customers by shopping habits without knowing what groups to look for
- **Real-world use:** Market research, data compression

### 3. Reinforcement Learning
- **What it is:** Learning through trial and error with rewards/penalties
- **Example:** AI learning to play a game by trying moves and getting points
- **Real-world use:** Game AI, robot control, autonomous driving

## Simple Example: Predicting Student Grades
Let's walk through a simple machine learning example:

**Problem:** Predict a student's final grade based on hours studied.

**Data we have:**
\`\`\`python
# Hours studied vs Final grade
data = [
    (1, 65),   # 1 hour → 65% grade
    (2, 70),   # 2 hours → 70% grade  
    (3, 75),   # 3 hours → 75% grade
    (4, 80),   # 4 hours → 80% grade
    (5, 85),   # 5 hours → 85% grade
    (6, 90),   # 6 hours → 90% grade
]

# What would we predict for 3.5 hours of study?
\`\`\`

**Ask students:**
- What pattern do you see in this data?
- If someone studied 3.5 hours, what grade would you predict?
- How did you make that prediction?

### Human vs Machine Approach:
**Human approach:** "It looks like each hour adds about 5 points, so 3.5 hours = 77.5%"

**Machine Learning approach:** Use algorithms to find the best line through the data points.

\`\`\`python
import matplotlib.pyplot as plt

# Simple visualization (teacher demonstration)
hours = [1, 2, 3, 4, 5, 6]
grades = [65, 70, 75, 80, 85, 90]

plt.scatter(hours, grades, color='blue', label='Data points')
plt.plot([1, 6], [65, 90], color='red', label='Trend line')
plt.xlabel('Hours Studied')
plt.ylabel('Final Grade')
plt.title('Study Time vs Grade')
plt.legend()
plt.show()

# Prediction: For 3.5 hours
predicted_grade = 65 + (3.5 - 1) * 5  # Following the pattern
print(f"Predicted grade for 3.5 hours: {predicted_grade}%")
\`\`\`

## Key Concepts in Machine Learning

### 1. Training Data
- **Definition:** Examples we show the computer to learn from
- **Example:** Photos labeled "cat" or "dog"

### 2. Model
- **Definition:** The "brain" that learns patterns from training data
- **Example:** A mathematical function that predicts grades from study hours

### 3. Prediction
- **Definition:** Using the trained model on new, unseen data
- **Example:** Predicting grade for a student who studied 3.5 hours

### 4. Accuracy
- **Definition:** How often the model makes correct predictions
- **Example:** If the model predicts 8 out of 10 grades correctly, accuracy is 80%

## Interactive Activity: Human Pattern Recognition
**Game:** Teacher shows students a sequence and asks them to predict the next number.

**Sequence 1:** 2, 4, 6, 8, ? 
- **Pattern:** Add 2 each time
- **Prediction:** 10

**Sequence 2:** 1, 1, 2, 3, 5, 8, ?
- **Pattern:** Fibonacci sequence (each number is sum of previous two)
- **Prediction:** 13

**Sequence 3:** 100, 50, 25, 12.5, ?
- **Pattern:** Divide by 2 each time  
- **Prediction:** 6.25

**Ask students:** "How did you figure out these patterns? This is similar to what machine learning does with data!"

## Real-World Machine Learning Pipeline
\`\`\`
1. Collect Data
   ↓
2. Clean and Prepare Data  
   ↓
3. Choose and Train Model
   ↓
4. Test Model Accuracy
   ↓
5. Use Model for Predictions
   ↓
6. Monitor and Improve
\`\`\`

### Example: Building a Spam Email Detector
\`\`\`
1. Collect: 10,000 emails labeled "spam" or "not spam"
2. Prepare: Convert emails to features (word frequency, sender, etc.)
3. Train: Show model examples so it learns spam patterns
4. Test: Check how well it identifies spam in new emails
5. Deploy: Use it to filter your inbox
6. Improve: Add more training data when it makes mistakes
\`\`\`

## Ethical Considerations Discussion
**Important questions to consider:**

1. **Bias:** What if training data isn't representative?
   - Example: Hiring AI trained mostly on male resumes might bias against women

2. **Privacy:** How do we protect people's data?
   - Example: Facial recognition in public spaces

3. **Transparency:** Should people know when AI makes decisions about them?
   - Example: Credit score algorithms, job application screening

4. **Job Impact:** Will AI replace human workers?
   - Discussion: What jobs might change? What new jobs might be created?

**Ask students:** "How can we make sure AI is used responsibly?"

## Fun Facts About Machine Learning
- **Google search** uses ML to understand what you're really looking for
- **Camera autofocus** uses ML to identify what to focus on  
- **Video game NPCs** can use ML to adapt to your playing style
- **Music streaming** uses ML to create personalized playlists
- **Weather prediction** is improved with ML analyzing satellite data

## Extension Activities
1. **Research project:** Find an example of machine learning in a field you're interested in (sports, art, medicine, etc.)
2. **Pattern game:** Create your own number sequence and challenge classmates to find the pattern
3. **Data collection:** Track your own data (sleep, mood, weather) and look for patterns

## Summary
- Machine Learning lets computers learn patterns from data instead of being programmed with explicit rules
- It's everywhere in our daily lives: recommendations, voice assistants, photo recognition
- The basic process: collect data → train model → make predictions
- Different types: supervised (with labels), unsupervised (finding hidden patterns), reinforcement (trial and error)
- Important to consider ethical implications as AI becomes more powerful

## Next Steps
In our next lesson, we'll start working with actual machine learning tools and create our first model using Google Colab!

## Further Reading
- [Machine Learning Explained (Khan Academy)](https://www.khanacademy.org/computing/intro-to-programming/programming-intro/programming-basic/v/intro-to-programming)
- [AI for Everyone Course](https://www.coursera.org/learn/ai-for-everyone)
`;

const Lesson11 = () => (
  <LessonPage
    title="What is Machine Learning?"
    moduleTitle="Introduction to Data Science"
    lessonNumber={11}
    content={content}
    prevLesson="/cs/python2/lesson10"
    nextLesson="/cs/python2/lesson12"
  />
);

export default Lesson11; 
