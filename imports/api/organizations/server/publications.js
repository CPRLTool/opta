import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Organizations, defaultFields } from '../organizations.js';
import { defaultFields as userDefaultFields } from '../../users/users.js';

Meteor.publishComposite('organizations.profile', (name) => {
  new SimpleSchema({
    name: { type: String },
  }).validate({ name });

  const orgs = Organizations.find({ name });
  if (orgs) {
    return {
      find() {
        return orgs;
      },

      children: [{
        find(org) {
          return org.getMembers();
        },
      }],
    };
  }
  return this.ready();
});

Meteor.publish('organizations.defaultInfo', () => {
  const orgs = Organizations.find({}, { fields: defaultFields });
  return orgs || this.ready();
});

Meteor.publish('organizations.portfolioOwnerSelection', (userId) => {
  new SimpleSchema({
    userId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validate({ userId });

  const userCursor = Meteor.users.find({ _id: userId }, { fields: userDefaultFields });
  const user = userCursor.fetch()[0];
  const orgs = user ? user.organizations() : null;

  return userCursor && orgs ? [userCursor, orgs] : this.ready();
});

Meteor.publish('organizations.dataOwnerSelection', (userId) => {
  new SimpleSchema({
    userId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validate({ userId });

  const userCursor = Meteor.users.find({ _id: userId });
  const orgs = Organizations.find({}, { fields: defaultFields });

  return userCursor && orgs ? [userCursor, orgs] : this.ready();
});
