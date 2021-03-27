import React, { useState } from 'react';

const Modal = ({ submit, plans }) => {
  const [isTriggered, setIsTriggered] = useState(false);

  const onClickToggleHandler = () => {
    const toggle = !isTriggered;
    setIsTriggered(toggle);
  };

  /*NOTE
  Change add to existing button to icon to indicate the dropdown menu toggle
  Add "Add" button at the bottom of the drop down menu(hide it while the dropdown is not visible as well)


  3/19
  Need close btn or logic to close when other area is clicked
  */

  return (
    <div className='plan-modal'>
      <div className='plan-form'>
        <label>New Plan</label>
        <form onSubmit={submit}>
          <input
            type='input'
            placeholder='New Plan Name'
            className='plan-form__text-input'
          />
          <input
            type='date'
            id='start'
            name='plan-start'
            min='2018-01-01'
            max='2999-12-31'
          ></input>
          <button className='btn plan-form__btn deep-orange '>CREATE</button>
        </form>
      </div>
      <div className='plan-dropdown'>
        <h5>Add to existing plans</h5>
        {/* <div
          className='plan-dropdown__trigger btn'
          onClick={onClickToggleHandler}
        >
          <i className='material-icons'>expand_more</i>
        </div> */}
        <ul
          className={
            isTriggered ? 'plan-dropdown__content' : 'plan-dropdown__content'
          }
        >
          {plans}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
