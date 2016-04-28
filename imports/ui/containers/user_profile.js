import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import UserProfile from '../components/user_profile.jsx';
import { updateProfile } from '../actions/users';

function composer(props, onData) {
  const currUser = Meteor.user();
  // const isCurrUser = currUser.username === props.username;

  const handle = Meteor.subscribe('Meteor.users.profileInfo', props.username);
  // const handle = Meteor.subscribe('Meteor.users.profileInfo');

  if (handle.ready()) {
    const user = Meteor.users.findOne({ username: props.username });
    onData(null, { user, currUser, updateProfile });
  }
}

export default composeWithTracker(composer)(UserProfile);
