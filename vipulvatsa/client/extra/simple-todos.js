

Tasks = new Mongo.Collection("tasks");
 if (Meteor.isServer) 
 {
	 Meteor.publish("tasks", function () {
    return Tasks.find({
      $or: [
        { priv: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });
  
	Meteor.methods({
	
	deletedb: function () {
console.log('on server, getCurrentTime called');
Tasks.remove({});
return new Date();
}

}); 
 }
if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("tasks");
  Template.body.helpers({
    tasks: function () {
      if (Session.get("hey")) {
        // If hide completed is checked, filter tasks
        return Tasks.find({tick_button: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        // Otherwise, return all of the tasks
        return Tasks.find({}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
      return Session.get("hey");
    }
  });
	
Template.body.events({
    "submit .new_task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var text = event.target.text.value;
	console.log(text);
      
	  // Insert a task into the collection
	  Meteor.call("addTask", text);
	  
      // Clear form
      event.target.text.value = "";
    },
	"change .hide-completed input": function (event) {
      Session.set("hey", event.target.checked);
    }
  });
  
  
  Template.body.events({
    "click .js-delete": function () {
		
		Meteor.call('deletedb');
		
		/*
		var temp = Tasks.find({});
		
		temp.forEach(myFunction);
		function myFunction(item)
		{
			Tasks.remove(item._id);
		}
		*/
      
    }
	
  });
  Template.task.helpers({
    isOwner: function () {
      return this.owner === Meteor.userId();
    }
  });
  Template.task.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
	  Meteor.call("setChecked", this._id, ! this.checked);
    },
    "click .delete": function () {
     Meteor.call("deleteTask",this._id);
    },
	"click .toggle-private": function () {
      Meteor.call("setPrivate", this._id, ! this.priv);
    }
  });
  
  Accounts.ui.config({
	  passwordSignupFields: "USERNAME_ONLY"
  });
  
}

 
Meteor.methods({
  addTask: function (text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Tasks.insert({
      abc: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteTask: function (taskId) {
	  var task = Tasks.findOne(taskId);
    if (task.priv && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error("not-authorized");
    }
    Tasks.remove(taskId);
  },
  setChecked: function (taskId, setChecked) {
	  var task = Tasks.findOne(taskId);
    if (task.priv && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error("not-authorized");
    }
    Tasks.update(taskId, { $set: { tick_button: setChecked} });
  },
  setPrivate: function (taskId, setToPrivate) {
    var task = Tasks.findOne(taskId);//the person who intends to change has identity defined by taskId
 
    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) { ////Meteor.userId() function refers to the current user. And then we check whether they are same or not
      throw new Meteor.Error("not-authorized");
    }
 
    Tasks.update(taskId, { $set: { priv: setToPrivate } });
  }
});

