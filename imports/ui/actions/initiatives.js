import { FlowRouter } from 'meteor/kadira:flow-router';
import { Random } from 'meteor/random';
import Alert from 'react-s-alert';

import {
  create as createMethod,
  inviteMember as inviteMemberMethod,
  updateTextFields as updateTextFieldsMethod,
  // updateTheory as updateTheoryMethod,
  updateOutcomes as updateOutcomesMethod,
  updateInputs as updateInputsMethod,
} from '../../api/initiatives/methods';

import { addInitiative } from './portfolios';

export const create = ({ dataOwner, name, portId }) => {
  createMethod.call({ dataOwner, name }, (err, _id) => {
    if (err) {
      Alert.error(err.message);
      return false;
    }
    if (portId) {
      addInitiative({ portId, initId: _id });
    }
    Alert.success('Created new OPTA initiative! Proceed to the setup page.');
    FlowRouter.go(`/initiative/${_id}/setup`);
    return true;
  });
};

export const updateTextFields = ({ _id, fields }) => {
  // fields is an object of field name -> updated text
  const updateObject = fields;
  updateObject._id = _id;
  updateTextFieldsMethod.call(updateObject, (err, res) => {
  // updateTheoryMethod.call({ _id, theoryOfAction: fields.theoryOfAction }, (err, res) => {
    if (err) {
      Alert.error(err.message);
    }
  });
};

export const inviteMember = ({ initiative, user }) => {
  inviteMemberMethod.call({ _id: initiative._id, inviteeId: user._id }, (err, res) => {
    if (err) {
      Alert.error(err.message);
    } else {
      Alert.success(`${user.username} has been invited to ${initiative.name}`);
    }
  });
};

export const addOutcome = (outcomes) => {
  const newOutcomes = outcomes;
  newOutcomes.push({
    id: Random.id(3),
    name: '',
    description: '',
    createdAt: new Date(),
    // order: outCount,
    metrics: [],
    actions: [{
      id: Random.id(3),
      name: '',
      description: '',
      createdAt: new Date(),
      // order: actCount,
      metrics: [],
    }],
  });
  return newOutcomes;
};

export const updateOutcomes = ({ _id, outcomes }) => {
  updateOutcomesMethod.call({ _id, outcomes }, (err, res) => {
    if (err) {
      Alert.error(err.message);
    }
  });
};

export const removeOutcome = (outcomes, outcomeId) => {
  const newOutcomes = outcomes;
  newOutcomes.splice(
    newOutcomes.findIndex(o => o.id === outcomeId),
    1
  );
  return newOutcomes;
};

export const updateInputs = ({ _id, funding, internal, external }) => {
  const inputs = {
    funding,
    other: {
      internal,
      external,
    },
  };

  updateInputsMethod.call({ _id, inputs }, (err, res) => {
    if (err) {
      Alert.error(err.message);
    }
  });
};

