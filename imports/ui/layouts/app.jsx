import React from 'react';

// import Nav from '../components/nav.jsx';
// import NavBar from '../components/navbar.jsx';
import Nav from '../containers/nav';
// import Footer from '../components/footer.jsx';

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
  </div>
);

export default AppLayout;
