import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const updateProfile = new ValidatedMethod({
  name: 'Meteor.users.updateProfile',
  validate: new SimpleSchema({
    firstName: { type: String },
    lastName: { type: String },
    bio: { type: String },
  }).validator(),
  run({ firstName, lastName, bio }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Meteor.users.update(this.userId, {
      $set: { firstName, lastName, bio },
    });
  },
});

export const searchUsers = new ValidatedMethod({
  name: 'Meteor.users.search',
  validate: new SimpleSchema({
    searchString: { type: String },
  }).validator(),
  run({ searchString }) {
    return searchString
      ? Meteor.users.find({}, { sort: [['score', 'desc']] })
      : Meteor.users.find({});
  },
});
