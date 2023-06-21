import './App.css';
import Header from './components/header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import React from 'react';
import { BrowserRouter as Router, Routes, Link, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <div className="ui container">
        <Router>
          <Routes>
            <Route path='/add' element={<AddContact />} />
            <Route path='/' element={<ContactList />} />
          </Routes>
        </Router>
      </div>

    </>
  );
}

export default App;
