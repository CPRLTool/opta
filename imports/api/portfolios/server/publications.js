import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Portfolios, defaultFields, listItemFields } from '../portfolios.js';
import { Organizations } from '../../organizations/organizations';


Meteor.publishComposite('portfolios.dashboard', (_id) => {
  new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validate({ _id });

  const portfolios = Portfolios.find({ _id });
  if (portfolios) {
    return {
      find() {
        return portfolios;
      },

      children: [
        {
          find(p) {
            if (p.owner.type === 'organization') {
              return Organizations.find({ _id: p.owner.id });
            }
            return Meteor.users.find({ _id: p.owner.id });
          },
        },
        {
          find(p) {
            return p.getViewers();
          },
        },
        {
          find(p) {
            return p.getInitiatives();
          },
        },
      ],
    };
  }
  return this.ready();
});

Meteor.publish('portfolios.listForUser', (userId) => {
  new SimpleSchema({
    userId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validate({ userId });

  const user = Meteor.users.findOne({ _id: userId });
  const orgs = user.organizations();

  const portfolios = Portfolios.find(
    { $or: [
      { 'owner.type': 'user', 'owner.id': userId },
      { 'owner.type': 'organization', 'owner.id': { $in: orgs.map(o => o._id) } },
    ] },
    { fields: listItemFields }
  );
  return orgs && portfolios ? [orgs, portfolios] : this.ready();
});

Meteor.publish('portfolios.defaultInfo', () => {
  const portfolios = Portfolios.find({}, { fields: defaultFields });
  return portfolios || this.ready();
});
