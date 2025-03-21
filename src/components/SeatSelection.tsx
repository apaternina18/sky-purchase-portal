
import React, { useState } from "react";
import { Plane } from "lucide-react";

interface SeatSelectionProps {
  onSeatSelect: (seat: string) => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ onSeatSelect }) => {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  
  // Define the seat layout
  const rows = ["A", "B", "C", "D", "E", "F"];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  // Define unavailable seats
  const unavailableSeats = ["A1", "B1", "C3", "D4", "F6", "E7", "A9", "B9"];
  
  const handleSeatClick = (seat: string) => {
    if (unavailableSeats.includes(seat)) return;
    
    setSelectedSeat(seat);
    onSeatSelect(seat);
  };
  
  const getSeatStatus = (seat: string) => {
    if (selectedSeat === seat) return "selected";
    if (unavailableSeats.includes(seat)) return "unavailable";
    return "available";
  };

  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-bold mb-6">Select Your Seat</h2>
      
      <div className="mb-8 bg-airline-muted rounded-xl p-6">
        <div className="flex items-center justify-center space-x-6 mb-8">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded bg-airline-secondary mr-2"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 rounded bg-airline-primary mr-2"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 rounded bg-gray-200 mr-2"></div>
            <span className="text-sm">Unavailable</span>
          </div>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="bg-airline-primary/20 rounded px-6 py-2 flex items-center">
            <Plane className="h-5 w-5 text-airline-primary mr-2" />
            <span className="text-sm font-medium text-airline-primary">Front of Plane</span>
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-2">
          {/* Seat labels - left side */}
          <div className="col-span-1 flex flex-col items-center justify-center space-y-3">
            {rows.slice(0, 3).map((row) => (
              <div key={row} className="h-12 w-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-500">{row}</span>
              </div>
            ))}
          </div>
          
          {/* Left seats */}
          <div className="col-span-4 space-y-3">
            {rows.slice(0, 3).map((row) => (
              <div key={row} className="flex space-x-3">
                {columns.slice(0, 3).map((col) => {
                  const seat = `${row}${col}`;
                  const status = getSeatStatus(seat);
                  return (
                    <button
                      key={seat}
                      className={`airline-seat airline-seat-${status}`}
                      onClick={() => handleSeatClick(seat)}
                      disabled={status === 'unavailable'}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          
          {/* Aisle */}
          <div className="col-span-2 flex items-center justify-center">
            <div className="h-full w-px bg-gray-300 mx-auto"></div>
          </div>
          
          {/* Right seats */}
          <div className="col-span-4 space-y-3">
            {rows.slice(3, 6).map((row) => (
              <div key={row} className="flex space-x-3">
                {columns.slice(0, 3).map((col) => {
                  const seat = `${row}${col}`;
                  const status = getSeatStatus(seat);
                  return (
                    <button
                      key={seat}
                      className={`airline-seat airline-seat-${status}`}
                      onClick={() => handleSeatClick(seat)}
                      disabled={status === 'unavailable'}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          
          {/* Seat labels - right side */}
          <div className="col-span-1 flex flex-col items-center justify-center space-y-3">
            {rows.slice(3, 6).map((row) => (
              <div key={row} className="h-12 w-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-500">{row}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {selectedSeat && (
        <div className="bg-airline-secondary/30 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-medium mb-2">Your Selected Seat</h3>
          <div className="flex items-center">
            <div className="bg-airline-primary text-white w-12 h-12 rounded-lg flex items-center justify-center font-medium mr-4">
              {selectedSeat}
            </div>
            <div>
              <p className="text-sm text-gray-600">Economy Class</p>
              <p className="text-sm text-gray-600">Standard legroom</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="pt-4">
        <button 
          className="airline-button-primary w-full"
          disabled={!selectedSeat}
          onClick={() => selectedSeat && onSeatSelect(selectedSeat)}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
