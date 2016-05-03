import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
// import { FlowRouter } from 'meteor/kadira:flow-router';

import { Initiatives } from '../../api/initiatives/initiatives';
import InitHome from '../components/initiative_home.jsx';


function canEdit(uId, init) {
  return init ? init.editableBy(uId) : false;
}

function getMembers(init) {
  return init.getMembers().fetch();
}

// function getInitiatives(init) {
//   return init ? init.getInitiatives() : false;
// }

function composer(props, onData) {
  const currUserId = Meteor.userId();

  const handle = Meteor.subscribe('initiatives.allInfo', props.id);

  if (handle.ready()) {
    const currUser = Meteor.users.findOne({ _id: currUserId });
    const initiative = Initiatives.findOne({ _id: props.id });
    // TODO: redirect if no portfolio
    // if (!user) {
    //   FlowRouter.go('/');
    // }
    onData(null, { initiative, currUser, canEdit, getMembers });
  }
}

export default composeWithTracker(composer)(InitHome);
