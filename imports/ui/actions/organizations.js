import { FlowRouter } from 'meteor/kadira:flow-router';
import Alert from 'react-s-alert';

import {
  create as createMethod,
  updateProfile as updateProfileMethod,
  inviteMember as inviteMemberMethod,
} from '../../api/organizations/methods';

import { SearchOrgsIndex } from '../../api/organizations/organizations';

export const search = (searchString) => SearchOrgsIndex.search(searchString).fetch();

export const create = ({ name }) => {
  createMethod.call({ name }, (err, res) => {
    if (err) {
      Alert.error('Name already taken. Try a new, unique name.');
      return false;
    } else {
      Alert.success('Created new organization! Now fill out some background info and invite members.');
      FlowRouter.go(`/organization/${name}`);
      return true;
    }
  });
};

export const updateProfile = ({ _id, about }) => {
  updateProfileMethod.call({ _id, about }, (err, res) => {
    if (err) {
      Alert.error(err.message);
    } else {
      Alert.success('Profile updated!');
    }
  });
};

export const inviteMember = ({ org, user }) => {
  inviteMemberMethod.call({ _id: org._id, inviteeId: user._id }, (err, res) => {
    if (err) {
      Alert.error(err.message);
    } else {
      Alert.success(`${user.username} has been invited to ${org.name}`);
    }
  });
};

export const selectOrgFromSearchToCreate = (org) => FlowRouter.go(`/organization/${org.name}`);
