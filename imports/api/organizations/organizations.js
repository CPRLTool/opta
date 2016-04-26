import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import { Meteor } from 'meteor/meteor';

import { defaultFields } from '../users/users.js';

// class ListsCollection extends Mongo.Collection {
//   insert(list, callback) {
//     const ourList = list;
//     if (!ourList.name) {
//       let nextLetter = 'A';
//       ourList.name = `List ${nextLetter}`;

//       while (!!this.findOne({ name: ourList.name })) {
//         // not going to be too smart here, can go past Z
//         nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
//         ourList.name = `List ${nextLetter}`;
//       }
//     }

//     return super.insert(ourList, callback);
//   }
//   remove(selector, callback) {
//     Todos.remove({ listId: selector });
//     return super.remove(selector, callback);
//   }
// }

// export const Lists = new ListsCollection('Lists');
export const Organizations = new Mongo.Collection('Organizations');

// Deny all client-side updates since we will be using methods to manage this collection
Organizations.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Organizations.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  name: {
    type: String,
    index: true,
    unique: true,
  },
  // website: {
  //   type: String,
  //   regEx: SimpleSchema.RegEx.Url,
  //   optional: true,
  // },
  about: {
    type: String,
    optional: true,
  },
  // members: {
  //   type: Array,
  //   defaultValue: [],
  // },
  // 'members.$': {
  //   type: Object,
  // },
  members: {
    type: [Object],
    defaultValue: [],
  },
  'members.$.id': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  'members.$.isAdmin': {
    type: Boolean,
  },
});

Organizations.attachSchema(Organizations.schema);

// // This represents the keys from Lists objects that should be published
// // to the client. If we add secret properties to List objects, don't list
// // them here to keep them private to the server.
// Lists.publicFields = {
//   name: 1,
//   incompleteCount: 1,
//   userId: 1,
// };

Factory.define('organization', Organizations, {});

Organizations.helpers({
  editableBy(userId) {
    // return !!this.userIds.find(u => u === userId && u.isAdmin);
    const user = Meteor.users.findOne({ _id: userId });
    // return !!user && user.organizations && !!user.organizations.find(org => org.id === this._id && org.isAdmin);
    return !!user && this.members.some(m => m.id === userId && m.isAdmin);
  },
  users() {
    // return Meteor.users.find({ organizations: { $elemMatch: { $eq: this._id } } });
    return Meteor.users.find(
      { _id: { $in: this.members.map(m => m.id) } },
      { fields: defaultFields });
  },
});
