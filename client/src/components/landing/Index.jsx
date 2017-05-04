import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { userEditEmail } from './user.actions.js';
import { userSubmitEmail } from '../signup/signup.actions.js'

const bgStyle = {
  backgroundImage: 'url(./assets/reflective_wallpaper.jpg)',
  height: '100%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};

const containerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -70%)',
  backgroundColor: 'rgba(0,0,0,0.5)',
  padding: '36px'
};

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onEmailFieldChange = this.onEmailFieldChange.bind(this);
  }

  onSubmitEmail() {
    this.props.dispatch(userSubmitEmail());
    this.props.dispatch(push('/signup'));
  }

  onEmailFieldChange(e) {
    this.props.dispatch(userEditEmail(e.target.value));
  }

  render() {
    return (
      <div
        className="ui vertical mastheadcenter aligned segment"
        style={bgStyle}
      >
        <div
          className="ui text container"
          style={containerStyle}
        >
          <h1
            className="ui inverted header"
            style={{ fontSize: '3rem' }}
          >
            Reflective
          </h1>
          <h3 style={{ fontSize: '1.4rem' }}>
            <span style={{ color: '#e3e7e8' }}>Get a 60 second phone call every day to record how your day went.</span>
          </h3>
          <form
            className="ui form"
            onSubmit={this.onSubmitEmail}
          >
            <div className="field">
              <input
                type="email" placeholder="E-mail address" required
                onChange={this.onEmailFieldChange}
              />
            </div>
            <button
              className="ui fluid large submit button"
              type="Submit"
              style={{ backgroundColor: '#3F93B8' }}
            >
              <span style={{ color: '#fff' }}>Get Started</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => (
  {
    ...state
  }
);

Home.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Home);
