import { Meteor } from 'meteor/meteor';
// import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Organizations } from '../organizations/organizations.js';
import { EasySearch } from 'meteor/easy:search';

// Deny all client-side updates to user documents
Meteor.users.deny({
  update() { return true; },
});

const userSchema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  username: {
    type: String,
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    optional: true,
  },
  emails: {
    type: Array,
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    optional: true,
  },
  'emails.$': {
    type: Object,
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  'emails.$.verified': {
    type: Boolean,
  },
  // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field / splendido:meteor-accounts-meld
  registered_emails: {
    type: [Object],
    optional: true,
    blackbox: true,
  },
  createdAt: {
    type: Date,
  },
  // profile: {
  //     type: Schema.UserProfile,
  //     optional: true
  // },
  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  // Add `roles` to your schema if you use the meteor-roles package.
  // Option 1: Object type
  // If you specify that type as Object, you must also specify the
  // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
  // Example:
  // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
  // You can't mix and match adding with and without a group since
  // you will fail validation in some cases.
  // roles: {
  //     type: Object,
  //     optional: true,
  //     blackbox: true
  // },
  // Option 2: [String] type
  // If you are sure you will never need to use role groups, then
  // you can specify [String] as the type
  roles: {
    type: [String],
    optional: true,
  },
  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true,
  },

  firstName: {
    type: String,
    optional: true,
  },
  lastName: {
    type: String,
    optional: true,
  },
  bio: {
    type: String,
    optional: true,
  },
  // organizations: {
  //   type: [String],
  //   optional: true,
  // },
  // 'organizations.$': {
  //   type: String,
  //   regEx: SimpleSchema.RegEx.Id,
  // },
});

Meteor.users.attachSchema(userSchema);

export const profileFields = {
  firstName: 1,
  lastName: 1,
  bio: 1,
  organizations: 1,
};

export const defaultFields = {
  username: 1,
  emails: 1,
};

Meteor.users.helpers({
  organizations() {
    return Organizations.find({ members: { $elemMatch: { id: this._id } } });
  },
});

export const SearchUsersIndex = new EasySearch.Index({
  collection: Meteor.users,
  fields: ['username', 'emails'],
  selectorPerField: (field, searchString) => {
    if (field === 'emails') {
      // return this selector if the email field is being searched
      return {
        emails: {
          $elemMatch: {
            address: {
              $regex: `.*${searchString}.*`,
              $options: 'i',
            },
          },
        },
      };
    }

    // use the default otherwise
    return this.defaultConfiguration().selectorPerField(field, searchString);
  },
  engine: new EasySearch.Minimongo(),
});
