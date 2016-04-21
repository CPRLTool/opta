import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { profileFields } from '../users.js';

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
    // fields: { firstName: 1, lastName: 1, bio: 1 },
  };

  return Meteor.users.find(selector, options);
});
