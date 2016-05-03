import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Setup from '../../components/initiative/setup.jsx';
import { updateTextFields } from '../../actions/initiatives';

function composer(props, onData) {
  onData(null, {
    currUser: props.currUser,
    initiative: props.initiative,
    canEdit: props.canEdit,
    getMembers: props.getMembers,
    updateTextFields,
  });
}

export default composeWithTracker(composer)(Setup);
