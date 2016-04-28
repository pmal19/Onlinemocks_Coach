var second_person;

Accounts.onCreateUser (function(options, user){
  if (user.services.facebook){
    data = user.services.facebook;
    user.username = data.username;
    return user;
  }
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


  
Meteor.publish("users",function(){
 return Meteor.users.find(); 
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
