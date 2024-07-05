const express = require('express');
const { loginUser, signupUser } = require('../controllers/userController');
const tasks = require('../tasks');

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);

//get all tasks
router.get('/tasks', (req, res) => {
    res.json(tasks);
})
//update task
router.put('/tasks/:id', (req, res) => {
    const { id } = req.params
    const { completed } = req.body
    tasks = tasks.map((task) => {
        if (task.id == id) {
            return { ...task, completed }
        } else{
            return task
        }
    })

    res.json({message: 'task updated'})
})



module.exports = router