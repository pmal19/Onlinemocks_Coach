Meteor.subscribe("users");

/*ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1068741179831123',
    secret: '4a4cf8d5944cb1d67cf467d61ed6abc9'
});
*/
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('navbar', {
    to:"navbar"
  });

  this.render('Welcome',{
    to:"main"
  });
});

Router.route('/users', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('tempusers',{
    to:"main"
  });
},{name:'allUsers'});

Router.route('/chatTime/:_id',{
  template: 'userPage',
  data: function(){
      var currentList = this.params._id;
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
      return Meteor.user().username || Meteor.user().profile.name;
    }
  }
});

Template.Welcome.helpers({
  username:function() {
    if(Meteor.user())
    {
      return Meteor.user().username || Meteor.user().profile.name;
    }
  }
});


Template.tempusers.helpers({
  users:function() {
    console.log("checkuser");
    return Meteor.users.find() //&& Meteor.user().services.facebook;
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
  },
  'click .js-emoticon-click':function(event){
    event.preventDefault();
    $('#texting_field_id').focus().val($('#texting_field_id').val() + ' ' + event.target.alt);
  }
});

Template.userPage.helpers({
  display_messages:function(){
    return Messages.find({},{sort:{createdAt: -1}});
  },

  emoticons:function(){
    return Meteor.settings.public.coreEmoticons.slice(0,28);
  }
});
