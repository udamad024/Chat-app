# MERN Stack Project: Build and Deploy a Real Time Chat App | JWT, Socket.io

![Demo App](https://i.ibb.co/fXmZdnz/Screenshot-10.png)

[Video Tutorial on Youtube](https://youtu.be/HwCqsOis894)

You might have to install node if the below install command does not work. 

1. Install Node.js and npm
Download Node.js:

Go to the official Node.js download page.

https://nodejs.org/en

Download the latest LTS (Long Term Support) version for Windows.

Install Node.js:

Run the installer.
Follow the installation prompts and ensure that you check the box to add Node.js to your system PATH.

### Install all the required packages 

npm install express dotenv cookie-parser bcryptjs mongoose socket.io jsonwebtoken

### Setup .env file

```js
PORT=...
MONGO_DB_URI=...
JWT_SECRET=...
NODE_ENV=...
```

### Build the app

```shell
npm run build
```

### Start the app

```shell
npm start
```
