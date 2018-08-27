import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import { browserHistory } from 'react-router';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import store from './store';

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <Routes history={browserHistory} />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
