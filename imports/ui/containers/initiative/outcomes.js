import { composeWithTracker } from 'react-komposer';

import Outcomes from '../../components/initiative/outcomes.jsx';
import {
  addOutcome,
  updateOutcomes,
  removeOutcome,
} from '../../actions/initiatives';

function composer(props, onData) {
  onData(null, {
    currUser: props.currUser,
    initiative: props.initiative,
    canEdit: props.canEdit,
    // getMembers: props.getMembers,
    addOutcome,
    updateOutcomes,
    removeOutcome,
  });
}

export default composeWithTracker(composer)(Outcomes);
