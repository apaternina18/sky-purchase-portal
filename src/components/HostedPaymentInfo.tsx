
import React, { useState } from "react";
import { ExternalLink, CheckCircle, CreditCard, Wallet } from "lucide-react";
import { Button } from "./ui/button";

interface HostedPaymentInfoProps {
  onPaymentComplete: () => void;
}

const HostedPaymentInfo: React.FC<HostedPaymentInfoProps> = ({ onPaymentComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState<"card" | "applepay" | "googlepay" | "paypal" | null>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  const handlePaymentSubmit = () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
    }, 2000);
  };
  
  const handleCompletePayment = () => {
    onPaymentComplete();
  };

  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-bold mb-6">Hosted Payment Page</h2>
      
      {!paymentComplete ? (
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h3 className="font-medium mb-6">Select Payment Method</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button 
              className={`p-4 border rounded-lg flex flex-col items-center justify-center gap-2 transition-colors ${selectedMethod === 'card' ? 'border-[#B8273C] bg-[#B8273C]/5' : 'border-gray-200 hover:bg-gray-50'}`}
              onClick={() => setSelectedMethod('card')}
            >
              <CreditCard className={`h-6 w-6 ${selectedMethod === 'card' ? 'text-[#B8273C]' : 'text-gray-600'}`} />
              <span className={selectedMethod === 'card' ? 'text-[#B8273C] font-medium' : 'text-gray-600'}>Credit / Debit Card</span>
              <div className="flex space-x-2 mt-1">
                <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs">VISA</span>
                </div>
                <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs">MC</span>
                </div>
              </div>
            </button>
            
            <button 
              className={`p-4 border rounded-lg flex flex-col items-center justify-center gap-2 transition-colors ${selectedMethod === 'applepay' ? 'border-[#B8273C] bg-[#B8273C]/5' : 'border-gray-200 hover:bg-gray-50'}`}
              onClick={() => setSelectedMethod('applepay')}
            >
              <Wallet className={`h-6 w-6 ${selectedMethod === 'applepay' ? 'text-[#B8273C]' : 'text-gray-600'}`} />
              <span className={selectedMethod === 'applepay' ? 'text-[#B8273C] font-medium' : 'text-gray-600'}>Apple Pay</span>
            </button>
            
            <button 
              className={`p-4 border rounded-lg flex flex-col items-center justify-center gap-2 transition-colors ${selectedMethod === 'googlepay' ? 'border-[#B8273C] bg-[#B8273C]/5' : 'border-gray-200 hover:bg-gray-50'}`}
              onClick={() => setSelectedMethod('googlepay')}
            >
              <Wallet className={`h-6 w-6 ${selectedMethod === 'googlepay' ? 'text-[#B8273C]' : 'text-gray-600'}`} />
              <span className={selectedMethod === 'googlepay' ? 'text-[#B8273C] font-medium' : 'text-gray-600'}>Google Pay</span>
            </button>
            
            <button 
              className={`p-4 border rounded-lg flex flex-col items-center justify-center gap-2 transition-colors ${selectedMethod === 'paypal' ? 'border-[#B8273C] bg-[#B8273C]/5' : 'border-gray-200 hover:bg-gray-50'}`}
              onClick={() => setSelectedMethod('paypal')}
            >
              <div className={`text-xl ${selectedMethod === 'paypal' ? 'text-[#B8273C]' : 'text-gray-600'}`}>
                Pay<span className="font-bold">Pal</span>
              </div>
              <span className={selectedMethod === 'paypal' ? 'text-[#B8273C] font-medium' : 'text-gray-600'}>PayPal</span>
            </button>
          </div>
          
          {selectedMethod === 'card' && (
            <div className="space-y-4 mb-6 border border-gray-200 p-4 rounded-lg">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input 
                  type="text"
                  id="cardNumber"
                  placeholder="**** **** **** ****"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#B8273C] focus:border-[#B8273C] outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input 
                    type="text"
                    id="expiry"
                    placeholder="MM/YY"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#B8273C] focus:border-[#B8273C] outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input 
                    type="text"
                    id="cvv"
                    placeholder="***"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#B8273C] focus:border-[#B8273C] outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                <input 
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#B8273C] focus:border-[#B8273C] outline-none"
                />
              </div>
            </div>
          )}
          
          {selectedMethod === 'paypal' && (
            <div className="text-center py-6 border border-gray-200 rounded-lg mb-6">
              <p className="text-gray-600 mb-4">You'll be redirected to PayPal to complete your payment.</p>
              <div className="text-2xl font-bold text-blue-600">
                Pay<span className="font-black">Pal</span>
              </div>
            </div>
          )}
          
          {(selectedMethod === 'applepay' || selectedMethod === 'googlepay') && (
            <div className="text-center py-6 border border-gray-200 rounded-lg mb-6">
              <p className="text-gray-600 mb-4">
                You'll be prompted to complete your payment with {selectedMethod === 'applepay' ? 'Apple Pay' : 'Google Pay'}.
              </p>
              <div className="flex items-center justify-center">
                <Wallet className="h-8 w-8 text-gray-700" />
                <span className="ml-2 text-xl font-medium text-gray-700">
                  {selectedMethod === 'applepay' ? 'Apple Pay' : 'Google Pay'}
                </span>
              </div>
            </div>
          )}
          
          <Button 
            variant="cpd"
            className="w-full"
            disabled={!selectedMethod || isProcessing}
            onClick={handlePaymentSubmit}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing Payment...
              </>
            ) : (
              `Pay Now with ${
                selectedMethod === 'card' ? 'Card' : 
                selectedMethod === 'applepay' ? 'Apple Pay' : 
                selectedMethod === 'googlepay' ? 'Google Pay' : 'PayPal'
              }`
            )}
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <div className="text-center py-8">
            <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-medium mb-2">Payment Completed</h3>
            <p className="text-gray-600 mb-8">
              Your payment has been processed successfully.
            </p>
            <Button 
              variant="cpd"
              onClick={handleCompletePayment}
            >
              Continue to Confirmation
            </Button>
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
