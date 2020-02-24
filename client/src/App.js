import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import ShipmentDetails from "./components/ShipmentDetails";
import Home from "./components/Home";
import history from "./history/history";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route
              exact
              path='/details/:id'
              component={ShipmentDetails}
            ></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
