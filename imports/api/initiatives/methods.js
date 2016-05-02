import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Initiatives } from './initiatives.js';

export const create = new ValidatedMethod({
  name: 'initiatives.create',
  validate: new SimpleSchema({
    name: { type: String },
    dataOwner: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ name, dataOwner }) {
    const initiative = {
      name,
    };

    return Initiatives.insert(initiative);
  },
});


export const inviteMember = new ValidatedMethod({
  name: 'initiatives.inviteMember',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    // username: { type: String },
    inviteeId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ _id, inviteeId }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const org = Initiatives.findOne({ _id });

    // if (!org) {
    //   throw new Meteor.Error('initiatives.inviteMember.orgDoesNotExist',
    //     'Organization with provided id does not exist.');
    // }

    if (!org.editableBy(this.userId)) {
      throw new Meteor.Error('initiatives.inviteMember.notAuthorized',
        'You do not have admin priveleges for this organization.');
    }

    const user = Meteor.users.findOne({ _id: inviteeId });

    if (!user) {
      throw new Meteor.Error('initiatives.inviteMember.userDoesNotExist',
        'Given user does not exist.');
    }

    if (org.members.some(u => u.id === inviteeId)) {
      throw new Meteor.Error('initiatives.inviteMember.alreadyMember',
        'Given user is already a member of this organization.');
    }

    Initiatives.update(
      { _id },
      { $push: { members: { id: user._id, isAdmin: false } } }
    );
  },
});

export const makeMemberAdmin = new ValidatedMethod({
  name: 'initiatives.makeMemberAdmin',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    userId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ _id, userId }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const org = Initiatives.findOne({ _id });

    if (!org.editableBy(this.userId)) {
      throw new Meteor.Error('initiatives.makeMemberAdmin.notAuthorized',
        'You do not have admin priveleges for this organization.');
    }

    if (!org.members.some(m => m.id === userId)) {
      throw new Meteor.Error('initiatives.makeMemberAdmin.noSuchMember',
        'Given user is not a member of this organization.');
    }

    Initiatives.update(
      { _id, 'members.id': userId },
      { $set: { 'members.$.isAdmin': true } }
    );
  },
});

