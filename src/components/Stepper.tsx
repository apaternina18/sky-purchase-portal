
import React from "react";
import { Check } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 
                ${index < currentStep 
                  ? "bg-airline-primary border-airline-primary text-white" 
                  : index === currentStep 
                    ? "border-airline-primary text-airline-primary" 
                    : "border-gray-300 text-gray-300"}`}
                onClick={() => onStepClick && index < currentStep && onStepClick(index)}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span 
                className={`mt-2 text-xs font-medium transition-colors duration-300
                ${index <= currentStep ? "text-airline-primary" : "text-gray-400"}`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div 
                className={`flex-1 h-0.5 mx-4 transition-colors duration-300
                ${index < currentStep ? "bg-airline-primary" : "bg-gray-300"}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
