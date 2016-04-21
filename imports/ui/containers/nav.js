import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
// import Nav from '../components/nav.jsx';
import NavBar from '../components/navbar.jsx';

function composer(props, onData) {
  const currUser = Meteor.user();
  const loggingIn = Meteor.loggingIn();
  // const hasUser = !loggingIn && user;
  onData(null, { currUser, loggingIn });
}

// export default composeWithTracker(composer)(Nav);
export default composeWithTracker(composer)(NavBar);
