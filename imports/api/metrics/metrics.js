/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import { Factory } from 'meteor/dburles:factory';
import { Meteor } from 'meteor/meteor';

import { OwnerSchema, DataPointSchema } from '../common_sub_schemas';
import { userDefaultFields } from '../users/users.js';
// import { incrementCounter } from 'meteor/osv:mongo-counter';
import { EasySearch } from 'meteor/easy:search';


export const Metrics = new Mongo.Collection('Metrics');

Metrics.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Metrics.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  name: {
    type: String,
  },
  owner: {
    type: OwnerSchema,
  },
  createdAt: {
    type: Date,
    // autoValue() {
    //   if (this.isInsert) {
    //     return new Date();
    //   } else if (this.isUpsert) {
    //     return { $setOnInsert: new Date() };
    //   }
    //   this.unset();  // Prevent user from supplying their own value
    // },
  },
  notes: {
    type: String,
  },
  type: {
    type: String,
    allowedValues: [
      'raw',
      'percentage',
    ],
  },
  dataPoints: {
    type: [DataPointSchema],
  },
  // dataPoints: {
  //   type: [Object],
  //   autoValue() {
  //     if (this.isUpdate) {
  //       if (this.isSet) {
  //         if (this.operator === '$push') {
  //           const datum = this.value;
  //           if (!datum.date) {
  //             datum.date = new Date();
  //           }
  //           return { $push: datum };
  //         } else if (this.operator !== '$pull') {
  //           // can't alter value once added except to delete it
  //           this.unset();
  //         }
  //       }
  //     }
  //   },
  //   // custom: () => {
  //   //   // TODO: should probably validate the values correspond with raw/percentage
  //   // },
  // },
});

Metrics.attachSchema(Metrics.schema);

export const defaultFields = {
  _id: 1,
  name: 1,
};

// Factory.define('organization', Metrics, {});

Metrics.helpers({
  editableBy(userId) {
    const user = Meteor.users.findOne({ _id: userId });
    return !!user && this.members.some(m => m.id === userId && m.isAdmin);
  },
  users() {
    // return Meteor.users.find({ organizations: { $elemMatch: { $eq: this._id } } });
    return Meteor.users.find(
      { _id: { $in: this.members.map(m => m.id) } },
      { fields: userDefaultFields });
  },
});

export const SearchMetricsIndex = new EasySearch.Index({
  collection: Metrics,
  fields: ['name'],
  engine: new EasySearch.Minimongo(),
});
