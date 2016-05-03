import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import { incrementCounter } from 'meteor/osv:mongo-counter';

import { Initiatives, listOfTextFields } from './initiatives.js';
import { Organizations } from '../organizations/organizations';
import { OwnerSchema } from '../common_sub_schemas';
import { Random } from 'meteor/random';


export const create = new ValidatedMethod({
  name: 'initiatives.create',
  validate: new SimpleSchema({
    dataOwner: { type: OwnerSchema },
    name: { type: String },
  }).validator(),
  run({ dataOwner, name }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    if (dataOwner.type === 'user') {
      if (dataOwner.id !== this.userId) {
        throw new Meteor.Error('initiatives.insert.notAuthorized',
          'Cannot create a portfolio for another user');
      }
    } else {
      // check if you are member of org this is supposed to be owned by
      // const creator = Meteor.users.findOne({ _id: this.userId });
      // const memberOfOrg = !(dataOwner.id in creator.organizations().map(o => o._id));
      const matches = Organizations.find(
        { _id: dataOwner.id, members: { $elemMatch: { id: this.userId } } }
      );
      if (matches.count() === 0) {
        throw new Meteor.Error('initiatives.insert.notAuthorized',
          'Cannot create a portfolio for an organization you don\'t belong to');
      }
    }

    const _id = Random.id();
    const outId = Random.id(3);
    const actId = Random.id(3);
    // const outCount = incrementCounter('Counters', `outsFor_${_id}`);
    // const actCount = incrementCounter('Counters', `actsFor_${_id}_out${outCount}`);


    return Initiatives.insert({
      _id,
      dataOwner,
      name,
      members: [
        {
          id: this.userId,
          isAdmin: true,
        },
      ],
      outcomes: [{
        id: outId,
        name: 'e.g. Improve Teacher Performance',
        description: '',
        createdAt: new Date(),
        // order: outCount,
        metrics: [],
        actions: [{
          id: actId,
          name: 'e.g. Facilitate extra training during summer',
          description: '',
          createdAt: new Date(),
          // order: actCount,
          metrics: [],
        }],
      }],
    });
  },
});

export const updateTheory = new ValidatedMethod({
  name: 'initiatives.updateTheory',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    theoryOfAction: { type: String },
  }).validator(),
  run({ _id, theoryOfAction }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const init = Initiatives.findOne({ _id });
    if (!init.editableBy(this.userId)) {
      throw new Meteor.Error('initiatives.updateTextFields.notAuthorized',
        'You do not have priveleges to edit this initiative.');
    }

    Initiatives.update(
      { _id },
      { $set: { theoryOfAction } }
    );
  },
});

export const updateTextFields = new ValidatedMethod({
  name: 'initiatives.updateTextFields',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    theoryOfAction: { type: String, optional: true },
    strategy: { type: String, optional: true },
    overview: { type: String, optional: true },
  }).validator(),
  run({ _id, theoryOfAction, strategy, overview }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // let f;
    // for (f in fields) {
    //   if (!(f in listOfTextFields)) {
    //     throw new Meteor.Error('initiatives.updateTextFields.notValidField',
    //       `${f} is not a valid Initiative text field.`);
    //   }
    // }

    const init = Initiatives.findOne({ _id });
    if (!init.editableBy(this.userId)) {
      throw new Meteor.Error('initiatives.updateTextFields.notAuthorized',
        'You do not have priveleges to edit this initiative.');
    }

    const updateObj = {};
    if (theoryOfAction) { updateObj.theoryOfAction = theoryOfAction; }
    if (strategy) { updateObj.strategy = strategy; }
    if (overview) { updateObj.overview = overview; }

    Initiatives.update(
      { _id },
      { $set: updateObj }
    );
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

    const init = Initiatives.findOne({ _id });

    // if (!init) {
    //   throw new Meteor.Error('initiatives.inviteMember.orgDoesNotExist',
    //     'Organization with provided id does not exist.');
    // }

    if (!init.editableBy(this.userId)) {
      throw new Meteor.Error('initiatives.inviteMember.notAuthorized',
        'You do not have admin priveleges for this organization.');
    }

    const user = Meteor.users.findOne({ _id: inviteeId });

    if (!user) {
      throw new Meteor.Error('initiatives.inviteMember.userDoesNotExist',
        'Given user does not exist.');
    }

    if (init.members.some(u => u.id === inviteeId)) {
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

    const init = Initiatives.findOne({ _id });

    if (!init.editableBy(this.userId)) {
      throw new Meteor.Error('initiatives.makeMemberAdmin.notAuthorized',
        'You do not have admin priveleges for this organization.');
    }

    if (!init.members.some(m => m.id === userId)) {
      throw new Meteor.Error('initiatives.makeMemberAdmin.noSuchMember',
        'Given user is not a member of this organization.');
    }

    Initiatives.update(
      { _id, 'members.id': userId },
      { $set: { 'members.$.isAdmin': true } }
    );
  },
});

