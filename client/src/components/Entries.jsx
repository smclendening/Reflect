import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Entry from './Entry.jsx';

export default class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const { entries } = this.props;
    
    return (
      <div className="eight wide column">
        {entries.map(entry => 
          <Entry 
            date={entry.created} 
            text={entry.text} 
            key={entry.created}
          />
        )}
      </div>
    )
  }
}

Entries.propTypes = {
  entries: PropTypes.array.isRequired
}