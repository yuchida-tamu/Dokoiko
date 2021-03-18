import React, { useState } from 'react';

const Modal = () => {
  const [isTriggered, setIsTriggered] = useState(false);

  const onClickToggleHandler = () => {
    const toggle = !isTriggered;
    setIsTriggered(toggle);
  };

  /*NOTE
  Change add to existing button to icon to indicate the dropdown menu toggle
  Add "Add" button at the bottom of the drop down menu(hide it while the dropdown is not visible as well)
  */

  return (
    <div className='plan-modal'>
      <div className='plan-form'>
        <label>New Plan</label>
        <form>
          <input
            type='input'
            placeholder='New Plan Name'
            className='plan-form__text-input'
          />
          <input
            type='date'
            id='start'
            name='plan-start'
            value='2021-03-19'
            min='2018-01-01'
            max='2999-12-31'
          ></input>
        </form>
        <button className='btn plan-form__btn deep-orange '>CREATE</button>
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
          <li>plan one</li>
          <li className='divider'></li>
          <li>plan two</li>
        </ul>
      </div>
    </div>
  );
};

export default Modal;
