import React, { Component } from 'react';
import PropTypes from 'prop-types';

const STATUS = {
  CLOSE: 'CLOSE',
  CLOSING: 'CLOSING',
  CLOSED: 'CLOSED',
  OPEN: 'OPEN',
  OPENING: 'OPENING',
  OPENED: 'OPENED',
};

class Expand extends Component {
  state = {
    status: this.props.open ? STATUS.OPEN : STATUS.CLOSE,
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
      case STATUS.OPENING:
      case STATUS.CLOSE:
      case STATUS.CLOSED:
        return { height: 0, opacity: 0, overflow: 'hidden' };
      case STATUS.OPENED:
      case STATUS.CLOSING:
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

  toggle = (open) => {
    // In firefox, setTimeout with duration 0 too short for browser notice the changes in dom
    const initialTransitDuration = 20;
    const { duration } = this.props;

    this.clearDelay();

    if (open) {
      this.updateStatus(STATUS.OPENING);

      this.delay(() => {
        this.updateStatus(STATUS.OPENED);

        this.delay(() => {
          this.updateStatus(STATUS.OPEN);
        }, duration);
      }, 0);
    } else {
      this.updateStatus(STATUS.CLOSING);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.updateStatus(STATUS.CLOSED);

          this.delay(() => {
            this.updateStatus(STATUS.CLOSE);
          }, duration);
        });
      });
    }
  };

  render() {
    const { className, children } = this.props;
    return (
      <div className={className} style={this.getStyle()} ref={(ref) => { this.refWrapper = ref; }}>
        {children}
      </div>
    );
  }
}

Expand.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  duration: PropTypes.number,
  easing: PropTypes.string,
  className: PropTypes.string,
};

Expand.defaultProps = {
  open: false,
  duration: 1000,
  easing: 'ease-in-out',
  className: '',
};

export default Expand;
