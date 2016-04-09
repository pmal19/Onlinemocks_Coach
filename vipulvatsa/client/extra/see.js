Router.route('/see');


 if (Meteor.isServer) 
 {
	 Meteor.publish("pramit", function () {
    return Tasks.find({});
  });
 }
if (Meteor.isClient) {
  // This code only runs on the client
 Meteor.subscribe("pramit");
 
  Template.see.helpers({
	  task_this: function () {
		  console.log("yahan bhi hun");
        return Tasks.find({}, {sort: {createdAt: -1}});
      
    }
  });
  
}