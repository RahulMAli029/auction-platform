import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {  
  const {isAuthenticated, logout} = useAuth();
  const navigate = useNavigate();

  
  return (
    <div className="bg-gray-100 flex flex-col justify-end">
      <nav className="w-full bg-blue-600 p-4">
        <ul className="flex flex-col lg:flex-row lg:justify-end lg:space-x-4">
          <li className="text-white">
            <Link to="/">Home</Link>
          </li>
          <li className="text-white">
            <Link to="/create-item">Create/List Item</Link>
          </li>
          <li className="text-white">
            <Link
              to="/login"
              onClick={() => (isAuthenticated ? logout() : navigate('/login'))}
              className="lg:ml-4"
            >
              {isAuthenticated ? 'Logout' : 'Login'}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default App;
