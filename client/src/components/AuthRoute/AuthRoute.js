import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const AuthRoute = props => {
  const { isAuthUser, target } = props;
  if (!isAuthUser) return <Redirect to={target} />;

  return <Route {...props} />;
};

export default AuthRoute;
