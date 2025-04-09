
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Stepper from "../components/Stepper";
import FlightSelection from "../components/FlightSelection";
import PassengerInfo, { PassengerData } from "../components/PassengerInfo";
import SeatSelection from "../components/SeatSelection";
import PaymentInfo from "../components/PaymentInfo";
import OrderSummary from "../components/OrderSummary";
import HostedPaymentInfo from "../components/HostedPaymentInfo";

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

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [passengerData, setPassengerData] = useState<PassengerData | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"iframe" | "hosted" | null>(null);
  
  const steps = ["Flight", "Passenger", "Seat", "Payment"];
  
  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight);
    setTimeout(() => setCurrentStep(1), 300);
  };
  
  const handlePassengerDataComplete = (data: PassengerData) => {
    setPassengerData(data);
    setTimeout(() => setCurrentStep(2), 300);
  };
  
  const handleSeatSelect = (seat: string, method: "iframe" | "hosted") => {
    setSelectedSeat(seat);
    setPaymentMethod(method);
    setTimeout(() => setCurrentStep(3), 300);
  };
  
  const handlePaymentComplete = () => {
    navigate("/confirmation", { 
      state: { 
        flight: selectedFlight,
        passengerData,
        selectedSeat,
        paymentMethod
      } 
    });
  };
  
  const handleStepClick = (step: number) => {
    // Only allow going back to previous steps
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Secure Checkout</h1>
        
        <Stepper steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            {currentStep === 0 && (
              <FlightSelection onFlightSelect={handleFlightSelect} />
            )}
            
            {currentStep === 1 && (
              <PassengerInfo onComplete={handlePassengerDataComplete} />
            )}
            
            {currentStep === 2 && (
              <SeatSelection onSeatSelect={handleSeatSelect} />
            )}
            
            {currentStep === 3 && paymentMethod === "iframe" && (
              <PaymentInfo onPaymentComplete={handlePaymentComplete} />
            )}
            
            {currentStep === 3 && paymentMethod === "hosted" && (
              <HostedPaymentInfo onPaymentComplete={handlePaymentComplete} />
            )}
          </div>
          
          <div className="lg:col-span-1">
            <OrderSummary 
              flight={selectedFlight}
              selectedSeat={selectedSeat ?? undefined}
              passengerName={passengerData ? `${passengerData.firstName} ${passengerData.lastName}` : undefined}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
