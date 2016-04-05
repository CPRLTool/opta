import { composeWithTracker } from 'react-komposer';
import Nav from '../components/nav.jsx';
import { Meteor } from 'meteor/meteor';

function composer(props, onData) {
  const user = Meteor.user();
  const loggingIn = Meteor.loggingIn();
  onData(null, { user, loggingIn });
}

export default composeWithTracker(composer)(Nav);
