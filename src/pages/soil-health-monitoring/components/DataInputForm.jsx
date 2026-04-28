import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DataInputForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    fieldId: '',
    testType: '',
    testDate: new Date()?.toISOString()?.split('T')?.[0],
    pH: '',
    organicMatter: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    calcium: '',
    magnesium: '',
    sulfur: '',
    notes: '',
    photos: []
  });

  const [activeSection, setActiveSection] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldOptions = [
    { value: 'field-1', label: 'North Field (25 acres)' },
    { value: 'field-2', label: 'South Field (18 acres)' },
    { value: 'field-3', label: 'East Field (32 acres)' },
    { value: 'field-4', label: 'West Field (22 acres)' },
    { value: 'field-5', label: 'Central Field (28 acres)' }
  ];

  const testTypeOptions = [
    { value: 'complete', label: 'Complete Soil Analysis' },
    { value: 'basic', label: 'Basic pH & Nutrients' },
    { value: 'organic', label: 'Organic Matter Test' },
    { value: 'micronutrient', label: 'Micronutrient Analysis' },
    { value: 'custom', label: 'Custom Test Panel' }
  ];

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: 'Info' },
    { id: 'nutrients', label: 'Nutrients', icon: 'Atom' },
    { id: 'additional', label: 'Additional', icon: 'Plus' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event?.target?.files);
    setFormData(prev => ({
      ...prev,
      photos: [...prev?.photos, ...files]
    }));
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev?.photos?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      onSubmit?.(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    return formData?.fieldId && formData?.testType && formData?.testDate;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Plus" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground">
                New Soil Test Entry
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                Record soil test results and field observations
              </p>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <Icon name="X" size={20} />
          </Button>
        </div>
      </div>
      {/* Section Tabs */}
      <div className="flex items-center border-b border-border px-6">
        {sections?.map((section) => (
          <button
            key={section?.id}
            onClick={() => setActiveSection(section?.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-body border-b-2 transition-colors ${
              activeSection === section?.id
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={section?.icon} size={16} />
            <span>{section?.label}</span>
          </button>
        ))}
      </div>
      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6">
        {activeSection === 'basic' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Select Field"
                required
                options={fieldOptions}
                value={formData?.fieldId}
                onChange={(value) => handleInputChange('fieldId', value)}
                placeholder="Choose field for testing"
              />
              
              <Select
                label="Test Type"
                required
                options={testTypeOptions}
                value={formData?.testType}
                onChange={(value) => handleInputChange('testType', value)}
                placeholder="Select test type"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Test Date"
                type="date"
                required
                value={formData?.testDate}
                onChange={(e) => handleInputChange('testDate', e?.target?.value)}
              />
              
              <Input
                label="pH Level"
                type="number"
                step="0.1"
                min="0"
                max="14"
                placeholder="6.5"
                value={formData?.pH}
                onChange={(e) => handleInputChange('pH', e?.target?.value)}
                description="Scale of 0-14"
              />
            </div>

            <Input
              label="Organic Matter (%)"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="3.5"
              value={formData?.organicMatter}
              onChange={(e) => handleInputChange('organicMatter', e?.target?.value)}
              description="Percentage of organic content"
            />
          </div>
        )}

        {activeSection === 'nutrients' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Input
                label="Nitrogen (ppm)"
                type="number"
                min="0"
                placeholder="45"
                value={formData?.nitrogen}
                onChange={(e) => handleInputChange('nitrogen', e?.target?.value)}
              />
              
              <Input
                label="Phosphorus (ppm)"
                type="number"
                min="0"
                placeholder="32"
                value={formData?.phosphorus}
                onChange={(e) => handleInputChange('phosphorus', e?.target?.value)}
              />
              
              <Input
                label="Potassium (ppm)"
                type="number"
                min="0"
                placeholder="180"
                value={formData?.potassium}
                onChange={(e) => handleInputChange('potassium', e?.target?.value)}
              />
              
              <Input
                label="Calcium (ppm)"
                type="number"
                min="0"
                placeholder="1200"
                value={formData?.calcium}
                onChange={(e) => handleInputChange('calcium', e?.target?.value)}
              />
              
              <Input
                label="Magnesium (ppm)"
                type="number"
                min="0"
                placeholder="180"
                value={formData?.magnesium}
                onChange={(e) => handleInputChange('magnesium', e?.target?.value)}
              />
              
              <Input
                label="Sulfur (ppm)"
                type="number"
                min="0"
                placeholder="15"
                value={formData?.sulfur}
                onChange={(e) => handleInputChange('sulfur', e?.target?.value)}
              />
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-heading font-semibold text-foreground mb-3">
                Nutrient Guidelines
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-body">
                <div>
                  <p className="text-muted-foreground">
                    <strong>Nitrogen:</strong> 50-80 ppm (optimal)
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Phosphorus:</strong> 30-50 ppm (optimal)
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Potassium:</strong> 150-250 ppm (optimal)
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">
                    <strong>Calcium:</strong> 800-1500 ppm (optimal)
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Magnesium:</strong> 150-300 ppm (optimal)
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Sulfur:</strong> 15-25 ppm (optimal)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'additional' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Field Notes & Observations
              </label>
              <textarea
                className="w-full h-32 px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none font-body"
                placeholder="Record any observations about soil conditions, weather, recent treatments, or other relevant notes..."
                value={formData?.notes}
                onChange={(e) => handleInputChange('notes', e?.target?.value)}
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Photo Documentation
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Icon name="Camera" size={32} className="text-muted-foreground" />
                  <div className="text-sm font-body text-muted-foreground">
                    <span className="text-primary font-medium">Click to upload</span> or drag and drop
                  </div>
                  <div className="text-xs text-muted-foreground font-caption">
                    PNG, JPG, GIF up to 10MB each
                  </div>
                </label>
              </div>

              {/* Photo Preview */}
              {formData?.photos?.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {formData?.photos?.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon name="Image" size={24} className="text-muted-foreground" />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Icon name="X" size={12} />
                      </button>
                      <p className="text-xs text-muted-foreground font-caption mt-1 truncate">
                        {photo?.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-border mt-8">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground font-caption">
            <Icon name="Info" size={14} />
            <span>All data will be saved automatically</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              loading={isSubmitting}
              disabled={!validateForm()}
              iconName="Save"
              iconPosition="left"
            >
              {isSubmitting ? 'Saving...' : 'Save Test Results'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DataInputForm;