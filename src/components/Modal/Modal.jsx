import s from './Modal.module.css';
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose(e);
    }
  };

  handlBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose(e);
    }
  };
  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handlBackdropClick}>
        <div className={s.Modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
Modal.propTypes = {
  largeImage: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
