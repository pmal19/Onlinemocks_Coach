Meteor.publish('display_messages',function(id1,id2){
	return messages.find({
		$or:[
    {
    user1: this.userId,
    user2: id1},
    {user1: id1 ,
    user2: this.userId}
    ]   
	});
});
messages.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return true;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return true;
  },
  
});
Meteor.publish('display_users',function(id){
  return Meteor.users.find();
});