import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import { Meteor } from 'meteor/meteor';

import { userDefaultFields } from '../users/users';
import { Organizations } from '../organizations/organizations';
import { Initiatives, portfolioDashboardFields } from '../initiatives/initiatives';
import { OwnerSchema, DocReferenceSchema } from '../common_sub_schemas';

// export const Lists = new ListsCollection('Lists');
export const Portfolios = new Mongo.Collection('Portfolios');

Portfolios.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Portfolios.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  owner: {
    type: OwnerSchema,
  },
  name: {
    type: String,
  },
  impact: {
    type: String,
    optional: true,
  },
  viewers: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
  initiatives: {
    type: [DocReferenceSchema],
    defaultValue: [],
  },
});

Portfolios.attachSchema(Portfolios.schema);

export const defaultFields = {
  // _id: 1,
  name: 1,
};

export const listItemFields = {
  owner: 1,
  name: 1,
  impact: 1,
};

Factory.define('portfolio', Portfolios, {});

Portfolios.helpers({
  editableBy(userId) {
    if (this.owner.type === 'user') {
      return userId === this.owner.id;
    }
    const org = Organizations.findOne({ _id: this.owner.id });
    return !!org && org.editableBy(userId);
  },
  viewableBy(userId) {
    if (userId in this.viewers) {
      return true;
    }
    if (this.owner.type === 'user') {
      return userId === this.owner.id;
    }
    const org = Organizations.findOne({ _id: this.owner.id });
    return !!org && org.hasMember(userId);
  },
  getViewers() {
    return Meteor.users.find(
      { _id: { $in: this.viewers || [] } },
      { fields: userDefaultFields });
  },
  getInitiatives() {
    return Initiatives.find(
      { _id: { $in: this.initiatives.map(i => i.id) } },
      { fields: portfolioDashboardFields });
  },
  hasInitiative(initiativeId) {
    return this.initiatives.some(i => i.id === initiativeId);
  },
});

