import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const FarmInformationStep = ({ formData, onUpdate, errors }) => {
  const [showMapPicker, setShowMapPicker] = useState(false);

  const farmSizeOptions = [
    { value: '0-5', label: '0-5 acres', description: 'Small scale farming' },
    { value: '5-25', label: '5-25 acres', description: 'Medium scale farming' },
    { value: '25-100', label: '25-100 acres', description: 'Large scale farming' },
    { value: '100-500', label: '100-500 acres', description: 'Commercial farming' },
    { value: '500+', label: '500+ acres', description: 'Industrial farming' }
  ];

  const cropOptions = [
    { value: 'corn', label: 'Corn', description: 'Zea mays' },
    { value: 'soybeans', label: 'Soybeans', description: 'Glycine max' },
    { value: 'wheat', label: 'Wheat', description: 'Triticum aestivum' },
    { value: 'cotton', label: 'Cotton', description: 'Gossypium' },
    { value: 'rice', label: 'Rice', description: 'Oryza sativa' },
    { value: 'barley', label: 'Barley', description: 'Hordeum vulgare' },
    { value: 'oats', label: 'Oats', description: 'Avena sativa' },
    { value: 'sunflower', label: 'Sunflower', description: 'Helianthus annuus' },
    { value: 'canola', label: 'Canola', description: 'Brassica napus' },
    { value: 'alfalfa', label: 'Alfalfa', description: 'Medicago sativa' },
    { value: 'tomatoes', label: 'Tomatoes', description: 'Solanum lycopersicum' },
    { value: 'potatoes', label: 'Potatoes', description: 'Solanum tuberosum' },
    { value: 'carrots', label: 'Carrots', description: 'Daucus carota' },
    { value: 'lettuce', label: 'Lettuce', description: 'Lactuca sativa' },
    { value: 'onions', label: 'Onions', description: 'Allium cepa' }
  ];

  const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'CA', label: 'California' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'OH', label: 'Ohio' },
    { value: 'TX', label: 'Texas' }
  ];

  const handlePrimaryCropsChange = (selectedCrops) => {
    onUpdate({ primaryCrops: selectedCrops });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Sprout" size={24} className="text-success" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Tell Us About Your Farm
        </h2>
        <p className="text-muted-foreground font-body">
          This information helps us provide better crop rotation recommendations
        </p>
      </div>
      <Input
        label="Farm Name"
        type="text"
        placeholder="Enter your farm name"
        description="This will appear on your reports and plans"
        value={formData?.farmName || ''}
        onChange={(e) => onUpdate({ farmName: e?.target?.value })}
        error={errors?.farmName}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="City"
          type="text"
          placeholder="Enter city name"
          value={formData?.city || ''}
          onChange={(e) => onUpdate({ city: e?.target?.value })}
          error={errors?.city}
          required
        />

        <Select
          label="State"
          options={stateOptions}
          value={formData?.state || ''}
          onChange={(value) => onUpdate({ state: value })}
          placeholder="Select state"
          error={errors?.state}
          searchable
          required
        />
      </div>
      <Input
        label="ZIP Code"
        type="text"
        placeholder="Enter ZIP code"
        description="Used for weather data and regional recommendations"
        value={formData?.zipCode || ''}
        onChange={(e) => onUpdate({ zipCode: e?.target?.value })}
        error={errors?.zipCode}
        required
      />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-body font-medium text-foreground">
              Farm Location
            </label>
            <p className="text-xs text-muted-foreground mt-1">
              Click to set precise coordinates for weather and soil data
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowMapPicker(!showMapPicker)}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-body text-primary hover:text-primary/80 transition-colors"
          >
            <Icon name="MapPin" size={16} />
            <span>{formData?.coordinates ? 'Update Location' : 'Set Location'}</span>
          </button>
        </div>

        {showMapPicker && (
          <div className="bg-muted rounded-lg p-4 border border-border">
            <div className="aspect-video bg-background rounded border border-border overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Farm Location"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=40.7128,-74.0060&z=10&output=embed"
                className="border-0"
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Current: {formData?.coordinates || 'No location set'}
              </p>
              <button
                type="button"
                onClick={() => {
                  onUpdate({ coordinates: '40.7128, -74.0060' });
                  setShowMapPicker(false);
                }}
                className="text-xs text-primary hover:text-primary/80 font-body"
              >
                Use This Location
              </button>
            </div>
          </div>
        )}
      </div>
      <Select
        label="Farm Size"
        description="Total cultivated area"
        options={farmSizeOptions}
        value={formData?.farmSize || ''}
        onChange={(value) => onUpdate({ farmSize: value })}
        placeholder="Select farm size"
        error={errors?.farmSize}
        required
      />
      <div className="space-y-3">
        <label className="text-sm font-body font-medium text-foreground">
          Primary Crops Grown
          <span className="text-error ml-1">*</span>
        </label>
        <p className="text-xs text-muted-foreground -mt-1">
          Select all crops you currently grow or plan to grow
        </p>
        
        <Select
          options={cropOptions}
          value={formData?.primaryCrops || []}
          onChange={handlePrimaryCropsChange}
          placeholder="Select crops..."
          multiple
          searchable
          clearable
          error={errors?.primaryCrops}
        />
      </div>
      <div className="space-y-4">
        <label className="text-sm font-body font-medium text-foreground">
          Additional Information
        </label>
        
        <div className="space-y-3">
          <Checkbox
            label="I practice organic farming"
            description="Certified organic or following organic practices"
            checked={formData?.isOrganic || false}
            onChange={(e) => onUpdate({ isOrganic: e?.target?.checked })}
          />
          
          <Checkbox
            label="I use precision agriculture technology"
            description="GPS guidance, variable rate application, soil sampling"
            checked={formData?.usesPrecisionAg || false}
            onChange={(e) => onUpdate({ usesPrecisionAg: e?.target?.checked })}
          />
          
          <Checkbox
            label="I practice no-till or conservation tillage"
            description="Minimal soil disturbance practices"
            checked={formData?.usesConservationTillage || false}
            onChange={(e) => onUpdate({ usesConservationTillage: e?.target?.checked })}
          />
        </div>
      </div>
      <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-1">
              Why We Need This Information
            </h4>
            <p className="text-xs text-muted-foreground font-body">
              Your farm details help our algorithms provide personalized crop rotation recommendations 
              based on your local climate, soil conditions, and farming practices. All data is kept confidential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmInformationStep;