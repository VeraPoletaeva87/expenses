import React, { Component, useState, useEffect, useMemo} from 'react';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SortIcon from '@mui/icons-material/Sort';
import InputAdornment from '@mui/material/InputAdornment';
import AddForm from './addForm';
import CButton from './cButton';
import './expenses.css';

const currentDate = new Date;

function Expenses () {
const [initialItems, setInitialItems] = useState([]);
const [search, setSearch] = useState('');  
const [editItem, setEditItem] = useState(null);  
const [sortField, setSortField] = useState('');  
const [isEditing, setIsEditing] = useState(false);

const expensesItems = useMemo(() => search && search.length >= 3
 ? initialItems.filter(el => el.comment.includes(search)) 
 : initialItems, [search, initialItems]);
const emptyList = !expensesItems.length;  

useEffect(() => {
  fetch('http://localhost:3010/expenses')
    .then((res) => res.json())
    .then((result) => {
      setInitialItems(result.data);
    });
}, []);

const onSelectChange = (event) => {
  const sortDirection = event.target.value;
  setSortField(sortDirection);
  switch(sortDirection) {
    case 10:  
    setInitialItems(initialItems.sort((a, b) => a.sum - b.sum));
      break;
    case 20: 
    setInitialItems(initialItems.sort((a, b) => b.sum - a.sum));
      break;
  
    default:
      break;
  }
}

const onClose = () => {
  setEditItem(null);
}

const onDeleteItem = (item) => {
  fetch('http://localhost:3010/expenses', {
    method: 'DELETE',
    body: JSON.stringify(item),
    headers: {
        'content-type': 'application/json' 
    }  
})
  .then((response) => {
        onSave();
  });
}

const onSearchChange = (event) => {
  setSearch(event.target.value);
}

const onSave = (newItem) => {
  setEditItem(null);
  fetch('http://localhost:3010/expenses')
    .then((res) => res.json())
    .then((result) => {
      setInitialItems(result.data);
    });
}

const editItemHandler = (item) => {
  setEditItem(item);
  setIsEditing(true);
}

const addExpense = () => {
  setIsEditing(false);
  setEditItem({
    id: null,
    date: '2023-06-30',
    category: 'food',
    sum: '',
    comment: ''
  });
}

const res = expensesItems.map(function(item, index) {
    return   (
    <tr key={item.id} className={`list__item tableRow ${(index+2) % 2 === 0 ? "tableRow-background" : "tableRow-background__white"}` }>
       <td className="table__cell">{item.date}</td>
       <td className="table__cell">{item.category}</td>
       <td className="table__cell">{item.sum}</td>
       <td className="table__cell">
          <div className='justify-between'>
            <div>{item.comment}</div>
            <div>
              <div className="editButton" id="edit" title='Edit row' onClick={(e) => editItemHandler(item)}/>
              <div className="deleteButton" id="delete" title='Delete row' onClick={(e) => onDeleteItem(item)}/>
            </div>
          </div>  
        </td>
    </tr>
    );
 });

    return (
      <>
        <div className='controls-block flex margin-bottomS baseline'>
            <CButton onClick={addExpense}
               title="Add"/>
            <TextField 
             variant="outlined" 
             color="grey"
             onChange={onSearchChange}
             value={search}
             InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
              )
            }}/>
            <div className='justify-between align-center'>
            <FormControl className='sortWidth'>
            <Select
                value={sortField}
                color="grey"
                onChange={onSelectChange}
            >
              <MenuItem value={10}>Sum: low to high</MenuItem>
              <MenuItem value={20}>Sum: high to low</MenuItem>
            </Select>
            </FormControl>
            <SortIcon color="action"/>
            </div>
      </div>
      <div className='table-block'>
        <table className="width100">
      <thead>
      <tr className="list__item">
            <th className="table__cell lightGreyBackground">Date</th>
            <th className="table__cell lightGreyBackground">Category</th>
            <th className="table__cell lightGreyBackground">Sum</th>
            <th className="table__cell lightGreyBackground">Comment</th>
        </tr>
      </thead>
      <tbody>
         {res}
      </tbody>
   </table>
   {editItem && (<AddForm item={editItem} isEditing={isEditing} onClose={onClose}  onSave={onSave} />)}
      </div>
      {emptyList && (<div className='justify-center'>No results</div>)}
      </>
    );
  }

export default Expenses;