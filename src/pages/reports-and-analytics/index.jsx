import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActions from '../../components/ui/QuickActions';
import QuickNoteModal from '../../components/ui/QuickNoteModal';
import Icon from '../../components/AppIcon';


// Import all components
import ReportTypeSelector from './components/ReportTypeSelector';
import DateRangeFilter from './components/DateRangeFilter';
import FieldSelector from './components/FieldSelector';
import YieldPerformanceChart from './components/YieldPerformanceChart';
import SoilHealthTrends from './components/SoilHealthTrends';
import RotationEffectivenessMetrics from './components/RotationEffectivenessMetrics';
import FinancialImpactAnalysis from './components/FinancialImpactAnalysis';
import ExportOptions from './components/ExportOptions';
import ComparisonTools from './components/ComparisonTools';
import ReportHistory from './components/ReportHistory';

const ReportsAndAnalytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('yield');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectAllFields, setSelectAllFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [quickNoteOpen, setQuickNoteOpen] = useState(false);

  // Mock data
  const currentUser = {
    name: "Sarah Johnson",
    role: "Farm Manager",
    email: "sarah.johnson@croprotate.com"
  };

  const notifications = [
    {
      message: "Quarterly yield report is ready for download",
      time: "2 hours ago",
      type: "success",
      read: false
    },
    {
      message: "Soil health analysis completed for North Field",
      time: "1 day ago",
      type: "info",
      read: false
    },
    {
      message: "Export scheduled for tomorrow at 9:00 AM",
      time: "2 days ago",
      type: "warning",
      read: true
    }
  ];

  const reportTypes = [
    {
      id: 'yield',
      name: 'Yield Reports',
      description: 'Crop performance analysis',
      icon: 'TrendingUp'
    },
    {
      id: 'soil',
      name: 'Soil Health',
      description: 'Soil condition summaries',
      icon: 'TestTube'
    },
    {
      id: 'rotation',
      name: 'Rotation Analysis',
      description: 'Rotation effectiveness',
      icon: 'Sprout'
    },
    {
      id: 'financial',
      name: 'Financial Impact',
      description: 'Cost-benefit analysis',
      icon: 'DollarSign'
    }
  ];

  const presetRanges = [
    { id: 'current-year', label: 'Current Year', startDate: '2024-01-01', endDate: '2024-12-31' },
    { id: 'last-year', label: 'Last Year', startDate: '2023-01-01', endDate: '2023-12-31' },
    { id: 'last-6-months', label: 'Last 6 Months', startDate: '2024-06-01', endDate: '2024-12-31' },
    { id: 'growing-season', label: 'Growing Season', startDate: '2024-04-01', endDate: '2024-10-31' }
  ];

  const fields = [
    {
      id: 'field-1',
      name: 'North Field',
      size: 45,
      cropType: 'Corn',
      soilType: 'Loamy'
    },
    {
      id: 'field-2',
      name: 'South Field',
      size: 38,
      cropType: 'Soybeans',
      soilType: 'Clay'
    },
    {
      id: 'field-3',
      name: 'East Field',
      size: 52,
      cropType: 'Wheat',
      soilType: 'Sandy Loam'
    },
    {
      id: 'field-4',
      name: 'West Field',
      size: 41,
      cropType: 'Barley',
      soilType: 'Silty Clay'
    }
  ];

  const yieldData = [
    { field: 'North Field', currentYear: 185, previousYear: 172, target: 190 },
    { field: 'South Field', currentYear: 62, previousYear: 58, target: 65 },
    { field: 'East Field', currentYear: 78, previousYear: 75, target: 80 },
    { field: 'West Field', currentYear: 92, previousYear: 88, target: 95 }
  ];

  const soilHealthData = [
    { month: 'Jan', ph: 6.8, nitrogen: 45, phosphorus: 32, potassium: 180 },
    { month: 'Mar', ph: 6.9, nitrogen: 48, phosphorus: 35, potassium: 185 },
    { month: 'May', ph: 7.0, nitrogen: 52, phosphorus: 38, potassium: 190 },
    { month: 'Jul', ph: 6.8, nitrogen: 49, phosphorus: 36, potassium: 188 },
    { month: 'Sep', ph: 6.9, nitrogen: 51, phosphorus: 39, potassium: 192 },
    { month: 'Nov', ph: 7.1, nitrogen: 53, phosphorus: 41, potassium: 195 }
  ];

  const rotationEffectivenessData = [
    { name: 'Corn-Soybean', value: 85, description: 'Traditional 2-year rotation' },
    { name: 'Corn-Soybean-Wheat', value: 78, description: '3-year rotation with cover crop' },
    { name: 'Continuous Corn', value: 65, description: 'Monoculture system' },
    { name: 'Diverse 4-Crop', value: 92, description: 'Complex rotation system' },
    { name: 'Cover Crop Integration', value: 88, description: 'With winter cover crops' }
  ];

  const financialData = [
    { month: 'Jan', revenue: 45000, costs: 32000 },
    { month: 'Feb', revenue: 38000, costs: 28000 },
    { month: 'Mar', revenue: 52000, costs: 35000 },
    { month: 'Apr', revenue: 68000, costs: 45000 },
    { month: 'May', revenue: 75000, costs: 48000 },
    { month: 'Jun', revenue: 82000, costs: 52000 },
    { month: 'Jul', revenue: 95000, costs: 58000 },
    { month: 'Aug', revenue: 110000, costs: 65000 },
    { month: 'Sep', revenue: 125000, costs: 72000 },
    { month: 'Oct', revenue: 98000, costs: 62000 },
    { month: 'Nov', revenue: 85000, costs: 55000 },
    { month: 'Dec', revenue: 72000, costs: 48000 }
  ];

  const rotationStrategies = [
    {
      id: 'strategy-1',
      name: 'Traditional Corn-Soybean',
      description: '2-year rotation cycle'
    },
    {
      id: 'strategy-2',
      name: 'Extended 3-Crop Rotation',
      description: 'Corn-Soybean-Wheat rotation'
    },
    {
      id: 'strategy-3',
      name: 'Diverse 4-Crop System',
      description: 'Complex rotation with cover crops'
    }
  ];

  const reportHistory = [
    {
      id: 'report-1',
      name: 'Q4 2024 Yield Analysis',
      type: 'yield',
      status: 'completed',
      createdAt: '2024-12-15T10:30:00Z',
      size: '2.4 MB'
    },
    {
      id: 'report-2',
      name: 'Annual Soil Health Summary',
      type: 'soil',
      status: 'completed',
      createdAt: '2024-12-10T14:20:00Z',
      size: '1.8 MB'
    },
    {
      id: 'report-3',
      name: 'Rotation Effectiveness 2024',
      type: 'rotation',
      status: 'processing',
      createdAt: '2024-12-08T09:15:00Z',
      size: '3.1 MB'
    },
    {
      id: 'report-4',
      name: 'Financial Impact Analysis',
      type: 'financial',
      status: 'completed',
      createdAt: '2024-12-05T16:45:00Z',
      size: '2.7 MB'
    }
  ];

  const totalRevenue = financialData?.reduce((sum, item) => sum + item?.revenue, 0);
  const totalCosts = financialData?.reduce((sum, item) => sum + item?.costs, 0);
  const netProfit = totalRevenue - totalCosts;

  useEffect(() => {
    if (selectAllFields) {
      setSelectedFields(fields?.map(field => field?.id));
    } else {
      setSelectedFields([]);
    }
  }, [selectAllFields]);

  const handlePresetSelect = (preset) => {
    setStartDate(preset?.startDate);
    setEndDate(preset?.endDate);
  };

  const handleSelectAllFields = (checked) => {
    setSelectAllFields(checked);
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'generate-report':
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
        break;
      case 'export-data':
        setIsExporting(true);
        setTimeout(() => setIsExporting(false), 3000);
        break;
      case 'schedule-report':
        // Handle schedule report
        break;
      case 'quick-note':
        setQuickNoteOpen(true);
        break;
      default:
        console.log('Quick action:', actionId);
    }
  };

  const handleExport = (options) => {
    setIsExporting(true);
    console.log('Exporting with options:', options);
    setTimeout(() => {
      setIsExporting(false);
      // Show success message
    }, 3000);
  };

  const handleCompare = (comparison) => {
    console.log('Comparing:', comparison);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleReportView = (reportId) => {
    console.log('Viewing report:', reportId);
  };

  const handleReportDownload = (reportId) => {
    console.log('Downloading report:', reportId);
  };

  const handleReportDelete = (reportId) => {
    console.log('Deleting report:', reportId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Reports & Analytics - CropRotate Pro</title>
        <meta name="description" content="Comprehensive performance insights and exportable documentation for farm management and compliance needs" />
      </Helmet>
      <Header 
        currentUser={currentUser}
        notifications={notifications}
        onNavigate={() => {}}
      />
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={setSidebarCollapsed}
        onNavigate={() => {}}
      />
      <main className={`transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      } pt-16 pb-20 lg:pb-8`}>
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-6">
            <Breadcrumb />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
                  Reports & Analytics
                </h1>
                <p className="text-muted-foreground font-body mt-1">
                  Comprehensive performance insights and exportable documentation
                </p>
              </div>
              <QuickActions onAction={handleQuickAction} />
            </div>
          </div>

          {/* Filters Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <ReportTypeSelector
              selectedType={selectedReportType}
              onTypeChange={setSelectedReportType}
              reportTypes={reportTypes}
            />
            
            <DateRangeFilter
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              presetRanges={presetRanges}
              onPresetSelect={handlePresetSelect}
            />
            
            <FieldSelector
              selectedFields={selectedFields}
              onFieldChange={setSelectedFields}
              fields={fields}
              selectAll={selectAllFields}
              onSelectAll={handleSelectAllFields}
            />
          </div>

          {/* Charts Section */}
          <div className="mb-8">
            <YieldPerformanceChart
              data={yieldData}
              isLoading={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <SoilHealthTrends
              data={soilHealthData}
              isLoading={isLoading}
            />

            <RotationEffectivenessMetrics
              data={rotationEffectivenessData}
              isLoading={isLoading}
            />
          </div>

          <div className="mb-8">
            <FinancialImpactAnalysis
              data={financialData}
              isLoading={isLoading}
              totalRevenue={totalRevenue}
              totalCosts={totalCosts}
              netProfit={netProfit}
            />
          </div>

          {/* Tools Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            <ExportOptions
              onExport={handleExport}
              isExporting={isExporting}
            />

            <ComparisonTools
              onCompare={handleCompare}
              fields={fields}
              rotationStrategies={rotationStrategies}
            />

            <ReportHistory
              reports={reportHistory}
              onDownload={handleReportDownload}
              onDelete={handleReportDelete}
              onView={handleReportView}
            />
          </div>

          {/* Summary Statistics */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Icon name="BarChart3" size={20} className="text-primary" />
              <h3 className="font-heading font-semibold text-lg text-foreground">
                Performance Summary
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="font-data font-bold text-2xl text-foreground">176</div>
                <div className="text-xs text-muted-foreground mt-1">Total Fields</div>
              </div>

              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="font-data font-bold text-2xl text-success">92%</div>
                <div className="text-xs text-muted-foreground mt-1">Avg Efficiency</div>
              </div>

              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="font-data font-bold text-2xl text-foreground">
                  ${(netProfit / 1000)?.toFixed(0)}K
                </div>
                <div className="text-xs text-muted-foreground mt-1">Net Profit</div>
              </div>

              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="font-data font-bold text-2xl text-primary">7.2</div>
                <div className="text-xs text-muted-foreground mt-1">Avg Soil pH</div>
              </div>

              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="font-data font-bold text-2xl text-warning">24</div>
                <div className="text-xs text-muted-foreground mt-1">Reports Generated</div>
              </div>

              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="font-data font-bold text-2xl text-success">98%</div>
                <div className="text-xs text-muted-foreground mt-1">Data Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <QuickNoteModal
        isOpen={quickNoteOpen}
        onClose={() => setQuickNoteOpen(false)}
        onSave={(data) => {
          console.log('Note saved:', data);
        }}
      />
    </div>
  );
};

export default ReportsAndAnalytics;