---
layout: post
title: "Titanic Project"
description: "Data Sciecne Project for Udacity DAND" 
comments: true 
keywords: "Data Science, DAND"
---
## Titanic Project 

For this project, I want to investigate the unfortunate tragedy of the sinking of the Titanic. The movie "Titanic"- which I watched when I was still a child left a strong memory for me. The event occurred in the early morning of 15 April 1912, when the ship collided with an iceberg, and out of 2,224 passengers, more than 1500 died. 
![Image of Titantic](https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/RMS_Titanic_3.jpg/1024px-RMS_Titanic_3.jpg)

The dataset I am working with contains the demographic information, and other information including ticket class, cabin number, fare price of 891 passengers. The main question I am curious about: What are the factors that correlate with the survival outcome of passengers?

### Load the dataset
---
First of all, I want to get an overview of the data and identify whether there is additional data cleaning/wrangling to be done before diving deeper. I start off by reading the CSV file into a Pandas Dataframe.  

```python
#load the libraries that I might need to use
%matplotlib inline
import pandas as pd 
import numpy as np
import csv
import matplotlib
import matplotlib.pyplot as plt
import seaborn as sns
#read the csv file into a pandas dataframe 
titanic_original = pd.DataFrame.from_csv('titanic-data.csv', index_col=None)
titanic_original
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
    <tr>
      <th>5</th>
      <td>6</td>
      <td>0</td>
      <td>3</td>
      <td>Moran, Mr. James</td>
      <td>male</td>
      <td>NaN</td>
      <td>0</td>
      <td>0</td>
      <td>330877</td>
      <td>8.4583</td>
      <td>NaN</td>
      <td>Q</td>
    </tr>
    <tr>
      <th>6</th>
      <td>7</td>
      <td>0</td>
      <td>1</td>
      <td>McCarthy, Mr. Timothy J</td>
      <td>male</td>
      <td>54.0</td>
      <td>0</td>
      <td>0</td>
      <td>17463</td>
      <td>51.8625</td>
      <td>E46</td>
      <td>S</td>
    </tr>
    <tr>
      <th>7</th>
      <td>8</td>
      <td>0</td>
      <td>3</td>
      <td>Palsson, Master. Gosta Leonard</td>
      <td>male</td>
      <td>2.0</td>
      <td>3</td>
      <td>1</td>
      <td>349909</td>
      <td>21.0750</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>8</th>
      <td>9</td>
      <td>1</td>
      <td>3</td>
      <td>Johnson, Mrs. Oscar W (Elisabeth Vilhelmina Berg)</td>
      <td>female</td>
      <td>27.0</td>
      <td>0</td>
      <td>2</td>
      <td>347742</td>
      <td>11.1333</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>9</th>
      <td>10</td>
      <td>1</td>
      <td>2</td>
      <td>Nasser, Mrs. Nicholas (Adele Achem)</td>
      <td>female</td>
      <td>14.0</td>
      <td>1</td>
      <td>0</td>
      <td>237736</td>
      <td>30.0708</td>
      <td>NaN</td>
      <td>C</td>
    </tr>
    <tr>
      <th>10</th>
      <td>11</td>
      <td>1</td>
      <td>3</td>
      <td>Sandstrom, Miss. Marguerite Rut</td>
      <td>female</td>
      <td>4.0</td>
      <td>1</td>
      <td>1</td>
      <td>PP 9549</td>
      <td>16.7000</td>
      <td>G6</td>
      <td>S</td>
    </tr>
    <tr>
      <th>11</th>
      <td>12</td>
      <td>1</td>
      <td>1</td>
      <td>Bonnell, Miss. Elizabeth</td>
      <td>female</td>
      <td>58.0</td>
      <td>0</td>
      <td>0</td>
      <td>113783</td>
      <td>26.5500</td>
      <td>C103</td>
      <td>S</td>
    </tr>
    <tr>
      <th>12</th>
      <td>13</td>
      <td>0</td>
      <td>3</td>
      <td>Saundercock, Mr. William Henry</td>
      <td>male</td>
      <td>20.0</td>
      <td>0</td>
      <td>0</td>
      <td>A/5. 2151</td>
      <td>8.0500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>13</th>
      <td>14</td>
      <td>0</td>
      <td>3</td>
      <td>Andersson, Mr. Anders Johan</td>
      <td>male</td>
      <td>39.0</td>
      <td>1</td>
      <td>5</td>
      <td>347082</td>
      <td>31.2750</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>14</th>
      <td>15</td>
      <td>0</td>
      <td>3</td>
      <td>Vestrom, Miss. Hulda Amanda Adolfina</td>
      <td>female</td>
      <td>14.0</td>
      <td>0</td>
      <td>0</td>
      <td>350406</td>
      <td>7.8542</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>15</th>
      <td>16</td>
      <td>1</td>
      <td>2</td>
      <td>Hewlett, Mrs. (Mary D Kingcome)</td>
      <td>female</td>
      <td>55.0</td>
      <td>0</td>
      <td>0</td>
      <td>248706</td>
      <td>16.0000</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>16</th>
      <td>17</td>
      <td>0</td>
      <td>3</td>
      <td>Rice, Master. Eugene</td>
      <td>male</td>
      <td>2.0</td>
      <td>4</td>
      <td>1</td>
      <td>382652</td>
      <td>29.1250</td>
      <td>NaN</td>
      <td>Q</td>
    </tr>
    <tr>
      <th>17</th>
      <td>18</td>
      <td>1</td>
      <td>2</td>
      <td>Williams, Mr. Charles Eugene</td>
      <td>male</td>
      <td>NaN</td>
      <td>0</td>
      <td>0</td>
      <td>244373</td>
      <td>13.0000</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>18</th>
      <td>19</td>
      <td>0</td>
      <td>3</td>
      <td>Vander Planke, Mrs. Julius (Emelia Maria Vande...</td>
      <td>female</td>
      <td>31.0</td>
      <td>1</td>
      <td>0</td>
      <td>345763</td>
      <td>18.0000</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>19</th>
      <td>20</td>
      <td>1</td>
      <td>3</td>
      <td>Masselmani, Mrs. Fatima</td>
      <td>female</td>
      <td>NaN</td>
      <td>0</td>
      <td>0</td>
      <td>2649</td>
      <td>7.2250</td>
      <td>NaN</td>
      <td>C</td>
    </tr>
    <tr>
      <th>20</th>
      <td>21</td>
      <td>0</td>
      <td>2</td>
      <td>Fynney, Mr. Joseph J</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>239865</td>
      <td>26.0000</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>21</th>
      <td>22</td>
      <td>1</td>
      <td>2</td>
      <td>Beesley, Mr. Lawrence</td>
      <td>male</td>
      <td>34.0</td>
      <td>0</td>
      <td>0</td>
      <td>248698</td>
      <td>13.0000</td>
      <td>D56</td>
      <td>S</td>
    </tr>
    <tr>
      <th>22</th>
      <td>23</td>
      <td>1</td>
      <td>3</td>
      <td>McGowan, Miss. Anna "Annie"</td>
      <td>female</td>
      <td>15.0</td>
      <td>0</td>
      <td>0</td>
      <td>330923</td>
      <td>8.0292</td>
      <td>NaN</td>
      <td>Q</td>
    </tr>
    <tr>
      <th>23</th>
      <td>24</td>
      <td>1</td>
      <td>1</td>
      <td>Sloper, Mr. William Thompson</td>
      <td>male</td>
      <td>28.0</td>
      <td>0</td>
      <td>0</td>
      <td>113788</td>
      <td>35.5000</td>
      <td>A6</td>
      <td>S</td>
    </tr>
    <tr>
      <th>24</th>
      <td>25</td>
      <td>0</td>
      <td>3</td>
      <td>Palsson, Miss. Torborg Danira</td>
      <td>female</td>
      <td>8.0</td>
      <td>3</td>
      <td>1</td>
      <td>349909</td>
      <td>21.0750</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>25</th>
      <td>26</td>
      <td>1</td>
      <td>3</td>
      <td>Asplund, Mrs. Carl Oscar (Selma Augusta Emilia...</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>5</td>
      <td>347077</td>
      <td>31.3875</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>26</th>
      <td>27</td>
      <td>0</td>
      <td>3</td>
      <td>Emir, Mr. Farred Chehab</td>
      <td>male</td>
      <td>NaN</td>
      <td>0</td>
      <td>0</td>
      <td>2631</td>
      <td>7.2250</td>
      <td>NaN</td>
      <td>C</td>
    </tr>
    <tr>
      <th>27</th>
      <td>28</td>
      <td>0</td>
      <td>1</td>
      <td>Fortune, Mr. Charles Alexander</td>
      <td>male</td>
      <td>19.0</td>
      <td>3</td>
      <td>2</td>
      <td>19950</td>
      <td>263.0000</td>
      <td>C23 C25 C27</td>
      <td>S</td>
    </tr>
    <tr>
      <th>28</th>
      <td>29</td>
      <td>1</td>
      <td>3</td>
      <td>O'Dwyer, Miss. Ellen "Nellie"</td>
      <td>female</td>
      <td>NaN</td>
      <td>0</td>
      <td>0</td>
      <td>330959</td>
      <td>7.8792</td>
      <td>NaN</td>
      <td>Q</td>
    </tr>
    <tr>
      <th>29</th>
      <td>30</td>
      <td>0</td>
      <td>3</td>
      <td>Todoroff, Mr. Lalio</td>
      <td>male</td>
      <td>NaN</td>
      <td>0</td>
      <td>0</td>
      <td>349216</td>
      <td>7.8958</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>861</th>
      <td>862</td>
      <td>0</td>
      <td>2</td>
      <td>Giles, Mr. Frederick Edward</td>
      <td>male</td>
      <td>21.0</td>
      <td>1</td>
      <td>0</td>
      <td>28134</td>
      <td>11.5000</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>862</th>
      <td>863</td>
      <td>1</td>
      <td>1</td>
      <td>Swift, Mrs. Frederick Joel (Margaret Welles Ba...</td>
      <td>female</td>
      <td>48.0</td>
      <td>0</td>
      <td>0</td>
      <td>17466</td>
      <td>25.9292</td>
      <td>D17</td>
      <td>S</td>
    </tr>
    <tr>
      <th>863</th>
      <td>864</td>
      <td>0</td>
      <td>3</td>
      <td>Sage, Miss. Dorothy Edith "Dolly"</td>
      <td>female</td>
      <td>NaN</td>
      <td>8</td>
      <td>2</td>
      <td>CA. 2343</td>
      <td>69.5500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>864</th>
      <td>865</td>
      <td>0</td>
      <td>2</td>
      <td>Gill, Mr. John William</td>
      <td>male</td>
      <td>24.0</td>
      <td>0</td>
      <td>0</td>
      <td>233866</td>
      <td>13.0000</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>865</th>
      <td>866</td>
      <td>1</td>
      <td>2</td>
      <td>Bystrom, Mrs. (Karolina)</td>
      <td>female</td>
      <td>42.0</td>
      <td>0</td>
      <td>0</td>
      <td>236852</td>
      <td>13.0000</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>866</th>
      <td>867</td>
      <td>1</td>
      <td>2</td>
      <td>Duran y More, Miss. Asuncion</td>
      <td>female</td>
      <td>27.0</td>
      <td>1</td>
      <td>0</td>
      <td>SC/PARIS 2149</td>
      <td>13.8583</td>
      <td>NaN</td>
      <td>C</td>
    </tr>
    <tr>
      <th>867</th>
      <td>868</td>
      <td>0</td>
      <td>1</td>
      <td>Roebling, Mr. Washington Augustus II</td>
      <td>male</td>
      <td>31.0</td>
      <td>0</td>
      <td>0</td>
      <td>PC 17590</td>
      <td>50.4958</td>
      <td>A24</td>
      <td>S</td>
    </tr>
    <tr>
      <th>868</th>
      <td>869</td>
      <td>0</td>
      <td>3</td>
      <td>van Melkebeke, Mr. Philemon</td>
      <td>male</td>
      <td>NaN</td>
      <td>0</td>
      <td>0</td>
      <td>345777</td>
      <td>9.5000</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>869</th>
      <td>870</td>
      <td>1</td>
      <td>3</td>
      <td>Johnson, Master. Harold Theodor</td>
      <td>male</td>
      <td>4.0</td>
      <td>1</td>
      <td>1</td>
      <td>347742</td>
      <td>11.1333</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>870</th>
      <td>871</td>
      <td>0</td>
      <td>3</td>
      <td>Balkic, Mr. Cerin</td>
      <td>male</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>349248</td>
      <td>7.8958</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>871</th>
      <td>872</td>
      <td>1</td>
      <td>1</td>
      <td>Beckwith, Mrs. Richard Leonard (Sallie Monypeny)</td>
      <td>female</td>
      <td>47.0</td>
      <td>1</td>
      <td>1</td>
      <td>11751</td>
      <td>52.5542</td>
      <td>D35</td>
      <td>S</td>
    </tr>
    <tr>
      <th>872</th>
      <td>873</td>
      <td>0</td>
      <td>1</td>
      <td>Carlsson, Mr. Frans Olof</td>
      <td>male</td>
      <td>33.0</td>
      <td>0</td>
      <td>0</td>
      <td>695</td>
      <td>5.0000</td>
      <td>B51 B53 B55</td>
      <td>S</td>
    </tr>
    <tr>
      <th>873</th>
      <td>874</td>
      <td>0</td>
      <td>3</td>
      <td>Vander Cruyssen, Mr. Victor</td>
      <td>male</td>
      <td>47.0</td>
      <td>0</td>
      <td>0</td>
      <td>345765</td>
      <td>9.0000</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>874</th>
      <td>875</td>
      <td>1</td>
      <td>2</td>
      <td>Abelson, Mrs. Samuel (Hannah Wizosky)</td>
      <td>female</td>
      <td>28.0</td>
      <td>1</td>
      <td>0</td>
      <td>P/PP 3381</td>
      <td>24.0000</td>
      <td>NaN</td>
      <td>C</td>
    </tr>
    <tr>
      <th>875</th>
      <td>876</td>
      <td>1</td>
      <td>3</td>
      <td>Najib, Miss. Adele Kiamie "Jane"</td>
      <td>female</td>
      <td>15.0</td>
      <td>0</td>
      <td>0</td>
      <td>2667</td>
      <td>7.2250</td>
      <td>NaN</td>
      <td>C</td>
    </tr>
    <tr>
      <th>876</th>
      <td>877</td>
      <td>0</td>
      <td>3</td>
      <td>Gustafsson, Mr. Alfred Ossian</td>
      <td>male</td>
      <td>20.0</td>
      <td>0</td>
      <td>0</td>
      <td>7534</td>
      <td>9.8458</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>877</th>
      <td>878</td>
      <td>0</td>
      <td>3</td>
      <td>Petroff, Mr. Nedelio</td>
      <td>male</td>
      <td>19.0</td>
      <td>0</td>
      <td>0</td>
      <td>349212</td>
      <td>7.8958</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>878</th>
      <td>879</td>
      <td>0</td>
      <td>3</td>
      <td>Laleff, Mr. Kristo</td>
      <td>male</td>
      <td>NaN</td>
      <td>0</td>
      <td>0</td>
      <td>349217</td>
      <td>7.8958</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>879</th>
      <td>880</td>
      <td>1</td>
      <td>1</td>
      <td>Potter, Mrs. Thomas Jr (Lily Alexenia Wilson)</td>
      <td>female</td>
      <td>56.0</td>
      <td>0</td>
      <td>1</td>
      <td>11767</td>
      <td>83.1583</td>
      <td>C50</td>
      <td>C</td>
    </tr>
    <tr>
      <th>880</th>
      <td>881</td>
      <td>1</td>
      <td>2</td>
      <td>Shelley, Mrs. William (Imanita Parrish Hall)</td>
      <td>female</td>
      <td>25.0</td>
      <td>0</td>
      <td>1</td>
      <td>230433</td>
      <td>26.0000</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>881</th>
      <td>882</td>
      <td>0</td>
      <td>3</td>
      <td>Markun, Mr. Johann</td>
      <td>male</td>
      <td>33.0</td>
      <td>0</td>
      <td>0</td>
      <td>349257</td>
      <td>7.8958</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>882</th>
      <td>883</td>
      <td>0</td>
      <td>3</td>
      <td>Dahlberg, Miss. Gerda Ulrika</td>
      <td>female</td>
      <td>22.0</td>
      <td>0</td>
      <td>0</td>
      <td>7552</td>
      <td>10.5167</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>883</th>
      <td>884</td>
      <td>0</td>
      <td>2</td>
      <td>Banfield, Mr. Frederick James</td>
      <td>male</td>
      <td>28.0</td>
      <td>0</td>
      <td>0</td>
      <td>C.A./SOTON 34068</td>
      <td>10.5000</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>884</th>
      <td>885</td>
      <td>0</td>
      <td>3</td>
      <td>Sutehall, Mr. Henry Jr</td>
      <td>male</td>
      <td>25.0</td>
      <td>0</td>
      <td>0</td>
      <td>SOTON/OQ 392076</td>
      <td>7.0500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>885</th>
      <td>886</td>
      <td>0</td>
      <td>3</td>
      <td>Rice, Mrs. William (Margaret Norton)</td>
      <td>female</td>
      <td>39.0</td>
      <td>0</td>
      <td>5</td>
      <td>382652</td>
      <td>29.1250</td>
      <td>NaN</td>
      <td>Q</td>
    </tr>
    <tr>
      <th>886</th>
      <td>887</td>
      <td>0</td>
      <td>2</td>
      <td>Montvila, Rev. Juozas</td>
      <td>male</td>
      <td>27.0</td>
      <td>0</td>
      <td>0</td>
      <td>211536</td>
      <td>13.0000</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>887</th>
      <td>888</td>
      <td>1</td>
      <td>1</td>
      <td>Graham, Miss. Margaret Edith</td>
      <td>female</td>
      <td>19.0</td>
      <td>0</td>
      <td>0</td>
      <td>112053</td>
      <td>30.0000</td>
      <td>B42</td>
      <td>S</td>
    </tr>
    <tr>
      <th>888</th>
      <td>889</td>
      <td>0</td>
      <td>3</td>
      <td>Johnston, Miss. Catherine Helen "Carrie"</td>
      <td>female</td>
      <td>NaN</td>
      <td>1</td>
      <td>2</td>
      <td>W./C. 6607</td>
      <td>23.4500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>889</th>
      <td>890</td>
      <td>1</td>
      <td>1</td>
      <td>Behr, Mr. Karl Howell</td>
      <td>male</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>111369</td>
      <td>30.0000</td>
      <td>C148</td>
      <td>C</td>
    </tr>
    <tr>
      <th>890</th>
      <td>891</td>
      <td>0</td>
      <td>3</td>
      <td>Dooley, Mr. Patrick</td>
      <td>male</td>
      <td>32.0</td>
      <td>0</td>
      <td>0</td>
      <td>370376</td>
      <td>7.7500</td>
      <td>NaN</td>
      <td>Q</td>
    </tr>
  </tbody>
</table>
<p>891 rows × 12 columns</p>
</div>



### Data Dictionary

#### Variables Definitions
- survival	(Survival	0 = No, 1 = Yes)
- pclass	(Ticket class	1 = 1st, 2 = 2nd, 3 = 3rd)
- sex	(Sex)	
- Age	(Age in years)	
- sibsp	(# of siblings / spouses aboard the Titanic)	
- parch	(# of parents / children aboard the Titanic)	
- ticket	(Ticket number)	
- fare	(Passenger fare price)	
- cabin	(Cabin number)	
- embarked(Port of Embarkation	C = Cherbourg, Q = Queenstown, S = Southampton)

#### Note:
* pclass: A proxy for socio-economic status (SES)
      -1nd = Upper
      -2nd = Middle
      -3rd = Lower

* age: Age is fractional if less than 1.

* sibsp: number of siblings and spouse
      -Sibling = brother, sister, stepbrother, stepsister
      -Spouse = husband, wife (mistresses and fiancés were ignored)

* parch: number of parents and children 
      -Parent = mother, father
      -Child = daughter, son, stepdaughter, stepson 
      -Some children travelled only with a nanny, therefore parch=0 for them.

### Data Cleaning
---
I want to check if there is duplicated data. By using the unique(), I checked the passenger ID to see there is duplicated entries.  


```python
#check if there is duplicated data by checking passenger ID.
len(titanic_original['PassengerId'].unique())
```




    891



Looks like there are no duplicated entries based on passengers ID. We have in total 891 passengers in the dataset. However I have noticed there is a lot of missing values in 'Cabin' feature, and the 'Ticket' feature does not provide useful information for my analysis. I decided to remove them from the dataset by using drop() function

There are also some missing values in the 'Age', I can either removed them or replace them with the mean. Considering there is still a good sample size (>700 entries) after removal, I decide to remove the missing values with dropNa()


```python
#make a copy of dataset
titanic_cleaned=titanic_original.copy()
#remove ticket and cabin feature from dataset
titanic_cleaned=titanic_cleaned.drop(['Ticket','Cabin'], axis=1)
#Remove missing values. 
titanic_cleaned=titanic_cleaned.dropna()
#Check to see if the cleaning is successful
titanic_cleaned.head()
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
      <th>Fare</th>
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
      <td>7.2500</td>
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
      <td>71.2833</td>
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
      <td>7.9250</td>
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
      <td>53.1000</td>
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
      <td>8.0500</td>
      <td>S</td>
    </tr>
  </tbody>
</table>
</div>



### Data overview
---
Now with a clean dataset, I am ready to formulate my hypothesis. I want to get a general overview of statistics for the dataset first. I use the describe() function on the data set. The useful statistic to look at is the mean, which gives us a general idea what the average value is for each feature. The standard deviation provides information on the spread of the data. The min and max give me information regarding whether there are outliers in the dataset. We should be careful and take these outliers into account when analyzing our data. I also calculate the median for each column in case there are outliers. 


```python
#describe() provides a statistical overview of the dataset
titanic_cleaned.describe()
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
      <td>712.000000</td>
      <td>712.000000</td>
      <td>712.000000</td>
      <td>712.000000</td>
      <td>712.000000</td>
      <td>712.000000</td>
      <td>712.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>448.589888</td>
      <td>0.404494</td>
      <td>2.240169</td>
      <td>29.642093</td>
      <td>0.514045</td>
      <td>0.432584</td>
      <td>34.567251</td>
    </tr>
    <tr>
      <th>std</th>
      <td>258.683191</td>
      <td>0.491139</td>
      <td>0.836854</td>
      <td>14.492933</td>
      <td>0.930692</td>
      <td>0.854181</td>
      <td>52.938648</td>
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
      <td>222.750000</td>
      <td>0.000000</td>
      <td>1.000000</td>
      <td>20.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>8.050000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>445.000000</td>
      <td>0.000000</td>
      <td>2.000000</td>
      <td>28.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>15.645850</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>677.250000</td>
      <td>1.000000</td>
      <td>3.000000</td>
      <td>38.000000</td>
      <td>1.000000</td>
      <td>1.000000</td>
      <td>33.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>891.000000</td>
      <td>1.000000</td>
      <td>3.000000</td>
      <td>80.000000</td>
      <td>5.000000</td>
      <td>6.000000</td>
      <td>512.329200</td>
    </tr>
  </tbody>
</table>
</div>




```python
#calculate the median for each column
titanic_cleaned.median()
```




    PassengerId    445.00000
    Survived         0.00000
    Pclass           2.00000
    Age             28.00000
    SibSp            0.00000
    Parch            0.00000
    Fare            15.64585
    dtype: float64



Looking at the means and medians, we see that the biggest difference is between mean and median of fare price. The mean is 34.57 while the median is only 15.65. It is likely due to the presence of outliers, the wealthy individuals who could afford the best suits. For example, the highest price fare is well over 500 dollars. I also see that the lowest fare price is 0, I suspect that those are the ship crews. 

Now let's study the distribution of variables of interest. The countplot() from seaborn library plots a barplot that shows the counts of the variables. Let's take a look at our dependent variable - "Survived"


```python
#I am using seaborn.countplot() to count and show the distribution of a single variable
sns.set(style="darkgrid")

ax = sns.countplot(x="Survived", data=titanic_cleaned)
plt.title("Distribution of Survival, (1 = Survived)")

```




    <matplotlib.text.Text at 0x110e6f850>




![png](/images/Titanic_Investigation_files/Titanic_Investigation_13_1.png)


We see that there were 342 passengers survived the disaster or around 38% of the sample.

Now, we also want to look at the distribution of some of other data including gender, socioeconomic class, age, and fare price. Gender, socioeconomic class, age are all categorical data, and barplot is best suited to show their count distribution. Fare price is a continuous variable, and a frequency distribution plot is used to study it. 


```python
#plt.figure() allows me to specify the size of the graph. 
#using fig.add_subplot allows me to display two subplots side by side
fig = plt.figure(figsize=(10,5)) 

ax1 = fig.add_subplot(121)
ax1=sns.countplot(x="Sex", data=titanic_cleaned)
plt.title("Distribution of Gender")

fig.add_subplot(122)
ax2 = sns.countplot(x="Pclass", data=titanic_cleaned)
plt.title('Distributrion of Class (1.high 2.mid 3.low)')
```




    <matplotlib.text.Text at 0x1143c6fd0>




![png](/images/Titanic_Investigation_files/Titanic_Investigation_15_1.png)


It is now a good idea to combine the two graph to see how is gender and socioeconomic class intertwined. We see that among men, there is a much higher number of lower socioeconomic class individuals compared to women. For middle and upper class, the number of men and women are very similar. It is likely that families made up of the majority middle and upper-class passengers, while the lower class passengers are mostly single men.  




```python
#By using hue argument, we can study the another variable, combine with our original variable
sns.countplot(x='Sex', hue='Pclass', data=titanic_cleaned)
plt.title('Gender and Socioeconomic class (1=high, 2=mid, 3=low)')
```




    <matplotlib.text.Text at 0x114542a90>




![png](/images/Titanic_Investigation_files/Titanic_Investigation_17_1.png)


Fare price is a continuous variable, and for this type of variable, we use seaborn.distplot() to study its frequency distribution. 

In comparison, age is a discrete variable and can be plotted by seaborn.countplot() which plots a bar plot that shows the counts.

We align the two plots horizontal using add_subplot to better demonstrate this difference.


```python
#Use fig to store plot dimension
#use add_subplot to display two plots side by side
fig = plt.figure(figsize=(10,5)) 

ax1 = fig.add_subplot(121)
sns.distplot(titanic_cleaned.Fare)
plt.title('Distribution of fare price')

axe2=fig.add_subplot(122)
sns.countplot(titanic_cleaned.Age)
plt.title('Distribution of age')
```




    <matplotlib.text.Text at 0x1147c04d0>




![png](/images/Titanic_Investigation_files/Titanic_Investigation_19_1.png)


We can see that the shape of two plots is quite different. 
* The fare price distribution plot shows a positively skewed curve, as most of the prices are concentrated below 30 dollars, and highest prices are well over 500 dollars
* The age distribution plot demonstrates more of a bell-shaped curve (Gaussian distribution) with a slight mode for infants and young children. I suspect the slight spike for infants and young children to due to the presence of young families.

### Observations on the dataset
---
1. 342 passengers or roughly 38% of total survived.
2. There were significantly more men than women on board.
3. There are significantly higher numbers of lower class passengers compared to the mid and upper class.
4. The majority of fares sold are below 30 dollars, however, the upper price range of fare is very high, the most expensive ones are over 500 dollars, which should be considered outliers. 

### Hypothesis
---
Based on the overview of the data, I formulated 3 potential features that may have influenced the survival.
1. Fare price: What is the effect of fare price on survival rate? Are passengers who could afford more expensive tickets more likely to survive?
2. Gender: Does gender plays a role in survival? Are women more likely to survive than men?
3. Age: What age groups of the passengers are more likely to survive? 


### Fare Price and survival 
---
Let's investigate fare price a bit deeper. First I am interested in looking at its relationship with socioeconomic class. Considering the large range of fare price, we use boxplot to better demonstrate the spread and confidence intervals of the data. The strip plot is used to show the density of data points, and more importantly the outliers.


```python
#multiple plots can be overlayed. Boxplot() and striplot() turned out to be a good combination
sns.boxplot(x="Pclass", y="Fare", data=titanic_cleaned)
sns.stripplot(x="Pclass", y="Fare", data=titanic_cleaned, color=".25")
plt.title('Class and fare price')
```




    <matplotlib.text.Text at 0x114d21b90>




![png](/images/Titanic_Investigation_files/Titanic_Investigation_24_1.png)


This is not surprising that the outliers existed exclusively in the high socioeconomic class group, as only the wealthy individuals can afford the higher fare price. 

This is clear that the upper class were able to afford more expensive fares, with highest fares above 500 dollars.
To look at the survival rate, I break down the fare data into two groups:
1. Passengers with fare <=35 dollars
2. passengers with fare >35 dollars


```python
#make a copy of the dataset and named it titanic_fare
#copy is used instead of assigning is to perserve the dataset in case anything goes wrong
#add a new column stating whether the fare >35 (value=1) or <=35 dollars (value=0)

titanic_fare = titanic_cleaned.copy()
titanic_fare['Fare>35'] = np.where(titanic_cleaned['Fare']>35,1,0)

#check to see if the column creation is succesful
titanic_fare.head()

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
      <th>Fare</th>
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
      <td>7.2500</td>
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
      <td>71.2833</td>
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
      <td>7.9250</td>
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
      <td>53.1000</td>
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
      <td>8.0500</td>
      <td>S</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Calculate the survival rate for passenger who holds fare > $35. 
#float() was used to forced a decimal result due to the limitation of python 2

high_fare_survival=titanic_fare.loc[(titanic_fare['Survived'] == 1)&(titanic_fare['Fare>35']==1)]

high_fare_holder=titanic_fare.loc[(titanic_fare['Fare>35']==1)]

high_fare_survival_rate=len(high_fare_survival)/float(len(high_fare_holder))

print high_fare_survival_rate
```

    0.641176470588



```python
#Calculate the survival rate for passenger who holds fare <= $35. 

low_fare_survival=titanic_fare.loc[(titanic_fare['Survived'] == 1)&(titanic_fare['Fare>35']==0)]

low_fare_holder=titanic_fare.loc[(titanic_fare['Fare>35']==0)]

low_fare_survival_rate=len(low_fare_survival)/float(len(low_fare_holder))

print low_fare_survival_rate
```

    0.330258302583



```python
#plot a barplot for survival rate for fare price > $35 and <= $35

fare_survival_table=pd.DataFrame({'Fare Price':pd.Categorical(['<=$35','>$35']),
                                 'Survival Rate':pd.Series([0.32,0.62], dtype='float64')
                                 })
bar=fare_survival_table.plot(kind='bar', x='Fare Price', rot=0)
plt.ylabel('Survival Rate')
plt.xlabel('Fare Price')
plt.title('Fare price and survival rate')
```




    <matplotlib.text.Text at 0x114ee1810>




![png](/images/Titanic_Investigation_files/Titanic_Investigation_30_1.png)


The bar plot using matplotlib.pyplot does a reasonable job of showing the difference in survival rate between the two groups. 

However with seaborn.barplot(), confidence intervals are directly calculated and displayed.


```python
#seaborn.barplot() can directly calculate/display the survival rate and confidence interval from the dataset

sns.barplot(x='Fare>35',y='Survived',data=titanic_fare, palette="Blues_d")
plt.title('Fare price and survival rate')
```




    <matplotlib.text.Text at 0x114fb3390>




![png](/images/Titanic_Investigation_files/Titanic_Investigation_32_1.png)


As seen from the graph, taking into account of confidence intervals, higher fare group is associated with significantly higher survival rate (~0.62) compared to lower fare group (~0.31). 

How about if we just look at fare price as the continuous variable in relation to survival outcome?

Seaborn.lmplot() allows us to graph the logistic regression function using fare price as an estimator for survival, the function displays a sigmoid shape and higher fare price is indeed associated with the better chance of survival. 

Note: the area around the line shows the confidence interval of the function.


```python
#use seaborn.lmplot to graph the logistic regression function
sns.lmplot(x="Fare", y="Survived", data=titanic_fare,
           logistic=True, y_jitter=.03)
plt.title('Logistic regression using fare price as estimator for survival outcome')
```




    <matplotlib.text.Text at 0x114a29190>




![png](/images/Titanic_Investigation_files/Titanic_Investigation_34_1.png)



### Gender and/images/ Survival 
---
For this section, I am interested in investigation gender and survival rate. I will first calculate the survival rate for both female and male. Then plot a few graphs to visualize the relationship between gender and survival, and combine with other factors such as fare price and socioeconomic class. 


```python
#Calculate the survival rate for female
female_survived=titanic_fare.loc[(titanic_cleaned['Survived'] == 1)&(titanic_cleaned['Sex']=='female')]

female_total=titanic_fare.loc[(titanic_cleaned['Sex']=='female')]

female_survival_rate=len(female_survived)/(len(female_total)*1.00)

print female_survival_rate
```

    0.752895752896



```python
#Calculate the survival rate for male
male_survived=titanic_fare.loc[(titanic_cleaned['Survived'] == 1)&(titanic_cleaned['Sex']=='male')]

male_total=titanic_fare.loc[(titanic_cleaned['Sex']=='male')]

male_survival_rate=len(male_survived)/(len(male_total)*1.00)

print male_survival_rate
```

    0.205298013245



```python
#plot a barplot for survival rate for female and male
#we can see that seaborn.barplot 
sns.barplot(x='Sex',y='Survived',data=titanic_fare)
plt.title('Gender and survival rate')
```




    <matplotlib.text.Text at 0x115804d50>




![png](/images/Titanic_Investigation_files/Titanic_Investigation_38_1.png)



```python
##plot a barplot for survival rate for female and male, combine with fare price group
sns.barplot(x='Sex',y='Survived', hue='Fare>35',data=titanic_fare)
plt.title('Gender and survival rate')
```




    <matplotlib.text.Text at 0x1159a15d0>




![png](/images/Titanic_Investigation_files/Titanic_Investigation_39_1.png)



```python
#plot a barplot for survival rate for female and male, combine with socioeconomic class
sns.barplot(x='Sex',y='Survived', hue='Pclass',data=titanic_fare)
plt.title('Socioeconomic class and survival rate')
```




    <matplotlib.text.Text at 0x115b20a50>




![png](/images/Titanic_Investigation_files/Titanic_Investigation_40_1.png)


Therefore, being a female is associated with significantly higher survival rate compared to male. 

In addition, being in the higher socioeconomic group and higher fare group are associated with a higher survival rate in both male and female. 

The difference is that in the male the survival rates are similar for class 2 and 3 with class 1 being much higher, while in the female the survival rates are similar for class 1 and 2 with class 3 being much lower.

### Age and Survival
---

To study the relationship between age and survival rate. First, I seperate age into 6 groups number from 1 to 6:
    1. newborn to 10 years old 
    2. 10 to 20 years old 
    3. 20 to 30 years old 
    4. 30 to 40 years old 
    5. 40 to 50 years old
    6. over 50 years old 
Then, I added the age group number as a new column to the dataset. 


```python
#create a age_group function
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

#create a series of age group number by applying the age_group function to age column
ageGroup_column = titanic_fare['Age'].apply(age_group)

#make a copy of titanic_fare and name it titanic_age
titanic_age=titanic_fare.copy()

#add age group column
titanic_age['Age Group'] = ageGroup_column

#check to see if age group column was added properly
titanic_age.head()
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
      <th>Fare</th>
      <th>Embarked</th>
      <th>Fare&gt;35</th>
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
      <td>7.2500</td>
      <td>S</td>
      <td>0</td>
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
      <td>71.2833</td>
      <td>C</td>
      <td>1</td>
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
      <td>7.9250</td>
      <td>S</td>
      <td>0</td>
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
      <td>53.1000</td>
      <td>S</td>
      <td>1</td>
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
      <td>8.0500</td>
      <td>S</td>
      <td>0</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
</div>



Now, we want to plot a bar graph showing the relationship between age group and survival rate. Age group is used here instead of age because visually age group is easier to observe than using age variable when dealing with survival rate. 


```python
#Seaborn.barplot is used to plot a bargraph and confidence intervals for survival rate
sns.barplot(x='Age Group', y='Survived',data=titanic_age)
plt.title('Age group and survival rate')
```




    <matplotlib.text.Text at 0x115cd0150>




![png](/images/Titanic_Investigation_files/Titanic_Investigation_46_1.png)



```python
#draw bargram and bring additional factors including gender and class
fig = plt.figure(figsize=(10,5)) 

ax1 = fig.add_subplot(121)
sns.barplot(x='Age Group', y='Survived', hue='Sex',data=titanic_age)
plt.title('Age group, gender and survival rate')

ax1 = fig.add_subplot(122)
sns.barplot(x='Age Group', y='Survived',hue='Pclass',data=titanic_age)
plt.title('Age group, class and survival rate')
```




    <matplotlib.text.Text at 0x116028b50>




![png](/images/Titanic_Investigation_files/Titanic_Investigation_47_1.png)


- Age Group 1: < 10
- Age Group 2: >= 10 and < 20 
- Age Group 3: >= 20 and < 30
- Age Group 4: >= 30 and < 40
- Age Group 5: >= 40 and < 50
- Age Group 6: >= 50  


The bar graphs demonstrate that only age group 1 (infants/young children) is associated with significantly higher survival rate. There are no clear distinctions on survival rate between the rest of age groups.

How about using age instead of age group. Is there a linear relationship between age and survival outcome? By using seaborn.lmplot(), We can perform a logistic regression on survival outcome using age as an estimator. Let's take a look. 


```python
#use seaborn.lmplot to graph the logistic regression function
sns.lmplot(x="Age", y="Survived", data=titanic_age,
           logistic=True, y_jitter=.03)
plt.title('Logistic regression using age as the estimator for survival outcome')
```




    <matplotlib.text.Text at 0x1162dcfd0>




![png](/images/Titanic_Investigation_files/Titanic_Investigation_50_1.png)


From the graph, we can see there is a negative linear relationship between age and survival outcome.

### Limitations 
---
There are limitations on our analysis:
1. Missing values: due to too much missing values(688) for the cabin. I decided to remove this column from my analysis. However, the 178 missing values for age data posed problems for us. In my analysis, I decided to drop the missing values because I felt we still had a reasonable sample size of >700, but selection bias definitely increased as the sample size decreased. Another option could be using the mean of existing age data to fill in for the missing values, this approach could be a good option if we had lots of missing value and still wants to incorporate age variable into our analysis. In this case, bias also increases as we are making assumptions for the passengers with missing age.

2. Survival bias: the data was partially collected from survivors of the disaster, and there could be a lot of data that were missing for people who did not survive. This leads the dataset becomes more representative toward the survivors. This limitation is difficult to overcome, as data we have today is the best of what we could gather due to the disaster has been happened over 100 years ago. 

3. Outliers: for the fare price analysis, we saw that the fare prices had a large difference between mean(34.57) and median(15.65). The highest fares were well over 500 dollars. As a result, the distribution of our fare prices distribution is very positive skewed. This can affect the validity and the accuracy of our analysis. However, because I really wanted to see the survival outcome for the wealthier individuals, I decided to incorporate those outliers into my analysis. An alternative approach is to drop the outliers (e.g. fare prices >500) from our analysis, especially if we are only interested in studying the majority of the sample. 


```python
# using the apply function and lambda to count missing values for each column

print titanic_original.apply(lambda x: sum(x.isnull().values), axis = 0) 
```

    PassengerId      0
    Survived         0
    Pclass           0
    Name             0
    Sex              0
    Age            177
    SibSp            0
    Parch            0
    Ticket           0
    Fare             0
    Cabin          687
    Embarked         2
    dtype: int64


The table shows the number of missing data in the data set, which is an important factor when considering the limitations of the analysis.

### Conclusion
---
In conclusion, the dataset on Titanic's 891 passengers provided valuable insights for us. Through data analysis and visualizations, we saw that factors such as being in a higher socioeconomic class, higher fare price, being a female, being a young child/infant were all associated with significantly higher survival rate.

However, the missing values, survivor bias, and outliers introduced bias and affected the validity and accuracy of our study. For future studies, if we can incorporate several datasets of disasters that are similar to Titanic into one large dataset, it may allow us to gain additional insights on what features separate survivors and non-survivors, and possibly allow us to make predictions on disaster survival outcomes. 

### References
---

"RMS Titanic", 2017, Wikipedia, from https://en.wikipedia.org/wiki/RMS_Titanic

"Titanic: Machine Learning from Disaster", 2017, Kaggle, from https://www.kaggle.com/c/titanic
