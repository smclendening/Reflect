import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Timeline from '../../client/src/components/Timeline.jsx';

describe('Timeline Component', () => {
  let timeline;
  const exampleMonthData = {February: ['entryID', 'entryID'], March: ['entryID']};

  beforeEach(() => {
    timeline = mount(<Timeline months={exampleMonthData}/>);
  })

  it('should render without crashing', () => {
    expect(timeline.exists()).toBe(true);
  });

  it('should render a sidebar', () => {
    expect(timeline.find('.sidebar').length).toEqual(1);
  });

  it('should render each month from given props', () => {
    const months = timeline.find('.month');

    expect(months.first().text()).toContain('February')
  });

  it('should render the number of entries in each given month', () => {
    const months = timeline.find('.month');

    expect(months.first().text()).toContain('2');
  })

})



