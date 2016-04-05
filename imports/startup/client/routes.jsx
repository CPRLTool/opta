import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import React from 'react';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import MainLayout from '../../ui/layouts/main.jsx';
import Home from '../../ui/components/home.jsx';
// import Private from '../../ui/components/private.jsx';
import NotFound from '../../ui/components/not_found.jsx';
import Login from '../../ui/components/login.jsx';

const publicRoutes = FlowRouter.group({ name: 'public' });

publicRoutes.route('/login', {
  name: 'login',
  action() {
    mount(MainLayout, {
      content: (<Login />),
    });
  },
});

const authenticatedRoutes = FlowRouter.group({ name: 'authenticated' });

authenticatedRoutes.route('/', {
  name: 'home',
  action() {
    mount(MainLayout, {
      content: (<Home />),
    });
  },
});

FlowRouter.notFound = {
  action() {
    mount(MainLayout, {
      content: (<NotFound />),
    });
  },
};

FlowRouter.route('/logout', {
  name: 'logout',
  action() {
    AccountsTemplates.logout();
  },
});


// // FlowRouter.route("/", {
// //   name: "home",
// //   action() {
// //     ReactLayout.render(MainLayout, { content: <Home /> });
// //   }
// // });

// FlowRouter.route('/', {
//   name: 'home',
//   action() {
//     mount(MainLayout, {
//       content: () => (<Home />),
//     });
//   },
// });

// // Or optionally overwrite the default nav/footer with custom components

// // FlowRouter.route("/", {
// //   name: "home",
// //   action() {
// //     ReactLayout.render(MainLayout, {
// //       nav: <CustomNav />,
// //       content: <Home />,
// //       footer: <CustomFooter />
// //     });
// //   }
// // });

// // FlowRouter.route("/private", {
// //   name: "private",
// //   triggersEnter: [AccountsTemplates.ensureSignedIn], // force login
// //   action() {
// //     ReactLayout.render(MainLayout, { content: <Private /> });
// //   }
// // });

// FlowRouter.route('/private', {
//   name: 'private',
//   triggersEnter: [AccountsTemplates.ensureSignedIn], // force login
//   action() {
//     mount(MainLayout, {
//       content: () => (<Private />),
//     });
//   },
// });

// // FlowRouter.route("/logout", {
// //   name: "logout",
// //   action() {
// //     Meteor.logout(() => {
// //       FlowRouter.redirect("/");
// //     });
// //   }
// // });

// FlowRouter.route('/logout', {
//   name: 'logout',
//   action() {
//     AccountsTemplates.logout();
//   },
// });

// // FlowRouter.notFound = {
// //   action() {
// //     ReactLayout.render(MainLayout, { content: <NotFound /> });
// //   }
// // };

// FlowRouter.notFound = {
//   action() {
//     mount(MainLayout, {
//       content: () => (<NotFound />),
//     });
//   },
// };


// // UserAccounts Routes
// AccountsTemplates.configureRoute('changePwd');
// AccountsTemplates.configureRoute('forgotPwd');
// AccountsTemplates.configureRoute('resetPwd');
// AccountsTemplates.configureRoute('signIn');
// AccountsTemplates.configureRoute('signUp');
// AccountsTemplates.configureRoute('verifyEmail');

