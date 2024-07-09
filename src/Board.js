import React from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    const clients = this.getClients();
    this.state = {
      clients: {
        backlog: clients.filter(client => !client.status || client.status === 'backlog'),
        inProgress: clients.filter(client => client.status && client.status === 'in-progress'),
        complete: clients.filter(client => client.status && client.status === 'complete'),
      }
    }
    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef(),
    }
  }
  componentDidMount(){
    const containers = [
      this.swimlanes.backlog.current,
      this.swimlanes.inProgress.current,
      this.swimlanes.complete.current
    ];
    Dragula(containers).on('drop',(el,target,source)=>{
      const clientId = el.getAttribute('data-id');
      const sourceLane = source.getAttribute('data-lane');
      const targetLane = target.getAttribute('data-lane');
      
      console.log(`Card with ID ${clientId} dropped from ${sourceLane} to ${targetLane}`);

      if(sourceLane !== targetLane){
        this.updateClientStatus(clientId,targetLane)
        this.updateCardColor(el, targetLane);
      }
    })
  }
  updateClientStatus(clientId, newStatus) {
    console.log(`Updating client ${clientId} status to ${newStatus}`);

    // Update state using functional setState to avoid state mutation issues
    this.setState(prevState => {
      // Ensure prevState.clients is initialized correctly
      const { backlog, inProgress, complete } = prevState.clients;

      const updatedClients = {
        backlog: backlog.map(client => (client.id === clientId ? { ...client, status: newStatus } : client)),
        inProgress: inProgress.map(client => (client.id === clientId ? { ...client, status: newStatus } : client)),
        complete: complete.map(client => (client.id === clientId ? { ...client, status: newStatus } : client)),
      };

      return { clients: updatedClients };
    });
  }

  updateCardColor(el, newStatus) {
    console.log(`Updating card color for element with ID ${el.getAttribute('data-id')} to ${newStatus}`);
    el.classList.remove('Card-grey', 'Card-blue', 'Card-green');

    if (newStatus === 'backlog') {
      el.classList.add('Card-grey');
    } else if (newStatus === 'in-progress') {
      el.classList.add('Card-blue');
    } else if (newStatus === 'complete') {
      el.classList.add('Card-green');
    }
  }
  getClients() {
    return [
      ['1','Stark, White and Abbott','Cloned Optimal Architecture', 'in-progress'],
      ['2','Wiza LLC','Exclusive Bandwidth-Monitored Implementation', 'complete'],
      ['3','Nolan LLC','Vision-Oriented 4Thgeneration Graphicaluserinterface', 'backlog'],
      ['4','Thompson PLC','Streamlined Regional Knowledgeuser', 'in-progress'],
      ['5','Walker-Williamson','Team-Oriented 6Thgeneration Matrix', 'in-progress'],
      ['6','Boehm and Sons','Automated Systematic Paradigm', 'backlog'],
      ['7','Runolfsson, Hegmann and Block','Integrated Transitional Strategy', 'backlog'],
      ['8','Schumm-Labadie','Operative Heuristic Challenge', 'backlog'],
      ['9','Kohler Group','Re-Contextualized Multi-Tasking Attitude', 'backlog'],
      ['10','Romaguera Inc','Managed Foreground Toolset', 'backlog'],
      ['11','Reilly-King','Future-Proofed Interactive Toolset', 'complete'],
      ['12','Emard, Champlin and Runolfsdottir','Devolved Needs-Based Capability', 'backlog'],
      ['13','Fritsch, Cronin and Wolff','Open-Source 3Rdgeneration Website', 'complete'],
      ['14','Borer LLC','Profit-Focused Incremental Orchestration', 'backlog'],
      ['15','Emmerich-Ankunding','User-Centric Stable Extranet', 'in-progress'],
      ['16','Willms-Abbott','Progressive Bandwidth-Monitored Access', 'in-progress'],
      ['17','Brekke PLC','Intuitive User-Facing Customerloyalty', 'complete'],
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
  renderSwimlane(name, clients, ref) {
    return (
      <Swimlane name={name} clients={clients} dragulaRef={ref}/>
    );
  }

  render() {
    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              {this.renderSwimlane('Backlog', this.state.clients.backlog, this.swimlanes.backlog)}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('In Progress', this.state.clients.inProgress, this.swimlanes.inProgress)}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('Complete', this.state.clients.complete, this.swimlanes.complete)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
