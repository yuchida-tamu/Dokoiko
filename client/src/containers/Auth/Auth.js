import React from 'react';
import axios from 'axios';
import { useCurrentUserContext } from '../../contexts/CurrentUserContext';
import { userReducer } from '../../helpers/helper';

const Auth = () => {
  const { user, setUser } = useCurrentUserContext();

  const onSubmitHandler = event => {
    event.preventDefault();

    const loginInfo = {
      username: event.target[0].value,
      password: event.target[1].value,
    };

    axios
      .post('/auth/login', loginInfo)
      .then(response => {
        const processedUser = userReducer(response.data.user, true);
        console.log('current', processedUser);
        setUser(processedUser);
        // console.log('current', user);
      })
      .catch(err => {
        console.error('Failed to login: ', err);
        window.alert('Failed to Login. Could not authenticate with the info');
      });
  };
  return (
    <div id='auth-card'>
      <h2>Welcome Back!</h2>
      <form onSubmit={onSubmitHandler} id='auth-card__form'>
        <input
          id='auth-username'
          type='text'
          name='username'
          placeholder='Your Username'
        />

        <input id='auth-password' type='password' name='password' />

        <button
          id='auth-btn'
          className='btn waves-effect waves-light'
          type='submit'
          name='action'
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Auth;
