import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionPanel = ({ onAction }) => {
  const quickActions = [
    {
      id: 'add-observation',
      title: 'Add Field Observation',
      description: 'Record crop conditions, pest sightings, or field notes',
      icon: 'Eye',
      color: 'bg-primary',
      shortcut: 'Ctrl+O'
    },
    {
      id: 'update-crop-status',
      title: 'Update Crop Status',
      description: 'Log growth stages, treatments, or harvest progress',
      icon: 'Sprout',
      color: 'bg-success',
      shortcut: 'Ctrl+U'
    },
    {
      id: 'log-soil-test',
      title: 'Log Soil Test Results',
      description: 'Enter pH, nutrient levels, and soil analysis data',
      icon: 'TestTube',
      color: 'bg-secondary',
      shortcut: 'Ctrl+S'
    },
    {
      id: 'generate-report',
      title: 'Generate Rotation Report',
      description: 'Create detailed rotation plan or performance summary',
      icon: 'FileBarChart',
      color: 'bg-warning',
      shortcut: 'Ctrl+R'
    },
    {
      id: 'schedule-activity',
      title: 'Schedule Farm Activity',
      description: 'Plan planting, harvesting, or maintenance tasks',
      icon: 'Calendar',
      color: 'bg-accent',
      shortcut: 'Ctrl+A'
    },
    {
      id: 'weather-check',
      title: 'Extended Weather Forecast',
      description: 'View detailed 14-day agricultural weather outlook',
      icon: 'CloudSun',
      color: 'bg-muted-foreground',
      shortcut: 'Ctrl+W'
    }
  ];

  const handleActionClick = (actionId) => {
    onAction?.(actionId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
          <Icon name="Zap" size={16} color="white" />
        </div>
        <div>
          <h2 className="font-heading font-semibold text-lg text-foreground">
            Quick Actions
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            Common tasks and shortcuts
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action?.id)}
            className="group flex items-start space-x-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 text-left"
          >
            <div className={`w-10 h-10 ${action?.color} rounded-md flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}>
              <Icon name={action?.icon} size={18} color="white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-heading font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                  {action?.title}
                </h3>
                <span className="font-data text-xs text-muted-foreground bg-muted px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {action?.shortcut}
                </span>
              </div>
              
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {action?.description}
              </p>
            </div>
            
            <Icon 
              name="ChevronRight" 
              size={16} 
              className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 mt-1"
            />
          </button>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Keyboard" size={14} />
            <span className="font-body">Keyboard shortcuts available</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            iconPosition="left"
            onClick={() => handleActionClick('customize-actions')}
          >
            Customize
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionPanel;