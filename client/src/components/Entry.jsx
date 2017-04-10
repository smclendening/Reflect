import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Entry = ({date, text}) => (
  <div className="ui piled container segment">
    <h4 className="ui header">{date}</h4>
    <p>{text}</p>
  </div>
)

Entry.propTypes = {
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Entry;