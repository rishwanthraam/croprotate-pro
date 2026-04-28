import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RotationTimeline = ({ 
  fields, 
  years, 
  rotationPlan, 
  onCropAssign, 
  onCropRemove, 
  selectedCrop,
  onValidationAlert 
}) => {
  const [draggedCrop, setDraggedCrop] = useState(null);
  const [dragOverCell, setDragOverCell] = useState(null);
  const timelineRef = useRef(null);

  const currentYear = new Date()?.getFullYear();

  // Mock fields data
  const mockFields = [
    { id: 'field-001', name: 'North Field', acres: 45, soilType: 'Clay Loam' },
    { id: 'field-002', name: 'South Field', acres: 32, soilType: 'Sandy Loam' },
    { id: 'field-003', name: 'East Field', acres: 28, soilType: 'Silt Loam' },
    { id: 'field-004', name: 'West Field', acres: 38, soilType: 'Clay' }
  ];

  const timelineYears = years || [currentYear, currentYear + 1, currentYear + 2, currentYear + 3, currentYear + 4];
  const fieldsList = fields || mockFields;

  const handleDragStart = (e, crop) => {
    setDraggedCrop(crop);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e, fieldId, year) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOverCell(`${fieldId}-${year}`);
  };

  const handleDragLeave = () => {
    setDragOverCell(null);
  };

  const handleDrop = (e, fieldId, year) => {
    e?.preventDefault();
    setDragOverCell(null);
    
    if (draggedCrop) {
      // Validate crop placement
      const validation = validateCropPlacement(fieldId, year, draggedCrop);
      if (!validation?.isValid) {
        onValidationAlert?.(validation?.message);
        return;
      }
      
      onCropAssign?.(fieldId, year, draggedCrop);
    }
    setDraggedCrop(null);
  };

  const validateCropPlacement = (fieldId, year, crop) => {
    const previousYear = year - 1;
    const previousCrop = rotationPlan?.[fieldId]?.[previousYear];
    
    if (previousCrop && crop?.compatibility?.avoidAfter?.includes(previousCrop?.id?.split('-')?.[0])) {
      return {
        isValid: false,
        message: `${crop?.name} should not be planted after ${previousCrop?.name} due to compatibility issues.`
      };
    }
    
    return { isValid: true };
  };

  const getCropForCell = (fieldId, year) => {
    return rotationPlan?.[fieldId]?.[year];
  };

  const getCompatibilityStatus = (fieldId, year, crop) => {
    if (!crop) return 'neutral';
    
    const previousYear = year - 1;
    const nextYear = year + 1;
    const previousCrop = rotationPlan?.[fieldId]?.[previousYear];
    const nextCrop = rotationPlan?.[fieldId]?.[nextYear];
    
    let hasWarning = false;
    
    if (previousCrop && crop?.compatibility?.avoidAfter?.includes(previousCrop?.id?.split('-')?.[0])) {
      hasWarning = true;
    }
    
    if (nextCrop && nextCrop?.compatibility?.avoidAfter?.includes(crop?.id?.split('-')?.[0])) {
      hasWarning = true;
    }
    
    return hasWarning ? 'warning' : 'good';
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={20} className="text-primary" />
            <h2 className="font-heading font-semibold text-lg text-foreground">
              Rotation Timeline
            </h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="RotateCcw">
              Reset
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>
      </div>
      {/* Timeline Grid */}
      <div className="flex-1 overflow-auto" ref={timelineRef}>
        <div className="min-w-[800px]">
          {/* Year Headers */}
          <div className="sticky top-0 z-10 bg-muted border-b border-border">
            <div className="flex">
              <div className="w-48 p-3 border-r border-border">
                <span className="font-heading font-medium text-sm text-foreground">
                  Fields
                </span>
              </div>
              {timelineYears?.map((year) => (
                <div key={year} className="flex-1 min-w-[140px] p-3 text-center border-r border-border last:border-r-0">
                  <span className="font-heading font-medium text-sm text-foreground">
                    {year}
                  </span>
                  {year === currentYear && (
                    <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full font-data">
                      Current
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Field Rows */}
          <div className="divide-y divide-border">
            {fieldsList?.map((field) => (
              <div key={field?.id} className="flex hover:bg-muted/30 transition-colors">
                {/* Field Info */}
                <div className="w-48 p-4 border-r border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-primary" />
                    <div>
                      <h3 className="font-body font-medium text-sm text-foreground">
                        {field?.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {field?.acres} acres • {field?.soilType}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Year Cells */}
                {timelineYears?.map((year) => {
                  const crop = getCropForCell(field?.id, year);
                  const compatibilityStatus = crop ? getCompatibilityStatus(field?.id, year, crop) : 'neutral';
                  const isDragOver = dragOverCell === `${field?.id}-${year}`;

                  return (
                    <div
                      key={`${field?.id}-${year}`}
                      className={`flex-1 min-w-[140px] p-2 border-r border-border last:border-r-0 min-h-[80px] transition-all duration-200 ${
                        isDragOver ? 'bg-primary/10 border-primary' : ''
                      }`}
                      onDragOver={(e) => handleDragOver(e, field?.id, year)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, field?.id, year)}
                    >
                      {crop ? (
                        <div
                          className={`relative w-full h-full rounded-lg p-2 cursor-pointer group transition-all duration-200 ${
                            compatibilityStatus === 'warning' ?'bg-warning/20 border border-warning/50' :'border border-border hover:border-primary/50'
                          }`}
                          style={{ backgroundColor: crop?.color + '15' }}
                          draggable
                          onDragStart={(e) => handleDragStart(e, crop)}
                        >
                          <div className="flex items-center space-x-2">
                            <Icon 
                              name={crop?.icon} 
                              size={16} 
                              style={{ color: crop?.color }}
                            />
                            <span className="text-xs font-body font-medium text-foreground truncate">
                              {crop?.name}
                            </span>
                          </div>
                          
                          <div className="mt-1 text-xs text-muted-foreground">
                            {crop?.growthDays} days
                          </div>

                          {compatibilityStatus === 'warning' && (
                            <Icon 
                              name="AlertTriangle" 
                              size={14} 
                              className="absolute top-1 right-1 text-warning"
                            />
                          )}

                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-1 right-1 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e?.stopPropagation();
                              onCropRemove?.(field?.id, year);
                            }}
                          >
                            <Icon name="X" size={12} />
                          </Button>
                        </div>
                      ) : (
                        <div className="w-full h-full rounded-lg border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-primary/50 transition-colors">
                          <div className="text-center">
                            <Icon name="Plus" size={16} className="mx-auto mb-1" />
                            <span className="text-xs font-body">
                              Drop crop here
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Legend */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded border border-success bg-success/20"></div>
            <span className="text-muted-foreground font-body">Compatible</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded border border-warning bg-warning/20"></div>
            <span className="text-muted-foreground font-body">Compatibility Warning</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded border-2 border-dashed border-border"></div>
            <span className="text-muted-foreground font-body">Empty Slot</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotationTimeline;