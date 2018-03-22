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

  it('when toggle three times --> then Expand styles is open', () => {
    const wrapper = mount(<Expand>Toggle</Expand>);

    wrapper.setProps({ open: true });

    jest.runAllTimers();

    wrapper.setProps({ open: false });

    jest.runAllTimers();

    wrapper.setProps({ open: true });

    jest.runAllTimers();

    wrapper.update();

    expect(wrapper).toMatchSnapshot();

    expect(setTimeout).toHaveBeenCalledTimes(6);
  });

  it('when set props two times true --> then Expand styles is open', () => {
    const wrapper = mount(<Expand>Toggle</Expand>);

    wrapper.setProps({ open: true });

    jest.runAllTimers();

    wrapper.setProps({ open: true });

    jest.runAllTimers();

    wrapper.update();

    expect(wrapper).toMatchSnapshot();

    expect(setTimeout).toHaveBeenCalledTimes(2);
  });

  it('when component unmounted --> then clear timeout', () => {
    const wrapper = mount(<Expand>Toggle</Expand>);

    wrapper.setProps({ open: true });

    const { timeout } = wrapper.instance();

    expect(timeout).toBeTruthy();

    wrapper.unmount();

    expect(clearTimeout).toHaveBeenCalledWith(timeout);
  });
});
