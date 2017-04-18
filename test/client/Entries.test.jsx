import React from 'react';
import { shallow } from 'enzyme';

import Entries from '../../client/src/components/Entries.jsx';

describe('Entries Component', () => {
  let entries;
  const exampleEntries = [{ created: 'January 1, 2017', text: 'Example entry', entry_id: 1 }];

  beforeEach(() => {
    entries = shallow(<Entries entries={exampleEntries} />);
  });

  it('should render without crashing', () => {
    expect(entries.exists()).toBe(true);
  });

  it('Entries renders nested components', () => {
    expect(entries.find('Entry')).toBeDefined();
  });
});

