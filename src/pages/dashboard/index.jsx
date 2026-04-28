import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActions from '../../components/ui/QuickActions';
import QuickNoteModal from '../../components/ui/QuickNoteModal';
import KPICard from './components/KPICard';
import CropRotationTimeline from './components/CropRotationTimeline';
import WeatherWidget from './components/WeatherWidget';
import FieldNotesSummary from './components/FieldNotesSummary';
import PriorityAlerts from './components/PriorityAlerts';
import QuickActionPanel from './components/QuickActionPanel';
import PerformanceChart from './components/PerformanceChart';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [quickNoteOpen, setQuickNoteOpen] = useState(false);
  const [currentUser] = useState({
    name: "Rishwanth",
    role: "Farm Manager",
    email: "rishwanth@croprotate.com"
  });

  const [notifications] = useState([
    {
      message: "Optimal planting window for winter wheat in South Field",
      time: "2 hours ago",
      type: "success",
      read: false
    },
    {
      message: "Soil test results available for East Field",
      time: "4 hours ago",
      type: "warning",
      read: false
    },
    {
      message: "Equipment maintenance scheduled for tomorrow",
      time: "1 day ago",
      type: "info",
      read: true
    }
  ]);

  // Mock KPI data
  const kpiData = [
    {
      title: "Current Season Progress",
      value: "78",
      unit: "%",
      change: "+12%",
      changeType: "positive",
      icon: "Calendar",
      color: "primary",
      description: "Ahead of seasonal schedule"
    },
    {
      title: "Soil Health Score",
      value: "8.2",
      unit: "/10",
      change: "+0.3",
      changeType: "positive",
      icon: "TestTube",
      color: "success",
      description: "Excellent soil conditions"
    },
    {
      title: "Predicted Yield Improvement",
      value: "15",
      unit: "%",
      change: "+3%",
      changeType: "positive",
      icon: "TrendingUp",
      color: "warning",
      description: "Above regional average"
    },
    {
      title: "Upcoming Deadlines",
      value: "3",
      unit: "tasks",
      change: "-2",
      changeType: "positive",
      icon: "Clock",
      color: "secondary",
      description: "Next deadline in 5 days"
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleQuickAction = (actionId) => {
    console.log(`Quick action triggered: ${actionId}`);
    // Handle different quick actions
    switch (actionId) {
      case 'new-rotation': navigate('/crop-rotation-planner');
        break;
      case 'soil-test': navigate('/soil-health-monitoring');
        break;
      case 'add-field':
        // Open add field modal
        break;
      case 'quick-note':
        setQuickNoteOpen(true);
        break;
      case 'generate-report': navigate('/reports-and-analytics');
        break;
      default:
        console.log(`Unhandled action: ${actionId}`);
    }
  };

  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  // Auto-refresh dashboard data
  useEffect(() => {
    const interval = setInterval(() => {
      // Refresh dashboard data
      console.log('Refreshing dashboard data...');
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
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
      } pt-16 pb-20 lg:pb-8`}>
        <div className="p-6">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                Farm Dashboard
              </h1>
              <p className="font-body text-lg text-muted-foreground">
                Welcome back, {currentUser?.name}. Here's your farm overview for today.
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0">
              <QuickActions onAction={handleQuickAction} />
            </div>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                unit={kpi?.unit}
                change={kpi?.change}
                changeType={kpi?.changeType}
                icon={kpi?.icon}
                color={kpi?.color}
                description={kpi?.description}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Crop Rotation Timeline */}
            <div className="xl:col-span-2">
              <CropRotationTimeline />
            </div>

            {/* Right Column - Weather Widget */}
            <div className="xl:col-span-1">
              <WeatherWidget />
            </div>
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            {/* Performance Chart */}
            <div>
              <PerformanceChart />
            </div>

            {/* Field Notes Summary */}
            <div>
              <FieldNotesSummary />
            </div>
          </div>

          {/* Bottom Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Priority Alerts */}
            <div>
              <PriorityAlerts />
            </div>

            {/* Quick Action Panel */}
            <div>
              <QuickActionPanel onAction={handleQuickAction} />
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <span className="font-body">
                  Last updated: {new Date()?.toLocaleString()}
                </span>
                <span className="font-body">
                  System status: All operational
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => navigate('/help')}
                  className="font-body hover:text-foreground transition-colors duration-200"
                >
                  Need help?
                </button>
                <button 
                  onClick={() => navigate('/settings')}
                  className="font-body hover:text-foreground transition-colors duration-200"
                >
                  Settings
                </button>
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

export default Dashboard;