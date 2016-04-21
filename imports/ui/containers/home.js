import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Home from '../components/home.jsx';

function composer(props, onData) {
  const currUser = Meteor.user();

  onData(null, { currUser });
}

export default composeWithTracker(composer)(Home);
