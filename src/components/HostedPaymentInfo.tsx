
import React, { useState } from "react";
import { ExternalLink, CheckCircle } from "lucide-react";

interface HostedPaymentInfoProps {
  onPaymentComplete: () => void;
}

const HostedPaymentInfo: React.FC<HostedPaymentInfoProps> = ({ onPaymentComplete }) => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [simulatePayment, setSimulatePayment] = useState(false);
  
  const handleRedirect = () => {
    setIsRedirecting(true);
    
    // In a real implementation, this would redirect to an external payment page
    // For demo purposes, we'll simulate a completed payment after a delay
    setTimeout(() => {
      setIsRedirecting(false);
      setSimulatePayment(true);
    }, 2000);
  };
  
  const handleCompletePayment = () => {
    onPaymentComplete();
  };

  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-bold mb-6">Hosted Payment Page</h2>
      
      {!simulatePayment ? (
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium">External Payment</h3>
            <div className="flex space-x-3">
              <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs">VISA</span>
              </div>
              <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs">MC</span>
              </div>
              <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs">AMEX</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">
            You will be redirected to our secure payment partner to complete your payment. 
            After completing your payment, you will be returned to this page.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">What to expect:</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Secure connection to our payment partner</li>
              <li>• Enter your payment details on their site</li>
              <li>• Automatic return after payment completion</li>
            </ul>
          </div>
          
          <button 
            className="airline-button-primary w-full flex items-center justify-center"
            onClick={handleRedirect}
            disabled={isRedirecting}
          >
            {isRedirecting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Redirecting to Payment Page...
              </>
            ) : (
              <>
                <span>Proceed to Payment Page</span>
                <ExternalLink className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <div className="text-center py-8">
            <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-medium mb-2">Payment Completed</h3>
            <p className="text-gray-600 mb-8">
              Your payment has been processed successfully through our hosted payment system.
            </p>
            <button 
              className="airline-button-primary"
              onClick={handleCompletePayment}
            >
              Continue to Confirmation
            </button>
          </div>
        </div>
      )}
      
      <div className="bg-[#B8273C]/5 rounded-xl p-6 border border-[#B8273C]/10">
        <div className="flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-[#B8273C] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-[#B8273C]">Secure Hosted Payment</h4>
            <p className="text-sm text-gray-600 mt-1">
              Your payment information is processed securely by our payment partner. 
              We never receive or store your complete payment details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostedPaymentInfo;
