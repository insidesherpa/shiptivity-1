import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import HomeTab from './HomeTab';
import KanbanBoard from './KanbanBoard';
import Navigation from './Navigation';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
    };
  }

  renderShippingRequests() {
    return (<Board />);
  }

  renderKanbanBoard() {
    return (<KanbanBoard />);
  }

  renderNavigation() {
    return (
      <Navigation
        onClick={(tabName) => this.changeTab(tabName)}
        selectedTab={this.state.selectedTab}
      />
    );
  }

  renderTabContent() {
    switch(this.state.selectedTab) {
      case 'home':
      default:
        return <HomeTab />;
      case 'shipping-requests':
        return this.renderShippingRequests();
      case 'kanban-board':
        return this.renderKanbanBoard();
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderNavigation()}
        <div className="App-body">
          {this.renderTabContent()}
        </div>
      </div>
    );
  }

  changeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }
}

export default App;
