import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportTypeSelector = ({ selectedType, onTypeChange, reportTypes }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
        Report Type
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {reportTypes?.map((type) => (
          <Button
            key={type?.id}
            variant={selectedType === type?.id ? "default" : "outline"}
            onClick={() => onTypeChange(type?.id)}
            className="flex-col items-start justify-start h-auto p-3 whitespace-normal w-full text-left"
          >
            <div className="flex flex-col items-start w-full min-w-0 gap-1">
              <Icon name={type?.icon} size={18} className="shrink-0" />
              <div className="text-left min-w-0 w-full">
                <div className="font-medium text-sm leading-snug break-words">{type?.name}</div>
                <div className="text-xs opacity-75 leading-snug break-words">{type?.description}</div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ReportTypeSelector;