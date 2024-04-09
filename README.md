## Fetal Health Prediction and Classification Modeling

## Overview

The project aims to develop a robust classification model for assessing fetal health based on various maternal and fetal parameters obtained through cardiotocography (CTG) data. The model analyzes various features extracted from CTG recordings to accurately classify the health status of the fetus into one of three categories: "normal," "suspect," or "pathological."

## Goal

The goal of this project is to assist healthcare professionals in the early detection and intervention of prenatal health issues, thereby reducing the risk for both the mother and fetus and improving healthcare outcomes.

## Data Source

The data used in this project was sourced from the following repositories:

* UCI Machine Learning Repository:Cardiotocography Dataset:https://archive.ics.uci.edu/dataset/193/cardiotocography 

* Kaggle: Fetal Health Classification:https://www.kaggle.com/andrewmvd/fetal-health-classification

* Additionally, the dataset is referenced in the following publication : https://onlinelibrary.wiley.com/doi/10.1002/1520-6661(200009/10)9:5%3C311::AID-MFM12%3E3.0.CO;2-9

* The dataset contains 2,126 rows and 22 features extracted from Cardiotocogram (CTG) exams. The target variable is "Fetal_health," and there are 21 other features in the dataset.

## Data Cleaning

The data cleaning process primarily involved renaming columns, checking null values, analyzing value counts, and modifying data types using Jupyter Notebook with the pandas library.

## Data Base

After cleaning, the data is securely stored in an SQLlite database, taking ethical considerations into account


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

# Data Visuals

Fetal_Health_status_count

Model Analysis

Analysis Report

Top 10 features

Histograms of 5 features

   
## Requirements

1.python

2.pandas

3.sqllite

4.jupyter notebook

5.sklearn

 


