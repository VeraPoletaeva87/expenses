import React, { Component, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CButton from './cButton';
import './addForm.css';


const AddForm = ({item, header, onClose, onSave}) => {
    const [state, setState] = useState(item);
    const [emptySum, setEmptySum] = useState(false); 

    const handleChange = e => {
        const { name, value } = e.target;
        if (value) {
            setState(prevState => ({
                ...prevState,
                [name]: value
            }));
            setEmptySum(false);
        } else {
            setEmptySum(true);
        }
    };

    const onDateChange = (date) => {
        setState(prevState => ({
            ...prevState,
            date: date
        }));
    }

   const closeDialog = () => {
        onClose();
    }

    const handleSubmit = (event) => {
        if (!state.sum) {
            event.preventDefault();
            setEmptySum(true);
        } else {
            const form = document.getElementById("addForm");
            event.preventDefault();
            const formData = new FormData(form);
        
            fetch('http://localhost:3010/expenses', {
                method: 'POST',
                body: JSON.stringify(state),
                headers: {
                    'content-type': 'application/json' 
                }  
            })
              .then((response) => {
                    onSave();
              });
        }
      };

    return (
      <div className='dialog-box'>
        <div className="dialogHeader paddingXS">
            <span className="headerFont">{header}</span>
            <span className="close" onClick={closeDialog}>&times;</span>
        </div>
        <form id="addForm" onSubmit={handleSubmit}>
            <div className="paddingXS">
                <div className="marginBottomL">
                <DatePicker
                    name="date"
                    value={dayjs(state.date)}
                    onChange={onDateChange}
                />
                </div>
    
            <div className="displayFlex">
            <div className="displayFlex marginBottomL">
            <div className="marginRightS">Category</div>
            <select className="select marginRightS" name="category"  value={state.category} onChange={handleChange}>
                <option value="Food">Food</option>
                <option value="Home">Home</option>
                <option value="Clothes">Clothes</option>
            </select>
        </div>
        <div className="displayFlex marginBottomL">
            <div>
                <span className="marginRightS">Sum</span>
                <span className='red'>*</span>
            </div>
            <input className="input sumInput" type="text" id="sumInput" name="sum" placeholder="Enter sum..."
                    onChange={handleChange}
                    value={state.sum}/>
            {emptySum && (<div className="red smallText">Enter required field</div>)}        
        </div>
        
    </div>
    
    <div className="displayFlex marginBottomL">
        <div className="marginRightS">Comment</div>
        <input className="input width100" type="text" name="comment" placeholder="Enter comment..."  value={state.comment}
                onChange={handleChange}/>
    </div>
</div>
<div className="footer marginBottomL">
    <CButton title="Save"
             type="submit"/>
</div>
</form>
      </div>

    );
  }

export default AddForm;
