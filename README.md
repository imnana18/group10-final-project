# Group 10: Fetal Health Prediction & Classification Modeling

The project aims to develop a robust classification model for assessing fetal health based on various fetal parameters obtained through cardiotocography (CTG) data from 2126 babies. The model analyzes various features extracted from CTG recordings to accurately classify the health status of the fetus into one of three categories: "normal," "suspect," or "pathological."

A fetal health app was also created with the developed model, targeting healthcare providers aiming to assist the fetal monitoring process. The app successfully displays the CTG data for the searched patient (baby ID) and prints out the fetal health indicator based on the scan results. 

Not implemented here but ideally, the app would be able to record and save CTG information per scan during fetal monitoring to the clinic database. Healthcare providers would then be able to search and access CTG scan data with fetal health predictions from the saved patient database. More resources for development and an actual clinical setting would be required to implement this. 

## Purpose

The goal of this project is to assist healthcare professionals in the early detection and intervention of prenatal health issues, thereby reducing the risk for both the mother and fetus and improving healthcare outcomes.

## Data Sources

The data used in this project was sourced from the following repositories:

* UCI Machine Learning Repository:Cardiotocography Dataset:https://archive.ics.uci.edu/dataset/193/cardiotocography 

* Kaggle: Fetal Health Classification:https://www.kaggle.com/andrewmvd/fetal-health-classification

* Additionally, the dataset is referenced in the following publication : https://onlinelibrary.wiley.com/doi/10.1002/1520-6661(200009/10)9:5%3C311::AID-MFM12%3E3.0.CO;2-9

* The dataset contains 2,126 rows and 22 features extracted from Cardiotocogram (CTG) exams. The target variable is "Fetal_health," and there are 21 other features in the dataset.

## Repository Map 
Main files are mapped with description and listed for easy reference.

📁 `.ipynb_checkpoints`: main machine learning project code files.
   - 📄`Datacleaning-checkpoint.ipynb`: cleaning data for analysis.
   - 📄`Fetal_Health_Prediction-checkpoint.ipynb`: training, testing, & visualizations for all models.

📁 `App`: all files relating to fetal health app development.
   - `my_saved_model`: TensorFlowJS export generated.
   - `src`: all source codes.
     * `css`: HTML style formatting.
     * `data`: fetal health data as JSON.
     * `image`: baby image displayed on webpage.
     * `js`: JavaScript code
     * `tfjs_model`: TensorFlow JS model.
   - 📄`index.html`: HTML for running the model.

📁 `Images`: visualizations of machine learning models and data in '.png' format.

📁 `Resources`: fetal health data CSV files.

📁 `models`: machine learning models exported as pickle files.

📁 `notebook`: all other Jupyter Notebook files in relation to...
   - `app`: notebook files for application
   - `machine_learning`: notebook files modeling

📁 `python_script`: sqllite database.

## Data Cleaning

The data cleaning process primarily involved renaming columns, checking null values, analyzing value counts, and modifying data types using Jupyter Notebook with the pandas library.

## Data Base

After cleaning, the data is securely stored in an SQLlite database, taking ethical considerations into account.


## Machine Learning Models:


###  Algorithms:

1. Random Forest

2. Gradient Boosting

3. K-Nearest Neighbors (KNN)

4. Support Vector Machine (SVM)

5. TensorFlow (for neural network models)

6. Decision Tree


### Steps involved:

1. Check the value counts of the fetal health labels to understand the class distribution.

2. Address class imbalance using random oversampling to ensure balanced representation of classes.

3. Scale the data to a uniform standard using a scaler fit to the training data.

4. Split the data into training and testing sets to evaluate model performance.

5. Utilize grid search technique to select the best hyperparameters for each model.

6. Fit each model using the best parameters obtained from grid search.

7. Make predictions using the trained models on the testing set.

8. Generate confusion matrix and classification reports to evaluate the performance of each model.


## Analysis

After evaluating 6 algorithms, Gradient Boosting emerged as the top performer with an accuracy of 99.35%.
Based on this exceptional performance, we recommend utilizing the Gradient Boosting model for predicting fetal health classification.

## Data Visuals

1. **Bar Chart of Top 10 Important Features using Gradient Boosting (GB):**
   - This visualization displays the top 10 important features identified by the Gradient Boosting model. These features are crucial for predicting fetal health classification and provide insights into the underlying patterns in the data.

2. **Scatterplot Showing Correlation between Prolonged Deceleration and Fetal Status:**
   - The scatterplot illustrates the correlation between prolonged deceleration and fetal health status. By examining this relationship, we can gain a better understanding of how prolonged decelerations impact fetal well-being.

3. **Histograms of Top 10 Features by Health Status:**
   - These histograms depict the distribution of the top 10 features based on fetal health status. By visualizing the distribution of these features across different health statuses, we can identify patterns and potential indicators of fetal health.


## Fetal Health App

### Steps involved:

1. Dataset transformed to make index a column called 'Baby ID' to represent CTG data in a mock clinical setting.
   
2. Modeled, trained, and tested TensorFlow JS machine learning model to mimic the Random Forest model as best as possible.
   - Note: Python scikit-learn models found to be incompatible with JavaScript / HTML. TensorFlow JS used as an alternative to resolve the issue.

3. JavaScript & HTML code for displaying baby data in mock clinic database with fetal health predictions run through the machine learning model written. Interactive components with HTML for webpage also implemented.

4. Image drawing compiled online for webpage use.

5. HTML and CSS style sheet adjusted for webpage design and visuals.

6. Test validated for demo.       


## Skills 

1. Python

2. Pandas

3. Sqllite

4. Jupyter Notebook

5. Sklearn

6. JavaScript / HTML

7. TensorFlow

8. TensorFlow JS


