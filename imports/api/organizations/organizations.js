/* eslint-disable consistent-return */
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import { Factory } from 'meteor/dburles:factory';
import { Meteor } from 'meteor/meteor';

import { Portfolios } from '../portfolios/portfolios';
import { MemberSchema } from '../common_sub_schemas';
import { userDefaultFields } from '../users/users.js';
import { EasySearch } from 'meteor/easy:search';


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
  //   type: [Object],
  //   defaultValue: [],
  // },
  // 'members.$.id': {
  //   type: String,
  //   regEx: SimpleSchema.RegEx.Id,
  // },
  // 'members.$.isAdmin': {
  //   type: Boolean,
  // },
  members: {
    type: [MemberSchema],
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }
      this.unset();  // Prevent user from supplying their own value
    },
  },
});

Organizations.attachSchema(Organizations.schema);

export const defaultFields = {
  // _id: 1,
  name: 1,
};

export const listItemFields = {
  // _id: 1,
  name: 1,
  about: 1,
};

// Factory.define('organization', Organizations, {});

Organizations.helpers({
  // editableBy(userId) {
  //   const user = Meteor.users.findOne({ _id: userId });
  //   return !!user && this.members.some(m => m.id === userId && m.isAdmin);
  // },
  editableBy(userId) {
    return this.members.some(m => m.id === userId && m.isAdmin);
  },
  getMembers() {
    // return Meteor.users.find({ organizations: { $elemMatch: { $eq: this._id } } });
    return Meteor.users.find(
      { _id: { $in: this.members.map(m => m.id) } },
      { fields: userDefaultFields });
  },
  hasMember(userId) {
    return this.members.some(m => m.id === userId);
  },
  portfolios() {
    return Portfolios.find({ 'owner.type': 'organization', 'owner.id': this._id });
  },
});

export const SearchOrgsIndex = new EasySearch.Index({
  collection: Organizations,
  fields: ['name'],
  engine: new EasySearch.Minimongo(),
});
