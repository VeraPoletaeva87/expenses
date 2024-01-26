import React, { Component } from 'react';
import CButton from './cButton';
import './navigation.css';

const Navigation = () => {
    return (
      <div className="navigation">
            <span className='title'>homebudget</span>
            <a className='link' href="/">
                    MAIN
            </a>
      
            <a className='link' href="/expenses">
                    EXPENSES LIST
            </a>
        
            <a className='link' href="/categories">
                    CATEGORIES
            </a>

            <a className='link' href="/budget">
                    BUDGET
            </a>
        
            <a className='link'href="/statistics">
                    STATISTICS
            </a>
            <a className='link'href="/signup">
            Регистрация
            </a>
      </div>

    );
  }

export default Navigation;