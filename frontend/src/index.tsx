import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ItemList from './pages/ItemList';
import ItemDetail from './pages/ItemDetail';
import CreateItem from './pages/CreateItem';
import { AuthProvider } from './context/AuthContext';

import './index.css';
import Layout from './pages/Layout';
import Home from './pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<ItemList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/create-item" element={<CreateItem />} />
        </Routes>
      </Layout>
    </Router>
    </AuthProvider>
  </React.StrictMode>
);
