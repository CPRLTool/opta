import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import SearchOrg from '../components/search_org.jsx';

import { search } from '../actions/organizations';

function composer({ onSelectOrg, errorProp }, onData) {
  const handle = Meteor.subscribe('organizations.defaultInfo');

  if (handle.ready()) {
    const data = {
      search,
      onSelectOrg,
      errorProp,
    };
    onData(null, data);
  }
}

export default composeWithTracker(composer)(SearchOrg);
