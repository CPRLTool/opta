import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const MemberSchema = new SimpleSchema({
  id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  isAdmin: {
    type: Boolean,
  },
});

export const OwnerSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: [
      'user',
      'organization',
    ],
  },
  id: { // doc id
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
});

export const DataPointSchema = new SimpleSchema({
  value: {
    type: Number,
    decimal: true,
  },
  date: {
    type: Date,
  },
  addedBy: { // user who input
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
});

export const DocReferenceSchema = new SimpleSchema({
  id: { // doc id
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  order: {
    type: Number,
    optional: true,
  },
});

export const EntityWithMetricsSchema = new SimpleSchema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
    optional: true,
  },
  createdAt: {
    type: Date,
    optional: true,
  },
  order: {
    type: Number,
    optional: true,
  },
  metrics: {
    type: [DocReferenceSchema],
    minCount: 1,
  },
});
