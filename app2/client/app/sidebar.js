
 Meteor.subscribe("display_users",Meteor.userId());
  
Template.sidebar.helpers({
	displayusers : function(){
		return Meteor.users.find({_id : {$ne : Meteor.userId()}});
	}
});

