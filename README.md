# PATSystem

This is system of PAT.

**To run this project:**
```
git clone git@github.com:rukesh-shrestha/PATSystem.git
``` 
or       
```
git clone https://github.com/rukesh-shrestha/PATSystem.git
```

go to the folder and run below command
```
npm install
```

Create the .env file in the root directory

**Populate the file with**

-   PORT = 3000
  
-   CONNECTION_MONGO_STRING = REPLACE WITH YOUR MONGODB-DATABASE-CONNECTION-STRING
  
-   GOOGLE_CLIENT_ID = REPLACE WITH YOUR GOOGLE-CLIENT-ID
  
-   GOOGLE_CLIENT_SECRET = REPLACE WITH YOUR GOOGLE-SECRET-KEY
  
-   SESSION_SECRET_KEY = REPLACE WITH YOUR SESSION-SECRET-KEY

-   EMAIL_HOST = smtp.gmail.com

-   EMAIL_AUTH_USER = REPLACE WITH YOUR Email Address of user

-   EMAIL_AUTH_PASSWORD = REPLACE WITH YOUR Email Password

-   EMAIL_PORT = 465

Run the below command
```
npm run dev
```


**Remaining To add in Readme**

**END Point**

  
</ul>
1. User Home

  <domain-name>/api/users :- GET
      
2. User Sign In
   
<domain-name>/api/users/registration/auth/google :-GET

  
4. User Sign Out
   
 <domain-name>/api/users/logout
