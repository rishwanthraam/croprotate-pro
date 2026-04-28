import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveFieldMap = ({ fieldData, onRegionClick }) => {
  const [selectedField, setSelectedField] = useState(null);
  const [mapView, setMapView] = useState('satellite'); // satellite, terrain, hybrid

  const getHealthColor = (healthScore) => {
    if (healthScore >= 80) return '#16A34A'; // success
    if (healthScore >= 60) return '#D97706'; // warning
    return '#DC2626'; // error
  };

  const handleRegionClick = (field) => {
    setSelectedField(field);
    onRegionClick?.(field);
  };

  const mapViewOptions = [
    { value: 'satellite', label: 'Satellite', icon: 'Satellite' },
    { value: 'terrain', label: 'Terrain', icon: 'Mountain' },
    { value: 'hybrid', label: 'Hybrid', icon: 'Layers' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Map" size={20} className="text-primary" />
            <h3 className="font-heading font-semibold text-foreground">
              Field Soil Health Map
            </h3>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Map View Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              {mapViewOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => setMapView(option?.value)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-body transition-colors ${
                    mapView === option?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={option?.icon} size={14} />
                  <span className="hidden sm:inline">{option?.label}</span>
                </button>
              ))}
            </div>
            
            <Button variant="outline" size="sm" iconName="Maximize2">
              <span className="hidden sm:inline">Fullscreen</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-96 lg:h-[500px] bg-muted">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Farm Field Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7128,-74.0060&z=14&output=embed"
          className="absolute inset-0"
        />
        
        {/* Soil Health Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {fieldData?.map((field) => (
            <div
              key={field?.id}
              className="absolute pointer-events-auto cursor-pointer"
              style={{
                left: `${field?.position?.x}%`,
                top: `${field?.position?.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => handleRegionClick(field)}
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                style={{ backgroundColor: getHealthColor(field?.healthScore) }}
              >
                <span className="text-xs font-data font-bold text-white">
                  {field?.healthScore}
                </span>
              </div>
              
              {/* Field Label */}
              <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded px-2 py-1 shadow-soft whitespace-nowrap">
                <span className="text-xs font-body text-foreground">
                  {field?.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button variant="outline" size="icon" className="bg-card">
            <Icon name="Plus" size={16} />
          </Button>
          <Button variant="outline" size="icon" className="bg-card">
            <Icon name="Minus" size={16} />
          </Button>
          <Button variant="outline" size="icon" className="bg-card">
            <Icon name="RotateCcw" size={16} />
          </Button>
        </div>
      </div>
      {/* Legend */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="text-sm font-body text-foreground font-medium">
              Soil Health Score:
            </span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm font-body text-muted-foreground">
                  Excellent (80-100)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-sm font-body text-muted-foreground">
                  Good (60-79)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-error" />
                <span className="text-sm font-body text-muted-foreground">
                  Needs Attention (&lt;60)
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground font-caption">
            <Icon name="Clock" size={14} />
            <span>Last updated: {new Date()?.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      {/* Selected Field Info */}
      {selectedField && (
        <div className="p-4 border-t border-border bg-accent/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: getHealthColor(selectedField?.healthScore) }}
              />
              <div>
                <h4 className="font-heading font-semibold text-foreground">
                  {selectedField?.name}
                </h4>
                <p className="text-sm text-muted-foreground font-body">
                  {selectedField?.area} acres • Last tested: {selectedField?.lastTested}
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              onClick={() => onRegionClick?.(selectedField)}
            >
              View Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveFieldMap;