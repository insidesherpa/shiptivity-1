import React, { useEffect, useRef, useState } from "react";
import Dragula from "dragula";
import "dragula/dist/dragula.css";
import Swimlane from "./Swimlane";
import "./Board.css";

// Client data array
const CLIENTS_DATA = [
  ["1", "Stark, White and Abbott", "Cloned Optimal Architecture", "in-progress"],
  ["2", "Wiza LLC", "Exclusive Bandwidth-Monitored Implementation", "complete"],
  ["3", "Nolan LLC", "Vision-Oriented 4Thgeneration Graphicaluserinterface", "backlog"],
  ["4", "Thompson PLC", "Streamlined Regional Knowledgeuser", "in-progress"],
  ["5", "Walker-Williamson", "Team-Oriented 6Thgeneration Matrix", "in-progress"],
  ["6", "Boehm and Sons", "Automated Systematic Paradigm", "backlog"],
  ["7", "Runolfsson, Hegmann and Block", "Integrated Transitional Strategy", "backlog"],
  ["8", "Schumm-Labadie", "Operative Heuristic Challenge", "backlog"],
  ["9", "Kohler Group", "Re-Contextualized Multi-Tasking Attitude", "backlog"],
  ["10", "Romaguera Inc", "Managed Foreground Toolset", "backlog"],
  ["11", "Reilly-King", "Future-Proofed Interactive Toolset", "complete"],
  ["12", "Emard, Champlin and Runolfsdottir", "Devolved Needs-Based Capability", "backlog"],
  ["13", "Fritsch, Cronin and Wolff", "Open-Source 3Rdgeneration Website", "complete"],
  ["14", "Borer LLC", "Profit-Focused Incremental Orchestration", "backlog"],
  ["15", "Emmerich-Ankunding", "User-Centric Stable Extranet", "in-progress"],
  ["16", "Willms-Abbott", "Progressive Bandwidth-Monitored Access", "in-progress"],
  ["17", "Brekke PLC", "Intuitive User-Facing Customerloyalty", "complete"],
  ["18", "Bins, Toy and Klocko", "Integrated Assymetric Software", "backlog"],
  ["19", "Hodkiewicz-Hayes", "Programmable Systematic Securedline", "backlog"],
  ["20", "Murphy, Lang and Ferry", "Organized Explicit Access", "backlog"],
];

// Status to card class mapping
const STATUS_CLASSES = {
  backlog: "Card-grey",
  "in-progress": "Card-blue",
  complete: "Card-green",
};

// Main Board Component
export default function Board() {
  // Refs for swimlanes
  const swimlanes = {
    backlog: useRef(),
    inProgress: useRef(),
    complete: useRef(),
  };

  // State for holding the clients grouped by status
  const [clients, setClients] = useState({
    backlog: [],
    inProgress: [],
    complete: [],
  });

  // Get class name based on status
  const getClassName = (status) => STATUS_CLASSES[status] || "Card";

  // Fetch and organize clients by their status
  const getClients = () => {
    return CLIENTS_DATA.map(([id, name, description, status]) => ({
      id,
      name,
      description,
      status,
    }));
  };

  // Set clients into the state when component mounts
  useEffect(() => {
    const clientData = getClients();
    setClients({
      backlog: clientData.filter(client => client.status === "backlog"),
      inProgress: clientData.filter(client => client.status === "in-progress"),
      complete: clientData.filter(client => client.status === "complete"),
    });

    // Initialize drag-and-drop
    const containers = Object.values(swimlanes).map((ref) => ref.current);
    const drake = Dragula(containers);

    // Handle item drop event
    drake.on("drop", (el, target) => {
      let currentStatus = el.getAttribute("data-status");
      let targetStatus = target.getAttribute("data-status");

      // Update status and class on drop
      el.classList.remove(getClassName(currentStatus));

      if (currentStatus !== targetStatus) {
        currentStatus = targetStatus;
        el.setAttribute("data-status", currentStatus);
        el.classList.add(getClassName(targetStatus));
      } else {
        el.classList.add(getClassName(currentStatus));
      }
    });

    // Clean up on component unmount
    return () => {
      drake.destroy();
    };
  }, []);

  // Render each swimlane with its corresponding clients
  const renderSwimlane = (name, clients, ref) => (
    <Swimlane name={name} clients={clients} dragulaRef={ref} />
  );

  return (
    <div className="Board">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            {renderSwimlane("Backlog", clients.backlog, swimlanes.backlog)}
          </div>
          <div className="col-md-4">
            {renderSwimlane("In Progress", clients.inProgress, swimlanes.inProgress)}
          </div>
          <div className="col-md-4">
            {renderSwimlane("Complete", clients.complete, swimlanes.complete)}
          </div>
        </div>
      </div>
    </div>
  );
}
