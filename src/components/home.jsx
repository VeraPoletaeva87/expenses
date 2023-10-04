import React, { Component, useState } from 'react';
import AddForm from './addForm';
import CButton from './cButton';
import './home.css';

const Home = () => {

  const [item, setItem] = useState(null);

  const addExpense = () => {
    setItem({
      id: '',
      date: null,
      category: null,
      sum: '',
      comment: ''
    });
  }

  const onClose = () => {
    setItem(null);
  }

  return (
    <div className='inline'>
    <div className="start-block">
    <h1 className="marginBottomL">Add purchases and track your expenses</h1>
    <div className="marginBottomL greyColor">Press "Add" button to begin</div>
    <div className="inline center">
      <CButton clickHandler={addExpense}
               title="Add"/>
    </div>
    {item && (<AddForm item={item} onClose={onClose}/>)}
</div>
<div className='start-image'></div>
</div>
);
}

export default Home;