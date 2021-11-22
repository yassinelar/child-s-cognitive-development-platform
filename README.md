# child-s-cognitive-development-platform

Platform link:
-
https://guarded-caverns-95243.herokuapp.com/

![image](https://user-images.githubusercontent.com/71329302/142848982-9eec26f7-cf1d-4554-9430-84e1617cb93a.png)

Create an account to have access to the home page and the different tests

![account](https://user-images.githubusercontent.com/71329302/142849586-709af88c-3bae-4ae6-a91c-af8fc5ce29a1.JPG)


NodeJS
-
Link to download NodeJS:   https://nodejs.org/en/

Command ```npm install``` to install the different packages (express, body-parser...)

Command ```node app.js``` to launch server


App.js
-
Before each test (fileName: Game), the user has the possibility to try some example (fileName: trainingGameName). 

The order and the examples can be modified in the file "app.js" 

Variables "testName" show if the test has already been done or not

To add another game and store the relative data, you should create a new mongoose.Schema (or use an existing schema if it's the same schema as one of the other test)


DATABASE (MongoDB):
-
All data are stored using MongoDB Atlas
1. Create a new account on https://account.mongodb.com/account/register

2. Create a new cluster 

In our project we used:

* AWS and N.Virgina as Cloud provider & Region 
* M0 as a cluster Tier

3. Add a new MongoDB user (Atlas admin)

4. IP whitelist Allow access from anywhere

5. Once the cluster has been set up:

* Connect to the cluster
* Connect to the mongo Shell (1: download it    2: select version)
* Copy the url "mongodb+srv://username:password@cluster0.5smrs.mongodb.net/databasename" and replace username, password, databasename by your own ones
--> This link will be used in the app.js (mongoose.connect("link", {useNewUrlParser: true, useUnifiedTopology: true});)

6. To create the database click on collections --> create database


DEPLOYMENT (Heroku):
-
The website is deployed using heroku

1. Create a new account on https://signup.heroku.com/login
2. Install heroku and start using the heroku command from your command shell  --> "Heroku Node.js Documentation"  https://devcenter.heroku.com/articles/getting-started-with-nodejs
