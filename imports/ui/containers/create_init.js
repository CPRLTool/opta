import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import CreateInit from '../components/create_init.jsx';
import { create } from '../actions/initiatives';


const getOwnerOptions = (currUser) => {
  const orgs = currUser.organizations().fetch();
  const ownerOptions = [{
    name: `You (${currUser.username})`,
    value: {
      type: 'user',
      id: currUser._id,
    },
  }];
  orgs.forEach(o => {
    ownerOptions.push({
      name: o.name,
      value: {
        type: 'organization',
        id: o._id,
      },
    });
  });
  return ownerOptions;
};

function composer(props, onData) {
  const currUserId = Meteor.userId();
  const handle = Meteor.subscribe('organizations.dataOwnerSelection', currUserId);
  if (handle.ready()) {
    const currUser = Meteor.users.findOne({ _id: Meteor.userId() });
    onData(null, { create, currUser, getOwnerOptions });
  }
}

export default composeWithTracker(composer)(CreateInit);
