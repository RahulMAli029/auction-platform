import React, { ReactNode } from 'react';
import App from '../App';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <App />
      <main className="flex-grow container">
        {children}
      </main>
    </div>
  );
};

export default Layout;
