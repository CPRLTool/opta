import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Portfolios } from './portfolios.js';
import { Initiatives } from '../initiatives/initiatives';
import { Organizations } from '../organizations/organizations';
import { OwnerSchema } from '../common_sub_schemas';
// import { incrementCounter } from 'meteor/osv:mongo-counter';

export const create = new ValidatedMethod({
  name: 'portfolios.create',
  validate: new SimpleSchema({
    owner: { type: OwnerSchema },
    name: { type: String },
  }).validator(),
  run({ owner, name }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    if (owner.type === 'user') {
      if (owner.id !== this.userId) {
        throw new Meteor.Error('portfolios.insert.notAuthorized',
          'Cannot create a portfolio for another user');
      }
    }

    // check if you are member of org this is supposed to be owned by
    // const creator = Meteor.users.findOne({ _id: this.userId });
    // const memberOfOrg = !(owner.id in creator.organizations().map(o => o._id));
    const matches = Organizations.find(
      { _id: owner.id, members: { $elemMatch: { id: this.userId } } }
    );
    if (matches.count() === 0) {
      throw new Meteor.Error('portfolios.insert.notAuthorized',
        'Cannot create a portfolio for an organization you don\'t belong to');
    }

    return Portfolios.insert({
      owner,
      name,
    });
  },
});

export const update = new ValidatedMethod({
  name: 'portfolios.updateProfile',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    impact: { type: String },
  }).validator(),
  run({ _id, impact }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const p = Portfolios.findOne({ _id });
    if (!p) {
      throw new Meteor.Error('portfolios.inviteViewer.orgDoesNotExist',
        'Portfolio with provided id does not exist.');
    }

    if (!p.editableBy(this.userId)) {
      throw new Meteor.Error('portfolios.makeMemberAdmin.notAuthorized',
        'You do not have admin priveleges for this portfolio.');
    }

    Portfolios.update(
      { _id },
      { $set: { impact } }
    );
  },
});


export const inviteViewer = new ValidatedMethod({
  name: 'portfolios.inviteViewer',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    inviteeId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ _id, inviteeId }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const p = Portfolios.findOne({ _id });
    if (!p) {
      throw new Meteor.Error('portfolios.inviteViewer.orgDoesNotExist',
        'Portfolio with provided id does not exist.');
    }

    if (!p.editableBy(this.userId)) {
      throw new Meteor.Error('portfolios.inviteViewer.notAuthorized',
        'You do not have admin priveleges for this portfolio.');
    }

    const user = Meteor.users.findOne({ _id: inviteeId });

    if (!user) {
      throw new Meteor.Error('portfolios.inviteViewer.userDoesNotExist',
        'Given user does not exist.');
    }

    if (p.viewers.some(u => u.id === inviteeId)) {
      throw new Meteor.Error('portfolios.inviteViewer.alreadyMember',
        'Given user is already a viewer of this portfolio.');
    }

    Portfolios.update(
      { _id },
      { $push: { viewers: inviteeId } }
    );
  },
});

export const addInitiative = new ValidatedMethod({
  name: 'portfolios.addInitiative',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    initiativeId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ _id, initiativeId }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const p = Portfolios.findOne({ _id });
    if (!p) {
      throw new Meteor.Error('portfolios.addInitiative.orgDoesNotExist',
        'Portfolio with provided id does not exist.');
    }

    if (!p.editableBy(this.userId)) {
      throw new Meteor.Error('portfolios.addInitiative.notAuthorized',
        'You do not have admin priveleges for this portfolio.');
    }

    const i = Initiatives.findOne({ _id: initiativeId });
    if (!i) {
      throw new Meteor.Error('portfolios.addInitiative.userDoesNotExist',
        'Given user does not exist.');
    }

    if (!i.hasMember(this.userId)) {
      throw new Meteor.Error('portfolios.addInitiative.notAuthorized',
        'You are not a member of the given initiative.');
    }

    if (p.hasInitiative(initiativeId)) {
      throw new Meteor.Error('portfolios.addInitiative.alreadyMember',
        'Given initiative is already in this portfolio.');
    }

    Portfolios.update(
      { _id },
      { $push: { initiatives: {
        id: initiativeId,
        // order: incrementCounter('Counters', `port${_id}_inits`),
      } } }
    );
  },
});

