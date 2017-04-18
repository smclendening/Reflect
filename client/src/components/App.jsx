import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchEntries, setDisplayMonth } from '../actions/actions.js';
import Entries from './Entries.jsx';
import Timeline from './Timeline.jsx';
import CallMeNow from './CallMeNow.jsx';

export class App extends Component {
  constructor(props) {
    super(props);

    this.onMonthClick = this.onMonthClick.bind(this);
  }

  componentDidMount() {
    const { dispatchGetEntries, userId } = this.props;
    dispatchGetEntries(userId);
  }

  onMonthClick(month) {
    const { dispatchSetDisplayMonth } = this.props;
    dispatchSetDisplayMonth(month);
  }

  render() {
    const { entries, months } = this.props;

    return (
      <div>
        <div className="ui three column grid">
          <Timeline months={months} onMonthClick={this.onMonthClick} />
          <Entries entries={entries} />
          <CallMeNow />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    userId: state.user.id,
    entries: state.entries.displayedEntries,
    months: state.entries.months
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatchGetEntries: () => dispatch(fetchEntries()),
    dispatchSetDisplayMonth: month => dispatch(setDisplayMonth(month))
  }
);

App.propTypes = {
  dispatchGetEntries: PropTypes.func.isRequired,
  dispatchSetDisplayMonth: PropTypes.func.isRequired,
  userId: PropTypes.number,
  entries: PropTypes.arrayOf(PropTypes.object),
  months: PropTypes.objectOf(PropTypes.array)
};

App.defaultProps = {
  userId: null,
  entries: [],
  months: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

