import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Entry from '../../client/src/components/Entry.jsx';

describe('Entry Component', () => {
  let entry;

  beforeEach(() => {
    entry = mount(<Entry date={'Jan 1, 2017'} text={'I had a good day.'}/>);
  })

  it('should render without crashing', () => {
    expect(entry.exists()).toBe(true);
  });

  it('Entry renders a div', () => {
    expect(entry.find('div').length).toEqual(1);
  });

  it('Entry requires date and text props', () => {
    expect(entry.props().date).toBeDefined();
    expect(entry.props().text).toBeDefined();
  })
  
})

