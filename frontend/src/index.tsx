import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import ItemList from './pages/ItemList';
import ItemDetail from './pages/ItemDetail';
import CreateItem from './pages/CreateItem';
import { AuthProvider } from './context/AuthContext';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/create-item" element={<CreateItem />} />
      </Routes>
    </Router>
    </AuthProvider>
  </React.StrictMode>
);
