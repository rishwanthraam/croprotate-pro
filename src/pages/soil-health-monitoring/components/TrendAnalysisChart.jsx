import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const TrendAnalysisChart = ({ data, onMetricChange }) => {
  const [selectedMetric, setSelectedMetric] = useState('pH');
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('12-months');

  const metricOptions = [
    { value: 'pH', label: 'pH Level', color: '#2D5A27', unit: '' },
    { value: 'organicMatter', label: 'Organic Matter', color: '#16A34A', unit: '%' },
    { value: 'nitrogen', label: 'Nitrogen', color: '#D97706', unit: 'ppm' },
    { value: 'phosphorus', label: 'Phosphorus', color: '#DC2626', unit: 'ppm' },
    { value: 'potassium', label: 'Potassium', color: '#7C3AED', unit: 'ppm' },
    { value: 'overallScore', label: 'Overall Health Score', color: '#059669', unit: '/100' }
  ];

  const timeRangeOptions = [
    { value: '6-months', label: 'Last 6 Months' },
    { value: '12-months', label: 'Last 12 Months' },
    { value: '24-months', label: 'Last 2 Years' },
    { value: '36-months', label: 'Last 3 Years' }
  ];

  const chartTypeOptions = [
    { value: 'line', label: 'Line Chart', icon: 'TrendingUp' },
    { value: 'area', label: 'Area Chart', icon: 'AreaChart' }
  ];

  // Mock trend data
  const trendData = [
    { month: 'Jan 2024', pH: 6.2, organicMatter: 3.1, nitrogen: 45, phosphorus: 32, potassium: 180, overallScore: 65 },
    { month: 'Feb 2024', pH: 6.3, organicMatter: 3.2, nitrogen: 47, phosphorus: 33, potassium: 182, overallScore: 67 },
    { month: 'Mar 2024', pH: 6.4, organicMatter: 3.3, nitrogen: 48, phosphorus: 35, potassium: 185, overallScore: 69 },
    { month: 'Apr 2024', pH: 6.3, organicMatter: 3.4, nitrogen: 50, phosphorus: 36, potassium: 187, overallScore: 71 },
    { month: 'May 2024', pH: 6.5, organicMatter: 3.5, nitrogen: 52, phosphorus: 38, potassium: 190, overallScore: 72 },
    { month: 'Jun 2024', pH: 6.4, organicMatter: 3.6, nitrogen: 54, phosphorus: 40, potassium: 192, overallScore: 74 },
    { month: 'Jul 2024', pH: 6.6, organicMatter: 3.7, nitrogen: 55, phosphorus: 42, potassium: 195, overallScore: 75 },
    { month: 'Aug 2024', pH: 6.5, organicMatter: 3.8, nitrogen: 57, phosphorus: 44, potassium: 197, overallScore: 76 },
    { month: 'Sep 2024', pH: 6.7, organicMatter: 3.9, nitrogen: 58, phosphorus: 45, potassium: 200, overallScore: 78 },
    { month: 'Oct 2024', pH: 6.6, organicMatter: 4.0, nitrogen: 60, phosphorus: 46, potassium: 202, overallScore: 79 },
    { month: 'Nov 2024', pH: 6.8, organicMatter: 4.1, nitrogen: 62, phosphorus: 48, potassium: 205, overallScore: 81 },
    { month: 'Dec 2024', pH: 6.7, organicMatter: 4.2, nitrogen: 64, phosphorus: 50, potassium: 208, overallScore: 82 }
  ];

  const currentMetric = metricOptions?.find(m => m?.value === selectedMetric);
  const currentValue = trendData?.[trendData?.length - 1]?.[selectedMetric];
  const previousValue = trendData?.[trendData?.length - 2]?.[selectedMetric];
  const trend = currentValue && previousValue ? ((currentValue - previousValue) / previousValue * 100) : 0;

  const handleMetricChange = (metric) => {
    setSelectedMetric(metric);
    onMetricChange?.(metric);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-body font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-sm font-body text-foreground">
                {entry?.name}: {entry?.value}{currentMetric?.unit}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground">
                Soil Health Trends
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                Track changes in soil conditions over time
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
            <Button variant="outline" size="sm" iconName="Share">
              Share
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Metric"
            options={metricOptions}
            value={selectedMetric}
            onChange={handleMetricChange}
            className="mb-0"
          />
          
          <Select
            label="Time Range"
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="mb-0"
          />
          
          <div className="flex items-end space-x-2">
            {chartTypeOptions?.map((type) => (
              <Button
                key={type?.value}
                variant={chartType === type?.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChartType(type?.value)}
                iconName={type?.icon}
                className="flex-1"
              >
                {type?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Current Value Display */}
      <div className="p-6 bg-muted/30 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-data font-bold text-foreground">
                {currentValue}{currentMetric?.unit}
              </div>
              <div className="text-sm text-muted-foreground font-body">
                Current {currentMetric?.label}
              </div>
            </div>
            
            <div className={`flex items-center space-x-1 ${
              trend > 0 ? 'text-success' : trend < 0 ? 'text-error' : 'text-muted-foreground'
            }`}>
              <Icon 
                name={trend > 0 ? 'TrendingUp' : trend < 0 ? 'TrendingDown' : 'Minus'} 
                size={16} 
              />
              <span className="text-sm font-data">
                {Math.abs(trend)?.toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground font-caption">
                vs last month
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-muted-foreground font-body">
              Data points: {trendData?.length}
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              Last updated: {new Date()?.toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={currentMetric?.color}
                  strokeWidth={3}
                  dot={{ fill: currentMetric?.color, strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: currentMetric?.color, strokeWidth: 2 }}
                />
              </LineChart>
            ) : (
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={currentMetric?.color}
                  fill={`${currentMetric?.color}20`}
                  strokeWidth={2}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
      {/* Insights */}
      <div className="p-6 border-t border-border bg-muted/30">
        <h4 className="font-heading font-semibold text-foreground mb-3">
          Key Insights
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <Icon name="TrendingUp" size={16} className="text-success mt-1" />
            <div>
              <p className="text-sm font-body text-foreground font-medium">
                Positive Trend
              </p>
              <p className="text-xs text-muted-foreground font-caption">
                {currentMetric?.label} has improved by {Math.abs(trend)?.toFixed(1)}% over the last month
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="Target" size={16} className="text-primary mt-1" />
            <div>
              <p className="text-sm font-body text-foreground font-medium">
                Target Range
              </p>
              <p className="text-xs text-muted-foreground font-caption">
                Current value is within optimal range for crop rotation planning
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysisChart;