# Todo App

A full-stack Todo application that helps users organise and manage their daily tasks efficiently.  
Users can add, update, delete, and mark tasks as completed, ensuring better productivity and task management.

---

## Website link

[Todo App](https://todo-app-project-submission.netlify.app/)

---

## Tech Used 

### Frontend

- React
- Axios
- Tailwind CSS
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## How Frontend and Backend works

<p>
Frontend is built using React, where Axios has played an important role to send HTTP request (GET, POST, PUT, DELETE).
</p>

<p>
and backend is built using Node.js and Express.js to give server response back to client according to client request.
</p>

<p>
where MongoDB is used as database where all data is stored in the form of BSON.
</p>

---

## API overview

- **GET:** https://todo-server-bfjv.onrender.com/todos  
- **POST:** https://todo-server-bfjv.onrender.com/todos/addtask  
- **PUT:** https://todo-server-bfjv.onrender.com/todos/updatetask/:id  
- **DELETE:** https://todo-server-bfjv.onrender.com/todos/deletetask/:id  

---

## Challenges Faced

- CORS errors which has been fixed by online documentations  
- connecting both frontend and backend  

---

## How Setup is Done

### Node initialization

```bash
    npm init
```
### installing nodemon 
```bash
    npm install nodemon
```
### installing  express
```bash
    npm install express
```
### installing mongoDb
```bash
    npm install mongodb
```
### installing mongoose
```bash
    npm install mongoose
```
### installing dotenv
```bash
    npm install dotenv
```
### installing axios
``` bash 
    npm install axios
```
### installing tailwind 
``` bash 
    npm install tailwindcss @tailwindcss/vite
```
### installing react-icons
```bash
    npm install react-icons --save
```
## Direct Setup

### cloning project
```bash
    git clone https://github.com/AdityaBadgujar85/Todo.git
```
### Starting App
```bash
    cd Todo
    npm i
    npm run dev
```
### Starting Server
```bash
    cd server
    npm i
    npm run dev
```
