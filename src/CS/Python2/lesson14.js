import React from 'react';
import LessonPage from '../../LessonPage';

const content = `
# Lesson 14: Modeling

## Warm-up (5-10 min)
- Ask: "What does it mean to make a model of something?"
- Discuss: Models in real life (toy cars, maps, weather forecasts)
- How do models help us understand or predict things?

## Interactive Lecture (15-20 min)
- Explain: In data science, a **model** is a mathematical tool that helps us make predictions based on data.
- We "train" a model by showing it data and letting it learn patterns.

### Key Model Components
- **Layers:** Like steps in a recipe; each layer processes data in a different way
- **Neurons:** Tiny units in each layer that do calculations
- **Loss function:** Measures how far off the model's predictions are
- **Optimizer:** Adjusts the model to improve accuracy
- **Epochs:** How many times the model sees the data during training

### Example: Building a Simple Model with TensorFlow
\`\`\`
import tensorflow as tf
import numpy as np

# Data
X = np.array([-7.0, -4.0, -1.0, 2.0, 5.0, 8.0, 11.0, 14.0])
y = np.array([3.0, 6.0, 9.0, 12.0, 15.0, 18.0, 21.0, 24.0])

# Build the model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(units=1, input_shape=[1])
])

# Compile the model
model.compile(optimizer='sgd', loss='mean_absolute_error')

# Train the model
model.fit(X, y, epochs=5)

# Make a prediction
prediction = model.predict([17.0])
print(f"Prediction for X=17: {prediction[0][0]:.2f}")
\`\`\`

**Teacher Tips:**
- Show how to install TensorFlow: \`!pip install tensorflow\`
- Explain what each part of the code does
- Emphasize that more epochs can improve the model, but too many can "overfit"

## Mini-Project: Build and Test Your Own Model
1. Create your own small dataset (e.g., hours studied vs grade)
2. Build a simple model using TensorFlow
3. Train the model and make a prediction

**Sample Code:**
\`\`\`
import tensorflow as tf
import numpy as np

# Example data
hours = np.array([1, 2, 3, 4, 5, 6])
grades = np.array([65, 70, 75, 80, 85, 90])

model = tf.keras.Sequential([
    tf.keras.layers.Dense(units=1, input_shape=[1])
])

model.compile(optimizer='sgd', loss='mean_absolute_error')
model.fit(hours, grades, epochs=10)

# Predict grade for 7 hours
prediction = model.predict([7.0])
print(f"Predicted grade for 7 hours: {prediction[0][0]:.1f}")
\`\`\`

**Ask students:**
- What happens if you increase the number of epochs?
- How does the model's prediction change with new data?

## Common Mistakes and Tips
1. **Not enough data:** Model can't learn patterns
2. **Too many epochs:** Model memorizes data (overfitting)
3. **Wrong input shape:** Data must match model's expected shape

## Extension Activities
1. Try a more complex model (add more layers or units)
2. Experiment with different optimizers (e.g., 'adam')
3. Visualize the model's predictions vs actual data

## Summary
- A model is a tool for making predictions from data
- Training a model means showing it data and letting it learn
- Key parts: layers, neurons, loss, optimizer, epochs
- TensorFlow makes it easy to build and train models in Python

## Further Reading
- [TensorFlow Beginner Guide](https://www.tensorflow.org/tutorials/quickstart/beginner)
- [Keras Documentation](https://keras.io/)
`;

const Lesson14 = () => (
  <LessonPage
    title="Modeling"
    moduleTitle="Introduction to Data Science"
    lessonNumber={14}
    content={content}
    prevLesson="/cs/python2/lesson13"
    nextLesson="/cs/python2/lesson15"
  />
);

export default Lesson14; 
