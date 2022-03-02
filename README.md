# React / Express basic auth

Boilerplate for basic authentification for React with Express backend.

## Install packages

### Update all dependencies

Run `npx npm-check-updates -u && cd client && npx npm-check-updates -u` from the root folder to update all packages.

### Install all the dependencies

Run `npm install && cd client && npm install` from the root folder.

## Run the app

Run `npm run dev` in the root folder, and `npm start` in the `client` folder.

## .env file

Create a `.env` file in the root folder, and add this:

```
PORT=5005
ORIGIN=http://localhost:3000

MONGODB_URI=mongodb://localhost/name-of-your-app

EMAIL=your-email@gmail.com
WORD=YourPasswordForGmail
```
