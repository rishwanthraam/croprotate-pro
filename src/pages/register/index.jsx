import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import ProgressIndicator from './components/ProgressIndicator';
import AccountDetailsStep from './components/AccountDetailsStep';
import FarmInformationStep from './components/FarmInformationStep';
import PreferencesStep from './components/PreferencesStep';
import TrustElements from './components/TrustElements';
import NavigationButtons from './components/NavigationButtons';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Account Details
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    
    // Farm Information
    farmName: '',
    city: '',
    state: '',
    zipCode: '',
    coordinates: '',
    farmSize: '',
    primaryCrops: [],
    isOrganic: false,
    usesPrecisionAg: false,
    usesConservationTillage: false,
    
    // Preferences
    measurementUnits: 'imperial',
    notificationPreferences: {
      frequency: 'weekly',
      weatherAlerts: true,
      plantingReminders: true,
      soilHealthUpdates: true,
      marketAlerts: false,
      researchUpdates: false
    },
    certificationRequirements: [],
    shareDataForResearch: false,
    receiveProductRecommendations: false,
    connectWithCommunity: false,
    enableAIRecommendations: true,
    integrateWeatherServices: true,
    enableMobileSync: false
  });
  
  const [errors, setErrors] = useState({});

  const steps = [
    {
      id: 'account',
      title: 'Account Details',
      description: 'Basic information'
    },
    {
      id: 'farm',
      title: 'Farm Information',
      description: 'Your farm details'
    },
    {
      id: 'preferences',
      title: 'Preferences',
      description: 'Customize experience'
    }
  ];

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('cropRotateRegistration');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error('Error loading saved registration data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('cropRotateRegistration', JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear related errors when user updates fields
    const updatedErrors = { ...errors };
    Object.keys(updates)?.forEach(key => {
      delete updatedErrors?.[key];
    });
    setErrors(updatedErrors);
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
        if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
        if (!formData?.email?.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData?.password) {
          newErrors.password = 'Password is required';
        } else if (formData?.password?.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        if (!formData?.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData?.password !== formData?.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData?.userType) newErrors.userType = 'Please select your role';
        break;

      case 2:
        if (!formData?.farmName?.trim()) newErrors.farmName = 'Farm name is required';
        if (!formData?.city?.trim()) newErrors.city = 'City is required';
        if (!formData?.state) newErrors.state = 'State is required';
        if (!formData?.zipCode?.trim()) {
          newErrors.zipCode = 'ZIP code is required';
        } else if (!/^\d{5}(-\d{4})?$/?.test(formData?.zipCode)) {
          newErrors.zipCode = 'Please enter a valid ZIP code';
        }
        if (!formData?.farmSize) newErrors.farmSize = 'Farm size is required';
        if (!formData?.primaryCrops?.length) newErrors.primaryCrops = 'Please select at least one crop';
        break;

      case 3:
        if (!formData?.measurementUnits) newErrors.measurementUnits = 'Please select measurement units';
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps?.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear saved registration data
      localStorage.removeItem('cropRotateRegistration');
      
      // Mock successful registration
      console.log('Registration successful:', formData);
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData?.firstName && formData?.lastName && formData?.email && 
               formData?.password && formData?.confirmPassword && formData?.userType;
      case 2:
        return formData?.farmName && formData?.city && formData?.state && 
               formData?.zipCode && formData?.farmSize && formData?.primaryCrops?.length > 0;
      case 3:
        return formData?.measurementUnits;
      default:
        return false;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AccountDetailsStep
            formData={formData}
            onUpdate={updateFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <FarmInformationStep
            formData={formData}
            onUpdate={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <PreferencesStep
            formData={formData}
            onUpdate={updateFormData}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Register - CropRotate Pro | Agricultural Intelligence Platform</title>
        <meta name="description" content="Join CropRotate Pro to optimize your crop yields and soil health through data-driven rotation recommendations. Start your free account today." />
        <meta name="keywords" content="crop rotation, agricultural software, farm management, soil health, yield optimization" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <Icon name="Sprout" size={20} color="white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-semibold text-lg text-foreground">
                    CropRotate Pro
                  </span>
                  <span className="font-caption text-xs text-muted-foreground -mt-1">
                    Agricultural Intelligence
                  </span>
                </div>
              </Link>

              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
                >
                  Already have an account?
                </Link>
                <Link
                  to="/login"
                  className="text-sm font-body font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Registration Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow-soft border border-border p-6 sm:p-8">
                <ProgressIndicator
                  currentStep={currentStep}
                  totalSteps={steps?.length}
                  steps={steps}
                />

                <div className="mb-8">
                  {renderCurrentStep()}
                </div>

                {errors?.submit && (
                  <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertCircle" size={16} className="text-error" />
                      <p className="text-sm text-error font-body">{errors?.submit}</p>
                    </div>
                  </div>
                )}

                <NavigationButtons
                  currentStep={currentStep}
                  totalSteps={steps?.length}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  canProceed={canProceed()}
                />
              </div>
            </div>

            {/* Trust Elements Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <TrustElements />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                    <Icon name="Sprout" size={20} color="white" />
                  </div>
                  <span className="font-heading font-semibold text-lg text-foreground">
                    CropRotate Pro
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-body mb-4">
                  Empowering farmers with data-driven crop rotation recommendations 
                  for optimal yields and sustainable soil health.
                </p>
                <div className="flex items-center space-x-4">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-xs text-muted-foreground font-caption">
                    USDA Certified • SOC 2 Compliant
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-heading font-semibold text-sm text-foreground mb-3">
                  Support
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a href="mailto:support@croprotate.pro" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                      Contact Support
                    </a>
                  </li>
                  <li>
                    <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                      Documentation
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-heading font-semibold text-sm text-foreground mb-3">
                  Legal
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                      Data Security
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between">
              <p className="text-xs text-muted-foreground font-caption">
                © {new Date()?.getFullYear()} CropRotate Pro. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <span className="text-xs text-muted-foreground font-caption">
                  Made with
                </span>
                <Icon name="Heart" size={12} className="text-error fill-current" />
                <span className="text-xs text-muted-foreground font-caption">
                  for farmers
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Register;