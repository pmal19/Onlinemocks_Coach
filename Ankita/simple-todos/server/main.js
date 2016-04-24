import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('tasks', function tasksPublication() {

  	
    return Tasks.find();

  });

  
  	Meteor.publish('list', function msgsPublication() {
  	
    return Meteor.users.find();

  });

  	Meteor.publish('msgs', function (person) {
		
	    return Messages.find({
			
			$or:[
			
			{owner: this.userId ,
			receiver: person},

			{owner: person,
			receiver: this.userId}
			
			]	

		});
	});

});
