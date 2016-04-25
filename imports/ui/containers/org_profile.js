import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Organizations } from '../../api/organizations/organizations.js';
import OrgProfile from '../components/org_profile.jsx';

function composer(props, onData) {
  const currUser = Meteor.user();

  const handle = Meteor.subscribe('organizations.profile', props.name);

  if (handle.ready()) {
    const org = Organizations.findOne({ name: props.name });
    onData(null, { org, currUser });
  }
}

export default composeWithTracker(composer)(OrgProfile);
