import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SearchWithHooks from "./SearchWithHooks";
import DashboardWithHooks from "./DashboardWithHooks";
import "../App.css";

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                console.log("Dashboard");
                return <DashboardWithHooks />;
              }}
            />
            <Route
              path="/search"
              exact
              render={() => {
                console.log("search");
                return <SearchWithHooks />;
              }}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default BooksApp;
