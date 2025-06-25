import React from 'react';
import LessonPage from '../../LessonPage';

const content = `
# Lesson 16: Evaluating Models & AI Applications

## Warm-up (5-10 min)
- Ask: "How do you know if something is working well?"
- Discuss: How do we measure success in sports, school, games, etc.?

## Interactive Lecture (15-20 min)
- Explain: In machine learning, we evaluate models to see how well they make predictions.
- **Accuracy:** Percentage of correct predictions
- **Loss:** How far off the predictions are from the actual values
- **Validation data:** Data the model hasn't seen before, used to test performance

### Example: Evaluating a Model in TensorFlow
\`\`\`
import tensorflow as tf
import numpy as np

# Data
X = np.array([1, 2, 3, 4, 5, 6])
y = np.array([65, 70, 75, 80, 85, 90])

# Split data into training and validation sets
X_train = X[:5]
y_train = y[:5]
X_val = X[5:]
y_val = y[5:]

# Build and train model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(units=1, input_shape=[1])
])
model.compile(optimizer='sgd', loss='mean_absolute_error')
model.fit(X_train, y_train, epochs=10)

# Evaluate on validation data
val_loss = model.evaluate(X_val, y_val)
print(f"Validation loss: {val_loss:.2f}")

# Predict on new data
prediction = model.predict([7.0])
print(f"Predicted grade for 7 hours: {prediction[0][0]:.1f}")
\`\`\`

**Ask students:**
- Why do we use validation data?
- What does a low loss mean? What about a high loss?

### Visualizing Model Performance
\`\`\`
import matplotlib.pyplot as plt

# Predict for a range of hours
hours_range = np.linspace(1, 7, 100)
predictions = model.predict(hours_range)

plt.scatter(X, y, label='Actual Data')
plt.plot(hours_range, predictions, color='red', label='Model Prediction')
plt.xlabel('Hours Studied')
plt.ylabel('Grade')
plt.title('Model Evaluation Visualization')
plt.legend()
plt.show()
\`\`\`

## Mini-Project: Evaluate and Improve Your Model
1. Split your data into training and validation sets
2. Train your model on the training set
3. Evaluate on the validation set and record the loss/accuracy
4. Try improving your model and see if the evaluation improves

**Teacher Tips:**
- Discuss the importance of not testing on the same data you train on
- Encourage students to try different splits and see the effects

## Real-World AI Applications
- **Self-driving cars:** Evaluate models on real-world driving data
- **Medical diagnosis:** Test models on new patient data
- **Spam filters:** Check accuracy on new emails
- **Game AI:** Compete against human players to test performance

**Ask students:**
- Where else do you think AI models are evaluated?
- Why is it important to test on new data?

## Extension Activities
1. Try a classification problem (e.g., predict pass/fail instead of exact grade)
2. Research confusion matrix and precision/recall metrics
3. Explore AI applications in a field of interest (sports, art, medicine)

## Summary
- Evaluating models is crucial for understanding their performance
- Use validation data to test how well a model generalizes
- Loss and accuracy are key metrics
- Real-world AI applications rely on careful evaluation

## Further Reading
- [Model Evaluation in TensorFlow](https://www.tensorflow.org/tutorials/keras/classification)
- [AI Applications in the Real World](https://builtin.com/artificial-intelligence/examples-ai-in-industry)
`;

const Lesson16 = () => (
  <LessonPage
    title="Evaluating Models & AI Applications"
    moduleTitle="Introduction to Data Science"
    lessonNumber={16}
    content={content}
    prevLesson="/cs/python2/lesson15"
    nextLesson="/cs/python2/lesson17"
  />
);

export default Lesson16; 
