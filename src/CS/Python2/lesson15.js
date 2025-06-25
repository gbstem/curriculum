import React from 'react';
import LessonPage from '../../LessonPage';

const content = `
# Lesson 15: Improving a Model

## Warm-up (5-10 min)
- Ask: "Have you ever practiced something to get better at it? What did you do to improve?"
- Discuss: How do we know if we're improving? (feedback, scores, results)

## Interactive Lecture (15-20 min)
- Explain: In machine learning, we can improve a model by changing how we train it or by giving it more data.
- **Ways to improve a model:**
  1. Add more layers or units (make the model more complex)
  2. Change the activation function (how neurons process data)
  3. Change the optimizer (how the model learns)
  4. Change the learning rate (how fast the model updates)
  5. Train on more data
  6. Train for more epochs

### Example: Improving a Model in TensorFlow
\`\`\`
import tensorflow as tf
import numpy as np

# Data
X = np.array([1, 2, 3, 4, 5, 6])
y = np.array([65, 70, 75, 80, 85, 90])

# Build a more complex model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(units=10, activation='relu', input_shape=[1]),
    tf.keras.layers.Dense(units=1)
])

model.compile(optimizer='adam', loss='mean_squared_error')
model.fit(X, y, epochs=50)

# Predict for 7 hours
prediction = model.predict([7.0])
print(f"Predicted grade for 7 hours: {prediction[0][0]:.1f}")
\`\`\`

**Ask students:**
- What changed compared to the previous model?
- How does the prediction compare to the actual data?

### Visualizing Model Improvement
\`\`\`
import matplotlib.pyplot as plt

# Predict for a range of hours
hours_range = np.linspace(1, 7, 100)
predictions = model.predict(hours_range)

plt.scatter(X, y, label='Actual Data')
plt.plot(hours_range, predictions, color='red', label='Model Prediction')
plt.xlabel('Hours Studied')
plt.ylabel('Grade')
plt.title('Model Improvement Visualization')
plt.legend()
plt.show()
\`\`\`

## Mini-Project: Experiment with Model Improvements
1. Try changing the number of layers or units
2. Experiment with different optimizers ('sgd', 'adam', etc.)
3. Add more data points and see how the model changes
4. Visualize the results

**Teacher Tips:**
- Encourage students to try different combinations and observe the effects
- Discuss the concept of "overfitting" (model memorizes data, doesn't generalize)

## Common Mistakes and Tips
1. **Too complex model:** May overfit and not work well on new data
2. **Too simple model:** May underfit and miss important patterns
3. **Not enough data:** Model can't learn well
4. **Ignoring loss/accuracy:** Always check how well the model is doing

## Extension Activities
1. Try a classification problem (predicting categories instead of numbers)
2. Research different activation functions (e.g., 'sigmoid', 'tanh')
3. Try using dropout layers to prevent overfitting

## Summary
- Improving a model involves changing its structure, training, or data
- More layers/units can help, but too many can cause overfitting
- Visualizing predictions helps understand model performance
- Always experiment and check results!

## Further Reading
- [Keras Model Improvement Tips](https://keras.io/guides/)
- [Overfitting and Underfitting](https://machinelearningmastery.com/overfitting-and-underfitting-with-machine-learning-algorithms/)
`;

const Lesson15 = () => (
  <LessonPage
    title="Improving a Model"
    moduleTitle="Introduction to Data Science"
    lessonNumber={15}
    content={content}
    prevLesson="/cs/python2/lesson14"
    nextLesson="/cs/python2/lesson16"
  />
);

export default Lesson15; 
