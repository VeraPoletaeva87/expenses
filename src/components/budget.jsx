import React, { Component, useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import './budget.css';

var initialData = [
    {id: 0, category: 'Food', limit: 0},
    {id: 1, category: 'Home', limit: 0},
    {id: 2, category: 'Clothes', limit: 0}
  ];

const LimitSlider = styled(Slider)({
    color: '#c3ad9d',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#c3ad9d',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });

const Budget = () => {
    const [data, setData] = useState(initialData);

    const res = data.map(function(item, index) {
        return   (
        <tr key={item.id} className='table--row'>
           <td className="narrow--cell">{item.category}</td>
           <td className="wide--cell">
              <Box width={300} className='slider--cell'>
                <LimitSlider
                    size="small"
                    max={1000}
                    min={0}
                    defaultValue={500}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                />
              </Box>
            </td>
        </tr>
        );
     });

    return (
      <div>
            <h3>Month limits</h3>
            <div className='hint--text margin--bottomM'>Define your limits for each category to plan your budget</div>
            <table>
                <thead>
                    <tr className="list__item">
                        <th className="narrow--cell lightGreyBackground">Category</th>
                        <th className="wide--cell lightGreyBackground">Limit</th>
                    </tr>
                </thead>
                <tbody>
                    {res}
                </tbody>
            </table>
      </div>

    );
  }

export default Budget;