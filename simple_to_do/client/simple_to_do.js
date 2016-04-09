Tasks = new Mongo.Collection("tasks");
Messages= new Mongo.Collection("messages");
//var variable1;


if(Meteor.isClient){
  Meteor.subscribe("tasks1");
  Meteor.subscribe("display_user");
 // Meteor.subscribe("display_messages");
  Accounts.ui.config({
passwordSignupFields:"USERNAME_ONLY"
  });
Router.configure({
layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('welcome',{to:"main"});
});
Router.route('/form', function () {
  this.render('navbar',{to:"navbar"});
  this.render('form',{to:"main"});
   this.render('chat',{to:"chat"});
});
Router.route('/form/task', function () {
  this.render('navbar',{to:"navbar"});
  this.render('task',{to:"main"});
});
Router.route('/chatwindow/:_id', {
    template: 'listPage',
    data: function(){
        var currentList = this.params._id;
        console.log(currentList);
        //return Meteor.users.findOne({ _id: currentList });
     // Meteor.call("second_user",currentList);
     Meteor.subscribe("display_messages",currentList);
    }
});

  Template.task.helpers({
    tasks: function () {
      return Tasks.find({},{sort: {createdAt: -1}});
    }
  });
  Template.welcome.helpers({username: function () {
      if(Meteor.user()){
        return Meteor.user().username;
      }
      else{
        return"anonymous internet user";
      }
    }
  });
  Template.chat.helpers({
    display_user: function () {
      return Meteor.users.find();
    }
  });
  Template.listPage.helpers({
    display_messages: function () {
      return Messages.find({},{sort:{createdAt: -1}}); 
    }
  });
  Template.listPage.events({
    "submit .new-message": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      
      var text = event.target.text.value;
      console.log(text);
      Meteor.call("mere_messages",text);
      //console.log(text);
      // Insert a task into the collection
      

      console.log(text);
      // Clear form
      event.target.text.value = "";
     
    }
  });

Template.form.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var name = event.target.name.value;
      var text = event.target.text.value;
      
      // Insert a task into the collection
      Tasks.insert({
        name: name,
        text: text,
        createdAt: new Date(),
        owner: Meteor.userId() // current time
      });
      // Clear form
      event.target.text.value = "";
      event.target.name.value = "";
    }
  });
Template.task.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    }
  });
}