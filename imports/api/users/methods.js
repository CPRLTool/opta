import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const updateProfile = new ValidatedMethod({
  name: 'Meteor.users.updateProfile',
  validate: new SimpleSchema({
    _id: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    bio: { type: String },
  }).validator(),
  run({ _id, firstName, lastName, bio }) {
    if (Meteor.userId() !== _id) {
      throw new Meteor.Error('not-authorized');
    }

    Meteor.users.update(_id, {
      $set: { firstName, lastName, bio },
    });
  },
});
