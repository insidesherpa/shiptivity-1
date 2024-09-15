import React from 'react';
import './Card.css';

const Card = ({ id, status, name }) => {
  let className = ['Card'];

  if (status === 'backlog') {
    className.push('Card-grey');
  } else if (status === 'in-progress') {
    className.push('Card-blue');
  } else if (status === 'complete') {
    className.push('Card-green');
  }

  return (
    <div className={className.join(' ')} data-id={id} data-status={status}>
      <div className="Card-title">{name}</div>
    </div>
  );
};

export default Card;
