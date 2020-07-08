import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';  
import { routes } from './routes';
import 'antd/dist/antd.css';
import './App.css';

const Routes = routes.map((route) => {
    const { path, component, exact } = route;
    
    return (
        <Route 
            path={path}
            component={component}
            exact={exact}
        />
    )
});

export const App = (): JSX.Element => {
    return (
        <Router>
            <Switch>
                { Routes }
            </Switch>
        </Router>
    )
}
