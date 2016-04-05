import React from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';

const Login = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <Blaze template="atForm" />
      </div>
    </div>
  </div>
);

export default Login;
