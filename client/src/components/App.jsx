import React, { Component } from 'react'
import { fetchEntries, setDisplayMonth } from '../actions/actions.js';
import { connect } from 'react-redux';
import Nav from './Nav.jsx';
import Entries from './Entries.jsx';
import Timeline from './Timeline.jsx';
import CallMeNow from './CallMeNow.jsx';
import { dummyEntryData, dummyTimelineData } from '../dummyData.js';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onMonthClick = this.onMonthClick.bind(this);
  }

  componentDidMount() {
    const { fetchEntries, userId } = this.props;
    fetchEntries(userId);
  }

  onMonthClick(month) {
    this.props.setDisplayMonth(month);
  }

  render() {
    return (
      <div>
        <div className="ui three column grid">
          <Timeline months={dummyTimelineData} onMonthClick={this.onMonthClick}/>
          <Entries entries={this.props.entries}/>
          <CallMeNow />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    entries: state.entries.entries
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEntries: () => dispatch(fetchEntries()),
    setDisplayMonth: (month) => dispatch(setDisplayMonth(month))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

