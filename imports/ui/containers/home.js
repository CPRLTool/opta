import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Home from '../components/home.jsx';

function composer(props, onData) {
  const currUserId = Meteor.userId();
  const handle = Meteor.subscribe('Meteor.users.home', currUserId);

  if (handle.ready()) {
    const currUser = Meteor.users.findOne({ _id: currUserId });
    // const isNewUser = (cU) => cU.isNewUser();
    const isNewUser = (cU) => !cU.updatedProfile;
    onData(null, { currUser, isNewUser });
  }
}

export default composeWithTracker(composer)(Home);
