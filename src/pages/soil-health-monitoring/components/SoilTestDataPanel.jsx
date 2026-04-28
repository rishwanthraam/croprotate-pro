import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const SoilTestDataPanel = ({ fieldData, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !fieldData) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'nutrients', label: 'Nutrients', icon: 'Atom' },
    { id: 'history', label: 'History', icon: 'Clock' },
    { id: 'recommendations', label: 'Recommendations', icon: 'Lightbulb' }
  ];

  const trendData = [
    { month: 'Jan', pH: 6.2, organic: 3.1, nitrogen: 45, phosphorus: 32, potassium: 180 },
    { month: 'Mar', pH: 6.4, organic: 3.3, nitrogen: 48, phosphorus: 35, potassium: 185 },
    { month: 'May', pH: 6.3, organic: 3.5, nitrogen: 52, phosphorus: 38, potassium: 190 },
    { month: 'Jul', pH: 6.5, organic: 3.7, nitrogen: 55, phosphorus: 42, potassium: 195 },
    { month: 'Sep', pH: 6.6, organic: 3.9, nitrogen: 58, phosphorus: 45, potassium: 200 },
    { month: 'Nov', pH: 6.7, organic: 4.1, nitrogen: 62, phosphorus: 48, potassium: 205 }
  ];

  const nutrientData = [
    { name: 'Nitrogen', current: 62, optimal: 70, unit: 'ppm', status: 'low' },
    { name: 'Phosphorus', current: 48, optimal: 45, unit: 'ppm', status: 'good' },
    { name: 'Potassium', current: 205, optimal: 200, unit: 'ppm', status: 'good' },
    { name: 'Calcium', current: 1200, optimal: 1000, unit: 'ppm', status: 'high' },
    { name: 'Magnesium', current: 180, optimal: 200, unit: 'ppm', status: 'low' },
    { name: 'Sulfur', current: 15, optimal: 20, unit: 'ppm', status: 'low' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-success';
      case 'high': return 'text-warning';
      case 'low': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'good': return 'bg-success/10';
      case 'high': return 'bg-warning/10';
      case 'low': return 'bg-error/10';
      default: return 'bg-muted/10';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="TestTube" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-lg text-foreground">
                {fieldData?.name} - Soil Analysis
              </h2>
              <p className="text-sm text-muted-foreground font-body">
                {fieldData?.area} acres • Last updated: {fieldData?.lastTested}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b border-border px-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-body border-b-2 transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-body text-muted-foreground">pH Level</span>
                    <Icon name="Droplets" size={16} className="text-primary" />
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-data font-bold text-foreground">6.7</span>
                    <span className="text-sm text-success font-body">Optimal</span>
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-body text-muted-foreground">Organic Matter</span>
                    <Icon name="Leaf" size={16} className="text-success" />
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-data font-bold text-foreground">4.1%</span>
                    <span className="text-sm text-success font-body">Good</span>
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-body text-muted-foreground">Overall Score</span>
                    <Icon name="Award" size={16} className="text-warning" />
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-data font-bold text-foreground">78</span>
                    <span className="text-sm text-warning font-body">Good</span>
                  </div>
                </div>
              </div>

              {/* pH Trend Chart */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-heading font-semibold text-foreground mb-4">pH Level Trend</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                      <YAxis domain={[5.5, 7.5]} stroke="var(--color-muted-foreground)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--color-card)', 
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="pH" 
                        stroke="var(--color-primary)" 
                        strokeWidth={2}
                        dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nutrients' && (
            <div className="space-y-6">
              {/* Nutrient Status Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nutrientData?.map((nutrient) => (
                  <div key={nutrient?.name} className={`rounded-lg p-4 ${getStatusBg(nutrient?.status)}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-heading font-semibold text-foreground">
                        {nutrient?.name}
                      </h4>
                      <span className={`text-xs font-caption px-2 py-1 rounded-full ${getStatusColor(nutrient?.status)} ${getStatusBg(nutrient?.status)}`}>
                        {nutrient?.status?.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground font-body">Current:</span>
                        <span className="font-data font-semibold text-foreground">
                          {nutrient?.current} {nutrient?.unit}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground font-body">Optimal:</span>
                        <span className="font-data text-muted-foreground">
                          {nutrient?.optimal} {nutrient?.unit}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-muted rounded-full h-2 mt-3">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            nutrient?.status === 'good' ? 'bg-success' : 
                            nutrient?.status === 'high' ? 'bg-warning' : 'bg-error'
                          }`}
                          style={{ width: `${Math.min((nutrient?.current / nutrient?.optimal) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Nutrient Comparison Chart */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-heading font-semibold text-foreground mb-4">Nutrient Levels vs Optimal</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={nutrientData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                      <YAxis stroke="var(--color-muted-foreground)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--color-card)', 
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar dataKey="current" fill="var(--color-primary)" />
                      <Bar dataKey="optimal" fill="var(--color-muted)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              {/* Historical Tests */}
              <div className="space-y-4">
                <h4 className="font-heading font-semibold text-foreground">Recent Soil Tests</h4>
                
                {[
                  { date: '2024-11-15', type: 'Complete Analysis', score: 78, technician: 'AgriLab Services' },
                  { date: '2024-09-20', type: 'pH & Nutrients', score: 75, technician: 'County Extension' },
                  { date: '2024-07-10', type: 'Organic Matter', score: 72, technician: 'Farm Consultant' },
                  { date: '2024-05-05', type: 'Complete Analysis', score: 69, technician: 'AgriLab Services' },
                  { date: '2024-03-15', type: 'pH & Nutrients', score: 65, technician: 'County Extension' }
                ]?.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="FileText" size={16} className="text-primary" />
                      </div>
                      <div>
                        <h5 className="font-body font-medium text-foreground">{test?.type}</h5>
                        <p className="text-sm text-muted-foreground font-caption">
                          {test?.date} • {test?.technician}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="font-data font-semibold text-foreground">
                          Score: {test?.score}
                        </div>
                        <div className={`text-sm font-caption ${
                          test?.score >= 80 ? 'text-success' : 
                          test?.score >= 60 ? 'text-warning' : 'text-error'
                        }`}>
                          {test?.score >= 80 ? 'Excellent' : test?.score >= 60 ? 'Good' : 'Needs Attention'}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Icon name="ExternalLink" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              {/* Priority Recommendations */}
              <div className="space-y-4">
                <h4 className="font-heading font-semibold text-foreground">Priority Actions</h4>
                
                {[
                  {
                    priority: 'high',
                    title: 'Increase Nitrogen Levels',
                    description: 'Apply 40-50 lbs/acre of nitrogen fertilizer before next planting season. Consider organic sources like compost or manure.',
                    timeline: 'Next 2 weeks',
                    cost: '$120-150/acre'
                  },
                  {
                    priority: 'medium',
                    title: 'Boost Magnesium Content',
                    description: 'Apply Epsom salt or dolomitic limestone to increase magnesium availability. Monitor pH levels during application.',
                    timeline: 'Next month',
                    cost: '$80-100/acre'
                  },
                  {
                    priority: 'low',
                    title: 'Maintain Organic Matter',
                    description: 'Continue current cover crop rotation. Consider adding more diverse plant species to improve soil biology.',
                    timeline: 'Ongoing',
                    cost: '$30-50/acre'
                  }
                ]?.map((rec, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        rec?.priority === 'high' ? 'bg-error' :
                        rec?.priority === 'medium' ? 'bg-warning' : 'bg-success'
                      }`} />
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <h5 className="font-heading font-semibold text-foreground">
                            {rec?.title}
                          </h5>
                          <span className={`text-xs font-caption px-2 py-1 rounded-full ${
                            rec?.priority === 'high' ? 'bg-error/10 text-error' :
                            rec?.priority === 'medium' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                          }`}>
                            {rec?.priority?.toUpperCase()} PRIORITY
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground font-body">
                          {rec?.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Icon name="Clock" size={14} className="text-muted-foreground" />
                              <span className="text-muted-foreground font-caption">
                                {rec?.timeline}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="DollarSign" size={14} className="text-muted-foreground" />
                              <span className="text-muted-foreground font-caption">
                                {rec?.cost}
                              </span>
                            </div>
                          </div>
                          
                          <Button variant="outline" size="sm">
                            Add to Plan
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoilTestDataPanel;