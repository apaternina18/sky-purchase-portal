
import React from "react";
import NavBar from "./NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-airline-background antialiased">
      <NavBar />
      <main className="airline-container py-8 animate-fade-in">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-100 py-8 mt-20">
        <div className="airline-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                © 2023 David Airlines. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-airline-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-airline-primary transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-airline-primary transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
