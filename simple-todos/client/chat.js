Messages= new Mongo.Collection("messages");

Router.route('/',{
	name:'displaypage',
	template:'displaypage'
})

Router.route('/list_page/:_id',{
	template:'list_page',
	data: function(){
		var current_list=this.params._id;
		console.log(current_list);
		Meteor.subscribe("display_messages",current_list);
	}
})
Meteor.subscribe("users");

Template.displaypage.helpers({
	users: function(){
		//console.log("checking..");
		return Meteor.users.find();
	},
});

Template.list_page.helpers({
	display_messages: function(){
		console.log(Messages.find({}));
		return Messages.find({});
	}
});

Template.list_page.events({
    "submit .new_message": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      
      var text = event.target.text.value;
      console.log(text);
      Meteor.call("addTask",text,Router.current().params._id);
      //console.log(text);
      // Insert a task into the collection
      

      console.log(text);
      // Clear form
      event.target.text.value = "";
     
    }
  });
