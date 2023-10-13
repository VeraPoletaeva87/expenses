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
const [labels, setLabels] = useState([]);
const [totals, setTotals] = useState([]);
const [totalSum, setTotalSum] = useState(null);

//parameters for filter by period
const params = {periodType: sortField};
const queryString = new URLSearchParams(params).toString();

useEffect(() => {
  fetch('http://localhost:3010/api/statistics?'+queryString)
    .then((res) => res.json())
    .then((result) => {
      setLabels(result.data.labels);
      setTotals(result.data.totals); 
     setTotalSum(result.data.totals.reduce((acc, sum) => acc + sum, 0));
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
        borderColor: '#5f4f49',
        borderWidth: 1
      }
    ]
  };
    
    return (
      <div  className="statistics-main">
        <div className='flex marginRight'>
        <h1 className='marginS'>Total expenses:</h1>
        <h2>{totalSum}</h2>
        </div>
      <div className='chartBlock'>
      <div className="flex marginBottom">
      <span className='marginS'>View statistics for </span>
      <FormControl className='sortWidth'>
            <Select
                value={sortField}
                color="grey"
                onChange={onSelectChange}>
              <MenuItem value={10}>Last month</MenuItem>
              <MenuItem value={20}>Last week</MenuItem>
              <MenuItem value={30}>Last year</MenuItem>
              <MenuItem value={40}>All</MenuItem>
            </Select>
      </FormControl>
      </div>
      <div className='pieChart'>
      <Pie data={res}/>
      </div>
      </div>
    </div>
    );
  }

export default Statistics;