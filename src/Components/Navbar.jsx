import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Home className="h-6 w-6 mr-2" />
              <span className="font-semibold text-xl">3D Configurator</span>
            </Link>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <ShoppingCart className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;