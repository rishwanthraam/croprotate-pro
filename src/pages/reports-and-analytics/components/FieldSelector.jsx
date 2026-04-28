import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FieldSelector = ({ selectedFields, onFieldChange, fields, selectAll, onSelectAll }) => {
  const fieldOptions = fields?.map(field => ({
    value: field?.id,
    label: `${field?.name} (${field?.size} acres)`,
    description: `${field?.cropType} - ${field?.soilType}`
  }));

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
        Field Selection
      </h3>
      <div className="space-y-3">
        <Checkbox
          label="Select All Fields"
          checked={selectAll}
          onChange={(e) => onSelectAll(e?.target?.checked)}
        />
        
        <Select
          label="Choose Fields"
          options={fieldOptions}
          value={selectedFields}
          onChange={onFieldChange}
          multiple
          searchable
          placeholder="Select fields to include in report"
          description="Choose one or more fields for analysis"
        />
      </div>
    </div>
  );
};

export default FieldSelector;