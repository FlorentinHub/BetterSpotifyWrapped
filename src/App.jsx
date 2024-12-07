import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Callback from './components/Callback';
import './style/App.css'

const App = () => {
  return (
    <div className="container-custom">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
