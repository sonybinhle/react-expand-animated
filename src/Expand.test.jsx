import React from 'react';
import { render, mount } from 'enzyme';

import Expand from './Expand';

describe('Expand', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('when render expand with children --> then render default Expand with children', () => {
    const wrapper = render(<Expand>Hello</Expand>);

    expect(wrapper).toMatchSnapshot();
  });

  it('when render expand with open=true --> then render Expand with open styles', () => {
    const wrapper = render(<Expand open>Open true</Expand>);

    expect(wrapper).toMatchSnapshot();
  });

  it('when toggle open from false to true --> then change Expand styles from close to open', () => {
    const wrapper = mount(<Expand>Toggle</Expand>);

    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ open: true });

    jest.runOnlyPendingTimers();

    wrapper.update();

    expect(wrapper).toMatchSnapshot();

    jest.runOnlyPendingTimers();

    wrapper.update();

    expect(wrapper).toMatchSnapshot();

    expect(setTimeout).toHaveBeenCalledTimes(2);
  });

  it('when children is wrapped component --> then don\'t add new wrapper div', () => {
    const wrapper = mount(<Expand><p>Toggle</p></Expand>);

    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ open: true });

    jest.runOnlyPendingTimers();

    wrapper.update();

    expect(wrapper).toMatchSnapshot();

    jest.runOnlyPendingTimers();

    wrapper.update();

    expect(wrapper).toMatchSnapshot();

    expect(setTimeout).toHaveBeenCalledTimes(2);
  });

  it('when children is array --> then add a wrapper div', () => {
    const wrapper = mount(<Expand><p>Toggle 1</p><p>Toggle 2</p></Expand>);

    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ open: true });

    jest.runOnlyPendingTimers();

    wrapper.update();

    expect(wrapper).toMatchSnapshot();

    jest.runOnlyPendingTimers();

    wrapper.update();

    expect(wrapper).toMatchSnapshot();

    expect(setTimeout).toHaveBeenCalledTimes(2);
  });
});
