import React from 'react';
import './Card.css';

const STATUS_CLASSES = {
  backlog: "Card-grey",
  "in-progress": "Card-blue",
  complete: "Card-green",
};

export default function Card({ id, name, status }) {
  // Get the class name based on the status
  const statusClass = STATUS_CLASSES[status] || "";

  return (
    <div className={`Card ${statusClass}`} data-id={id} data-status={status}>
      <div className="Card-title">{name}</div>
    </div>
  );
}
