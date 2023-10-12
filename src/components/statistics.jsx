import React, { Component, useState, useEffect, useMemo } from 'react';
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import './statistics.css';

Chart.register(CategoryScale);

const Statistics = () => {
const [sortField, setSortField] = useState(10);  
const [initialItems, setInitialItems] = useState([]);

const categories = useMemo(() => initialItems.map(item => item.category), [initialItems]);
var labels = [...new Set(categories)];

let totals = [];

useMemo(() => {
  labels.forEach(label => {
   const total = initialItems
  .filter(item => item.category === label)
  .map(cat => +cat.sum)
  .reduce((acc, sum) => acc + sum, 0);
  totals.push(total);
  });
}, [initialItems]);

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
  // switch(sortDirection) {
  //   case 10:  
  //   setInitialItems(initialItems.sort((a, b) => a.sum - b.sum));
  //     break;
  //   case 20: 
  //   setInitialItems(initialItems.sort((a, b) => b.sum - a.sum));
  //     break;
  
  //   default:
  //     break;
  // }
}

const res = {
    labels: labels, 
    datasets: [
      {
        label: "Expenses ",
        data: totals,
        backgroundColor: [
          '#b35919',
          '#ddd122',
          '#b88e51'
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  };
    
    return (
      <div className="pieChart">
      <FormControl className='sortWidth'>
            <Select
                value={sortField}
                color="grey"
                onChange={onSelectChange}>
              <MenuItem value={10}>Last month</MenuItem>
              <MenuItem value={20}>Last week</MenuItem>
              <MenuItem value={30}>Last year</MenuItem>
            </Select>
      </FormControl>
      <Pie data={res}/>
    </div>
    );
  }

export default Statistics;