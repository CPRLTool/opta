import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';

import { profileFields, defaultFields } from '../users.js';

import { Organizations } from '../../organizations/organizations.js';


Meteor.publishComposite('Meteor.users.profileInfo', (username) => {
  // Validate the arguments to be what we expect
  new SimpleSchema({
    username: { type: String },
  }).validate({ username });

  return {
    find() {
      return Meteor.users.find({ username }, { fields: profileFields });
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

Meteor.publish('Meteor.users.basic', (_id) =>
  Meteor.users.find({ _id }, { fields: defaultFields })
);

Meteor.publish('Meteor.users.home', (_id) =>
  Meteor.users.find({ _id }, { fields: { updatedProfile: 1 } })
);

Meteor.publishTransformed('Meteor.users.searchToInviteToGroup', (group) => {
  // put member Ids into object for easy membership verification
  const memberIds = {};
  for (let i = 0, l = group.members.length; i < l; i++) {
    memberIds[group.members[i].id] = true;
  }

  return Meteor.users.find({}, { fields: defaultFields }).serverTransform({
    // extend the document with the custom property 'selectable'
    // which checks if user is member of group
    selectable: user => !(user._id in memberIds),
  });
});

// Meteor.publish('Meteor.users.searchToInviteToOrg', (orgId) => {
//   new SimpleSchema({
//     orgId: { type: String, regEx: SimpleSchema.RegEx.Id },
//   }).validate({ orgId });

//   const org = Organizations.findOne({ _id: orgId });
//   // put member Ids into object for easy membership verification
//   const memberIds = {};
//   for (let i = 0, l = org.members.length; i < l; i++) {
//     memberIds[org.members[i].id] = true;
//   }

//   // check if user is member of org
//   const transform = (doc) => {
//     const newDoc = doc;
//     newDoc.selectable = doc._id in memberIds;
//     return newDoc;
//   };

//   const self = this;

//   const observer = Meteor.users.find({}, { fields: defaultFields }).observe({
//     added: (document) => {
//       self.added('Meteor.users', document._id, transform(document));
//     },
//     changed: (newDocument, oldDocument) => {
//       self.changed('Meteor.users', newDocument._id, transform(newDocument));
//     },
//     removed: (oldDocument) => {
//       self.removed('Meteor.users', oldDocument._id);
//     },
//   });

//   self.onStop(() => {
//     observer.stop();
//   });

//   self.ready();
// });


// Meteor.publish('Meteor.users.search', (searchString) => {
//   new SimpleSchema({
//     searchString: { type: String },
//   }).validate({ searchString });

//   // return searchString
//   //   ? UsersIndex.search(searchString, { limit: 6 }).mongoCursor
//   //   : Meteor.users.find({}, { fields: defaultFields });
//   return UsersIndex.search(searchString, { limit: 6 }).mongoCursor;
// });
