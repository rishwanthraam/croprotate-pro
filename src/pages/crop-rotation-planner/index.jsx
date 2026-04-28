import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActions from '../../components/ui/QuickActions';
import QuickNoteModal from '../../components/ui/QuickNoteModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import CropDatabase from './components/CropDatabase';
import RotationTimeline from './components/RotationTimeline';
import RecommendationPanel from './components/RecommendationPanel';
import PlanComparison from './components/PlanComparison';
import ValidationAlerts from './components/ValidationAlerts';

const CropRotationPlanner = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [rotationPlan, setRotationPlan] = useState({});
  const [activeView, setActiveView] = useState('planner');
  const [selectedField, setSelectedField] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [validationAlerts, setValidationAlerts] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [quickNoteOpen, setQuickNoteOpen] = useState(false);

  // Mock current user data
  const currentUser = {
    name: "Rishwanth",
    role: "Farm Manager",
    email: "rishwanth@example.com"
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      message: "Soil test results available for North Field",
      type: "info",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      message: "Optimal planting window for soybeans opening soon",
      type: "warning",
      time: "1 day ago",
      read: false
    }
  ];

  // Add mock fields data
  const mockFields = [
    {
      id: 'field-001',
      name: 'North Field',
      acres: 45.2,
      soilType: 'Loam',
      drainageClass: 'Well-drained'
    },
    {
      id: 'field-002', 
      name: 'South Field',
      acres: 32.8,
      soilType: 'Clay',
      drainageClass: 'Moderately drained'
    },
    {
      id: 'field-003',
      name: 'East Field', 
      acres: 28.5,
      soilType: 'Sandy loam',
      drainageClass: 'Well-drained'
    }
  ];

  // Add mock plans data
  const mockPlans = [
    {
      id: 'plan-001',
      name: 'Standard Rotation Plan',
      description: 'Traditional corn-soybean rotation with cover crops',
      createdDate: '2024-01-15',
      lastModified: '2024-02-20',
      totalFields: 3,
      totalYears: 5,
      estimatedYield: 'High',
      riskLevel: 'Low'
    },
    {
      id: 'plan-002', 
      name: 'Diversified Rotation Plan',
      description: 'Multi-crop rotation including wheat and alfalfa',
      createdDate: '2024-01-10',
      lastModified: '2024-02-18',
      totalFields: 3,
      totalYears: 5,
      estimatedYield: 'Medium-High',
      riskLevel: 'Medium'
    }
  ];

  const currentYear = new Date()?.getFullYear();
  const planningYears = [currentYear, currentYear + 1, currentYear + 2, currentYear + 3, currentYear + 4];

  useEffect(() => {
    // Initialize with some sample rotation data
    const samplePlan = {
      'field-001': {
        [currentYear]: {
          id: 'corn-001',
          name: 'Field Corn',
          icon: 'Wheat',
          color: '#F59E0B',
          growthDays: 120,
          compatibility: {
            goodWith: ['soybeans', 'wheat', 'alfalfa'],
            avoidAfter: ['corn', 'sorghum'],
            restPeriod: 1
          }
        }
      }
    };
    setRotationPlan(samplePlan);
  }, [currentYear]);

  const handleCropSelect = (crop) => {
    setSelectedCrop(crop);
  };

  const handleCropAssign = (fieldId, year, crop) => {
    setRotationPlan(prev => ({
      ...prev,
      [fieldId]: {
        ...prev?.[fieldId],
        [year]: crop
      }
    }));

    // Trigger validation
    validateRotationPlan(fieldId, year, crop);
  };

  const handleCropRemove = (fieldId, year) => {
    setRotationPlan(prev => {
      const newPlan = { ...prev };
      if (newPlan?.[fieldId]) {
        delete newPlan?.[fieldId]?.[year];
        if (Object.keys(newPlan?.[fieldId])?.length === 0) {
          delete newPlan?.[fieldId];
        }
      }
      return newPlan;
    });
  };

  const validateRotationPlan = (fieldId, year, crop) => {
    const previousYear = year - 1;
    const previousCrop = rotationPlan?.[fieldId]?.[previousYear];
    
    if (previousCrop && crop?.compatibility?.avoidAfter?.includes(previousCrop?.id?.split('-')?.[0])) {
      const alert = {
        id: `alert-${Date.now()}`,
        type: 'warning',
        severity: 'medium',
        title: 'Crop Compatibility Warning',
        message: `${crop?.name} may have reduced performance after ${previousCrop?.name}`,
        field: fieldId,
        year: year,
        suggestions: [
          'Consider alternative crop selection',
          'Add soil amendments',
          'Monitor for pest issues'
        ],
        timestamp: new Date()
      };
      
      setValidationAlerts(prev => [...prev, alert]);
    }
  };

  const handleValidationAlert = (message) => {
    // Handle validation alerts from timeline
    console.log('Validation Alert:', message);
  };

  const handleApplyRecommendation = (recommendation) => {
    if (selectedField && selectedYear) {
      handleCropAssign(selectedField, selectedYear, recommendation?.crop);
    }
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'save-plan':
        // Handle save plan
        console.log('Saving rotation plan...');
        break;
      case 'copy-plan':
        // Handle copy plan
        console.log('Copying rotation plan...');
        break;
      case 'export-plan':
        // Handle export plan
        console.log('Exporting rotation plan...');
        break;
      case 'new-rotation':
        // Handle new rotation
        setRotationPlan({});
        break;
      case 'quick-note':
        setQuickNoteOpen(true);
        break;
      default:
        console.log('Quick action:', actionId);
    }
  };

  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  const handleNavigation = (path) => {
    // Handle navigation
    console.log('Navigating to:', path);
  };

  const viewTabs = [
    { id: 'planner', label: 'Rotation Planner', icon: 'Calendar' },
    { id: 'comparison', label: 'Plan Comparison', icon: 'GitCompare' },
    { id: 'validation', label: 'Validation', icon: 'AlertTriangle' }
  ];

  return (
    <>
      <Helmet>
        <title>Crop Rotation Planner - CropRotate Pro</title>
        <meta name="description" content="Design and optimize multi-year crop rotation schedules with AI-powered recommendations and predictive analytics." />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header 
          currentUser={currentUser}
          notifications={notifications}
          onNavigate={handleNavigation}
        />

        {/* Sidebar */}
        <Sidebar 
          isCollapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
          onNavigate={handleNavigation}
        />

        {/* Main Content */}
        <main className={`transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
        } pt-16 pb-20 lg:pb-4`}>
          <div className="p-6">
            {/* Breadcrumb */}
            <Breadcrumb />

            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-2">
                  Crop Rotation Planner
                </h1>
                <p className="text-muted-foreground font-body">
                  Design and optimize multi-year rotation schedules with AI-powered recommendations
                </p>
              </div>
              
              <div className="mt-4 lg:mt-0">
                <QuickActions onAction={handleQuickAction} />
              </div>
            </div>

            {/* View Tabs */}
            <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-6 overflow-x-auto">
              {viewTabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveView(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body transition-all duration-200 whitespace-nowrap ${
                    activeView === tab?.id
                      ? 'bg-card text-foreground shadow-soft'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>

            {/* Main Content Area */}
            {activeView === 'planner' && (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[calc(100vh-280px)]">
                {/* Crop Database - Left Panel */}
                <div className="xl:col-span-3 h-full">
                  <CropDatabase 
                    onCropSelect={handleCropSelect}
                    selectedCrop={selectedCrop}
                  />
                </div>

                {/* Rotation Timeline - Center Panel */}
                <div className="xl:col-span-6 h-full">
                  <RotationTimeline 
                    years={planningYears}
                    fields={mockFields}
                    rotationPlan={rotationPlan}
                    onCropAssign={handleCropAssign}
                    onCropRemove={handleCropRemove}
                    selectedCrop={selectedCrop}
                    onValidationAlert={handleValidationAlert}
                  />
                </div>

                {/* Recommendation Panel - Right Panel */}
                <div className="xl:col-span-3 h-full">
                  <RecommendationPanel 
                    rotationPlan={rotationPlan}
                    selectedField={selectedField}
                    selectedYear={selectedYear}
                    onApplyRecommendation={handleApplyRecommendation}
                  />
                </div>
              </div>
            )}

            {activeView === 'comparison' && (
              <div className="bg-card rounded-lg border border-border p-6">
                <PlanComparison 
                  plans={mockPlans}
                  onPlanSelect={(planId) => console.log('Selected plan:', planId)}
                  onPlanDelete={(planId) => console.log('Deleted plan:', planId)}
                  onCreatePlan={() => console.log('Creating new plan')}
                />
              </div>
            )}

            {activeView === 'validation' && (
              <div className="bg-card rounded-lg border border-border p-6">
                <ValidationAlerts 
                  alerts={validationAlerts}
                  onDismiss={(alertId) => {
                    setValidationAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
                  }}
                  onResolve={(alertId, suggestion) => {
                    console.log('Resolving alert:', alertId, 'with suggestion:', suggestion);
                    setValidationAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
                  }}
                />
              </div>
            )}
          </div>
        </main>

        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowMobileMenu(false)} />
            <div className="fixed top-0 left-0 bottom-0 w-64 bg-card border-r border-border p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-foreground">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              {/* Mobile navigation content */}
              <div className="space-y-2">
                {viewTabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => {
                      setActiveView(tab?.id);
                      setShowMobileMenu(false);
                    }}
                    className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm font-body transition-colors ${
                      activeView === tab?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>
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

export default CropRotationPlanner;