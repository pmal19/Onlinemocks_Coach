

Accounts.ui.config({
passwordSignupFields:"USERNAME_ONLY"
  });
Template.convo.helpers({
	dismsg : function(){
		
return messages.find({},{sort:{createdAt: 1}}); 	

	},

	presentname : function(){
		var id = Router.current().params._id;
		return Meteor.users.find({_id:id});
	}

	
});

Template.convo.events({
	'submit .new-message': function(event){

		        var name = Meteor.user().username;
				var messag = event.target.msg.value;
				var id = Router.current().params._id;
				console.log("THIS.ID");
				//console.log(id);
				var x = messages.insert({
				 user1 : id,
				 user2 : Meteor.userId(),
                 name: name,
                 text : messag, 
                 createdAt : Date.now()
             });
				console.log(x);
				 event.target.msg.value='';
				 return false;
		}
         
     });
				
				   
					
				
			
	
	