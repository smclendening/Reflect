import React from 'react';
import { shallow } from 'enzyme';

import { App } from '../../client/src/components/App.jsx';

const setup = () => {
  const props = {
    dispatchGetEntries: jest.fn(),
    dispatchSetDisplayMonth: jest.fn()
  };

  const app = shallow(<App {...props} />);

  return {
    props,
    app
  };
};

describe('App Component', () => {
  it('should render without crashing', () => {
    const { app } = setup();
    expect(app.exists()).toBe(true);
  });

  it('App renders nested components', () => {
    const { app } = setup();
    expect(app.find('Entries').length).toEqual(1);
  });
});
