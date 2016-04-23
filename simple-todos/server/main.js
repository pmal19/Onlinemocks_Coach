Messages1= new Mongo.Collection("messages");
import { Meteor } from 'meteor/meteor';
var name1;
Meteor.startup(() => {
  // code to run on server at startup
});
//Tasks = new Mongo.Collection("tasks");
 
 Meteor.publish("users",function(){
 	console.log("this->");
 	return Meteor.users.find({});
 });

Messages1.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.owner === userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.owner === userId;
  },
  fetch: ['owner']
});

 Meteor.methods({
	addTask: function (text,second_person) {
    // Make sure the user is logged in before inserting a task
	if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
	
    Messages1.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
	  second: second_person//instance.state.get("variable1")//Session.get("variable1")//variable1
	  //,
	  //second: $('[owner="_id"]').val()
    });
  }
});
  
 Meteor.publish("display_messages",function(variable1){
  console.log(variable1);
  return Messages1.find({
    $or:[
    {
    owner: this.userId,
    second: variable1},
    {owner: variable1 ,
    second: this.userId}
    ]   
    });
});
  
