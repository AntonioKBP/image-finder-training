import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { ModalOverlay, ModalWindow, ModalBtn } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const style = { width: '32px', height: '32px', color: 'aqua' };

export const Modal = ({ onClose, children }) => {
  const handleBackDrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <>
      <ModalOverlay onClick={handleBackDrop}>
        <ModalBtn onClick={onClose} type="button">
          <IoIosCloseCircleOutline style={style} />
        </ModalBtn>
        <ModalWindow>{children}</ModalWindow>
      </ModalOverlay>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.object.isRequired,
};
