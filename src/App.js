import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Search from "./Search";
import Dashboard from "./Dashboard";
import "./App.css";

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
                return <Dashboard />;
              }}
            />
            <Route
              path="/search"
              exact
              render={() => {
                console.log("search");
                return <Search />;
              }}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default BooksApp;
