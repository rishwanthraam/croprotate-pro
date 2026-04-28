import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActions = ({ onAction, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  // Context-aware actions based on current route
  const getContextualActions = () => {
    const currentPath = location?.pathname;

    const commonActions = [
      {
        id: 'add-field',
        label: 'Add Field',
        icon: 'Plus',
        variant: 'default',
        description: 'Add new field to farm'
      },
      {
        id: 'quick-note',
        label: 'Quick Note',
        icon: 'FileText',
        variant: 'outline',
        description: 'Add field observation'
      }
    ];

    switch (currentPath) {
      case '/dashboard':
        return [
          {
            id: 'new-rotation',
            label: 'New Rotation',
            icon: 'Sprout',
            variant: 'default',
            description: 'Start rotation planning'
          },
          {
            id: 'soil-test',
            label: 'Log Soil Test',
            icon: 'TestTube',
            variant: 'outline',
            description: 'Record soil analysis'
          },
          ...commonActions
        ];

      case '/crop-rotation-planner':
        return [
          {
            id: 'save-plan',
            label: 'Save Plan',
            icon: 'Save',
            variant: 'default',
            description: 'Save current rotation'
          },
          {
            id: 'copy-plan',
            label: 'Copy Plan',
            icon: 'Copy',
            variant: 'outline',
            description: 'Duplicate to another field'
          },
          {
            id: 'export-plan',
            label: 'Export',
            icon: 'Download',
            variant: 'outline',
            description: 'Export as PDF'
          },
          ...commonActions
        ];

      case '/soil-health-monitoring':
        return [
          {
            id: 'new-test',
            label: 'New Test',
            icon: 'Plus',
            variant: 'default',
            description: 'Record soil test results'
          },
          {
            id: 'schedule-test',
            label: 'Schedule Test',
            icon: 'Calendar',
            variant: 'outline',
            description: 'Plan future testing'
          },
          {
            id: 'compare-results',
            label: 'Compare',
            icon: 'GitCompare',
            variant: 'outline',
            description: 'Compare test results'
          },
          ...commonActions
        ];

      case '/reports-and-analytics':
        return [
          {
            id: 'generate-report',
            label: 'Generate Report',
            icon: 'FileBarChart',
            variant: 'default',
            description: 'Create new report'
          },
          {
            id: 'export-data',
            label: 'Export Data',
            icon: 'Download',
            variant: 'outline',
            description: 'Export raw data'
          },
          {
            id: 'schedule-report',
            label: 'Schedule',
            icon: 'Clock',
            variant: 'outline',
            description: 'Automate reporting'
          },
          ...commonActions
        ];

      default:
        return commonActions;
    }
  };

  const actions = getContextualActions();
  const primaryActions = actions?.slice(0, 3);
  const secondaryActions = actions?.slice(3);

  const handleAction = (actionId) => {
    onAction?.(actionId);
    setIsExpanded(false);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Primary Actions - Always Visible */}
      {primaryActions?.map((action) => (
        <Button
          key={action?.id}
          variant={action?.variant}
          onClick={() => handleAction(action?.id)}
          iconName={action?.icon}
          iconPosition="left"
          className="hidden sm:flex"
          title={action?.description}
        >
          {action?.label}
        </Button>
      ))}
      {/* Mobile Primary Action */}
      <Button
        variant="default"
        onClick={() => handleAction(primaryActions?.[0]?.id)}
        iconName={primaryActions?.[0]?.icon}
        className="sm:hidden"
        title={primaryActions?.[0]?.description}
      >
        {primaryActions?.[0]?.label}
      </Button>
      {/* Secondary Actions Dropdown */}
      {secondaryActions?.length > 0 && (
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName="MoreHorizontal"
            size="icon"
            title="More actions"
          />

          {isExpanded && (
            <>
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated z-50">
                <div className="p-1">
                  {secondaryActions?.map((action) => (
                    <button
                      key={action?.id}
                      onClick={() => handleAction(action?.id)}
                      className="flex items-center space-x-3 w-full px-3 py-2 text-sm font-body text-foreground hover:bg-muted rounded-md transition-colors"
                    >
                      <Icon name={action?.icon} size={16} />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{action?.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {action?.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Click outside handler */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsExpanded(false)}
              />
            </>
          )}
        </div>
      )}
      {/* Emergency Actions */}
      <div className="flex items-center space-x-1 ml-4 pl-4 border-l border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleAction('emergency-contact')}
          className="text-warning hover:text-warning hover:bg-warning/10"
          title="Emergency contact"
        >
          <Icon name="Phone" size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleAction('weather-alert')}
          className="text-warning hover:text-warning hover:bg-warning/10"
          title="Weather alerts"
        >
          <Icon name="CloudRain" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;