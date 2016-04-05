import { AccountsTemplates } from 'meteor/useraccounts:core';
import { FlowRouter } from 'meteor/kadira:flow-router';

const postLogout = () => {
  // example redirect after logout
  FlowRouter.redirect('/');
};

const postSubmit = (error, state) => {
  if (!error) {
    if (state === 'signIn') {
      FlowRouter.redirect('/');
    } else if (state === 'signUp') {
      FlowRouter.redirect('/');
    }
  }
};

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

  // Redirects
  homeRoutePath: '/',
  redirectTimeout: 4000,

  // Hooks
  onLogoutHook: postLogout,
  onSubmitHook: postSubmit,
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
});
