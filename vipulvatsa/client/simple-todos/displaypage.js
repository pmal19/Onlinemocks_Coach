
//Router.route('/displaypage');

//var variable1;

if(Meteor.isServer)
{
	Meteor.publish("display_messages", function (variable1) {
		//console.log(variable1);
    return messagelist.find({
		
		$or:[
		////////////////////////////////		
		{owner: this.userId ,
		second: variable1//Session.get("variable1")
		},
		{owner: variable1//Session.get("variable1") 
		,
		second: this.userId}
		//{owner: variable1,second: this.userId}
		////////////////////////////
		]	

	});
  });
  
  
	
	
	Meteor.methods({
	addmessages: function (text,second_person) {
    // Make sure the user is logged in before inserting a task
	if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
	
    messagelist.insert({
      abc: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      name: Meteor.user().username,
	  second: second_person//instance.state.get("variable1")//Session.get("variable1")//variable1
	  //,
	  //second: $('[owner="_id"]').val()
    });
  }
});
  
  
}
if(Meteor.isClient)
{
	//Meteor.subscribe("display_messages");
	
	Template.displaypage.events({
		"submit .enter_message": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var text = event.target.text.value;
	console.log(text);
	console.log(Meteor.user().username);
	//console.log(variable1);
	
      //var second = $('[name="Meteor.user().username"]').val();
	  // Insert a task into the collection
	  Meteor.call("addmessages", text,Router.current().params._id);
	  
	  
      // Clear form
      event.target.text.value = "";
    }
	});
	Template.displaypage.helpers({
		display_messages:function(){
			return messagelist.find({},{sort:{createdAt: -1}});
		}
	});
}



