import { composeWithTracker } from 'react-komposer';

import CreateOrg from '../components/create_org.jsx';

import { create, selectOrgFromSearchToCreate } from '../actions/organizations';

function composer(props, onData) {
  onData(null, { create, selectOrgFromSearchToCreate });
}

export default composeWithTracker(composer)(CreateOrg);
