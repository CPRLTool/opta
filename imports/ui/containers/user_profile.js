import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
// import { FlowRouter } from 'meteor/kadira:flow-router';

import UserProfile from '../components/user_profile.jsx';
import { updateProfile } from '../actions/users';

function composer(props, onData) {
  const currUser = Meteor.user();
  // const isCurrUser = currUser.username === props.username;

  const handle = Meteor.subscribe('Meteor.users.profileInfo', props.username);
  // const handle = Meteor.subscribe('Meteor.users.profileInfo');

  if (handle.ready()) {
    const user = Meteor.users.findOne({ username: props.username });
    // TODO: redirect if no user
    // if (!user) {
    //   FlowRouter.go('/');
    // }
    const orgsOf = (u) => u.organizations().fetch();
    onData(null, { user, currUser, orgsOf, updateProfile });
  }
}

export default composeWithTracker(composer)(UserProfile);
