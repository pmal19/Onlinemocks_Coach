
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.html';

Router.route('/', {
    name: 'home',
    template: 'home'
});

Router.route('/form', {
    name: 'form',
    template: 'form'
});

Router.route('/task', {
    name: 'task',
    template: 'task'
});

Router.route('/chat', {
    name: 'chat',
    template: 'chat'
});

Router.route('/chat/:_id',{
  name: 'messages',
  template: 'messages',
  waitOn: function(){
      var person = this.params._id;
      Meteor.subscribe("msgs", person);
      
  }
});



Template.task.helpers({

  isOwner() {

    return this.owner === Meteor.userId();

  },

});

Template.task.events({
  'click .delete'() {

    Tasks.remove(this._id);

  },

  'click .toggle-private'() {

    Meteor.call('tasks.setPrivate', this._id, !this.private);

  },

});

