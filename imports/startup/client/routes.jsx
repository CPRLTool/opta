// import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import React from 'react';
import { mount } from 'react-mounter';

import AppLayout from '../../ui/layouts/app.jsx';
import Home from '../../ui/containers/home';
import NotFound from '../../ui/components/not_found.jsx';
import UserProfile from '../../ui/containers/user_profile';
import CreateOrg from '../../ui/containers/create_org';
import OrgProfile from '../../ui/containers/org_profile';
import CreatePort from '../../ui/containers/create_port';
import PortDash from '../../ui/containers/port_dash';
import CreateInit from '../../ui/containers/create_init';


// UserAccounts Routes
FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);

AccountsTemplates.configureRoute('signIn', {
  name: 'signIn',
  path: '/sign-in',
});
AccountsTemplates.configureRoute('signUp', {
  name: 'signUp',
  path: '/sign-up',
});
AccountsTemplates.configureRoute('changePwd', {
  name: 'changePwd',
  path: '/change-password',
});
AccountsTemplates.configureRoute('forgotPwd', {
  name: 'forgotPwd',
  path: '/forgot-password',
});
AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
  path: '/reset-password',
});
AccountsTemplates.configureRoute('enrollAccount', {
  name: 'enrollAccount',
  path: '/enroll-account',
});
AccountsTemplates.configureRoute('verifyEmail', {
  name: 'verifyEmail',
  path: '/verify-email',
});
AccountsTemplates.configureRoute('resendVerificationEmail', {
  name: 'resendVerificationEmail',
  path: '/resend-verification-email',
});

FlowRouter.route('/logout', {
  name: 'logout',
  action() {
    AccountsTemplates.logout();
  },
});

// const authenticatedRoutes = FlowRouter.group({ name: 'authenticated' });

FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(AppLayout, {
      main: <Home />,
    });
  },
});

FlowRouter.notFound = {
  action() {
    mount(AppLayout, {
      main: <NotFound />,
    });
  },
};

const userRoutes = FlowRouter.group({
  prefix: '/user',
});

userRoutes.route('/:username', {
  name: 'user.profile',
  action(params) {
    mount(AppLayout, {
      main: <UserProfile username={params.username} />,
    });
  },
});

const orgRoutes = FlowRouter.group({
  prefix: '/organization',
});

orgRoutes.route('/create', {
  name: 'organization.create',
  action() {
    mount(AppLayout, {
      main: <CreateOrg />,
    });
  },
});

orgRoutes.route('/:name', {
  name: 'organization.profile',
  action(params) {
    mount(AppLayout, {
      main: <OrgProfile name={params.name} />,
    });
  },
});

const portfolioRoutes = FlowRouter.group({
  prefix: '/portfolio',
});

portfolioRoutes.route('/create', {
  name: 'portfolio.create',
  action() {
    mount(AppLayout, {
      main: <CreatePort />,
    });
  },
});

portfolioRoutes.route('/:id', {
  name: 'portfolio.dashboard',
  action(params) {
    mount(AppLayout, {
      main: <PortDash id={params.id} />,
    });
  },
});

const initiativeRoutes = FlowRouter.group({
  prefix: '/initiative',
});

initiativeRoutes.route('/create', {
  name: 'initiative.create',
  action() {
    mount(AppLayout, {
      main: <CreateInit />,
    });
  },
});

initiativeRoutes.route('/:id', {
  name: 'initiative.dashboard',
  action(params) {
    mount(AppLayout, {
      // main: <OrgProfile name={params.name} />,
    });
  },
});
