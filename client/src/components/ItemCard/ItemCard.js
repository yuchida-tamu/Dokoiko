import React, { Fragment } from 'react';

const ItemCard = props => {
  const itemStyle = props.isExpanded
    ? 'col  item-card'
    : 'col  item-card item-card-shrinked';
  const content = props.isExpanded ? (
    <Fragment>
      <div className='card-content'>
        <p className='truncate'>{props.item.description}</p>
      </div>
      <div className='card-action'></div>
    </Fragment>
  ) : (
    <i className='material-icons medium' style={{ color: '#5c6bc0' }}>
      palette
    </i>
  );
  return (
    <li
      key={props.item.id}
      className={itemStyle}
      onClick={() => {
        props.click(props.item);
      }}
    >
      <div className='card indigo darken-1 hoverable'>
        <div className='card-image'>
          <img src={props.photo} />
        </div>
        <h5 className='card-title'>{props.item.name}</h5>
        {content}
      </div>
    </li>
  );
};

export default ItemCard;
