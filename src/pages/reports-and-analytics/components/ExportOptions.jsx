import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportOptions = ({ onExport, isExporting }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRawData, setIncludeRawData] = useState(false);
  const [includeSummary, setIncludeSummary] = useState(true);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document', description: 'Professional report format' },
    { value: 'excel', label: 'Excel Spreadsheet', description: 'Editable data format' },
    { value: 'csv', label: 'CSV Data', description: 'Raw data export' },
    { value: 'word', label: 'Word Document', description: 'Editable report format' }
  ];

  const handleExport = () => {
    const options = {
      format: exportFormat,
      includeCharts,
      includeRawData,
      includeSummary
    };
    onExport(options);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Download" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Export Report
        </h3>
      </div>
      <div className="space-y-4">
        {/* Format Selection */}
        <Select
          label="Export Format"
          options={formatOptions}
          value={exportFormat}
          onChange={setExportFormat}
          description="Choose the format for your exported report"
        />

        {/* Export Options */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-foreground">Include in Export</h4>
          
          <Checkbox
            label="Charts and Graphs"
            description="Include all visualizations in the report"
            checked={includeCharts}
            onChange={(e) => setIncludeCharts(e?.target?.checked)}
          />
          
          <Checkbox
            label="Raw Data Tables"
            description="Include detailed data tables"
            checked={includeRawData}
            onChange={(e) => setIncludeRawData(e?.target?.checked)}
          />
          
          <Checkbox
            label="Executive Summary"
            description="Include summary and recommendations"
            checked={includeSummary}
            onChange={(e) => setIncludeSummary(e?.target?.checked)}
          />
        </div>

        {/* Export Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="default"
            onClick={handleExport}
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
            className="flex-1"
          >
            {isExporting ? 'Generating...' : 'Export Report'}
          </Button>
          
          <Button
            variant="outline"
            iconName="Mail"
            iconPosition="left"
            className="flex-1"
          >
            Email Report
          </Button>
          
          <Button
            variant="outline"
            iconName="Calendar"
            iconPosition="left"
            className="flex-1"
          >
            Schedule Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;