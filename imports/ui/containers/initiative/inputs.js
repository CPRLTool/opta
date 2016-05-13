import { composeWithTracker } from 'react-komposer';

import Inputs from '../../components/initiative/inputs.jsx';
import {
  updateInputs,
} from '../../actions/initiatives';

function composer(props, onData) {
  onData(null, {
    currUser: props.currUser,
    initiative: props.initiative,
    canEdit: props.canEdit,
    // getMembers: props.getMembers,
    updateInputs,
  });
}

export default composeWithTracker(composer)(Inputs);
