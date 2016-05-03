import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Organizations } from '../../api/organizations/organizations.js';
import OrgProfile from '../components/org_profile.jsx';
import { updateProfile, inviteMember } from '../actions/organizations';

function composer(props, onData) {
  const currUser = Meteor.user();

  const handle = Meteor.subscribe('organizations.profile', props.name);
  // const searchSub = (searchString) => Meteor.subscribe('Meteor.users.search', searchString);

  if (handle.ready()) {
    const org = Organizations.findOne({ name: props.name });
    const isAdmin = (cU, o) => o && cU && o.editableBy(cU._id);
    const members = (o) => o.getMembers().fetch();
    onData(null, { currUser, org, isAdmin, members, updateProfile, inviteMember });
  }
}

export default composeWithTracker(composer)(OrgProfile);
