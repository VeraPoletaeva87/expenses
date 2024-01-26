import React, { Component } from 'react';
import './cButton.css';

const CButton = ({title, onClick, type}) => {
    return (
      <>
         <button className="task-form__button addButton" onClick={onClick} type={type ? type : 'button'}>
            {title}
          </button>
      </>
    );
  }
export default CButton;