import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ManageCreate from './components/Create/ManageCreate';
import ManageEdit from './components/Edit/ManageEdit';
import Navbar from './components/layout/Navbar';
import PrisonerList from './components/List/PrisonerList';
function App(){
  return(
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<PrisonerList/>} />
      <Route path='/Create/create' element={<ManageCreate />} />
      <Route path='/Edit/edit/:id' element={<ManageEdit />} />
    </Routes>
    
  </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

