import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Metrics } from './metrics.js';

export const create = new ValidatedMethod({
  name: 'metrics.create',
  validate: new SimpleSchema({
    // creatorId: { type: String, regEx: SimpleSchema.RegEx.Id },
    name: { type: String },
    // about: { type: String },
  }).validator(),
  run({ name }) {
    const org = {
      name,
    };

    Metrics.insert(org);
  },
});


