// import { Meteor } from 'meteor/meteor';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// import { Portfolios, defaultFields } from '../portfolios.js';

// Meteor.publish('portfolios.forUser', (userId) => {
//   new SimpleSchema({
//     userId: { type: String, regEx: SimpleSchema.RegEx.Id },
//   }).validate({ userId });

//   const user = Meteor.users.find({ _id: userId });
//   const orgIds = user.organizations().map(o => o._id);

//   const portfolios = Portfolios.find(
//     { $or: [
//       { 'owner.type': 'user', 'owner.id': userId },
//       { 'owner.type': 'organization', 'owner.id': { $in: orgIds } },
//     ] },
//     { fields: defaultFields }
//   );
//   return portfolios || this.ready();
// });

// Meteor.publishComposite('portfolios.dashboard', (_id) => {
//   new SimpleSchema({
//     _id: { type: String, regEx: SimpleSchema.RegEx.Id },
//   }).validate({ _id });

//   const portfolios = Portfolios.find({ _id });

//   if (portfolios) {
//     return {
//       find() {
//         return portfolios;
//       },

//       children: [
//         {
//           find(p) {
//             return p.viewers();
//           },
//         },
//         {
//           find(p) {
//             return p.initiatives();
//           },
//         },
//       ],
//     };
//   }
//   return this.ready();
// });

// Meteor.publish('portfolios.defaultInfo', () => {
//   const portfolios = Portfolios.find({}, { fields: defaultFields });
//   return portfolios || this.ready();
// });
