import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Initiatives, defaultFields, listItemFields } from '../initiatives.js';

Meteor.publishComposite('initiatives.allInfo', (_id) => {
  new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validate({ _id });

  const initiatives = Initiatives.find({ _id });
  if (initiatives) {
    return {
      find() {
        return initiatives;
      },

      children: [
        {
          find(initiative) {
            return initiative.getMembers();
          },
        },
      ],
    };
  }
  return this.ready();
});

Meteor.publish('initiatives.listForUser', (userId) => {
  new SimpleSchema({
    userId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validate({ userId });

  const initiatives = Initiatives.find(
    { members: { $elemMatch: { id: userId } } },
    { fields: listItemFields }
  );
  return initiatives || this.ready();
});

Meteor.publish('initiatives.defaultInfo', () => {
  const initiatives = Initiatives.find({}, { fields: defaultFields });
  return initiatives || this.ready();
});
