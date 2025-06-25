import React from 'react';
import LessonPage from '../../LessonPage';

const content = `
# Lesson 13: Key Concepts & Understanding Data

## Warm-up (5-10 min)
- Ask: "How do you make a good prediction in everyday life?"
- Discuss: What information do you use to make predictions (weather, grades, sports, etc.)?

## Interactive Lecture (15-20 min)
- Explain: In data analysis, we use data to find patterns and make predictions.
- **Correlation:** When two things change together (e.g., temperature and ice cream sales)
- **Causation:** When one thing causes another (e.g., studying more causes better grades)

### Example: Predicting Beach Passes from Temperature
\`\`\`
# Sample data: temperature vs beach passes sold
import numpy as np
import matplotlib.pyplot as plt

temperature = np.array([60, 65, 70, 75, 80, 85, 90])
passes = np.array([10, 15, 25, 40, 60, 80, 100])

plt.scatter(temperature, passes)
plt.xlabel('Temperature (F)')
plt.ylabel('Beach Passes Sold')
plt.title('Does temperature affect beach attendance?')
plt.show()
\`\`\`

**Ask students:**
- What pattern do you see in the data?
- If it's 78°F, how many passes would you expect to sell?

### Linear Regression: Line of Best Fit
- We can use a line to model the relationship between two variables
- The line that best fits the data is called the **line of best fit** or **linear regression**

**Example: Fitting a Line**
\`\`\`
from sklearn.linear_model import LinearRegression

X = temperature.reshape(-1, 1)  # Reshape for sklearn
model = LinearRegression()
model.fit(X, passes)

# Predict passes for 78°F
predicted = model.predict(np.array([[78]]))
print(f"Predicted passes for 78°F: {predicted[0]:.1f}")

# Plot the line
plt.scatter(temperature, passes)
plt.plot(temperature, model.predict(X), color='red')
plt.xlabel('Temperature (F)')
plt.ylabel('Beach Passes Sold')
plt.title('Linear Regression Example')
plt.show()
\`\`\`

**Teacher Tips:**
- Show how to install sklearn: \`!pip install scikit-learn\`
- Explain that the model "learns" the best line from the data

## Mini-Project: Your Own Line of Best Fit
1. Collect or create a small dataset (e.g., hours of sleep vs test scores)
2. Plot the data using matplotlib
3. Use sklearn to fit a line and make a prediction

**Sample Code:**
\`\`\`
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# Example data
sleep = np.array([5, 6, 7, 8, 9])
scores = np.array([65, 70, 75, 85, 90])

X = sleep.reshape(-1, 1)
model = LinearRegression()
model.fit(X, scores)

# Predict score for 7.5 hours of sleep
predicted = model.predict(np.array([[7.5]]))
print(f"Predicted score for 7.5 hours: {predicted[0]:.1f}")

plt.scatter(sleep, scores)
plt.plot(sleep, model.predict(X), color='red')
plt.xlabel('Hours of Sleep')
plt.ylabel('Test Score')
plt.title('Sleep vs Test Score')
plt.show()
\`\`\`

**Ask students:**
- What other pairs of data could you analyze?
- How accurate do you think your model is?

## Key Concepts
- **Neurons:** Small units in a neural network that process data
- **Loss function:** Measures how far off the model's predictions are
- **Optimizer:** Adjusts the model to reduce loss

**Analogy:**
- Neurons are like tiny decision-makers
- Loss is like a score for how well you're doing
- Optimizer is like a coach giving feedback to improve

## Extension Activities
1. Try a different dataset (e.g., height vs shoe size)
2. Experiment with more complex models (polynomial regression)
3. Research how neural networks work

## Summary
- Data analysis helps us find patterns and make predictions
- Linear regression fits a line to data to model relationships
- Key concepts: correlation, causation, neurons, loss, optimizer

## Further Reading
- [W3Schools: Linear Regression](https://www.w3schools.com/python/python_ml_linear_regression.asp)
- [Neural Networks Explained (FreeCodeCamp)](https://www.freecodecamp.org/news/deep-learning-neural-networks-explained-in-plain-english/)
`;

const Lesson13 = () => (
  <LessonPage
    title="Key Concepts & Understanding Data"
    moduleTitle="Introduction to Data Science"
    lessonNumber={13}
    content={content}
    prevLesson="/cs/python2/lesson12"
    nextLesson="/cs/python2/lesson14"
  />
);

export default Lesson13; 
