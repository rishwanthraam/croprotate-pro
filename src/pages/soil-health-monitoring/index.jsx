import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActions from '../../components/ui/QuickActions';
import QuickNoteModal from '../../components/ui/QuickNoteModal';
import SoilHealthSummary from './components/SoilHealthSummary';
import InteractiveFieldMap from './components/InteractiveFieldMap';
import SoilTestDataPanel from './components/SoilTestDataPanel';
import DataInputForm from './components/DataInputForm';
import FilterControls from './components/FilterControls';
import TrendAnalysisChart from './components/TrendAnalysisChart';
import AlertSystem from './components/AlertSystem';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SoilHealthMonitoring = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [showDataPanel, setShowDataPanel] = useState(false);
  const [showInputForm, setShowInputForm] = useState(false);
  const [activeView, setActiveView] = useState('overview');
  const [quickNoteOpen, setQuickNoteOpen] = useState(false);

  // Mock current user data
  const currentUser = {
    name: "Rishwanth",
    role: "Farm Manager",
    email: "rishwanth@croprotate.com"
  };

  // Mock notifications
  const notifications = [
    {
      type: 'warning',
      message: 'North Field pH levels below optimal range',
      time: '2 hours ago',
      read: false
    },
    {
      type: 'success',
      message: 'Soil test results available for East Field',
      time: '1 day ago',
      read: false
    },
    {
      type: 'info',
      message: 'Scheduled soil testing reminder for next week',
      time: '2 days ago',
      read: true
    }
  ];

  // Mock soil health summary data
  const summaryData = [
    {
      id: 'ph',
      title: 'Average pH Level',
      value: '6.7',
      unit: '',
      score: 85,
      trend: 2.3,
      icon: 'Droplets',
      lastUpdated: '2 days ago'
    },
    {
      id: 'organic',
      title: 'Organic Matter',
      value: '4.1',
      unit: '%',
      score: 78,
      trend: 5.2,
      icon: 'Leaf',
      lastUpdated: '1 week ago'
    },
    {
      id: 'nutrients',
      title: 'Nutrient Balance',
      value: '72',
      unit: '/100',
      score: 72,
      trend: -1.8,
      icon: 'Atom',
      lastUpdated: '3 days ago'
    },
    {
      id: 'overall',
      title: 'Overall Health',
      value: '78',
      unit: '/100',
      score: 78,
      trend: 3.1,
      icon: 'Award',
      lastUpdated: 'Today'
    }
  ];

  // Mock field data for map
  const fieldData = [
    {
      id: 'field-1',
      name: 'North Field',
      area: 25,
      healthScore: 85,
      lastTested: '2024-08-25',
      position: { x: 30, y: 25 },
      pH: 6.8,
      organicMatter: 4.2,
      nitrogen: 65,
      phosphorus: 48,
      potassium: 205
    },
    {
      id: 'field-2',
      name: 'South Field',
      area: 18,
      healthScore: 72,
      lastTested: '2024-08-20',
      position: { x: 45, y: 70 },
      pH: 6.5,
      organicMatter: 3.8,
      nitrogen: 58,
      phosphorus: 42,
      potassium: 190
    },
    {
      id: 'field-3',
      name: 'East Field',
      area: 32,
      healthScore: 68,
      lastTested: '2024-08-18',
      position: { x: 75, y: 45 },
      pH: 6.3,
      organicMatter: 3.5,
      nitrogen: 52,
      phosphorus: 38,
      potassium: 185
    },
    {
      id: 'field-4',
      name: 'West Field',
      area: 22,
      healthScore: 91,
      lastTested: '2024-08-28',
      position: { x: 15, y: 55 },
      pH: 7.0,
      organicMatter: 4.5,
      nitrogen: 68,
      phosphorus: 52,
      potassium: 215
    },
    {
      id: 'field-5',
      name: 'Central Field',
      area: 28,
      healthScore: 76,
      lastTested: '2024-08-22',
      position: { x: 50, y: 40 },
      pH: 6.6,
      organicMatter: 3.9,
      nitrogen: 60,
      phosphorus: 45,
      potassium: 198
    }
  ];

  // Mock alerts data
  const alertsData = [
    {
      id: 'alert-1',
      type: 'critical',
      priority: 'high',
      title: 'Low Nitrogen Levels Detected',
      message: 'East Field nitrogen levels have dropped below 50 ppm, immediate fertilization recommended.',
      field: 'East Field',
      timestamp: '2 hours ago',
      actionRequired: true,
      readings: [
        { parameter: 'Nitrogen', value: 48, unit: 'ppm', status: 'critical' },
        { parameter: 'pH', value: 6.3, unit: '', status: 'normal' },
        { parameter: 'Organic Matter', value: 3.5, unit: '%', status: 'normal' }
      ],
      recommendations: [
        'Apply 40-50 lbs/acre of nitrogen fertilizer within the next week',
        'Consider organic nitrogen sources like compost or manure',
        'Schedule follow-up soil test in 30 days to monitor improvement'
      ]
    },
    {
      id: 'alert-2',
      type: 'warning',
      priority: 'medium',
      title: 'pH Imbalance in North Field',
      message: 'pH levels are trending upward and may affect nutrient availability.',
      field: 'North Field',
      timestamp: '1 day ago',
      actionRequired: false,
      readings: [
        { parameter: 'pH', value: 7.2, unit: '', status: 'warning' },
        { parameter: 'Calcium', value: 1350, unit: 'ppm', status: 'high' }
      ],
      recommendations: [
        'Monitor pH levels weekly for the next month',
        'Consider sulfur application to lower pH if trend continues',
        'Test for calcium excess which may be causing pH rise'
      ]
    },
    {
      id: 'alert-3',
      type: 'info',
      priority: 'low',
      title: 'Scheduled Testing Reminder',
      message: 'West Field is due for quarterly soil testing next week.',
      field: 'West Field',
      timestamp: '3 days ago',
      actionRequired: false,
      recommendations: [
        'Schedule comprehensive soil analysis',
        'Include micronutrient testing in this round',
        'Compare results with previous quarter data'
      ]
    }
  ];

  const viewOptions = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'map', label: 'Field Map', icon: 'Map' },
    { id: 'trends', label: 'Trends', icon: 'TrendingUp' },
    { id: 'alerts', label: 'Alerts', icon: 'Bell' }
  ];

  const handleRegionClick = (field) => {
    setSelectedField(field);
    setShowDataPanel(true);
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'new-test':
        setShowInputForm(true);
        break;
      case 'schedule-test':
        // Handle schedule test
        console.log('Schedule a soil test');
        break;
      case 'compare-results':
        // Handle compare results
        console.log('Compare soil test results');
        break;
      case 'add-field':
        // Handle add field
        console.log('Add a new field');
        break;
      case 'quick-note':
        setQuickNoteOpen(true);
        break;
      default:
        console.log('Quick action:', actionId);
    }
  };

  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
    setShowInputForm(false);
    // Here you would typically send the data to your backend
  };

  const handleFiltersChange = (filters) => {
    console.log('Filters changed:', filters);
    // Apply filters to data
  };

  const handleAlertDismiss = (alertId) => {
    console.log('Alert dismissed:', alertId);
    // Remove alert from state
  };

  const handleAlertViewDetails = (alert) => {
    console.log('View alert details:', alert);
    // Navigate to detailed view
  };

  useEffect(() => {
    document.title = 'Soil Health Monitoring - CropRotate Pro';
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background">
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
        <main className={`transition-all duration-300 ease-in-out pt-16 pb-20 lg:pb-6 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-8">
            <Breadcrumb />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Soil Health Monitoring
                </h1>
                <p className="text-muted-foreground font-body">
                  Track soil conditions and make data-driven rotation decisions across all fields
                </p>
              </div>
              
              <QuickActions onAction={handleQuickAction} />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-1 mb-6 bg-muted rounded-lg p-1">
            {viewOptions?.map((view) => (
              <button
                key={view?.id}
                onClick={() => setActiveView(view?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body transition-colors ${
                  activeView === view?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={view?.icon} size={16} />
                <span>{view?.label}</span>
              </button>
            ))}
          </div>

          {/* Content Based on Active View */}
          {activeView === 'overview' && (
            <div className="space-y-8">
              {/* Soil Health Summary */}
              <SoilHealthSummary summaryData={summaryData} />

              {/* Interactive Field Map */}
              <InteractiveFieldMap 
                fieldData={fieldData}
                onRegionClick={handleRegionClick}
              />

              {/* Recent Alerts Preview */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    Recent Alerts
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveView('alerts')}
                  >
                    View All
                  </Button>
                </div>
                <AlertSystem 
                  alerts={alertsData?.slice(0, 2)}
                  onDismiss={handleAlertDismiss}
                  onViewDetails={handleAlertViewDetails}
                />
              </div>
            </div>
          )}

          {activeView === 'map' && (
            <div className="space-y-6">
              <FilterControls 
                onFiltersChange={handleFiltersChange}
                onReset={() => console.log('Filters reset')}
              />
              <InteractiveFieldMap 
                fieldData={fieldData}
                onRegionClick={handleRegionClick}
              />
            </div>
          )}

          {activeView === 'trends' && (
            <div className="space-y-6">
              <FilterControls 
                onFiltersChange={handleFiltersChange}
                onReset={() => console.log('Filters reset')}
              />
              <TrendAnalysisChart 
                data={fieldData}
                onMetricChange={(metric) => console.log('Metric changed:', metric)}
              />
            </div>
          )}

          {activeView === 'alerts' && (
            <div className="space-y-6">
              <AlertSystem 
                alerts={alertsData}
                onDismiss={handleAlertDismiss}
                onViewDetails={handleAlertViewDetails}
              />
            </div>
          )}
        </div>
      </main>
      {/* Modals */}
      {showDataPanel && (
        <SoilTestDataPanel
          fieldData={selectedField}
          isOpen={showDataPanel}
          onClose={() => {
            setShowDataPanel(false);
            setSelectedField(null);
          }}
        />
      )}
      {showInputForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <DataInputForm
              onSubmit={handleFormSubmit}
              onCancel={() => setShowInputForm(false)}
            />
          </div>
        </div>
      )}
    </div>

    <QuickNoteModal
      isOpen={quickNoteOpen}
      onClose={() => setQuickNoteOpen(false)}
      onSave={(data) => {
        console.log('Note saved:', data);
      }}
    />
  </>
  );
};

export default SoilHealthMonitoring;