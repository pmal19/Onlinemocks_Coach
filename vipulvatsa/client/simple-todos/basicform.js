Router.route('/',{
	name: 'basicform',
	template: 'basicform'
});

messagelist = new Mongo.Collection("messages");
 if (Meteor.isServer) 
 {
	 Meteor.publish('display_all_users', function (){ 
		return Meteor.users.find();
	});
 }
if (Meteor.isClient) {
  // This code only runs on the client
	
	Meteor.subscribe("display_all_users");
	
Template.basicform.helpers({
	
	display_all_users: function() {
		return Meteor.users.find();
	}
  });
	
	
Template.basicform.events({
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
 
    messagelist.insert({
      xyz: text,
      createdAt: new Date(),
	  owner: Meteor.userId(),
	  //unique_id: _id,
      username: Meteor.user().username	 
	 
    });
  }
});
///////////////////////////////////////////////////

//////////////////////////////////////////////////


