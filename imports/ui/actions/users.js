import { FlowRouter } from 'meteor/kadira:flow-router';
import Alert from 'react-s-alert';

import { SearchUsersIndex } from '../../api/users/users.js';
import { updateProfile as updateProfileMethod } from '../../api/users/methods.js';

export const search = (searchString) => SearchUsersIndex.search(searchString).fetch();

export const updateProfile = (profileFields) => {
  updateProfileMethod.call(profileFields, (err, res) => {
    if (err) {
      Alert.error(err.message);
    } else {
      Alert.success('Profile updated!');
    }
  });
};
