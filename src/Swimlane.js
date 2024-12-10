import React, { Component } from "react";
import Card from "./Card";
import "./Swimlane.css";

// Mapping swimlane names to status values
const STATUS_MAP = {
  Backlog: "backlog",
  "In Progress": "in-progress",
  Complete: "complete",
};

class Swimlane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
    };
  }

  componentDidMount() {
    // Set the status based on the swimlane name
    this.setState({
      status: STATUS_MAP[this.props.name] || "",
    });
  }

  componentDidUpdate(prevProps) {
    // Update the status if the swimlane name changes
    if (prevProps.name !== this.props.name) {
      this.setState({
        status: STATUS_MAP[this.props.name] || "",
      });
    }
  }

  render() {
    const { name, clients, dragulaRef } = this.props;
    const { status } = this.state;

    return (
      <div className="Swimlane-column">
        <div className="Swimlane-title">{name}</div>
        <div
          className="Swimlane-dragColumn"
          ref={dragulaRef}
          data-status={status}
        >
          {clients.map((client) => (
            <Card
              key={client.id}
              id={client.id}
              name={client.name}
              description={client.description}
              status={status}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Swimlane;
