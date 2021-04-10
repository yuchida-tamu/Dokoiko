import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useCurrentUserContext } from '../../contexts/CurrentUserContext';
import { userReducer } from '../../helpers/helper';

const Auth = () => {
  const { user, setUser } = useCurrentUserContext();
  const history = useHistory();
  //manage Auth state, signin or signup
  const [isSignIn, setIsSignIn] = useState(true);

  const onSubmitHandler = event => {
    event.preventDefault();

    const loginInfo = {
      username: event.target[0].value,
      password: event.target[1].value,
    };

    axios
      .post('/auth/login', loginInfo)
      .then(response => {
        if (!response.data.user._id) return;
        const processedUser = userReducer(response.data.user, true);
        console.log('current', processedUser);
        sessionStorage.setItem('currentUser', processedUser);
        setUser(processedUser);
        history.push('/user');
      })
      .catch(err => {
        console.error('Failed to login: ', err);
        window.alert('Failed to Login. Could not authenticate with the info');
      });
  };

  const onSubmitToCreateHandler = event => {
    event.preventDefault();
    const {
      username,
      firstname,
      lastname,
      email,
      password,
      passwordconfirm,
    } = event.target;
    //check if passsword and password for confirmation match
    if (password.value !== passwordconfirm.value)
      return window.alert("Passwords you entered don't match");

    const newUser = {
      username: username.value,
      first_name: firstname.value,
      last_name: lastname.value,
      email: email.value,
      password: password.value,
    };
    console.log(newUser);

    axios
      .post('/api/v1/user/new', newUser)
      .then(response => {
        console.log(response.data);
        if (response.data.status !== 'SUCCESS') {
          window.alert("Couldn't sign up successfully. Please try again");
        }
        const processedUser = userReducer(response.data.user, true);
        setUser(processedUser);
        history.push('/user');
      })
      .catch(err => {
        console.error('Failed to create a new user: ', err);
        window.alert("Couldn't sign up successfully. Please try again");
      });
  };

  const onToggleHandler = () => {
    setIsSignIn(!isSignIn);
  };

  return isSignIn ? (
    <div className='auth-card'>
      <h2>Welcome Back!</h2>

      <form onSubmit={onSubmitHandler} className='auth-card__form'>
        <input
          className='auth-username'
          type='text'
          name='username'
          placeholder='Your Username'
        />

        <input className='auth-password' type='password' name='password' />

        <button
          className='auth-btn'
          className='btn waves-effect waves-light'
          type='submit'
          name='action'
        >
          Sign In
        </button>
      </form>
      <a href='#' onClick={onToggleHandler}>
        Create a new account
      </a>
    </div>
  ) : (
    <div className='auth-card auth-card-new'>
      <h2>Create Your Account</h2>

      <form onSubmit={onSubmitToCreateHandler} className='auth-card__form'>
        <label for='username'>Username</label>
        <input
          className='auth-username'
          type='text'
          name='username'
          placeholder='Your Username'
        />
        <label for='firstname'>First</label>
        <input
          className='auth-firstname'
          type='text'
          name='firstname'
          placeholder='First Name'
        />
        <label for='lastname'>Last</label>
        <input
          className='auth-lastname'
          type='text'
          name='lastname'
          placeholder='Last Name'
        />
        <label for='email'>Email</label>
        <input
          className='auth-email'
          type='email'
          name='email'
          placeholder='email@example.com'
        />
        <label for='password'>Password</label>
        <input className='auth-password' type='password' name='password' />
        <label for='passwordconfirm'>Confirm</label>
        <input
          className='auth-password-confirm'
          type='password'
          name='passwordconfirm'
        />

        <button
          className='auth-btn btn waves-effect waves-light'
          type='submit'
          name='action'
        >
          Create
        </button>
      </form>
      <a href='#' onClick={onToggleHandler}>
        Sign in with different account
      </a>
    </div>
  );
};

export default Auth;
