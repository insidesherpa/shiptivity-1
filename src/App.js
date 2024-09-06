import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import HomeTab from "./HomeTab";
import Navigation from "./Navigation";
import Board from "./Board";
import "./App.css";

// we convert the class component to a functional component.
// Converting class components to functional components involves replacing the state management and lifecycle methods with React hooks.
function App() {
  const [selectedTab, setSelectedTab] = useState("home");

  const changeTab = (tabName) => {
    setSelectedTab(tabName);
  };
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

  const renderHomeTabContent = () => {
    switch (selectedTab) {
      case "home":
      default:
        return <HomeTab />;
      case "shipping-requests":
        return renderShippingRequests();
    }
  };
  return (
    <div className="App">
      {renderNavigation()}
      <div className="App-body">{renderHomeTabContent()}</div>
    </div>
  );
  
}


export default App;
