import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportTypeSelector = ({ selectedType, onTypeChange, reportTypes }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
        Report Type
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {reportTypes?.map((type) => (
          <Button
            key={type?.id}
            variant={selectedType === type?.id ? "default" : "outline"}
            onClick={() => onTypeChange(type?.id)}
            className="justify-start h-auto p-3"
          >
            <div className="flex items-center space-x-3 w-full">
              <Icon name={type?.icon} size={18} />
              <div className="text-left">
                <div className="font-medium text-sm">{type?.name}</div>
                <div className="text-xs opacity-75">{type?.description}</div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ReportTypeSelector;