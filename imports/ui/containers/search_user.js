import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import SearchUser from '../components/search_user.jsx';

import { search } from '../actions/users';

function composer(props, onData) {
  const handle = Meteor.subscribe('Meteor.users.searchToInviteToGroup', props.group);

  if (handle.ready()) {
    const data = {
      search,
      onSelectUser: props.onSelectUser,
    };
    onData(null, data);
  }
}

export default composeWithTracker(composer)(SearchUser);
