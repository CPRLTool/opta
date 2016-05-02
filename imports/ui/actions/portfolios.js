import { FlowRouter } from 'meteor/kadira:flow-router';
import Alert from 'react-s-alert';

import {
  create as createMethod,
  update as updateMethod,
  addInitiative as addInitiativeMethod,
} from '../../api/portfolios/methods';

export const create = ({ owner, name }) => {
  console.log(`id: ${owner.id}, type: ${owner.type}, name: ${name}`);
  createMethod.call({ owner, name }, (err, _id) => {
    if (err) {
      Alert.error(err.message);
      return false;
    }
    Alert.success('Created new portfolio! Now you can state its impact and add initiatives.');
    FlowRouter.go(`/portfolio/${_id}`);
    return true;
  });
};

export const update = ({ _id, impact }) => {
  updateMethod.call({ _id, impact }, (err, res) => {
    if (err) {
      Alert.error(err.message);
    } else {
      Alert.success('Profile updated!');
    }
  });
};

export const addInitiative = ({ port, init }) => {
  addInitiativeMethod.call({ _id: port._id, inviteeId: init.id }, (err, res) => {
    if (err) {
      Alert.error(err.message);
    } else {
      Alert.success(`${init.name} has been invited to ${port.name}`);
    }
  });
};
