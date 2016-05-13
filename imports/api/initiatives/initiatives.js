/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import { Factory } from 'meteor/dburles:factory';
import { Meteor } from 'meteor/meteor';

import { MemberSchema, OwnerSchema, EntityWithMetricsSchema } from '../common_sub_schemas';
import { userDefaultFields } from '../users/users.js';
import { EasySearch } from 'meteor/easy:search';


export const Initiatives = new Mongo.Collection('Initiatives');

Initiatives.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export const ActionSchema = EntityWithMetricsSchema;

export const OutcomeSchema = new SimpleSchema([
  EntityWithMetricsSchema,
  {
    actions: {
      type: [ActionSchema],
      minCount: 1,
    },
  },
]);

const FundSchema = new SimpleSchema({
  contributor: {
    type: String,
  },
  request: {
    type: Number,
  },
  // commitment: {
  //   type: Number,
  // },
  status: {
    type: String,
    allowedValues: [
      'In Progress',
      'Received',
    ],
  },
});

export const InputsSchema = new SimpleSchema({
  funding: {
    type: [FundSchema],
    defaultValue: [],
  },
  other: {
    type: Object,
    defaultValue: {
      internal: '',
      external: '',
    },
  },
  'other.internal': {
    type: String,
  },
  'other.external': {
    type: String,
  },
});

Initiatives.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  name: {
    type: String,
    index: true,
    // unique: true,
  },
  dataOwner: {
    type: OwnerSchema,
  },
  members: {
    type: [MemberSchema],
  },
  viewers: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    defaultValue: [],

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
  // isActive: {
  //   type: Boolean,
  //   defaultValue: true,
  // },
  // hasStarted: {
  //   type: Boolean,
  //   defaultValue: false,
  // },
  overview: {
    type: String,
    defaultValue: '',
  },
  theoryOfAction: {
    type: String,
    defaultValue: '',
  },
  strategy: {
    type: String,
    defaultValue: '',
  },
  inputs: {
    type: InputsSchema,
    defaultValue: {
      funding: [],
      other: {
        internal: '',
        external: '',
      },
    },
  },
  outcomes: {
    type: [OutcomeSchema],
    minCount: 1, // or 3?
  },
  // startDate: {
  //   type: Date,
  //   // autoValue() {
  //   //   if (this.isInsert) {
  //   //     if (!this.isSet) {
  //   //       const d = new Date();
  //   //       d.setDate(d.getDate() + 6).setDay(1); // the next closest Monday
  //   //       return d;
  //   //     }
  //   //   } else if (this.isUpsert) {
  //   //     if (!this.isSet) {
  //   //       const d = new Date();
  //   //       d.setDate(d.getDate() + 6).setDay(1); // the next closest Monday
  //   //       return { $setOnInsert: d };
  //   //     }
  //   //   }
  //   // },
  // },
  // endDate: {
  //   type: Date,
  //   // autoValue() {
  //   //   if (this.isInsert) {
  //   //     if (!this.isSet) {
  //   //       const d = new Date();
  //   //       d.setDate(d.getDate() + 6).setDay(5); // will end on a Friday
  //   //       d.setMonth(d.getMonth() + 3);
  //   //       return d;
  //   //     }
  //   //   } else if (this.isUpsert) {
  //   //     if (!this.isSet) {
  //   //       const d = new Date();
  //   //       d.setDate(d.getDate() + 6).setDay(5); // will end on a Friday
  //   //       d.setMonth(d.getMonth() + 3);
  //   //       return { $setOnInsert: d };
  //   //     }
  //   //   }
  //   // },
  // },
  //   autoValue() {
  //     if (this.isInsert) {
  //       if (!this.isSet) {
  //         const id = incrementCounter('OutcomesCounter', `init_${this.field('_id')}`);
  //         return [{
  //           id,
  //           name: '',
  //           description: '',
  //           createdAt: new Date(),
  //           order: id,
  //           metrics: [],
  //         }];
  //       }
  //     } else if (this.isUpsert) {
  //       if (!this.isSet) {
  //         const id = incrementCounter('OutcomesCounter', `init_${this.field('_id')}`);
  //         return { $setOnInsert: [{
  //           id,
  //           name: '',
  //           description: '',
  //           createdAt: new Date(),
  //           order: id,
  //           metrics: [],
  //         }] };
  //       }
  //     } else if (this.isUpdate) {
  //       if (this.isSet) {
  //         if (this.operator === '$push') {
  //           const outcome = this.value;
  //           if (!outcome.id) {
  //             outcome.id = incrementCounter('OutcomesCounter', `init_${this.field('_id')}`);
  //             outcome.order = outcome.id;
  //           }
  //           if (!outcome.createdAt) {
  //             outcome.createdAt = new Date();
  //           }
  //           return { $push: outcome };
  //         }
  //       }
  //     }
  //   },
  // },
  // 'outcomes.$.metrics': {
  //   type: [Object],
  //   // minCount: 1,
  //   autoValue() {
  //     if (this.isUpdate) {
  //       if (this.isSet) {
  //         if (this.operator === '$push') {
  //           const metric = this.value;
  //           if (!metric.order) {
  //             metric.order = incrementCounter('OutcomesCounter', `init_${this.field('_id').value}_out_${this.siblingField('id').value}`);
  //           }
  //           if (!metric.addedAt) {
  //             metric.addedAt = new Date();
  //           }
  //           return { $push: metric };
  //         }
  //       }
  //     }
  //   },
  // },
});

Initiatives.attachSchema(Initiatives.schema);

export const defaultFields = {
  _id: 1,
  name: 1,
};

export const listItemFields = {
  _id: 1,
  name: 1,
  theoryOfAction: 1,
};

export const portfolioDashboardFields = {
  _id: 1,
  name: 1,
};

export const listOfTextFields = [
  'overview',
  'theoryOfAction',
  'strategy',
];

// Factory.define('organization', Initiatives, {});

Initiatives.helpers({
  editableBy(userId) {
    return !!userId && this.members.some(m => m.id === userId); // && m.isAdmin);
  },
  getMembers() {
    // return Meteor.users.find({ organizations: { $elemMatch: { $eq: this._id } } });
    return Meteor.users.find(
      { _id: { $in: this.members.map(m => m.id) } },
      { fields: userDefaultFields }
    );
  },
  hasMember(userId) {
    return this.members.some(m => m.id === userId);
  },
  getMetrics() {
    return;
  },
});

export const SearchInitiativesIndex = new EasySearch.Index({
  collection: Initiatives,
  fields: ['name'],
  engine: new EasySearch.Minimongo(),
});
