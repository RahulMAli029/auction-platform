import React from 'react';
import { Link } from 'react-router-dom';
// import './App.css';

const App: React.FC = () => {  
  
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center">
        <nav className='w-full bg-blue-600 p-4'>
          <ul className="flex justify-center space-x-4">
            <li className="text-white"><Link to="/">Home</Link></li>
            <li className="text-white"><Link to="/login">Login</Link></li>
            <li className="text-white"><Link to="/items">Item List</Link></li>
            <li className="text-white"><Link to="/create-item">Create Item</Link></li>
          </ul>
        </nav>
      <header className="App-header">
        <h1 className="text-4xl font-bold text-gray-800 mt-8">Welcome to the Auction Platform</h1>
      </header>
    </div>
  );
};

export default App;
