import React from 'react';
import './Card.css';

export default function Card(props) {
  const getStatusClassName = (status) => {
    switch (status) {
      case "backlog":
        return "Card-grey";
      case "in-progress":
        return "Card-blue";
      case "complete":
        return "Card-green";
      default:
        return "";
    }
  };

  return (
    <div
      className={`Card ${getStatusClassName(props.status)}`}
      data-id={props.id}
      data-status={props.status}
    >
      <div className="Card-title">{props.name}</div>
    </div>
  );
}
  
