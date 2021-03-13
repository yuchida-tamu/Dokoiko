import React from 'react';

const Auth = () => {
  const onSubmitHandler = event => {
    event.preventDefault();
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
