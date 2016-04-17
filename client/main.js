Messages = new Mongo.Collection("messages");
Meteor.subscribe("users");


Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('navbar', {
    to:"navbar"
  });
});

Router.route('/users', function () {
  /*this.render('navbar', {
    to:"navbar"
  });*/
  this.render('tempusers',{
    to:"main"
  });
},{name:'allUsers'});

Router.route('/chatTime/:_id',{
  template: 'userPage',
  data: function(){
      var currentList = this.params._id;
      console.log(currentList);
      Meteor.subscribe("display_messages",currentList);
  }
}, {name:'chatWindow'});


Accounts.ui.config({
  passwordSignupFields:"USERNAME_AND_EMAIL"
});

Template.navbar.helpers({
  username:function() {
    if(Meteor.user())
    {
      return Meteor.user().username;
    }
  }
});

Template.tempusers.helpers({
  users:function() {
    console.log("checkuser");
    return Meteor.users.find();
  }
});

Template.userPage.events({
  "submit .message": function (event) {
    // Prevent default browser form submit
    event.preventDefault();
    // Get value from form element
    var text = event.target.text.value;
    // Insert a task into the collection
    Meteor.call("sendMessage", text,Router.current().params._id);
    // Clear form
    event.target.text.value = "";
  }
});

Template.userPage.helpers({
  display_messages:function(){
    return Messages.find({},{sort:{createdAt: -1}});
  }
});