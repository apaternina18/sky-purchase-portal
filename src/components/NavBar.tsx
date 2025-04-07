
import React from "react";
import { Link } from "react-router-dom";
import { Plane } from "lucide-react";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="airline-container">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-airline-primary p-2 rounded-full">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">CPD Airlines</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-airline-primary transition-colors">
              Home
            </Link>
            <Link to="/checkout" className="text-gray-600 hover:text-airline-primary transition-colors">
              Book Flight
            </Link>
            <Link to="#" className="text-gray-600 hover:text-airline-primary transition-colors">
              My Trips
            </Link>
            <Link to="#" className="text-gray-600 hover:text-airline-primary transition-colors">
              Help
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-airline-primary transition-colors">
              Sign In
            </button>
            <button className="airline-button-primary py-2">
              Sign Up
            </button>
          </div>
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-airline-primary transition-colors">
              Menu
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
