import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const CropDatabase = ({ onCropSelect, selectedCrop }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');

  const cropDatabase = [
    {
      id: 'corn-001',
      name: 'Field Corn',
      category: 'cereal',
      season: 'summer',
      growthDays: 120,
      soilRequirements: {
        ph: '6.0-7.0',
        nitrogen: 'high',
        phosphorus: 'medium',
        potassium: 'high'
      },
      compatibility: {
        goodWith: ['soybeans', 'wheat', 'alfalfa'],
        avoidAfter: ['corn', 'sorghum'],
        restPeriod: 1
      },
      yieldPotential: '180-220 bu/acre',
      color: '#F59E0B',
      icon: 'Wheat'
    },
    {
      id: 'soybean-001',
      name: 'Soybeans',
      category: 'legume',
      season: 'summer',
      growthDays: 110,
      soilRequirements: {
        ph: '6.0-7.0',
        nitrogen: 'low',
        phosphorus: 'medium',
        potassium: 'medium'
      },
      compatibility: {
        goodWith: ['corn', 'wheat', 'oats'],
        avoidAfter: ['soybeans', 'alfalfa'],
        restPeriod: 2
      },
      yieldPotential: '50-70 bu/acre',
      color: '#10B981',
      icon: 'Leaf'
    },
    {
      id: 'wheat-001',
      name: 'Winter Wheat',
      category: 'cereal',
      season: 'winter',
      growthDays: 240,
      soilRequirements: {
        ph: '6.0-7.5',
        nitrogen: 'medium',
        phosphorus: 'medium',
        potassium: 'medium'
      },
      compatibility: {
        goodWith: ['corn', 'soybeans', 'canola'],
        avoidAfter: ['wheat', 'barley'],
        restPeriod: 1
      },
      yieldPotential: '60-80 bu/acre',
      color: '#D97706',
      icon: 'Wheat'
    },
    {
      id: 'alfalfa-001',
      name: 'Alfalfa',
      category: 'legume',
      season: 'perennial',
      growthDays: 365,
      soilRequirements: {
        ph: '6.5-7.5',
        nitrogen: 'low',
        phosphorus: 'high',
        potassium: 'high'
      },
      compatibility: {
        goodWith: ['corn', 'wheat', 'oats'],
        avoidAfter: ['alfalfa', 'clover'],
        restPeriod: 3
      },
      yieldPotential: '4-8 tons/acre',
      color: '#059669',
      icon: 'Clover'
    },
    {
      id: 'canola-001',
      name: 'Canola',
      category: 'oilseed',
      season: 'spring',
      growthDays: 100,
      soilRequirements: {
        ph: '5.5-7.0',
        nitrogen: 'medium',
        phosphorus: 'medium',
        potassium: 'medium'
      },
      compatibility: {
        goodWith: ['wheat', 'barley', 'oats'],
        avoidAfter: ['canola', 'mustard'],
        restPeriod: 2
      },
      yieldPotential: '35-50 bu/acre',
      color: '#EAB308',
      icon: 'Flower'
    },
    {
      id: 'oats-001',
      name: 'Oats',
      category: 'cereal',
      season: 'spring',
      growthDays: 90,
      soilRequirements: {
        ph: '6.0-7.0',
        nitrogen: 'low',
        phosphorus: 'medium',
        potassium: 'medium'
      },
      compatibility: {
        goodWith: ['alfalfa', 'clover', 'soybeans'],
        avoidAfter: ['oats', 'barley'],
        restPeriod: 1
      },
      yieldPotential: '80-120 bu/acre',
      color: '#8B5CF6',
      icon: 'Wheat'
    }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'cereal', label: 'Cereals' },
    { value: 'legume', label: 'Legumes' },
    { value: 'oilseed', label: 'Oilseeds' }
  ];

  const seasonOptions = [
    { value: 'all', label: 'All Seasons' },
    { value: 'spring', label: 'Spring' },
    { value: 'summer', label: 'Summer' },
    { value: 'winter', label: 'Winter' },
    { value: 'perennial', label: 'Perennial' }
  ];

  const filteredCrops = useMemo(() => {
    return cropDatabase?.filter(crop => {
      const matchesSearch = crop?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || crop?.category === selectedCategory;
      const matchesSeason = selectedSeason === 'all' || crop?.season === selectedSeason;
      return matchesSearch && matchesCategory && matchesSeason;
    });
  }, [searchTerm, selectedCategory, selectedSeason]);

  const handleCropSelect = (crop) => {
    onCropSelect(crop);
  };

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Database" size={20} className="text-primary" />
          <h2 className="font-heading font-semibold text-lg text-foreground">
            Crop Database
          </h2>
        </div>

        {/* Search */}
        <Input
          type="search"
          placeholder="Search crops..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="mb-3"
        />

        {/* Filters */}
        <div className="space-y-3">
          <Select
            label="Category"
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
          
          <Select
            label="Season"
            options={seasonOptions}
            value={selectedSeason}
            onChange={setSelectedSeason}
          />
        </div>
      </div>
      {/* Crop List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredCrops?.map((crop) => (
          <div
            key={crop?.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedCrop?.id === crop?.id
                ? 'border-primary bg-primary/5 shadow-soft'
                : 'border-border bg-card hover:border-primary/50 hover:shadow-soft'
            }`}
            onClick={() => handleCropSelect(crop)}
          >
            <div className="flex items-start space-x-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: crop?.color + '20' }}
              >
                <Icon 
                  name={crop?.icon} 
                  size={20} 
                  style={{ color: crop?.color }}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-body font-medium text-foreground text-sm truncate">
                  {crop?.name}
                </h3>
                <p className="text-xs text-muted-foreground capitalize mb-2">
                  {crop?.category} • {crop?.season}
                </p>
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-data">
                      {crop?.growthDays} days
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="TrendingUp" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-data">
                      {crop?.yieldPotential}
                    </span>
                  </div>
                </div>

                {/* Soil Requirements */}
                <div className="mt-2 pt-2 border-t border-border">
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div className="flex items-center space-x-1">
                      <span className="text-muted-foreground">pH:</span>
                      <span className="font-data text-foreground">{crop?.soilRequirements?.ph}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-muted-foreground">N:</span>
                      <span className={`font-data ${
                        crop?.soilRequirements?.nitrogen === 'high' ? 'text-error' :
                        crop?.soilRequirements?.nitrogen === 'medium' ? 'text-warning' : 'text-success'
                      }`}>
                        {crop?.soilRequirements?.nitrogen}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredCrops?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Search" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground font-body">
              No crops found matching your criteria
            </p>
            <Button
              variant="ghost"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedSeason('all');
              }}
              className="mt-2"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropDatabase;