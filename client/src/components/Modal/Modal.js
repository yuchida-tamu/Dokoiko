import React, { useState } from 'react';

const Modal = () => {
  const [isTriggered, setIsTriggered] = useState(false);

  const onClickToggleHandler = () => {
    const toggle = !isTriggered;
    setIsTriggered(toggle);
  };

  return (
    <div className='plan-modal'>
      <div className='plan-form'>
        <label>New Plan</label>
        <form>
          <input type='input' placeholder='New Plan Name' />
        </form>
        <button className='btn plan-form__btn deep-orange '>CREATE</button>
      </div>
      <div className='plan-dropdown'>
        <div
          className='plan-dropdown__trigger btn'
          onClick={onClickToggleHandler}
        >
          Add To a Existing Plan
        </div>
        <ul
          className={
            isTriggered
              ? 'plan-dropdown__content'
              : 'plan-dropdown__content hidden'
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
