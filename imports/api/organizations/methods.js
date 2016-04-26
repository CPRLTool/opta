import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Organizations } from './organizations.js';

export const create = new ValidatedMethod({
  name: 'organizations.create',
  validate: new SimpleSchema({
    // creatorId: { type: String, regEx: SimpleSchema.RegEx.Id },
    name: { type: String },
    // about: { type: String },
  }).validator(),
  run({ name }) {
    // const creator = Meteor.users.findOne({ _id: this.userId });

    // if (!creator) {
    //   throw new Meteor.Error('organizations.insert.nonexistantUser',
    //     'Cannot create an organization without an existing user to be admin.');
    // }

    const org = {
      name,
      // about,
      members: [
        {
          id: this.userId,
          isAdmin: true,
        },
      ],
    };

    Organizations.insert(org);
  },
});

export const updateProfile = new ValidatedMethod({
  name: 'organizations.updateProfile',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    // name: { type: String },
    about: { type: String },
  }).validator(),
  run({ _id, about }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const org = Organizations.findOne({ _id });

    if (!org.editableBy(this.userId)) {
      throw new Meteor.Error('organizations.makeMemberAdmin.notAuthorized',
        'You do not have admin priveleges for this organization.');
    }

    Organizations.update(
      { _id },
      { $set: { about } }
    );
  },
});


export const inviteMember = new ValidatedMethod({
  name: 'organizations.inviteMember',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    username: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ _id, username }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const org = Organizations.findOne({ _id });

    // if (!org) {
    //   throw new Meteor.Error('organizations.inviteMember.orgDoesNotExist',
    //     'Organization with provided id does not exist.');
    // }

    if (!org.editableBy(this.userId)) {
      throw new Meteor.Error('organizations.inviteMember.notAuthorized',
        'You do not have admin priveleges for this organization.');
    }

    const user = Meteor.users.findOne({ username });

    if (!user) {
      throw new Meteor.Error('organizations.inviteMember.userDoesNotExist',
        'Given user does not exist.');
    }

    Organizations.update(
      { _id },
      { $push: { members: { id: user._id, isAdmin: false } } }
    );
  },
});

export const makeMemberAdmin = new ValidatedMethod({
  name: 'organizations.makeMemberAdmin',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    userId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ _id, userId }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const org = Organizations.findOne({ _id });

    if (!org.editableBy(this.userId)) {
      throw new Meteor.Error('organizations.makeMemberAdmin.notAuthorized',
        'You do not have admin priveleges for this organization.');
    }

    if (!org.members.some(m => m.id === userId)) {
      throw new Meteor.Error('organizations.makeMemberAdmin.noSuchMember',
        'Given user is not a member of this organization.');
    }

    Organizations.update(
      { _id, 'members.id': userId },
      { $set: { 'members.$.isAdmin': true } }
    );
  },
});

