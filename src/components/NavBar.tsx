
import React from "react";
import { Link } from "react-router-dom";
import { Plane } from "lucide-react";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-cpd-navy text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-cpd-blue p-2 rounded-full">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">CPD Airlines</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-cpd-lightBlue transition-colors">
              Home
            </Link>
            <Link to="/checkout" className="text-white hover:text-cpd-lightBlue transition-colors">
              Book Flight
            </Link>
            <Link to="#" className="text-white hover:text-cpd-lightBlue transition-colors">
              My Trips
            </Link>
            <Link to="#" className="text-white hover:text-cpd-lightBlue transition-colors">
              Help
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-white hover:text-cpd-lightBlue transition-colors">
              Sign In
            </button>
            <button className="bg-cpd-blue text-white font-medium py-2 px-4 rounded hover:bg-cpd-lightBlue transition-colors">
              Sign Up
            </button>
          </div>
          <div className="md:hidden">
            <button className="text-white hover:text-cpd-lightBlue transition-colors">
              Menu
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
