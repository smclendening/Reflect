import React from 'react';
import PropTypes from 'prop-types';
import { toDateString } from '../utils.js';

const Entry = ({ date, text }) => (
  <div className="ui piled container segment">
    <h4 className="ui header">{toDateString(date)}</h4>
    <p>{text}</p>
  </div>
);

Entry.propTypes = {
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Entry;

