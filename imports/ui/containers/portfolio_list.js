import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Portfolios } from '../../api/portfolios/portfolios';
import Home from '../components/portfolio_list.jsx';

function getCategories(currUser) {
  const orgs = currUser.organizations().fetch();
  // could have gotten `orgs` like portfolios w generic `find` since subscription already filtered
  const portfolios = Portfolios.find({}).fetch();
  let id = currUser._id;
  const ownersToPorts = {
    [id]: {
      name: `Me (${currUser.username})`,
      portfolios: [],
    },
  };

  for (let i = 0; i < orgs.length; i++) {
    id = orgs[i]._id;
    ownersToPorts[id] = {
      name: orgs[i].name,
      portfolios: [],
    };
  }

  let p;
  for (let i = 0; i < portfolios.length; i++) {
    p = portfolios[i];
    ownersToPorts[p.owner.id].portfolios.push(p);
  }

  const categories = [];
  for (id in ownersToPorts) {
    categories.push(ownersToPorts[id]);
  }
  return categories;
}

function composer(props, onData) {
  const currUser = props.currUser || Meteor.user();
  // this subscription has list info for portfolios and their owners (orgs)
  const handle = Meteor.subscribe('portfolios.listForUser', currUser._id);
  if (handle.ready()) {
    onData(null, { currUser, getCategories });
  }
}

export default composeWithTracker(composer)(Home);
