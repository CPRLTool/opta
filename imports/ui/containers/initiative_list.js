import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Initiatives } from '../../api/initiatives/initiatives';
import Home from '../components/initiative_list.jsx';

function composer(props, onData) {
  const currUser = props.currUser || Meteor.user();
  const handle = Meteor.subscribe('initiatives.listForUser', currUser._id);
  if (handle.ready()) {
    const initiatives = Initiatives.find({}).fetch();
    onData(null, { initiatives });
  }
}

export default composeWithTracker(composer)(Home);
