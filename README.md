# Budgetify
A Budget Manager Application
Budgetify provides very easy to use Interface for people to track where there money is being spent it and track their monthly expenses with ease and its also a PWA so people can download it to their desktop and just use it directly from their directly.
## Technologied Used
Mongo DB, Mongoose, Javascript, React, Redux, Service Workers.

## To Run Application 
1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

    - Next Create Cluster and Project Name.
    - New Application
    - Connect from App then Create Admin Username & Password.
    - Copy Connection string and save it in following format under path ./config/default.json
    ```json
    {
    "mongoURI": "mongodb+srv://Username:Passowrd/test",
    "jwtSecret": "D1lM4ng3@m0r3"
    }
    ```

2. Clone App and cd into it.
```bash
# Install dependencies from package.json
$ npm install 
# Make sure to save connection string to default.json, following to start server
$ node server 
# Install dependencies to install client
$ npm install -prefix client
# Start Client
$ npm start -prefix client
```