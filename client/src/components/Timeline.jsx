import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Timeline = ({months}) => (
  <div className="four wide column">
    <div className="ui left vertical inverted sidebar menu visible" style={{"top":"42"}}>
      <div className="item header">2017</div>
      {Object.keys(months).map(month => 
        <a className="item month" key={Math.random()}>
          {month}
          <div className="ui label" key={Math.random()}>{months[month].length}</div>
        </a>
      )}
    </div>
  </div>
)

Timeline.propTypes = {
  months: PropTypes.object.isRequired
}

export default Timeline;