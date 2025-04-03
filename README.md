# SecureLogin
Secure User Authentication with Email OTP verification

## Documentation
[API Documentation on Postman](https://www.postman.com/satellite-astronomer-50638594/assingments/collection/5gyy1ps/secure-login-system?action=share&creator=26661759)

## Installation and Setup
 - Clone the repository
 ```bash
 git clone https://github.com/techux/SecureLogin
```
- Go to project directory and install the dependencies
```bash
cd SecureLogin
npm install
```
- Create a new file named `.env` in the root directory and add the following environment variables or rename `.sample.env` to `.env` and fill values

```bash
PORT = 8080

# Local server or MongoDB Atlas
MONGODB_STRING = "mongodb://localhost:27017/SecureLogin" 

JWT_SECRET_KEY = "DeveshSingh"

# ================================ MAIL SERVER CONFIGURATION ===============
SMTP_SERVER = "smtp.server.com"
SMTP_PORT = 587
SMTP_USERNAME = "username"
SMTP_PASSWORD = "password"
SMTP_MAIL_FROM = "admin@mail.com"

```

- Start the development server
```bash
npm run dev
```

## Thank you
[Devesh Singh](https://github.com/techux)