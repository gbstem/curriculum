import React from 'react';
import LessonPage from '../../LessonPage';

const content = `
# Lesson 12: Google Colab & Getting Data

## Warm-up (5-10 min)
- Ask: "If you could predict anything about the future, what would you want to predict?"
- Discuss: What kinds of data would you need to make that prediction?

## Interactive Lecture (15-20 min)
- Explain: **Google Colab** is a free online tool for running Python code in the cloud—great for data science and machine learning!
- Benefits: No installation, easy sharing, powerful hardware, works on any device.

### Getting Started with Google Colab
1. Go to [Google Colab](https://colab.research.google.com/)
2. Click "New Notebook" to start a new project
3. Each cell can run Python code or display text/markdown
4. You can save notebooks to Google Drive and share with others

**Teacher Demo:**
- Show how to create a new notebook
- Demonstrate running a simple Python cell:
\`\`\`
print("Hello from Colab!")
\`\`\`

### Getting Data: CSV Files and Pandas
- Most real-world data is stored in CSV (Comma-Separated Values) files
- We use the \`pandas\` library to load and work with data

**Example: Loading a CSV file**
\`\`\`
import pandas as pd

data = pd.read_csv('sample.csv')  # Replace with your file path
print(data.head())  # Show the first few rows
\`\`\`

**Ask students:**
- What does \`pd.read_csv()\` do?
- What does \`data.head()\` show?

### Example: Creating and Visualizing Data
Let's make a simple dataset and plot it!
\`\`\`
import numpy as np
import matplotlib.pyplot as plt

# Create data
X = np.array([-7.0, -4.0, -1.0, 2.0, 5.0, 8.0, 11.0, 14.0])
y = np.array([3.0, 6.0, 9.0, 12.0, 15.0, 18.0, 21.0, 24.0])

# Visualize
plt.scatter(X, y)
plt.xlabel('X')
plt.ylabel('y')
plt.title('Sample Data')
plt.show()
\`\`\`

**Teacher Tips:**
- If students don't have a CSV, show how to create one in Google Sheets and download as CSV
- Encourage students to experiment with their own data

## Mini-Project: Load and Visualize Your Own Data
1. Create a small CSV file (e.g., favorite foods, daily temperatures, etc.)
2. Upload it to Colab (Files > Upload)
3. Load it with \`pandas\` and display the first few rows
4. Plot one or more columns using \`matplotlib\`

**Sample Code:**
\`\`\`
import pandas as pd
import matplotlib.pyplot as plt

data = pd.read_csv('mydata.csv')
print(data.head())

# Plot a column (replace 'column_name' with your actual column)
plt.plot(data['column_name'])
plt.show()
\`\`\`

**Ask students:**
- What patterns do you see in your data?
- How could you use this data to make predictions?

## Sharing (5-10 min)
- Invite students to share their Colab notebooks and visualizations
- Discuss interesting findings and creative data sets

## Common Mistakes and Tips
1. **File not found:** Make sure the file is uploaded and the path is correct
2. **Wrong column name:** Double-check spelling and capitalization
3. **Missing libraries:** Use \`!pip install pandas matplotlib\` if needed

## Extension Activities
1. Try loading a larger dataset from the internet (e.g., [Kaggle Datasets](https://www.kaggle.com/datasets))
2. Experiment with different types of plots (bar, scatter, histogram)
3. Try using Google Sheets to collect data and import it into Colab

## Summary
- Google Colab is a powerful tool for running Python and data science code online
- CSV files are a common way to store and share data
- \`pandas\` and \`matplotlib\` are essential libraries for data analysis and visualization
- Practice loading, exploring, and visualizing your own data

## Further Reading
- [Google Colab Guide](https://colab.research.google.com/notebooks/intro.ipynb)
- [Pandas Documentation](https://pandas.pydata.org/docs/)
- [Matplotlib Documentation](https://matplotlib.org/stable/users/index.html)
`;

const Lesson12 = () => (
  <LessonPage
    title="Google Colab & Getting Data"
    moduleTitle="Introduction to Data Science"
    lessonNumber={12}
    content={content}
    prevLesson="/cs/python2/lesson11"
    nextLesson="/cs/python2/lesson13"
  />
);

export default Lesson12; 
