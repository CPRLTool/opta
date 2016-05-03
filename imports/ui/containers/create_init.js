import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import CreateInit from '../components/create_init.jsx';
import { create } from '../actions/initiatives';
import { Organizations } from '../../api/organizations/organizations';
import { Portfolios } from '../../api/portfolios/portfolios';


const getOwnerOptions = (currUser) => {
  const orgs = Organizations.find({}).fetch();
  const ownerOptions = [{
    name: `You (${currUser.username})`,
    value: {
      type: 'user',
      id: currUser._id,
    },
  }];
  orgs.forEach(o => {
    ownerOptions.push({
      name: o.name,
      value: {
        type: 'organization',
        id: o._id,
      },
    });
  });
  return ownerOptions;
};

const filterPortfoliosFor = (portfolios, ownerId) => {
  const filtered = portfolios.filter(p =>
    p.owner.id === ownerId
  );

  const ret = [];
  filtered.forEach(p => ret.push({ name: p.name, id: p._id }));
  return ret;
};

function composer(props, onData) {
  const currUserId = Meteor.userId();
  const handle = Meteor.subscribe('organizations.dataOwnerSelection', currUserId);
  const handle2 = Meteor.subscribe('portfolios.listForUser', currUserId);
  if (handle.ready() && handle2.ready()) {
    const currUser = Meteor.users.findOne({ _id: Meteor.userId() });
    const portfolios = Portfolios.find({}).fetch();
    const forPortfolio = props.forPortfolio;
    onData(null, { create, currUser, forPortfolio, portfolios, getOwnerOptions, filterPortfoliosFor });
  }
}

export default composeWithTracker(composer)(CreateInit);
