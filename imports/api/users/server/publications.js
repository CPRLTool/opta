import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { profileFields, defaultFields, UsersIndex } from '../users.js';

// Meteor.publish('Meteor.users.profileInfo', (searchString) => {
//   // Validate the arguments to be what we expect
//   new SimpleSchema({
//     username: { type: String },
//   }).validate({ username });

//   const selector = {
//     username,
//   };

//   const options = {
//     fields: profileFields,
//   };

//   return Meteor.users.find(selector, options);
// });

Meteor.publishComposite('Meteor.users.profileInfo', (username) => {
  // Validate the arguments to be what we expect
  new SimpleSchema({
    username: { type: String },
  }).validate({ username });

  return {
    find() {
      const selector = { username };
      const options = { fields: profileFields };

      return Meteor.users.find(selector, options);
    },

    children: [{
      find(user) {
        return user.organizations();
      },
    }],
  };
});

Meteor.publish('Meteor.users.defaultInfo', () =>
  Meteor.users.find({}, { fields: defaultFields })
);

// Meteor.publish('Meteor.users.search', (searchString) => {
//   new SimpleSchema({
//     searchString: { type: String },
//   }).validate({ searchString });

//   // return searchString
//   //   ? UsersIndex.search(searchString, { limit: 6 }).mongoCursor
//   //   : Meteor.users.find({}, { fields: defaultFields });
//   return UsersIndex.search(searchString, { limit: 6 }).mongoCursor;
// });

Meteor.publish('Meteor.users.search', (searchString) => {
  new SimpleSchema({
    searchString: { type: String },
  }).validate({ searchString });

  return searchString
    ? Meteor.users.find(
      { $text: { $search: searchString } },
      {
        fields: {
          score: {
            $meta: 'textScore',
          },
        },
        sort: {
          score: {
            $meta: 'textScore',
          },
        },
      }
    ).limit(6)
    : Meteor.users.find().limit(6);
});
