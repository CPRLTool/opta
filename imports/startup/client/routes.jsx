import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import React from 'react';
import { mount } from 'react-mounter';

import AppLayout from '../../ui/layouts/app.jsx';
import Home from '../../ui/containers/home';
import NotFound from '../../ui/components/not_found.jsx';
import UserProfile from '../../ui/containers/user_profile';
import CreateOrg from '../../ui/components/create_org.jsx';
import OrgProfile from '../../ui/containers/org_profile';

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

FlowRouter.route('/user/:username', {
  name: 'user.profile',
  triggersEnter: [(context, redirect) => {
    const handle = Meteor.subscribe('Meteor.users.defaultInfo');

    if (handle.ready()) {
      if (Meteor.users.find({ username: context.params.username }, { _id: 1 }).fetch().length === 0) {
        redirect('/');
      }
    }
  }],
  action(params) {
    mount(AppLayout, {
      main: <UserProfile username={params.username} />,
    });
  },
});

FlowRouter.route('/organization/create', {
  name: 'organization.create',
  action() {
    mount(AppLayout, {
      main: <CreateOrg />,
    });
  },
});

FlowRouter.route('/organization/:name', {
  name: 'organization.profile',
  action(params) {
    mount(AppLayout, {
      main: <OrgProfile name={params.name} />,
    });
  },
});

