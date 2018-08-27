import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.object
  };

  componentDidMount() {
    browserHistory.push('/map');
  }

  render() {
    return (
      <div>
        <div>This is my app!</div>
        {this.props.children}
      </div>
    );
  }
}
