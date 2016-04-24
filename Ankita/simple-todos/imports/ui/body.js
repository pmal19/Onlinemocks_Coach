import { Template } from 'meteor/templating';

import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';
import { Messages } from '../api/tasks.js';

import './body.html';
import './task.js';

Meteor.subscribe('tasks');
Meteor.subscribe('msgs');
Meteor.subscribe('list');

 Template.body.onCreated(function bodyOnCreated() {

  this.state = new ReactiveDict();
});


Template.task.helpers({

    tasks() {

    const instance = Template.instance();

    return Tasks.find({}, { sort: { createdAt: -1 } });

  },

});

Template.chat.helpers({

    list() {

    const instance = Template.instance();

    return Meteor.users.find();

  },

});

Template.form.events({

  'submit .new-task'(event) {

    // Prevent default browser form submit

    event.preventDefault();

 

    // Get value from form element

    const target = event.target;

      var text = event.target.text.value;

      var text2 = text.replace("\n", "<br/>");

      // Insert a post into the collection

      var name = event.target.name.value;

      Tasks.insert({
        name: name,
        text: text2,
        createdAt: new Date(), // current time
        owner: Meteor.userId(),
        username: Meteor.user().username,
      });
 
      // Clear form
      event.target.text.value = "";
      event.target.name.value = "";
    },

  'change .hide-completed input'(event, instance) {

    instance.state.set('hideCompleted', event.target.checked);

  },
});


Template.messages.events({

    'submit .new_message'(event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      const target = event.target;

      var text = event.target.text.value;


    receiver = Router.current().params._id;

    msgs.insert({
      txt: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
      receiver: receiver,
    
    });
    
      // Clear form
      event.target.text.value = "";
    },

});


Template.messages.helpers({

    msgs:function(){
      return msgs.find({},{sort:{createdAt: -1}});
    }

});