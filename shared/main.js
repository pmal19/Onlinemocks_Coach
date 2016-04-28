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