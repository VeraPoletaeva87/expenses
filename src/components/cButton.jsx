import React, { Component } from 'react';
import './cButton.css';

const CButton = ({title, onClick, type}) => {
    return (
      <div>
         <button className="task-form__button addButton" onClick={onClick} type={type ? type : 'button'}>
            {title}
          </button>
      </div>
    );
  }
export default CButton;