import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { profileFields, defaultFields } from '../users.js';

Meteor.publish('Meteor.users.profileInfo', (username) => {
  // Validate the arguments to be what we expect
  new SimpleSchema({
    username: { type: String },
  }).validate({ username });

  const selector = {
    username,
  };

  const options = {
    fields: profileFields,
  };

  return Meteor.users.find(selector, options);
});

Meteor.publish('Meteor.users.defaultInfo', () => {
  const options = {
    fields: defaultFields,
  };

  return Meteor.users.find({}, options);
});
