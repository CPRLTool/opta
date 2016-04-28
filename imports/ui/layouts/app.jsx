import React from 'react';

import Nav from '../containers/nav';
// import Footer from '../components/footer.jsx';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
// import 'react-s-alert/dist/s-alert-css-effects/slide.css';
// import 'react-s-alert/dist/s-alert-css-effects/scale.css';
// import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
// import 'react-s-alert/dist/s-alert-css-effects/flip.css';
// import 'react-s-alert/dist/s-alert-css-effects/genie.css';
// import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

// const AppLayout = ({ nav = () => (<Nav />), main, footer = () => (<Footer />) }) => (
const AppLayout = ({ nav = <Nav />, main, footer }) => (
  <div>
    <header>
      {nav}
    </header>
    <main>
      {main}
    </main>
    <footer>
      {footer}
    </footer>
    <Alert stack={{ limit: 3 }} effect="stackslide" position="top" timeout={3333} />
  </div>
);

export default AppLayout;
