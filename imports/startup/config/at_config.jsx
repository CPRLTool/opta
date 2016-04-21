import React from 'react';
import { AccountsTemplates } from 'meteor/useraccounts:core';
// import { FlowRouter } from 'meteor/kadira:flow-router';
import AppLayout from '../../ui/layouts/app.jsx';
// import NavBar from '../../ui/components/navbar.jsx';
import Nav from '../../ui/containers/nav';
// import Footer from '../../ui/components/footer.jsx';

// const postLogout = () => {
//   // example redirect after logout
//   FlowRouter.redirect('/');
// };

// const postSubmit = (error, state) => {
//   if (!error) {
//     if (state === 'signIn') {
//       FlowRouter.redirect('/authenticated');
//     } else if (state === 'signUp') {
//       FlowRouter.redirect('/authenticated');
//     }
//   }
// };

AccountsTemplates.configure({
  // Behavior
  confirmPassword: true,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: false,
  lowercaseUsername: false,
  focusFirstInput: true,

  // Appearance
  showAddRemoveServices: false,
  showForgotPasswordLink: true,
  showLabels: true,
  showPlaceholders: true,
  showResendVerificationEmailLink: false,

  // Client-side Validation
  continuousValidation: false,
  negativeFeedback: false,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true,

  // Privacy Policy and Terms of Use
  privacyUrl: 'privacy',
  termsUrl: 'terms-of-use',

  // // Redirects
  // homeRoutePath: '/',
  // redirectTimeout: 4000,

  // Hooks
  // onLogoutHook: postLogout,
  // onSubmitHook: postSubmit,
  // preSignUpHook: myPreSubmitFunc,
  // postSignUpHook: myPostSubmitFunc,

  // Texts
  // texts: {
  //   button: {
  //       signUp: "Register Now!"
  //   },
  //   socialSignUp: "Register",
  //   socialIcons: {
  //       "meteor-developer": "fa fa-rocket"
  //   },
  //   title: {
  //       forgotPwd: "Recover Your Password"
  //   },
  // },

  // defaultLayoutType: 'blaze-to-react',
  defaultTemplate: 'fullPageAtForm',  // default
  defaultLayout: AppLayout,
  defaultLayoutRegions: {
    // nav: () => (<NavBar />),
    nav: <Nav />,
    // footer: () => (<Footer />),
  },
  defaultContentRegion: 'main',

});

const pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
    _id: 'username',
    type: 'text',
    displayName: 'username',
    required: true,
    minLength: 5,
  },
  {
    _id: 'email',
    type: 'email',
    required: true,
    displayName: 'email',
    re: /.+@(.+){2,}\.(.+){2,}/,
    errStr: 'Invalid email',
  },
  pwd,
]);

