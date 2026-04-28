import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterControls = ({ onFiltersChange, onReset }) => {
  const [filters, setFilters] = useState({
    dateRange: 'last-6-months',
    testType: '',
    fieldId: '',
    healthScore: '',
    sortBy: 'date-desc'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const dateRangeOptions = [
    { value: 'last-month', label: 'Last Month' },
    { value: 'last-3-months', label: 'Last 3 Months' },
    { value: 'last-6-months', label: 'Last 6 Months' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const testTypeOptions = [
    { value: '', label: 'All Test Types' },
    { value: 'complete', label: 'Complete Analysis' },
    { value: 'basic', label: 'Basic pH & Nutrients' },
    { value: 'organic', label: 'Organic Matter' },
    { value: 'micronutrient', label: 'Micronutrients' }
  ];

  const fieldOptions = [
    { value: '', label: 'All Fields' },
    { value: 'field-1', label: 'North Field' },
    { value: 'field-2', label: 'South Field' },
    { value: 'field-3', label: 'East Field' },
    { value: 'field-4', label: 'West Field' },
    { value: 'field-5', label: 'Central Field' }
  ];

  const healthScoreOptions = [
    { value: '', label: 'All Scores' },
    { value: 'excellent', label: 'Excellent (80-100)' },
    { value: 'good', label: 'Good (60-79)' },
    { value: 'needs-attention', label: 'Needs Attention (<60)' }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'score-desc', label: 'Highest Score' },
    { value: 'score-asc', label: 'Lowest Score' },
    { value: 'field-name', label: 'Field Name' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      dateRange: 'last-6-months',
      testType: '',
      fieldId: '',
      healthScore: '',
      sortBy: 'date-desc'
    };
    setFilters(resetFilters);
    onFiltersChange?.(resetFilters);
    onReset?.();
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(value => 
      value && value !== 'last-6-months' && value !== 'date-desc'
    )?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-foreground">
            Filter & Sort
          </h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-data px-2 py-1 rounded-full">
              {getActiveFilterCount()} active
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            iconName="RotateCcw"
            disabled={getActiveFilterCount() === 0}
          >
            Reset
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Quick Filters - Always Visible */}
      <div className="p-4 bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
            className="mb-0"
          />
          
          <Select
            label="Field"
            options={fieldOptions}
            value={filters?.fieldId}
            onChange={(value) => handleFilterChange('fieldId', value)}
            className="mb-0"
          />
          
          <Select
            label="Test Type"
            options={testTypeOptions}
            value={filters?.testType}
            onChange={(value) => handleFilterChange('testType', value)}
            className="mb-0"
          />
          
          <Select
            label="Health Score"
            options={healthScoreOptions}
            value={filters?.healthScore}
            onChange={(value) => handleFilterChange('healthScore', value)}
            className="mb-0"
          />
          
          <Select
            label="Sort By"
            options={sortOptions}
            value={filters?.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value)}
            className="mb-0"
          />
        </div>
      </div>
      {/* Advanced Filters - Expandable */}
      {isExpanded && (
        <div className="p-4 border-t border-border">
          <h4 className="font-heading font-semibold text-foreground mb-4">
            Advanced Filters
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filters?.dateRange === 'custom' && (
              <>
                <Input
                  label="Start Date"
                  type="date"
                  className="mb-0"
                />
                <Input
                  label="End Date"
                  type="date"
                  className="mb-0"
                />
              </>
            )}
            
            <div className="space-y-2">
              <label className="block text-sm font-body font-medium text-foreground">
                pH Range
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  step="0.1"
                  min="0"
                  max="14"
                  className="mb-0"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  step="0.1"
                  min="0"
                  max="14"
                  className="mb-0"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-body font-medium text-foreground">
                Organic Matter (%)
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  step="0.1"
                  min="0"
                  className="mb-0"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  step="0.1"
                  min="0"
                  className="mb-0"
                />
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mt-6">
            <Input
              label="Search Notes"
              type="search"
              placeholder="Search in field notes and observations..."
              iconName="Search"
              className="mb-0"
            />
          </div>
        </div>
      )}
      {/* Active Filters Summary */}
      {getActiveFilterCount() > 0 && (
        <div className="p-4 bg-accent/10 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-body text-foreground">Active filters:</span>
              <div className="flex items-center space-x-2">
                {filters?.fieldId && (
                  <span className="bg-primary/10 text-primary text-xs font-caption px-2 py-1 rounded-full">
                    Field: {fieldOptions?.find(f => f?.value === filters?.fieldId)?.label}
                  </span>
                )}
                {filters?.testType && (
                  <span className="bg-primary/10 text-primary text-xs font-caption px-2 py-1 rounded-full">
                    Type: {testTypeOptions?.find(t => t?.value === filters?.testType)?.label}
                  </span>
                )}
                {filters?.healthScore && (
                  <span className="bg-primary/10 text-primary text-xs font-caption px-2 py-1 rounded-full">
                    Score: {healthScoreOptions?.find(h => h?.value === filters?.healthScore)?.label}
                  </span>
                )}
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              iconName="X"
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;