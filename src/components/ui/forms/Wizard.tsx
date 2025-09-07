"use client";

import React, { useState, ReactNode } from 'react';
import Button from './Button';

interface Step {
  title: string;
  component: ReactNode;
  isValid?: () => boolean;
}

interface WizardProps {
  steps: Step[];
  onComplete: (data: any) => void;
  onCancel?: () => void;
  className?: string;
}

const Wizard: React.FC<WizardProps> = ({ steps, onComplete, onCancel, className = '' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepData, setStepData] = useState<any>({});

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(stepData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepDataChange = (data: any) => {
    setStepData({ ...stepData, ...data });
  };

  const isCurrentStepValid = () => {
    return !steps[currentStep].isValid || steps[currentStep].isValid!();
  };

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <h2 className="text-xl font-semibold text-center">{steps[currentStep].title}</h2>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {steps[currentStep].component}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onCancel || (() => {})}
          disabled={currentStep === 0 && !onCancel}
        >
          {currentStep === 0 ? 'Cancel' : 'Previous'}
        </Button>

        <div className="flex space-x-2">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!isCurrentStepValid()}
          >
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wizard;