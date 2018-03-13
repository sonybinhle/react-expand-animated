import React, { Component } from 'react';
import PropTypes from 'prop-types';

// In firefox, setTimeout with duration 0 too short for browser notice the changes in dom
const initialTransitDuration = 20;

const PHASE = {
  CLOSE: 'CLOSE',
  CLOSING: 'CLOSING',
  CLOSED: 'CLOSED',
  OPEN: 'OPEN',
  OPENING: 'OPENING',
  OPENED: 'OPENED',
};

class Expand extends Component {
  state = {
    status: this.props.open ? PHASE.OPEN : PHASE.CLOSE,
  };

  componentWillReceiveProps({ open }) {
    if (open !== this.props.open) {
      this.toggle(open);
    }
  }

  componentWillUnmount() {
    this.clearDelay();
  }

  getClientHeight = () => {
    if (this.refWrapper) {
      return this.refWrapper.scrollHeight;
    }

    return 'auto';
  };

  getExpandStyle = () => {
    const { status } = this.state;

    switch (status) {
      case PHASE.OPENING:
      case PHASE.CLOSE:
      case PHASE.CLOSED:
        return { height: 0, opacity: 0, overflow: 'hidden' };
      case PHASE.OPENED:
      case PHASE.CLOSING:
        return { height: this.getClientHeight(), opacity: 1, overflow: 'hidden' };
      default:
        return { height: 'auto', opacity: 1, overflow: 'unset' };
    }
  };

  getStyle() {
    const { duration, easing } = this.props;

    const transition = `height ${duration}ms ${easing}, opacity ${duration}ms ${easing}`;

    return {
      ...this.getExpandStyle(),
      transition,
    };
  }

  updateStatus = status => this.setState({ status });

  delay = (fn, time) => {
    this.timeout = setTimeout(fn, time);
  };

  clearDelay = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  transit = (entering, entered, enter) => {
    const { duration } = this.props;

    this.updateStatus(entering);

    this.delay(() => {
      this.updateStatus(entered);

      this.delay(() => {
        this.updateStatus(enter);
      }, duration);
    }, initialTransitDuration);
  };

  toggle = (open) => {
    this.clearDelay();

    if (open) {
      this.transit(PHASE.OPENING, PHASE.OPENED, PHASE.OPEN);
    } else {
      this.transit(PHASE.CLOSING, PHASE.CLOSED, PHASE.CLOSE);
    }
  };

  render() {
    const { className, children, tag: Tag } = this.props;
    return (
      <Tag className={className} style={this.getStyle()} ref={(ref) => { this.refWrapper = ref; }}>
        {children}
      </Tag>
    );
  }
}

Expand.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  duration: PropTypes.number,
  easing: PropTypes.string,
  className: PropTypes.string,
  tag: PropTypes.string,
};

Expand.defaultProps = {
  open: false,
  duration: 1000,
  easing: 'ease-in-out',
  className: '',
  tag: 'div',
};

export default Expand;
