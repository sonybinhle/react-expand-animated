import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  toggle = (open) => {
    // In firefox, setTimeout with duration 0 too short for browser notice the changes in dom
    const initialTransitDuration = 20;
    const { duration } = this.props;

    this.clearDelay();

    if (open) {
      this.updateStatus(PHASE.OPENING);

      this.delay(() => {
        this.updateStatus(PHASE.OPENED);

        this.delay(() => {
          this.updateStatus(PHASE.OPEN);
        }, duration);
      }, 0);
    } else {
      this.updateStatus(PHASE.CLOSING);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.updateStatus(PHASE.CLOSED);

          this.delay(() => {
            this.updateStatus(PHASE.CLOSE);
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
