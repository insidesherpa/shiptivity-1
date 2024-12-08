import React, { Component, createRef } from "react";
import Dragula from "dragula";
import "dragula/dist/dragula.css";
import Swimlane from "./Swimlane";
import "./Board.css";

// Client data array
const CLIENTS_DATA = [
  [
    "1",
    "Stark, White and Abbott",
    "Cloned Optimal Architecture",
    "in-progress",
  ],
  ["2", "Wiza LLC", "Exclusive Bandwidth-Monitored Implementation", "complete"],
  [
    "3",
    "Nolan LLC",
    "Vision-Oriented 4Thgeneration Graphicaluserinterface",
    "backlog",
  ],
  ["4", "Thompson PLC", "Streamlined Regional Knowledgeuser", "in-progress"],
  [
    "5",
    "Walker-Williamson",
    "Team-Oriented 6Thgeneration Matrix",
    "in-progress",
  ],
  ["6", "Boehm and Sons", "Automated Systematic Paradigm", "backlog"],
  [
    "7",
    "Runolfsson, Hegmann and Block",
    "Integrated Transitional Strategy",
    "backlog",
  ],
  ["8", "Schumm-Labadie", "Operative Heuristic Challenge", "backlog"],
  ["9", "Kohler Group", "Re-Contextualized Multi-Tasking Attitude", "backlog"],
  ["10", "Romaguera Inc", "Managed Foreground Toolset", "backlog"],
  ["11", "Reilly-King", "Future-Proofed Interactive Toolset", "complete"],
  [
    "12",
    "Emard, Champlin and Runolfsdottir",
    "Devolved Needs-Based Capability",
    "backlog",
  ],
  [
    "13",
    "Fritsch, Cronin and Wolff",
    "Open-Source 3Rdgeneration Website",
    "complete",
  ],
  ["14", "Borer LLC", "Profit-Focused Incremental Orchestration", "backlog"],
  ["15", "Emmerich-Ankunding", "User-Centric Stable Extranet", "in-progress"],
  [
    "16",
    "Willms-Abbott",
    "Progressive Bandwidth-Monitored Access",
    "in-progress",
  ],
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

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: {
        backlog: [],
        inProgress: [],
        complete: [],
      },
    };

    // Refs for swimlanes
    this.swimlanes = {
      backlog: createRef(),
      inProgress: createRef(),
      complete: createRef(),
    };
  }

  // Get class name based on status
  getClassName = (status) => STATUS_CLASSES[status] || "Card";

  // Fetch and organize clients by their status
  getClients = () => {
    return CLIENTS_DATA.map(([id, name, description, status]) => ({
      id,
      name,
      description,
      status,
    }));
  };

  componentDidMount() {
    const clientData = this.getClients();
    this.setState({
      clients: {
        backlog: clientData.filter((client) => client.status === "backlog"),
        inProgress: clientData.filter(
          (client) => client.status === "in-progress"
        ),
        complete: clientData.filter((client) => client.status === "complete"),
      },
    });

    // Initialize drag-and-drop
    const containers = Object.values(this.swimlanes).map((ref) => ref.current);
    this.drake = Dragula(containers);

    // Handle item drop event
    this.drake.on("drop", (el, target) => {
      let currentStatus = el.getAttribute("data-status");
      let targetStatus = target.getAttribute("data-status");

      // Update status and class on drop
      el.classList.remove(this.getClassName(currentStatus));

      if (currentStatus !== targetStatus) {
        currentStatus = targetStatus;
        el.setAttribute("data-status", currentStatus);
        el.classList.add(this.getClassName(targetStatus));
      } else {
        el.classList.add(this.getClassName(currentStatus));
      }
    });
  }

  componentWillUnmount() {
    if (this.drake) {
      this.drake.destroy();
    }
  }

  // Render each swimlane with its corresponding clients
  renderSwimlane(name, clients, ref) {
    return <Swimlane name={name} clients={clients} dragulaRef={ref} />;
  }

  render() {
    const { clients } = this.state;

    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              {this.renderSwimlane(
                "Backlog",
                clients.backlog,
                this.swimlanes.backlog
              )}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane(
                "In Progress",
                clients.inProgress,
                this.swimlanes.inProgress
              )}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane(
                "Complete",
                clients.complete,
                this.swimlanes.complete
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
