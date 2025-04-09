
import React, { useState } from "react";
import { Plane, Calendar, Clock, ArrowRight, Check } from "lucide-react";

interface Flight {
  id: string;
  departureCity: string;
  departureCode: string;
  departureTime: string;
  arrivalCity: string;
  arrivalCode: string;
  arrivalTime: string;
  duration: string;
  price: number;
  date: string;
}

const SAMPLE_FLIGHTS: Flight[] = [
  {
    id: "fl1",
    departureCity: "New York",
    departureCode: "JFK",
    departureTime: "08:30 AM",
    arrivalCity: "Los Angeles",
    arrivalCode: "LAX",
    arrivalTime: "11:45 AM",
    duration: "5h 15m",
    price: 349,
    date: "2023-11-15",
  },
  {
    id: "fl2",
    departureCity: "New York",
    departureCode: "JFK",
    departureTime: "12:30 PM",
    arrivalCity: "Los Angeles",
    arrivalCode: "LAX",
    arrivalTime: "03:45 PM",
    duration: "5h 15m",
    price: 299,
    date: "2023-11-15",
  },
  {
    id: "fl3",
    departureCity: "New York",
    departureCode: "JFK",
    departureTime: "06:45 PM",
    arrivalCity: "Los Angeles",
    arrivalCode: "LAX",
    arrivalTime: "10:00 PM",
    duration: "5h 15m",
    price: 419,
    date: "2023-11-15",
  },
];

interface FlightSelectionProps {
  onFlightSelect: (flight: Flight) => void;
}

const FlightSelection: React.FC<FlightSelectionProps> = ({ onFlightSelect }) => {
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  
  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight.id);
    onFlightSelect(flight);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Select Flight</h2>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-cpd-blue" />
          <span className="text-sm font-medium">November 15, 2023</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {SAMPLE_FLIGHTS.map((flight) => (
          <div 
            key={flight.id}
            className={`airline-flight-card ${
              selectedFlight === flight.id ? "ring-2 ring-cpd-blue" : ""
            }`}
            onClick={() => handleSelectFlight(flight)}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="bg-airline-secondary rounded-full p-3">
                  <Plane className="h-6 w-6 text-cpd-blue" />
                </div>
                <div>
                  <div className="flex items-center space-x-6">
                    <div>
                      <p className="text-lg font-bold">{flight.departureTime}</p>
                      <p className="text-sm text-gray-500">{flight.departureCode}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-gray-400 mb-1">{flight.duration}</div>
                      <div className="relative w-20 h-px bg-gray-300">
                        <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-cpd-blue rounded-full transform -translate-y-1/2"></div>
                        <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-cpd-blue rounded-full transform -translate-y-1/2"></div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Direct</div>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{flight.arrivalTime}</p>
                      <p className="text-sm text-gray-500">{flight.arrivalCode}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <p className="text-2xl font-bold text-cpd-blue">${flight.price}</p>
                <p className="text-sm text-gray-500">per person</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="airline-chip bg-airline-secondary/50 text-cpd-blue">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  On time
                </div>
                <div className="airline-chip bg-gray-100 text-gray-600">
                  Economy
                </div>
              </div>
              
              {selectedFlight === flight.id && (
                <button className="airline-button-primary py-2 px-4 flex items-center text-sm" disabled>
                  Selected
                  <Check className="ml-1 w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightSelection;
