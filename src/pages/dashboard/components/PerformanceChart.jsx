import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceChart = () => {
  const [chartType, setChartType] = useState('yield');
  const [timeRange, setTimeRange] = useState('5years');

  const yieldData = [
    { year: '2020', corn: 165, soybeans: 48, wheat: 62 },
    { year: '2021', corn: 172, soybeans: 52, wheat: 58 },
    { year: '2022', corn: 158, soybeans: 45, wheat: 65 },
    { year: '2023', corn: 180, soybeans: 55, wheat: 68 },
    { year: '2024', corn: 185, soybeans: 58, wheat: 70 }
  ];

  const soilHealthData = [
    { year: '2020', ph: 6.2, organic_matter: 3.1, nitrogen: 45, phosphorus: 28, potassium: 185 },
    { year: '2021', ph: 6.4, organic_matter: 3.3, nitrogen: 48, phosphorus: 32, potassium: 195 },
    { year: '2022', ph: 6.3, organic_matter: 3.5, nitrogen: 52, phosphorus: 35, potassium: 205 },
    { year: '2023', ph: 6.5, organic_matter: 3.8, nitrogen: 55, phosphorus: 38, potassium: 215 },
    { year: '2024', ph: 6.6, organic_matter: 4.0, nitrogen: 58, phosphorus: 42, potassium: 225 }
  ];

  const profitabilityData = [
    { year: '2020', revenue: 125000, costs: 95000, profit: 30000 },
    { year: '2021', revenue: 142000, costs: 98000, profit: 44000 },
    { year: '2022', revenue: 138000, costs: 105000, profit: 33000 },
    { year: '2023', revenue: 165000, costs: 108000, profit: 57000 },
    { year: '2024', revenue: 178000, costs: 112000, profit: 66000 }
  ];

  const getChartData = () => {
    switch (chartType) {
      case 'yield': return yieldData;
      case 'soil': return soilHealthData;
      case 'profit': return profitabilityData;
      default: return yieldData;
    }
  };

  const getChartTitle = () => {
    switch (chartType) {
      case 'yield': return 'Crop Yield Trends';
      case 'soil': return 'Soil Health Metrics';
      case 'profit': return 'Farm Profitability';
      default: return 'Performance Metrics';
    }
  };

  const getChartDescription = () => {
    switch (chartType) {
      case 'yield': return 'Bushels per acre over time';
      case 'soil': return 'Key soil indicators and nutrients';
      case 'profit': return 'Revenue, costs, and net profit';
      default: return 'Historical performance data';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-heading font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="font-body text-sm text-foreground">
                {entry?.name}: 
              </span>
              <span className="font-data text-sm font-medium text-foreground">
                {chartType === 'profit' ? `$${entry?.value?.toLocaleString()}` : entry?.value}
                {chartType === 'yield' && entry?.name !== 'wheat' && ' bu/acre'}
                {chartType === 'soil' && entry?.name === 'ph' && ' pH'}
                {chartType === 'soil' && entry?.name === 'organic_matter' && '%'}
                {chartType === 'soil' && ['nitrogen', 'phosphorus', 'potassium']?.includes(entry?.name) && ' ppm'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const data = getChartData();
    
    if (chartType === 'yield') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="year" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="corn" 
              stroke="var(--color-warning)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 4 }}
              name="Corn"
            />
            <Line 
              type="monotone" 
              dataKey="soybeans" 
              stroke="var(--color-success)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
              name="Soybeans"
            />
            <Line 
              type="monotone" 
              dataKey="wheat" 
              stroke="var(--color-secondary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
              name="Wheat"
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'soil') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="year" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="ph" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              name="pH Level"
            />
            <Line 
              type="monotone" 
              dataKey="organic_matter" 
              stroke="var(--color-success)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
              name="Organic Matter"
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'profit') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="year" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="revenue" fill="var(--color-success)" name="Revenue" />
            <Bar dataKey="costs" fill="var(--color-error)" name="Costs" />
            <Bar dataKey="profit" fill="var(--color-primary)" name="Net Profit" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <Icon name="TrendingUp" size={16} color="white" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-lg text-foreground">
              {getChartTitle()}
            </h2>
            <p className="font-body text-sm text-muted-foreground">
              {getChartDescription()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={chartType}
            onChange={(e) => setChartType(e?.target?.value)}
            className="font-body text-sm border border-border rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="yield">Yield Trends</option>
            <option value="soil">Soil Health</option>
            <option value="profit">Profitability</option>
          </select>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      <div className="mb-4">
        {renderChart()}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={12} />
            <span className="font-body">Last 5 years</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="RefreshCw" size={12} />
            <span className="font-body">Updated daily</span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="BarChart3"
          iconPosition="left"
          onClick={() => {/* Navigate to detailed analytics */}}
        >
          View Detailed Analytics
        </Button>
      </div>
    </div>
  );
};

export default PerformanceChart;