const express = require('express');
const router = express.Router();

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

  router.get('/api/tasks/:date', (req, res) => {
    const date = req.params.date;
    const numberOfTasks = req.query.numberOfTasks; // Retrieve from user preferences
    const times = req.query.times; // Retrieve from user preferences
  
    const tasks = generateTasks(numberOfTasks, times);
  
    res.json(tasks); 
  });

  module.exports = router