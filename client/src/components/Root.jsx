import React from 'react';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchUserInfo } from '../actions/actions.js';
import App from './App.jsx';
import Home from './Home.jsx';
import Nav from './Nav.jsx';
import SignUp from './SignUp.jsx';
import Trends from './trends/Root.jsx';
import Profile from './Profile.jsx';

export class Root extends React.Component {

  componentDidMount() {
    const { dispatchFetchUserInfo } = this.props;
    const token = localStorage.getItem('reflective_token');

    if (token) {
      dispatchFetchUserInfo(token);
    }
  }

  render() {
    return (
      <Provider store={this.props.store} >
        <div style={{ height: '100%' }}>
          <Nav />
          <ConnectedRouter history={this.props.history}>
            <div style={{ height: 'calc(100% - 48px)' }}>
              <Route exact path="/" component={Home} />
              <Route path="/entries" component={App} />
              <Route path="/signup" component={SignUp} />
              <Route path="/trends" component={Trends} />
              <Route path="/profile" component={Profile} />
            </div>
          </ConnectedRouter>
        </div>
      </Provider>
    );
  }
}

const mapStateToProps = state => (
  {
    ...state
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatchFetchUserInfo: token => dispatch(fetchUserInfo(token))
  }
);

Root.propTypes = {
  dispatchFetchUserInfo: PropTypes.func.isRequired,
  store: PropTypes.objectOf(PropTypes.oneOfType(
      [PropTypes.string, PropTypes.array, PropTypes.object]
    )).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
