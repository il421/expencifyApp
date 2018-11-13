import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
  <Modal
    isOpen={ !!props.selectedOption }
    onRequestClose={ props.handleClearSelectedOptions }
    contentLabel="Selected option"
    closeTimeoutMS={200} // after 200ms it will be closed
    className="modal"
  >
    <h3 className="modal__title" >Selected option</h3>
    { props.selectedOption && <p className="modal__body">{ props.selectedOption }</p> }
    <button
      className="button"
      onClick= { props.handleClearSelectedOptions }
    >
      Okey
    </button>
  </Modal>
);

export default OptionModal;