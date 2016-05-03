import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Settings from '../../components/initiative/settings.jsx';
import { inviteMember } from '../../actions/initiatives';

function composer(props, onData) {
  onData(null, {
    currUser: props.currUser,
    initiative: props.initiative,
    canEdit: props.canEdit,
    getMembers: props.getMembers,
    inviteMember,
  });
}

export default composeWithTracker(composer)(Settings);
