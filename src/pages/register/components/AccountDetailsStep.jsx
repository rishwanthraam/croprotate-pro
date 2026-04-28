import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AccountDetailsStep = ({ formData, onUpdate, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const userTypeOptions = [
    { value: 'farmer', label: 'Farmer', description: 'Individual farm owner or operator' },
    { value: 'consultant', label: 'Agricultural Consultant', description: 'Professional advisor to multiple farms' },
    { value: 'extension-officer', label: 'Extension Officer', description: 'Government or institutional advisor' },
    { value: 'student', label: 'Student/Researcher', description: 'Academic or research purposes' }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 25;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const password = e?.target?.value;
    setPasswordStrength(calculatePasswordStrength(password));
    onUpdate({ password });
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-error';
    if (passwordStrength <= 50) return 'bg-warning';
    if (passwordStrength <= 75) return 'bg-accent';
    return 'bg-success';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 25) return 'Weak';
    if (passwordStrength <= 50) return 'Fair';
    if (passwordStrength <= 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="User" size={24} className="text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Create Your Account
        </h2>
        <p className="text-muted-foreground font-body">
          Let's start with your basic information
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          value={formData?.firstName || ''}
          onChange={(e) => onUpdate({ firstName: e?.target?.value })}
          error={errors?.firstName}
          required
        />

        <Input
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          value={formData?.lastName || ''}
          onChange={(e) => onUpdate({ lastName: e?.target?.value })}
          error={errors?.lastName}
          required
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        placeholder="your.email@example.com"
        description="We'll use this for account verification and important updates"
        value={formData?.email || ''}
        onChange={(e) => onUpdate({ email: e?.target?.value })}
        error={errors?.email}
        required
      />
      <div className="space-y-2">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            value={formData?.password || ''}
            onChange={handlePasswordChange}
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
          </button>
        </div>
        
        {formData?.password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-caption text-muted-foreground">Password strength:</span>
              <span className={`font-data font-medium ${
                passwordStrength <= 25 ? 'text-error' :
                passwordStrength <= 50 ? 'text-warning' :
                passwordStrength <= 75 ? 'text-accent' : 'text-success'
              }`}>
                {getStrengthText()}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                style={{ width: `${passwordStrength}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Use 8+ characters with uppercase, lowercase, numbers, and symbols
            </p>
          </div>
        )}
      </div>
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        value={formData?.confirmPassword || ''}
        onChange={(e) => onUpdate({ confirmPassword: e?.target?.value })}
        error={errors?.confirmPassword}
        required
      />
      <Select
        label="I am a..."
        description="This helps us customize your experience"
        options={userTypeOptions}
        value={formData?.userType || ''}
        onChange={(value) => onUpdate({ userType: value })}
        placeholder="Select your role"
        error={errors?.userType}
        required
      />
      <div className="bg-muted/50 rounded-lg p-4 border border-border">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-1">
              Your Data is Secure
            </h4>
            <p className="text-xs text-muted-foreground font-body">
              We use industry-standard encryption to protect your agricultural data. 
              Your farm information will only be used to provide personalized crop rotation recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsStep;