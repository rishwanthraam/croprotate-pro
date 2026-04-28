import React from 'react';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const NavigationButtons = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrevious, 
  onSubmit, 
  isLoading = false,
  canProceed = true 
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex flex-col space-y-4">
      {/* Main Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {!isFirstStep && (
            <Button
              variant="outline"
              onClick={onPrevious}
              iconName="ChevronLeft"
              iconPosition="left"
              disabled={isLoading}
            >
              Previous
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {isLastStep ? (
            <Button
              variant="default"
              onClick={onSubmit}
              loading={isLoading}
              disabled={!canProceed}
              iconName="Check"
              iconPosition="left"
              className="min-w-[120px]"
            >
              Create Account
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={onNext}
              disabled={!canProceed || isLoading}
              iconName="ChevronRight"
              iconPosition="right"
              className="min-w-[100px]"
            >
              Next Step
            </Button>
          )}
        </div>
      </div>
      {/* Alternative Actions */}
      <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground font-body">
          Already have an account?
        </p>
        <Link
          to="/login"
          className="text-sm font-body font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Sign in here
        </Link>
      </div>
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2 pt-2">
        <span className="text-xs text-muted-foreground font-data">
          Step {currentStep} of {totalSteps}
        </span>
        <div className="flex space-x-1">
          {[...Array(totalSteps)]?.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index + 1 <= currentStep ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>
      {/* Help Text */}
      <div className="text-center pt-2">
        <p className="text-xs text-muted-foreground font-body">
          Need help? Contact our support team at{' '}
          <a 
            href="mailto:support@croprotate.pro" 
            className="text-primary hover:text-primary/80 transition-colors"
          >
            support@croprotate.pro
          </a>
        </p>
      </div>
    </div>
  );
};

export default NavigationButtons;