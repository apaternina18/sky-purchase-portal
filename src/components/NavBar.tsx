
import React from "react";
import { Link } from "react-router-dom";
import { Plane, Download } from "lucide-react";

const NavBar: React.FC = () => {
  const handleDownloadCode = () => {
    // Create a dummy link to trigger download
    const link = document.createElement('a');
    link.href = '/download-code';
    link.download = 'cpd-airlines.zip';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Your download will begin shortly. If it doesn\'t start automatically, please check your browser settings.');
  };

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
            <button 
              onClick={handleDownloadCode}
              className="flex items-center text-gray-600 hover:text-airline-primary transition-colors"
            >
              <Download className="h-4 w-4 mr-1" />
              Download Code
            </button>
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
