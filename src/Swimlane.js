import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./Swimlane.css";

// Mapping swimlane names to status values
const STATUS_MAP = {
  Backlog: "backlog",
  "In Progress": "in-progress",
  Complete: "complete",
};

export default function Swimlane({ name, clients, dragulaRef }) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Set the status based on the swimlane name
    setStatus(STATUS_MAP[name] || "");
  }, [name]);

  return (
    <div className="Swimlane-column">
      <div className="Swimlane-title">{name}</div>
      <div className="Swimlane-dragColumn" ref={dragulaRef} data-status={status}>
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
