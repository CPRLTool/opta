import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
// import { FlowRouter } from 'meteor/kadira:flow-router';

import { Portfolios } from '../../api/portfolios/portfolios';
import PortDash from '../components/port_dash.jsx';
import { update } from '../actions/portfolios';


function canEdit(uId, port) {
  return port ? port.editableBy(uId) : false;
}

function getInitiatives(port) {
  return port ? port.getInitiatives().fetch() : false;
}

function composer(props, onData) {
  const currUserId = Meteor.userId();

  const handle = Meteor.subscribe('portfolios.dashboard', props.id);

  if (handle.ready()) {
    const portfolio = Portfolios.findOne({ _id: props.id });
    // TODO: redirect if no portfolio
    // if (!user) {
    //   FlowRouter.go('/');
    // }
    onData(null, { portfolio, currUserId, canEdit, update, getInitiatives });
  }
}

export default composeWithTracker(composer)(PortDash);
