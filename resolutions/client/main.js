import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';


Resolutions = new Mongo.Collection('resolutions');

import './main.html';

Template.body.helpers({
  resolutions: function() {
    if(Session.get('hideFinished')) {
      return Resolutions.find({checked: {$ne: true}});
    } else {
      return Resolutions.find()
    }
  },
  hideFinished: function() {
    return Session.get('hideFinished')
  }
});

Template.body.events({
  'submit .new-resolution': function(event) {
    let title = event.target.title.value
    console.log(event)

    Resolutions.insert({
      title: title,
      createAt: new Date()
    });
    event.target.title.value = "";
    return false
  },
  'change .hide-finished': function(event) {
    Session.set('hideFinished', event.target.checked);
  }

});

Template.resolution.events({
  'click .toggle-checked': function() {
    Resolutions.update(this._id, {$set: {checked: !this.checked}})
  },
  'click .delete': function() {
    Resolutions.remove(this._id);
  }
})

// Meteor.methods({
//   addResolution: function(title){ 
//     Resolutions.insert({
//       title: title,
//       createAt: new Date()
//     });
//   }
// })