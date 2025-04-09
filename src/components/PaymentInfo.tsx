
import React, { useState } from "react";
import { CreditCard, Calendar, Lock, CheckCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { AppleIcon, GoogleIcon, CreditCardIcon } from "./PaymentIcons";

interface PaymentInfoProps {
  onPaymentComplete: () => void;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ onPaymentComplete }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  const paymentMethods: PaymentMethod[] = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCardIcon className="h-6 w-6" />
    },
    {
      id: "apple",
      name: "Apple Pay",
      icon: <AppleIcon className="h-6 w-6" />
    },
    {
      id: "google",
      name: "Google Pay",
      icon: <GoogleIcon className="h-6 w-6" />
    }
  ];
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };
  
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCardNumber(e.target.value);
    setCardNumber(value);
    if (errors.cardNumber) {
      setErrors({ ...errors, cardNumber: "" });
    }
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatExpiryDate(e.target.value);
    setExpiryDate(value);
    if (errors.expiryDate) {
      setErrors({ ...errors, expiryDate: "" });
    }
  };
  
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvv(value);
    if (errors.cvv) {
      setErrors({ ...errors, cvv: "" });
    }
  };
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameOnCard(e.target.value);
    if (errors.nameOnCard) {
      setErrors({ ...errors, nameOnCard: "" });
    }
  };
  
  const validateForm = (): boolean => {
    // Skip validation for Apple Pay and Google Pay
    if (paymentMethod !== "card") {
      return true;
    }
    
    const newErrors: Record<string, string> = {};
    
    if (!cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    
    if (!expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!expiryDate.includes("/") || expiryDate.length < 5) {
      newErrors.expiryDate = "Expiry date format must be MM/YY";
    }
    
    if (!cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (cvv.length < 3) {
      newErrors.cvv = "CVV must be 3 digits";
    }
    
    if (!nameOnCard.trim()) {
      newErrors.nameOnCard = "Name on card is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        onPaymentComplete();
      }, 2000);
    }
  };

  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
      
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-medium">Payment Method</h3>
          <div className="flex space-x-3">
            <div className="w-10 h-6 bg-gray-100 rounded"></div>
            <div className="w-10 h-6 bg-gray-100 rounded"></div>
            <div className="w-10 h-6 bg-gray-100 rounded"></div>
          </div>
        </div>
        
        <RadioGroup className="mb-6" value={paymentMethod} onValueChange={setPaymentMethod}>
          {paymentMethods.map((method) => (
            <div 
              key={method.id}
              className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                paymentMethod === method.id 
                  ? 'border-airline-primary bg-airline-primary/5' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setPaymentMethod(method.id)}
            >
              <RadioGroupItem value={method.id} id={method.id} className="text-airline-primary" />
              <div className="flex items-center justify-between flex-1">
                <Label htmlFor={method.id} className="flex items-center gap-2 cursor-pointer font-medium">
                  {method.icon}
                  {method.name}
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
        
        {paymentMethod === "card" ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="cardNumber" className="airline-label">
                Card Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className={`airline-input pl-10 ${errors.cardNumber ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  placeholder="**** **** **** ****"
                  maxLength={19}
                />
              </div>
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="expiryDate" className="airline-label">
                  Expiry Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    className={`airline-input pl-10 ${errors.expiryDate ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="cvv" className="airline-label">
                  CVV
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={handleCvvChange}
                    className={`airline-input pl-10 ${errors.cvv ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="***"
                    maxLength={3}
                  />
                </div>
                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="nameOnCard" className="airline-label">
                Name on Card
              </label>
              <input
                type="text"
                id="nameOnCard"
                value={nameOnCard}
                onChange={handleNameChange}
                className={`airline-input ${errors.nameOnCard ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="John Doe"
              />
              {errors.nameOnCard && (
                <p className="text-red-500 text-sm mt-1">{errors.nameOnCard}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Lock className="h-4 w-4" />
              <p>Your payment information is secure and encrypted</p>
            </div>
            
            <div className="pt-4">
              <button type="submit" className="airline-button-primary w-full" disabled={isProcessing}>
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing Payment...
                  </div>
                ) : (
                  "Complete Payment"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="p-6 border border-gray-200 rounded-xl flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-airline-primary/10 rounded-full flex items-center justify-center mb-4">
                {paymentMethod === "apple" ? 
                  <AppleIcon className="h-8 w-8" /> : 
                  <GoogleIcon className="h-8 w-8" />
                }
              </div>
              <h3 className="text-lg font-medium mb-2">
                {paymentMethod === "apple" ? "Pay with Apple Pay" : "Pay with Google Pay"}
              </h3>
              <p className="text-gray-600 mb-4">
                {paymentMethod === "apple" 
                  ? "You'll be redirected to Apple Pay to complete your purchase securely." 
                  : "You'll be redirected to Google Pay to complete your purchase securely."
                }
              </p>
              <button 
                type="button" 
                onClick={() => {
                  setIsProcessing(true);
                  setTimeout(() => {
                    setIsProcessing(false);
                    onPaymentComplete();
                  }, 2000);
                }}
                className="airline-button-primary w-full" 
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Continue with ${paymentMethod === "apple" ? "Apple Pay" : "Google Pay"}`
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-airline-primary/5 rounded-xl p-6 border border-airline-primary/10">
        <div className="flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-airline-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-airline-primary">Secure Payment Guarantee</h4>
            <p className="text-sm text-gray-600 mt-1">
              Your payment information is encrypted and secure. We do not store your card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
