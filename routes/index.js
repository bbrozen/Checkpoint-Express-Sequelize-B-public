const express = require('express');
const router = express.Router();
const todos = require('../models/express-models/todos');
module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.


router.get("/users",  (req, res, next) => {
    try {
      const list =  todos.listPeople();
      res.type('json');
      res.send(list);
    } catch (error) {
      next(error);
    }
});

router.get("/users/:name/tasks",  (req, res, next) => {
  try {
    const list = todos.listPeople();
    if (!list.includes(req.params.name)){
      res.status(404).send('error');
    }

    const tasks = todos.list(req.params.name);

    res.type('json').send(tasks);
  } catch (error) {
    next(error);
  }
});

router.post("/users/:name/tasks", (req, res, next) =>{
  try {

    if(Object.values(req.body)[0] === ''){
      res.status(400).send('error');
    }

    todos.add(req.params.name, req.body);
    let newTask = todos.list(req.params.name);
    res.status(201).type('json').send(newTask[newTask.length -1]);
  } catch (error) {
    next(error);
  }
});

router.put("/users/:name/tasks/:index", (req, res) =>{
  const name = req.params.name;
  const idx = req.params.index;
  todos.complete(name, idx);
  res.status(200).send();
})

router.delete("/users/:name/tasks/:index", (req, res) =>{
  const name = req.params.name;
  const idx = req.params.index;
  todos.remove(name, idx);
  res.status(204).send();
})

