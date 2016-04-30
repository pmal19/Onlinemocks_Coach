Messages = new Mongo.Collection("messages");

var second_person;

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



Meteor.publish("display_messages",function(variable1){
  console.log(variable1);
  second_person = variable1;
  return Messages.find({
    $or:[
          {
            
            owner: this.userId,
            second: variable1
          },
          {
            owner: variable1 ,
            second: this.userId
          }
        ]   
  });
});

  
Meteor.publish("users",function(){
 return Meteor.users.find(); 
});

Meteor.methods({
  sendMessage: function (text,second_person) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("User Not Found");
    }
  
    Messages.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      name: Meteor.user().username,
      second: second_person
    });
  }
});