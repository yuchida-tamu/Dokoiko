import React from 'react';

const UserEditForm = ({
  firstName,
  lastName,
  username,
  email,
  onFirstNameChange,
  onLastNameChange,
  onUsernameChange,
  onEmailChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <div className='row'>
      <div className='input-field col s6'>
        <input
          value={firstName}
          id='first_name'
          type='text'
          onChange={onFirstNameChange}
        />
        <label for='first_name' className='active'>
          First Name
        </label>
      </div>
      <div className='input-field col s6'>
        <input
          value={lastName}
          id='last_name'
          type='text'
          onChange={onLastNameChange}
        />
        <label for='last_name' className='active'>
          Last Name
        </label>
      </div>
    </div>
    <div className='row'>
      <div className='input-field col s12'>
        <i class='material-icons prefix'>account_circle</i>
        <input
          value={username}
          id='username'
          type='text'
          className='validate'
          onChange={onUsernameChange}
        />
      </div>
    </div>
    <div className='row'>
      <div className='input-field col s12'>
        <i class='material-icons prefix'>email</i>
        <input
          value={email}
          id='email'
          type='email'
          className='validate'
          onChange={onEmailChange}
        />
      </div>
    </div>
    <button class='btn waves-effect waves-light' type='submit' name='action'>
      UPDATE
    </button>
  </form>
);

export default UserEditForm;
