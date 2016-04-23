Router.configure({
  layoutTemplate: 'main'
});
if(Meteor.isClient){
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });
};