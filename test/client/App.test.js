import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { App } from '../../client/src/components/App.jsx';

describe('App Component', () => {
  let app;

  beforeEach(() => {
    app = shallow(<App />);
  });

  it('should render without crashing', () => {
    expect(app.exists()).toBe(true);
  });

  it('App renders nested components', () => {
    expect(app.find('Entries').length).toEqual(1);
  })

})



