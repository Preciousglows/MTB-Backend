require ('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const reminders = require('./routes/reminders');

//app config
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes
const generateTasks = (numberOfTasks, times) => {
    const tasks = [];
    for (let i = 0; i < numberOfTasks; i++) {
      const task = {
        id: i + 1, // simple incrementing id
        description: `Task ${i + 1}`, // placeholder description
        time: times[Math.floor(Math.random() * times.length)], // random time from the times array
        completed: false // default to incomplete
      };
      tasks.push(task);
    }
    return tasks;
  };

  app.get('/api/tasks/:date', (req, res) => {
    const date = req.params.date;
    const numberOfTasks = req.query.numberOfTasks; // Retrieve from user preferences
    const times = req.query.times; // Retrieve from user preferences
  
    const tasks = generateTasks(numberOfTasks, times);
  
    res.json(tasks); 
  });

app.use('/api/user', userRoutes);


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })