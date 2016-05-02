import { FlowRouter } from 'meteor/kadira:flow-router';
import Alert from 'react-s-alert';

import {
  create as createMethod,
  // update as updateMethod,
} from '../../api/initiatives/methods';

export const create = ({ owner, name }) => {
  console.log(`id: ${owner.id}, type: ${owner.type}, name: ${name}`);
  createMethod.call({ owner, name }, (err, _id) => {
    if (err) {
      Alert.error(err.message);
      return false;
    }
    Alert.success('Created new portfolio! Now you can state its impact and add initiatives.');
    FlowRouter.go(`/initiative/${_id}`);
    return true;
  });
};

// export const update = ({ _id, impact }) => {
//   updateMethod.call({ _id, impact }, (err, res) => {
//     if (err) {
//       Alert.error(err.message);
//     } else {
//       Alert.success('Profile updated!');
//     }
//   });
// };
