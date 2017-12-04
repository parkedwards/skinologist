import React from 'react';
import './App.css';

const App = ({ children }) => (
  <div className="container">
    <h3 id="header-text">SKINOLOGIST</h3>
    {children}
  </div>
);

export default App;
