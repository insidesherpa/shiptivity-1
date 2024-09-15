import React, { useState, useEffect, useRef } from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';

const Board = () => {
  let clients = getClients();
  const [clientState, setClientState] = useState({
    backlog: clients.filter(client => !client.status || client.status === 'backlog'),
    inProgress: clients.filter(client => client.status && client.status === 'in-progress'),
    complete: clients.filter(client => client.status && client.status === 'complete'),
  });

  console.log(clients);

  const swimlanes = {
    backlog: useRef(null),
    inProgress: useRef(null),
    complete: useRef(null),
  };

  function getClients() {
    return [
      ['1','Stark, White and Abbott','Cloned Optimal Architecture', 'backlog'],
      ['2','Wiza LLC','Exclusive Bandwidth-Monitored Implementation', 'backlog'],
      ['3','Nolan LLC','Vision-Oriented 4Thgeneration Graphicaluserinterface', 'backlog'],
      ['4','Thompson PLC','Streamlined Regional Knowledgeuser', 'backlog'],
      ['5','Walker-Williamson','Team-Oriented 6Thgeneration Matrix', 'backlog'],
      ['6','Boehm and Sons','Automated Systematic Paradigm', 'backlog'],
      ['7','Runolfsson, Hegmann and Block','Integrated Transitional Strategy', 'backlog'],
      ['8','Schumm-Labadie','Operative Heuristic Challenge', 'backlog'],
      ['9','Kohler Group','Re-Contextualized Multi-Tasking Attitude', 'backlog'],
      ['10','Romaguera Inc','Managed Foreground Toolset', 'backlog'],
      ['11','Reilly-King','Future-Proofed Interactive Toolset', 'backlog'],
      ['12','Emard, Champlin and Runolfsdottir','Devolved Needs-Based Capability', 'backlog'],
      ['13','Fritsch, Cronin and Wolff','Open-Source 3Rdgeneration Website', 'backlog'],
      ['14','Borer LLC','Profit-Focused Incremental Orchestration', 'backlog'],
      ['15','Emmerich-Ankunding','User-Centric Stable Extranet', 'backlog'],
      ['16','Willms-Abbott','Progressive Bandwidth-Monitored Access', 'backlog'],
      ['17','Brekke PLC','Intuitive User-Facing Customerloyalty', 'backlog'],
      ['18','Bins, Toy and Klocko','Integrated Assymetric Software', 'backlog'],
      ['19','Hodkiewicz-Hayes','Programmable Systematic Securedline', 'backlog'],
      ['20','Murphy, Lang and Ferry','Organized Explicit Access', 'backlog'],
    ].map(companyDetails => ({
      id: companyDetails[0],
      name: companyDetails[1],
      description: companyDetails[2],
      status: companyDetails[3],
    }));
  }

  const renderSwimlane = (name, clients, ref, status) => {
    return <Swimlane name={name} clients={clients} dragulaRef={ref} status={status}/>;
  };

  useEffect(() => {
  const drake = Dragula([
    swimlanes.backlog.current,
    swimlanes.inProgress.current,
    swimlanes.complete.current
  ]);

  drake.on("drop", async (el, target, source, sibling) => {
    const clientId = el.getAttribute("data-id");
    const newStatus = target.getAttribute('data-status'); // Get the new status from the target swimlane

    const updatedClients = clients.map(client =>
        client.id === clientId ? { ...client, status: newStatus } : client
    );

    setClientState({
      backlog: updatedClients.filter(client => !updatedClients.status || updatedClients.status === 'backlog'),
      inProgress: updatedClients.filter(client => updatedClients.status && updatedClients.status === 'in-progress'),
      complete: updatedClients.filter(client => updatedClients.status && updatedClients.status === 'complete'),
    })
    clients = updatedClients;
    console.log("Dropped element ID: " + clientId);
    console.log("New status: " + newStatus);
    console.log("Status update: " + updatedClients[clientId-1].status);
  });


  return () => {
    drake.destroy();
  };
}, []);

    console.log("swimlanes" + swimlanes.backlog);


  return (
    <div className="Board">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            {renderSwimlane('Backlog', clientState.backlog, swimlanes.backlog, 'backlog')}
          </div>
          <div className="col-md-4">
            {renderSwimlane('In Progress', clientState.inProgress, swimlanes.inProgress, 'in-progress')}
          </div>
          <div className="col-md-4">
            {renderSwimlane('Complete', clientState.complete, swimlanes.complete, 'complete')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;


