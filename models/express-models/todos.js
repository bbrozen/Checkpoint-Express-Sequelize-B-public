let tasks = {}; //

/*
  tasks (defined above) will be a place to store tasks by person;
  example:
  {
    person1: [{task object 1}, {task object 2}, etc.],
    person2: [{task object 1}, {task object 2}, etc.],
    etc.
  }
*/

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },

  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all people for whom tasks exist
    let taskNamesArr = [];
    for (let key in tasks){
        taskNamesArr.push(key);
    }
    return taskNamesArr;
  },

  add: function (name, task) {
    // saves a task for a given person
    if (!tasks[name]){
      tasks[name] = [];
    }

    if (!task.hasOwnProperty('complete')){
      task.complete = false;
    }

    tasks[name].push(task);
  },

  list: function (name) {
    // returns tasks for specified person
    return tasks[name];
  },

  complete: function (name, idx) {
    // marks a task complete
    const taskObj = tasks[name][idx];
    taskObj.complete = true;
    
  },

  remove: function (name, idx) {
    // removes a tasks
    tasks[name].splice(idx, 1);
  },
};
