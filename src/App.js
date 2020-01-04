import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import Hola from './Hola';
// import Contador from './Contador';
import Topbar from './Topbar';
import MainAparcamientos from './MainAparcamientos';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        {/* <img src={logo} ="App-logo" alt="logo" /> */}
        {/* <h1 className="App-title">Welcome to React</h1> */}
        <Topbar></Topbar>
        <MainAparcamientos></MainAparcamientos>
      {/* </header> */}
      {/* <Hola nombre="Pepe" /> */}
      {/* <Contador/> */}
    </div>
  );
}

export default App;
