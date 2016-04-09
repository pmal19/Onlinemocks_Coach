Tasks = new Mongo.Collection("tasks");
Messages= new Mongo.Collection("messages");
var name1;
Tasks.allow({
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
Meteor.publish("display_messages",function(variable1){
  console.log(variable1);
  name1=variable1;
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
  mere_messages:function(text)
  {Messages.insert({
    text:text ,
    createdAt: new Date(),
    owner:Meteor.userId(),
    username:Meteor.user().username,
    second:name1
    });
}
  });