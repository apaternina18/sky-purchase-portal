
import React from "react";
import { Link } from "react-router-dom";
import { Plane, Calendar, MapPin, ChevronRight } from "lucide-react";
import Layout from "../components/Layout";

const Index = () => {
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12">
        <div className="max-w-3xl w-full text-center mb-12 animate-slide-up">
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-airline-secondary/60 text-airline-primary text-sm font-medium mb-6">
              <Plane className="h-4 w-4 mr-2" />
              Experience Seamless Travel
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Book Your Dream Flight with <span className="text-airline-primary">CPD Airlines</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enjoy a premium travel experience with comfortable seats, excellent service, and competitive prices
          </p>
        </div>
        
        <div className="w-full max-w-3xl animate-slide-up">
          <div className="glass-card rounded-2xl p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold mb-6">Book Your Flight</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="airline-label">From</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="airline-input pl-10"
                    placeholder="City or Airport"
                    defaultValue="New York"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="airline-label">To</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="airline-input pl-10"
                    placeholder="City or Airport"
                    defaultValue="Los Angeles"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="airline-label">Departure</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="airline-input pl-10"
                    placeholder="Select date"
                    defaultValue="Nov 15, 2023"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="airline-label">Return</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="airline-input pl-10"
                    placeholder="Select date"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="airline-label">Passengers</label>
                <input
                  type="number"
                  className="airline-input"
                  placeholder="1"
                  defaultValue="1"
                  min="1"
                />
              </div>
            </div>
            
            <Link to="/checkout" className="airline-button-primary w-full flex justify-center items-center">
              Search Flights
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          <div className="mt-8 flex justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              Lowest fares
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-airline-primary mr-2"></div>
              Direct flights
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              No booking fees
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
