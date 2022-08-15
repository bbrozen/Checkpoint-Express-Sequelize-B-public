const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: Sequelize.DATE,
});

const Owner = db.define('Owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Task.clearCompleted = async function(){
 await Task.destroy({
  where:{
    complete: true
  }
 });
}

Task.completeAll = async function(){
  await Task.update({complete: true}, {
      where: {
        complete: false
      }
  });
}

Task.prototype.getTimeRemaining = function(){
  if (!this.due){
    return Infinity;
  }
  return this.due-Date.now();
}

Task.prototype.isOverdue = function(){
  if(this.complete === true && this.due - Date.now() < 0){
    return false;
  }

  if (this.due - Date.now() < 0){
    return true;
  }
  return false;
}

Task.belongsTo(Owner);
Owner.hasMany(Task);

Task.prototype.assignOwner = function(owner){
  return this.setOwner(owner);
}

Owner.getOwnersAndTasks = function(){
  return Owner.findAll({
    include: {
      model: Task,
    },
  });
}

Owner.prototype.getIncompleteTasks = function(){
  return Task.findAll({
    where:{
      complete: {
        [Sequelize.Op.not]: true
      },
    },
    include: {
      model: Owner,
      where: {
        name: this.name
      },
    },
    
  });
}

//---------^^^---------  your code above  ---------^^^----------

module.exports = {
  Task,
  Owner,
};
