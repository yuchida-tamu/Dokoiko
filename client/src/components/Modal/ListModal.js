import React from 'react';

const ListModal = ({ plan }) => {
  const list = plan.list.map(item => (
    <li key={item.id} className='list-modal__item left-align'>
      <h5>{item.name}</h5>
    </li>
  ));
  return (
    <div className='list-modal'>
      <h5>{plan.name}</h5>
      <div>
        <p>
          <span>DATE: </span>
          {plan.date}
        </p>
      </div>
      <ul>{list}</ul>
    </div>
  );
};

export default ListModal;
