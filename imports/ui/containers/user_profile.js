import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import UserProfile from '../components/user_profile.jsx';

function composer(props, onData) {
  const currUser = Meteor.user();

  const handle = Meteor.subscribe('Meteor.users.profileInfo', props.username);

  if (handle.ready()) {
    const user = Meteor.users.findOne({ username: props.username });
    const isCurrUser = currUser.username === props.username;
    onData(null, { user, isCurrUser });
  }
}

export default composeWithTracker(composer)(UserProfile);
