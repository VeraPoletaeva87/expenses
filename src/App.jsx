import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Navigation from './components/navigation';
import Statistics from './components/statistics';
import Expenses from './components/expenses';
import Home from './components/home';
import Budget from './components/budget';
import 'dayjs/locale/en-gb';
import './App.css';

class App extends Component {
  addExpense = () => {
    var dialog = document.getElementById('addDialog');
    dialog.showModal();
  }

  render() {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <div>
<div className="header">

  <Navigation/>

</div>
<div className="body">
<BrowserRouter>
    <div className=' center'>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/expenses" element={<Expenses/>} />
      <Route path="/budget" element={<Budget/>} />
      <Route path="/statistics" element={<Statistics/>} />
      </Routes>
    </div>
  </BrowserRouter>
</div>

</div>
</LocalizationProvider>
);
  }
}

export default App;
