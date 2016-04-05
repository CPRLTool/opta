import React from 'react';

// import Nav from '../components/nav.jsx';
import Nav from '../containers/nav.js';
import Footer from '../components/footer.jsx';


const MainLayout = ({ content }) => (
  <div>
    <header>
      <Nav />
    </header>
    <main>
      {content}
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
);

export default MainLayout;
