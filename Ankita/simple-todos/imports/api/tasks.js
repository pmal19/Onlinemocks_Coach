
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Messages = new Mongo.Collection('msgs'); 

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {

  // This code only runs on the server

  Meteor.publish('tasks', function tasksPublication() {

  	return Tasks.find();

  });
  
  	Meteor.publish('msgs', function (variable1) {
  	
    return Messages.find({
		
		$or:[
		////////////////////////////////		
		{owner: this.userId ,
		second: variable1//Session.get("variable1")
		},
		{owner: variable1//Session.get("variable1") 
		,
		second: this.userId}
		//{owner: variable1,second: this.userId}
		////////////////////////////
		]	

	});

  });

  	Meteor.publish('list', function () {
  	
    return Meteor.users.find();

  });

}