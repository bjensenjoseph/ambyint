// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';

import App from './App';
import Map from './pages/map/MapContainer';

const Routes = props => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/map" component={Map} />
  </Router>
);

export default Routes;
