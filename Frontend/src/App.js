import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Login from './components/Login'
import Signup from './components/Signup'
import Headermenu from './components/HeaderMenu';
import Homepage from './components/HomePage';
import Graphspage from './components/GraphsPage';
import Portfolio from './components/Portfolio';
import News from './components/News';
import Stocks from './components/Stocks';
import Crypto from './components/Crypto';
import React, { useState } from 'react';
import Alert from './components/Alert'

import './App.css';
import ExchangePage from './components/ExchangePage';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: '#14161a',
    color: 'white',
    minHeight: '100vh',
  },
}));

function App() {
  const [alert, setAlert] = useState(null);
const showAlert = (message, type)=>{
  setAlert({
    msg: message,
    type: type
  })
  setTimeout(() => {
      setAlert(null);
  }, 1500);
}

  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Headermenu />
        <Alert alert={alert}/>

        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/coins/:id" element={<Graphspage />} exact />
          <Route path="/portfolio" element={<Portfolio />} exact />
          <Route path="/news" element={<News />} exact />
          <Route path="/stocks" element={<Stocks />} exact />
          <Route path="/crypto" element={<Homepage />} exact />
          <Route path="/exchange" element={<ExchangePage />} exact />
          <Route path="/Login" element={<Login showAlert={showAlert} />} exact />
          <Route path="/Signup" element={<Signup showAlert={showAlert} />} exact />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
