import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const PreferencesStep = ({ formData, onUpdate, errors }) => {
  const measurementUnitOptions = [
    { value: 'imperial', label: 'Imperial (acres, pounds, °F)', description: 'US standard units' },
    { value: 'metric', label: 'Metric (hectares, kg, °C)', description: 'International standard units' }
  ];

  const notificationFrequencyOptions = [
    { value: 'daily', label: 'Daily', description: 'Daily weather and task reminders' },
    { value: 'weekly', label: 'Weekly', description: 'Weekly summaries and planning updates' },
    { value: 'monthly', label: 'Monthly', description: 'Monthly reports and seasonal planning' },
    { value: 'seasonal', label: 'Seasonal', description: 'Only major seasonal notifications' }
  ];

  const certificationOptions = [
    { value: 'organic', label: 'USDA Organic', description: 'Certified organic farming practices' },
    { value: 'sustainable', label: 'Sustainable Agriculture', description: 'Environmentally sustainable practices' },
    { value: 'gmo-free', label: 'Non-GMO', description: 'Non-genetically modified crops only' },
    { value: 'fair-trade', label: 'Fair Trade', description: 'Fair trade certified products' }
  ];

  const handleNotificationPreferences = (key, value) => {
    const notifications = { ...formData?.notificationPreferences };
    notifications[key] = value;
    onUpdate({ notificationPreferences: notifications });
  };

  const handleCertificationRequirements = (selectedCerts) => {
    onUpdate({ certificationRequirements: selectedCerts });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Settings" size={24} className="text-accent" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Customize Your Experience
        </h2>
        <p className="text-muted-foreground font-body">
          Set your preferences to get the most relevant recommendations
        </p>
      </div>
      <Select
        label="Measurement Units"
        description="Choose your preferred units for all calculations and reports"
        options={measurementUnitOptions}
        value={formData?.measurementUnits || 'imperial'}
        onChange={(value) => onUpdate({ measurementUnits: value })}
        error={errors?.measurementUnits}
        required
      />
      <div className="space-y-4">
        <label className="text-sm font-body font-medium text-foreground">
          Notification Preferences
        </label>
        
        <Select
          label="Notification Frequency"
          description="How often would you like to receive updates?"
          options={notificationFrequencyOptions}
          value={formData?.notificationPreferences?.frequency || 'weekly'}
          onChange={(value) => handleNotificationPreferences('frequency', value)}
          error={errors?.notificationFrequency}
        />

        <div className="space-y-3 bg-muted/30 rounded-lg p-4 border border-border">
          <p className="text-sm font-body font-medium text-foreground mb-3">
            Notification Types
          </p>
          
          <Checkbox
            label="Weather Alerts"
            description="Severe weather warnings and optimal planting conditions"
            checked={formData?.notificationPreferences?.weatherAlerts !== false}
            onChange={(e) => handleNotificationPreferences('weatherAlerts', e?.target?.checked)}
          />
          
          <Checkbox
            label="Planting Reminders"
            description="Optimal planting and harvesting time notifications"
            checked={formData?.notificationPreferences?.plantingReminders !== false}
            onChange={(e) => handleNotificationPreferences('plantingReminders', e?.target?.checked)}
          />
          
          <Checkbox
            label="Soil Health Updates"
            description="Soil testing reminders and health status updates"
            checked={formData?.notificationPreferences?.soilHealthUpdates !== false}
            onChange={(e) => handleNotificationPreferences('soilHealthUpdates', e?.target?.checked)}
          />
          
          <Checkbox
            label="Market Price Alerts"
            description="Crop price changes and market opportunities"
            checked={formData?.notificationPreferences?.marketAlerts || false}
            onChange={(e) => handleNotificationPreferences('marketAlerts', e?.target?.checked)}
          />
          
          <Checkbox
            label="Research Updates"
            description="Latest agricultural research and best practices"
            checked={formData?.notificationPreferences?.researchUpdates || false}
            onChange={(e) => handleNotificationPreferences('researchUpdates', e?.target?.checked)}
          />
        </div>
      </div>
      <div className="space-y-3">
        <label className="text-sm font-body font-medium text-foreground">
          Certification Requirements
        </label>
        <p className="text-xs text-muted-foreground -mt-1">
          Select any certifications you maintain or plan to pursue
        </p>
        
        <Select
          options={certificationOptions}
          value={formData?.certificationRequirements || []}
          onChange={handleCertificationRequirements}
          placeholder="Select certifications (optional)"
          multiple
          clearable
        />
      </div>
      <div className="space-y-4">
        <label className="text-sm font-body font-medium text-foreground">
          Data & Privacy Preferences
        </label>
        
        <div className="space-y-3">
          <Checkbox
            label="Share anonymized data for research"
            description="Help improve agricultural research while keeping your identity private"
            checked={formData?.shareDataForResearch || false}
            onChange={(e) => onUpdate({ shareDataForResearch: e?.target?.checked })}
          />
          
          <Checkbox
            label="Receive product recommendations"
            description="Get suggestions for seeds, fertilizers, and equipment based on your crops"
            checked={formData?.receiveProductRecommendations || false}
            onChange={(e) => onUpdate({ receiveProductRecommendations: e?.target?.checked })}
          />
          
          <Checkbox
            label="Connect with local agricultural community"
            description="Find and connect with other farmers and agricultural professionals in your area"
            checked={formData?.connectWithCommunity || false}
            onChange={(e) => onUpdate({ connectWithCommunity: e?.target?.checked })}
          />
        </div>
      </div>
      <div className="space-y-4">
        <label className="text-sm font-body font-medium text-foreground">
          Advanced Features
        </label>
        
        <div className="space-y-3">
          <Checkbox
            label="Enable AI-powered recommendations"
            description="Use machine learning for more accurate crop rotation suggestions"
            checked={formData?.enableAIRecommendations !== false}
            onChange={(e) => onUpdate({ enableAIRecommendations: e?.target?.checked })}
          />
          
          <Checkbox
            label="Integrate with weather services"
            description="Automatically sync with local weather data for better planning"
            checked={formData?.integrateWeatherServices !== false}
            onChange={(e) => onUpdate({ integrateWeatherServices: e?.target?.checked })}
          />
          
          <Checkbox
            label="Enable mobile app sync"
            description="Sync data with mobile app for field use (coming soon)"
            checked={formData?.enableMobileSync || false}
            onChange={(e) => onUpdate({ enableMobileSync: e?.target?.checked })}
          />
        </div>
      </div>
      <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon name="Sparkles" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-1">
              Personalized Experience
            </h4>
            <p className="text-xs text-muted-foreground font-body">
              These preferences help us tailor CropRotate Pro to your specific needs. 
              You can change these settings anytime from your account dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesStep;