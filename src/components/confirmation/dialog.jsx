import React, { Component } from 'react';
import CButton from '../cButton';
import './dialog.css';

const Dialog = ({visible, text, onCancel, onSubmit}) => {
    return (
        <div className={visible ? 'modal visible' : 'modal hidden'}>
            <div className="modal-content">
                <div className="margin-bottom">{text}</div>
                <div className='flex'>
                   <CButton onClick={onSubmit} title="Delete"/>
                   <CButton onClick={onCancel} title="Cancel"/>
                </div>       
            </div>
        </div>   
    );
  }

export default Dialog;