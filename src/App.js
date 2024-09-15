import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import HomeTab from './HomeTab';
import Navigation from './Navigation';
import Board from './Board';
import './App.css';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('home');

  const renderShippingRequests = () => {
    return <Board />;
  };

  const renderNavigation = () => {
    return (
      <Navigation
        onClick={(tabName) => changeTab(tabName)}
        selectedTab={selectedTab}
      />
    );
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'home':
      default:
        return <HomeTab />;
      case 'shipping-requests':
        return renderShippingRequests();
    }
  };

  const changeTab = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <div className="App">
      {renderNavigation()}

      <div className="App-body">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default App;
