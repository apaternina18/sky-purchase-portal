
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle, Plane, ArrowRight } from "lucide-react";
import Layout from "../components/Layout";

interface LocationState {
  flight: {
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
  };
  passengerData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  selectedSeat: string;
}

const Confirmation: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!state || !state.flight || !state.passengerData) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-8">We couldn't find your booking information.</p>
          <Link to="/checkout" className="airline-button-primary">
            Return to Checkout
          </Link>
        </div>
      </Layout>
    );
  }
  
  const { flight, passengerData, selectedSeat } = state;
  const bookingNumber = `SK${Math.floor(10000 + Math.random() * 90000)}`;
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-green-600 animate-pulse-soft" />
          </div>
          <h1 className="text-3xl font-bold mb-3 animate-slide-up">Booking Confirmed!</h1>
          <p className="text-gray-600 animate-slide-up">
            Thank you for booking with CPD Airlines. Your flight has been successfully booked.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Booking Details</h2>
              <div className="airline-chip bg-airline-secondary/70 text-cpd-blue">
                Confirmed
              </div>
            </div>
            <p className="text-gray-500 mt-1">Booking Number: {bookingNumber}</p>
          </div>
          
          <div className="p-6 animate-slide-up">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <div className="mb-4 md:mb-0">
                <div className="text-4xl font-bold text-cpd-blue animate-plane-takeoff">
                  {flight.departureCode}
                </div>
                <p className="text-gray-500">{flight.departureCity}</p>
                <p className="text-sm text-gray-400">{flight.departureTime}</p>
              </div>
              
              <div className="flex flex-col items-center">
                <p className="text-xs text-gray-400 mb-1">{flight.duration}</p>
                <div className="relative w-32 md:w-48 h-px bg-gray-300 my-2">
                  <div className="absolute top-1/2 right-0 w-2 h-2 bg-cpd-blue rounded-full transform -translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-0 w-2 h-2 bg-cpd-blue rounded-full transform -translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Plane className="h-5 w-5 text-cpd-blue animate-pulse-soft" />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">Direct Flight</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="text-4xl font-bold text-cpd-blue">
                  {flight.arrivalCode}
                </div>
                <p className="text-gray-500">{flight.arrivalCity}</p>
                <p className="text-sm text-gray-400">{flight.arrivalTime}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-100 pt-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Date</h3>
                <p className="font-medium">November 15, 2023</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Passenger</h3>
                <p className="font-medium">{passengerData.firstName} {passengerData.lastName}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Seat</h3>
                <div className="flex items-center">
                  <div className="bg-cpd-blue text-white text-sm px-2 py-1 rounded mr-2">
                    {selectedSeat}
                  </div>
                  <span className="text-sm">Economy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-cpd-blue/5 rounded-xl p-6 border border-cpd-blue/10 mb-8 animate-slide-up">
          <h3 className="font-medium mb-3">Important Information</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <ArrowRight className="h-4 w-4 text-cpd-blue mr-2 mt-0.5 flex-shrink-0" />
              Please arrive at the airport at least 2 hours before your departure time.
            </li>
            <li className="flex items-start">
              <ArrowRight className="h-4 w-4 text-cpd-blue mr-2 mt-0.5 flex-shrink-0" />
              Don't forget to bring a valid photo ID or passport for check-in.
            </li>
            <li className="flex items-start">
              <ArrowRight className="h-4 w-4 text-cpd-blue mr-2 mt-0.5 flex-shrink-0" />
              A confirmation email has been sent to {passengerData.email}.
            </li>
          </ul>
        </div>
        
        <div className="text-center animate-slide-up">
          <Link to="/" className="airline-button-primary">
            Return to Home
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            Need help? <a href="#" className="text-cpd-blue hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Confirmation;
