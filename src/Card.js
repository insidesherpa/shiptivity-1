import React from 'react';
import './Card.css';

export default class Card extends React.Component {
  render() {
    let className = 'Card'; // Base class

    // Determine the status-specific class
    if (this.props.status === 'backlog') {
      className += ' Card-grey';
    } else if (this.props.status === 'in-progress') {
      className += ' Card-blue';
    } else if (this.props.status === 'complete') {
      className += ' Card-green';
    }

    return (
      <div className={className} data-id={this.props.id} data-status={this.props.status}>
        <div className="Card-title">{this.props.name}</div>
        <div className="Card-description">{this.props.description}</div>
      </div>
    );
  }
}
