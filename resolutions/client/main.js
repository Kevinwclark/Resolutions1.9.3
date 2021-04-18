import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

Resolutions = new Mongo.Collection('resolutions');

import './main.html';

Template.body.helpers({
  resolutions: function() {
    return Resolutions.find()
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
  }

});

Template.resolution.events({
  'click .delete': function() {
    Resolutions.remove(this._id);
  }
})