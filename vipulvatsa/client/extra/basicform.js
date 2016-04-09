Router.route('/',{
	name: 'basicform',
	template: 'basicform'
});

Tasks = new Mongo.Collection("tasks");
 if (Meteor.isServer) 
 {
	 
 }
if (Meteor.isClient) {
  // This code only runs on the client
	
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
}

Meteor.methods({
  addTask: function (text) {
 
    Tasks.insert({
      xyz: text,
      createdAt: new Date(),
	  
    });
  }
});
///////////////////////////////////////////////////

//////////////////////////////////////////////////


