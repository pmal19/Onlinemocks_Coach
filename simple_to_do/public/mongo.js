Tasks = new Mongo.Collection("tasks");
Messages= new Mongo.Collection("messages");
//var variable1;
Tasks.allow({
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
Messages.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return (userId && doc.owner === userId);
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
  Meteor.publish("tasks1",function(){
 return Tasks.find({
   owner: this.userId   
 });
});
Meteor.publish("display_user",function(){
 return Meteor.users.find(); 
});
Meteor.publish("display_messages",function(){
  console.log(variable1);
  return Messages.find({
    $or:[
    {
    owner: this.userId,
    second: variable1},
    {owner: variable1 ,
    second: this.userId}
    ]   
    });
});
Meteor.methods({
  second_user: function(uniqueid){

    variable1=uniqueid;
    console.log(variable1);
  }
});