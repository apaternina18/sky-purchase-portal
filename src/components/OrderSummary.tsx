
import React from "react";
import { Plane, User, CalendarDays, ChevronDown, ChevronUp } from "lucide-react";

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

interface OrderSummaryProps {
  flight: Flight | null;
  selectedSeat?: string;
  passengerName?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  flight, 
  selectedSeat,
  passengerName,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  const calculateTax = (price: number) => Math.round(price * 0.08);
  const calculateServiceFee = () => 19.99;
  
  if (!flight) return null;
  
  const tax = calculateTax(flight.price);
  const serviceFee = calculateServiceFee();
  const total = flight.price + tax + serviceFee;
  
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 h-full">
      <h3 className="font-medium text-lg border-b border-gray-100 pb-4 mb-4">Flight Summary</h3>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-3">
          <div className="bg-airline-secondary rounded-full p-2 mt-1">
            <Plane className="h-4 w-4 text-airline-primary" />
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-medium">{flight.departureCity} to {flight.arrivalCity}</h4>
              <div className="airline-chip bg-airline-secondary/50 text-airline-primary text-xs">
                Direct
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>
                {flight.departureCode} {flight.departureTime} → {flight.arrivalCode} {flight.arrivalTime}
              </p>
              <p className="mt-1">Duration: {flight.duration}</p>
            </div>
            
            <div className="flex items-center space-x-2 mt-3">
              <CalendarDays className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">November 15, 2023</span>
            </div>
          </div>
        </div>
        
        {passengerName && (
          <div className="flex items-start space-x-3 pt-4 border-t border-gray-100">
            <div className="bg-airline-secondary rounded-full p-2 mt-1">
              <User className="h-4 w-4 text-airline-primary" />
            </div>
            
            <div>
              <h4 className="font-medium">Passenger</h4>
              <p className="text-sm text-gray-500 mt-1">{passengerName}</p>
              
              {selectedSeat && (
                <div className="flex items-center space-x-2 mt-3">
                  <div className="text-xs bg-airline-primary text-white px-2 py-1 rounded">
                    Seat {selectedSeat}
                  </div>
                  <span className="text-sm text-gray-500">Economy Class</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Base fare</span>
            <span className="font-medium">${flight.price.toFixed(2)}</span>
          </div>
          
          <div 
            className="flex justify-between items-center py-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="text-gray-600 flex items-center">
              Taxes & Fees
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 ml-1" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-1" />
              )}
            </span>
            <span className="font-medium">${(tax + serviceFee).toFixed(2)}</span>
          </div>
          
          {isExpanded && (
            <div className="ml-4 mb-2 space-y-2 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-3">
            <span className="font-medium">Total</span>
            <span className="text-lg font-bold text-airline-primary">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
