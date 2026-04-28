import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ComparisonTools = ({ onCompare, fields, rotationStrategies }) => {
  const [comparisonType, setComparisonType] = useState('fields');
  const [selectedItems, setSelectedItems] = useState([]);

  const comparisonTypes = [
    { value: 'fields', label: 'Compare Fields', description: 'Compare performance across different fields' },
    { value: 'strategies', label: 'Compare Strategies', description: 'Compare different rotation strategies' },
    { value: 'seasons', label: 'Compare Seasons', description: 'Compare performance across seasons' }
  ];

  const getComparisonOptions = () => {
    switch (comparisonType) {
      case 'fields':
        return fields?.map(field => ({
          value: field?.id,
          label: field?.name,
          description: `${field?.size} acres - ${field?.cropType}`
        }));
      case 'strategies':
        return rotationStrategies?.map(strategy => ({
          value: strategy?.id,
          label: strategy?.name,
          description: strategy?.description
        }));
      case 'seasons':
        return [
          { value: '2024', label: '2024 Season', description: 'Current growing season' },
          { value: '2023', label: '2023 Season', description: 'Previous growing season' },
          { value: '2022', label: '2022 Season', description: '2022 growing season' }
        ];
      default:
        return [];
    }
  };

  const handleCompare = () => {
    if (selectedItems?.length >= 2) {
      onCompare({
        type: comparisonType,
        items: selectedItems
      });
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="GitCompare" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Comparison Analysis
        </h3>
      </div>
      <div className="space-y-4">
        {/* Comparison Type */}
        <Select
          label="Comparison Type"
          options={comparisonTypes}
          value={comparisonType}
          onChange={(value) => {
            setComparisonType(value);
            setSelectedItems([]);
          }}
          description="Choose what you want to compare"
        />

        {/* Items to Compare */}
        <Select
          label="Select Items to Compare"
          options={getComparisonOptions()}
          value={selectedItems}
          onChange={setSelectedItems}
          multiple
          searchable
          placeholder="Select at least 2 items to compare"
          description="Choose multiple items for side-by-side comparison"
        />

        {/* Comparison Metrics */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-medium text-sm text-foreground mb-3">
            Available Metrics for Comparison
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={14} className="text-success" />
              <span>Yield Performance</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="DollarSign" size={14} className="text-success" />
              <span>Financial Returns</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="TestTube" size={14} className="text-primary" />
              <span>Soil Health</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Droplets" size={14} className="text-blue-500" />
              <span>Water Usage</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Leaf" size={14} className="text-green-500" />
              <span>Sustainability</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} className="text-warning" />
              <span>Time Efficiency</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="default"
            onClick={handleCompare}
            disabled={selectedItems?.length < 2}
            iconName="GitCompare"
            iconPosition="left"
            className="flex-1"
          >
            Generate Comparison
          </Button>
          
          <Button
            variant="outline"
            iconName="BarChart3"
            iconPosition="left"
            className="flex-1"
          >
            View Charts
          </Button>
        </div>

        {selectedItems?.length < 2 && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>Select at least 2 items to enable comparison</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonTools;