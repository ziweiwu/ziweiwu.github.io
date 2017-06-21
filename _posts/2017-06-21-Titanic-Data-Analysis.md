---
layout: post
title: "Data Analysis of Titanic (DAND)"
description: "Project 3 of learning Udacity's DAND"
comments: True 
keywords: "Data Science, MOOC, DAND"
---
## Titantic Investigation 

For this project, I want to investigate the unfornate tragedy of the sinking of the Tiantic. The movie "Titantic"- which I watched when I was still a child left a strong memory for me. The event occured in the early morning of 15 April 1912, when the ship collided with an iceberg, and out of 2,224 passengers, more than 1500 died. 

![Image of Titantic](https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/RMS_Titanic_3.jpg/1024px-RMS_Titanic_3.jpg)

The dataset I am working with contains the demographic information, and other informations including ticket class, carbin number, fare price of 891 passangers. The main question I am curious about: What are the factors that correlates with passangers' survial?

First of all, I want to get an overview of the data and identify whether there is additional data cleaning/wrangling to be done before diving deeper. I start off by reading the CSV file into a Pandas Dataframe.  


```python
%matplotlib inline
import pandas as pd 
import numpy as np
import csv
import matplotlib
import matplotlib.pyplot as plt
titantic_original = pd.DataFrame.from_csv('titanic-data.csv', index_col=None)
titantic_original.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PassengerId</th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>0</td>
      <td>3</td>
      <td>Braund, Mr. Owen Harris</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>A/5 21171</td>
      <td>7.2500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>1</td>
      <td>1</td>
      <td>Cumings, Mrs. John Bradley (Florence Briggs Th...</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>PC 17599</td>
      <td>71.2833</td>
      <td>C85</td>
      <td>C</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>1</td>
      <td>3</td>
      <td>Heikkinen, Miss. Laina</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>STON/O2. 3101282</td>
      <td>7.9250</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>1</td>
      <td>1</td>
      <td>Futrelle, Mrs. Jacques Heath (Lily May Peel)</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>113803</td>
      <td>53.1000</td>
      <td>C123</td>
      <td>S</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>0</td>
      <td>3</td>
      <td>Allen, Mr. William Henry</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>373450</td>
      <td>8.0500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
  </tbody>
</table>
</div>




```python
len(titantic_original['PassengerId'])
```




    891




```python
#check if there is duplicated data by checking passenger ID.
len(titantic_original['PassengerId'].unique())
```




    891




```python
titantic_original.describe()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PassengerId</th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Fare</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>891.000000</td>
      <td>891.000000</td>
      <td>891.000000</td>
      <td>714.000000</td>
      <td>891.000000</td>
      <td>891.000000</td>
      <td>891.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>446.000000</td>
      <td>0.383838</td>
      <td>2.308642</td>
      <td>29.699118</td>
      <td>0.523008</td>
      <td>0.381594</td>
      <td>32.204208</td>
    </tr>
    <tr>
      <th>std</th>
      <td>257.353842</td>
      <td>0.486592</td>
      <td>0.836071</td>
      <td>14.526497</td>
      <td>1.102743</td>
      <td>0.806057</td>
      <td>49.693429</td>
    </tr>
    <tr>
      <th>min</th>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>1.000000</td>
      <td>0.420000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>223.500000</td>
      <td>0.000000</td>
      <td>2.000000</td>
      <td>20.125000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>7.910400</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>446.000000</td>
      <td>0.000000</td>
      <td>3.000000</td>
      <td>28.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>14.454200</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>668.500000</td>
      <td>1.000000</td>
      <td>3.000000</td>
      <td>38.000000</td>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>31.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>891.000000</td>
      <td>1.000000</td>
      <td>3.000000</td>
      <td>80.000000</td>
      <td>8.000000</td>
      <td>6.000000</td>
      <td>512.329200</td>
    </tr>
  </tbody>
</table>
</div>



Based on the overview of the data, I formulated 3 potential factors that may have influenced the survival. 
1. Fare price: the price that a passenger willing to pay is tightly linked to person's socioeconomic class.
2. Gender: does gender plays a role in survival? Is women more likely to survive than men?
3. Age: the mean age of the passenger were 29.699 with a STD of 14.526, which is quite young.

However, I do see that the oldest passenger was 80 years old. I want to see how does age influence the survival. 


### Fare Price and Survival 
---


```python
#Draw scatterplot with survival on Y axis and fare price on X axis. 
fare_dist=titantic_original.hist(column='Fare', bins=15)
plt.ylabel('Number of People')
plt.xlabel('$ Fare Price')
```




    <matplotlib.text.Text at 0x10de7e9d0>




![png](/screenshot/output_9_1.png)


As seen from the graph, majority of the fare price is below $35, the graph shows a postive skewed shape. I want to group the data by <$35 and >$35, then look at the survival rate. 


```python
titantic_fare = titantic_original.copy()
titantic_fare['Fare>35'] = np.where(titantic_original['Fare']>35,1,0)
titantic_fare.head()

```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PassengerId</th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
      <th>Fare&gt;35</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>0</td>
      <td>3</td>
      <td>Braund, Mr. Owen Harris</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>A/5 21171</td>
      <td>7.2500</td>
      <td>NaN</td>
      <td>S</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>1</td>
      <td>1</td>
      <td>Cumings, Mrs. John Bradley (Florence Briggs Th...</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>PC 17599</td>
      <td>71.2833</td>
      <td>C85</td>
      <td>C</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>1</td>
      <td>3</td>
      <td>Heikkinen, Miss. Laina</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>STON/O2. 3101282</td>
      <td>7.9250</td>
      <td>NaN</td>
      <td>S</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>1</td>
      <td>1</td>
      <td>Futrelle, Mrs. Jacques Heath (Lily May Peel)</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>113803</td>
      <td>53.1000</td>
      <td>C123</td>
      <td>S</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>0</td>
      <td>3</td>
      <td>Allen, Mr. William Henry</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>373450</td>
      <td>8.0500</td>
      <td>NaN</td>
      <td>S</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Calculate the survival rate for passenger who holds fare > $35. 
high_fare_survival=titantic_fare.loc[(titantic_fare['Survived'] == 1)&(titantic_fare['Fare>35']==1)]

high_fare_holder=titantic_fare.loc[(titantic_fare['Fare>35']==1)]

high_fare_survival_rate=len(high_fare_survival)/(len(high_fare_holder)*1.00)

print high_fare_survival_rate
```

    0.621212121212



```python
#Calculate the survival rate for passenger who holds fare <= $35. 

low_fare_survival=titantic_fare.loc[(titantic_fare['Survived'] == 1)&(titantic_fare['Fare>35']==0)]

low_fare_holder=titantic_fare.loc[(titantic_fare['Fare>35']==0)]

low_fare_survival_rate=len(low_fare_survival)/(len(low_fare_holder)*1.00)

print low_fare_survival_rate
```

    0.316017316017



```python
#plot a histogram for survival rate for fare price > $35 and <= $35

fare_survival_table=pd.DataFrame({'Fare Price':pd.Categorical(['>$35','<=$35']),
                                 'Survival Rate':pd.Series([0.62,0.31], dtype='float64')
                                 })
bar=fare_survival_table.plot(kind='bar', x='Fare Price', rot=0)
plt.ylabel('Survival Rate')
plt.xlabel('Fare Price')
```




    <matplotlib.text.Text at 0x111421690>




![png](/screenshot/output_14_1.png)


The bar graph demostrates that higher fare price is associated with significantly higher survival rate compared to lower fare price.


### Gender and Survival 
---


```python
#Calculate the survival rate for female
female_survived=titantic_fare.loc[(titantic_fare['Survived'] == 1)&(titantic_fare['Sex']=='female')]

female_total=titantic_fare.loc[(titantic_fare['Sex']=='female')]

female_survival_rate=len(female_survived)/(len(female_total)*1.00)

print female_survival_rate
```

    0.742038216561



```python
#Calculate the survival rate for male
male_survived=titantic_fare.loc[(titantic_fare['Survived'] == 1)&(titantic_fare['Sex']=='male')]

male_total=titantic_fare.loc[(titantic_fare['Sex']=='male')]

male_survival_rate=len(male_survived)/(len(male_total)*1.00)

print male_survival_rate
```

    0.188908145581



```python
#plot a histogram for survival rate for female and male

gender_survival_table=pd.DataFrame({'Gender':pd.Categorical(['female','male']),
                                 'Survival Rate':pd.Series([0.74,0.19], dtype='float64')
                                 })
gender_survival_table.plot(kind='bar', x='Gender', rot=0)
plt.ylabel('Survival Rate')
plt.xlabel('Gender')
```




    <matplotlib.text.Text at 0x11142f9d0>




![png](/screenshot/output_19_1.png)


Being a female is associated with much higher survival rate compared to male. This result is not surprising as female was more likely being helped first when the disaster occured. 

### Age and Survival
---

Before I investigate the relationship between and survival, I noticed that there are some null values for age. I want to clean them up first.


```python
#make a copy of original data, so if anything goes wrong, the original dataset would remain intact
titantic_age=titantic_original.copy()
#axis = 0 means rows would be deleted, whenever there is a NaN at column Age
titantic_age_cleaned=titantic_age.dropna(axis=0,subset=['Age'])
len(titantic_age_cleaned)
```




    714




```python
titantic_age_cleaned['Age'].describe()
```




    count    714.000000
    mean      29.699118
    std       14.526497
    min        0.420000
    25%       20.125000
    50%       28.000000
    75%       38.000000
    max       80.000000
    Name: Age, dtype: float64




```python
titantic_age_cleaned.hist(column=['Age'], bins=20)
plt.ylabel('Frequncy')
plt.xlabel('Age')
```




    <matplotlib.text.Text at 0x111606e50>




![png](/screenshot/output_25_1.png)


The age distribution shows that the majority of passengers are fairly young, from around late teens to mid 30s. A surprising finding is that there are fairly a bit of infants onboard as shown the small peak at the very left of graph, otherwise the graph is pretty bell-shaped. 

In terms of the investigation, I seperate age into 6 groups:
    1. newborn to 10 years old 
    2. 10 to 20 years old 
    3. 20 to 30 years old 
    4. 30 to 40 years old 
    5. 40 to 50 years old
    6. over 50 years old     


```python
#create a age_group function to group ages to 6 groups
def age_group(age):
    age_group=0
    if age<10:
        age_group=1
    elif age <20:
        age_group=2
    elif age <30:
        age_group=3
    elif age <40:
        age_group=4
    elif age <50:
        age_group=5
    else:
        age_group=6
    return age_group

#add age group column to the dataframe. 
agegroup_column = titantic_age_cleaned['Age'].apply(age_group)
titantic_age_cleaned_group=titantic_age_cleaned.copy()
titantic_age_cleaned_group['Age Group'] = agegroup_column
titantic_age_cleaned_group.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PassengerId</th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
      <th>Age Group</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>0</td>
      <td>3</td>
      <td>Braund, Mr. Owen Harris</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>A/5 21171</td>
      <td>7.2500</td>
      <td>NaN</td>
      <td>S</td>
      <td>3</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>1</td>
      <td>1</td>
      <td>Cumings, Mrs. John Bradley (Florence Briggs Th...</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>PC 17599</td>
      <td>71.2833</td>
      <td>C85</td>
      <td>C</td>
      <td>4</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>1</td>
      <td>3</td>
      <td>Heikkinen, Miss. Laina</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>STON/O2. 3101282</td>
      <td>7.9250</td>
      <td>NaN</td>
      <td>S</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>1</td>
      <td>1</td>
      <td>Futrelle, Mrs. Jacques Heath (Lily May Peel)</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>113803</td>
      <td>53.1000</td>
      <td>C123</td>
      <td>S</td>
      <td>4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>0</td>
      <td>3</td>
      <td>Allen, Mr. William Henry</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>373450</td>
      <td>8.0500</td>
      <td>NaN</td>
      <td>S</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
</div>




```python
#calculate the survival rate for each age group. 
def age_group_survival(data,x,y,group):
    age_group_survived=data.loc[(data[y] == 1)&(data[x]==group)]
    age_group_total=data.loc[(data[x]==group)]
    age_group_survival_rate=len(age_group_survived)/(len(age_group_total)*1.00)
    return age_group_survival_rate

#create a loop to calculate survival rate for each  group and stores values in a data frame.
temp_list=[]
for i in range(6):
    age_group=i+1
    survival_rate= age_group_survival(titantic_age_cleaned_group,'Age Group', 'Survived', i+1)
    d={'Age Group' : age_group, 'Survival Rate' : survival_rate}
    temp_list.append(d)

age_group_survival_table = pd.DataFrame(temp_list)
print age_group_survival_table
```

       Age Group  Survival Rate
    0          1       0.612903
    1          2       0.401961
    2          3       0.350000
    3          4       0.437126
    4          5       0.382022
    5          6       0.364865



```python
age_group_survival_table.plot(kind='bar', y='Survival Rate', x='Age Group')
plt.ylabel('Survival Rate')
plt.xlabel('Age Group')
```




    <matplotlib.text.Text at 0x1117e0f10>




![png](/screenshot/output_29_1.png)


- Age Group 1: < 10
- Age Group 2: >= 10 and < 20 
- Age Group 3: >= 20 and < 30
- Age Group 4: >= 30 and < 40
- Age Group 5: >= 40 and < 50
- Age Group 6: >= 50  


The bar graph demostrates that young children and infants less than 10 years old showed the highest survival rate of over 60% compared to the rest of the group. A possible explanation is that the young children and infants received priority for the escape effort, and were placed on the safety boats before other age groups. 

### Conclusion 
---
After investigating the dataset, it is clear that three groups:
1. passengers with higher fare price 
2. being a female
3. being a young child/infant

were all associated with higher survival rate. In terms of possible explanations: It's likely that womens and young children/infants were prioritized to escape to safety despite of the chaotic disaster. Passengers with higher fare price were likely associated with higher socioeconomic status, and may have been prioritized to escape as well. 

### References
---

"RMS Titanic", 2017, Wikipedia, from https://en.wikipedia.org/wiki/RMS_Titanic
