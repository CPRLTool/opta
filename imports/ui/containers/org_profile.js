import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Organizations } from '../../api/organizations/organizations.js';
import OrgProfile from '../components/org_profile.jsx';

function composer(props, onData) {
  const currUser = Meteor.user();

  const handle = Meteor.subscribe('organizations.profile', props.name);
  const searchSub = (searchString) => Meteor.subscribe('Meteor.users.search', searchString);

  if (handle.ready()) {
    const org = Organizations.findOne({ name: props.name });
    onData(null, { org, currUser, searchSub });
  }
}

export default composeWithTracker(composer)(OrgProfile);