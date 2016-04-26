import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import SearchUser from '../components/search_user.jsx';

function composer(props, onData) {
  const data = {
    searchSub(searchString) {
      Meteor.subscribe('Meteor.users.search', searchString);
    },
    onSelectUser: props.onSelectUser,
  };
  onData(null, data);
}

export default composeWithTracker(composer)(SearchUser);