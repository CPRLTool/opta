import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Organizations, defaultFields } from '../organizations.js';

Meteor.publishComposite('organizations.profile', (name) => {
  new SimpleSchema({
    name: { type: String },
  }).validate({ name });

  return {
    find() {
      return Organizations.find({ name });
    },

    children: [{
      find(org) {
        return org.users();
      },
    }],
  };
});

Meteor.publish('organizations.defaultInfo', () =>
  Organizations.find({}, { fields: defaultFields })
);
