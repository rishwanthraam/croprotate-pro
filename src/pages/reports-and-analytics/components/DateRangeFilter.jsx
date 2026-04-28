import React from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DateRangeFilter = ({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange, 
  presetRanges,
  onPresetSelect 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
        Date Range
      </h3>
      {/* Preset Ranges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {presetRanges?.map((preset) => (
          <Button
            key={preset?.id}
            variant="outline"
            size="sm"
            onClick={() => onPresetSelect(preset)}
            iconName="Calendar"
            iconPosition="left"
          >
            {preset?.label}
          </Button>
        ))}
      </div>
      {/* Custom Date Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="date"
          label="Start Date"
          value={startDate}
          onChange={(e) => onStartDateChange(e?.target?.value)}
        />
        <Input
          type="date"
          label="End Date"
          value={endDate}
          onChange={(e) => onEndDateChange(e?.target?.value)}
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;