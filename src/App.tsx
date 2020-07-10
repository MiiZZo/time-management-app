import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes } from "./routes";
import "./App.scss";

const Routes = routes.map((route) => {
  const { path, component, exact } = route;

  return <Route key={path} path={path} component={component} exact={exact} />;
});

export const App = (): JSX.Element => {
  return (
    <Router>
      <Switch>{Routes}</Switch>
    </Router>
  );
};
