import React from 'react';
import { render } from 'enzyme';

import Expand from './Expand';

describe('Expand', () => {
  it('when render expand with children --> then render default Expand with children', () => {
    const wrapper = render(<Expand>Hello</Expand>);

    expect(wrapper).toMatchSnapshot();
  });
});
