import React from 'react';

const Home = ({ currUser }) => (
  <div className="container">
    <div className="text-center">
      <h2>Welcome to Opta!</h2>
      { currUser
        ? <p>
          Please take a moment to update <a href={`/user/${currUser.username}`}>your profile.</a>
        </p>
        : ''
      }
    </div>
  </div>
);

export default Home;
