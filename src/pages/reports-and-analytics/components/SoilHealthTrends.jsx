import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const SoilHealthTrends = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Loader2" size={20} className="animate-spin" />
            <span className="font-body">Loading soil health data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Soil Health Trends
          </h3>
          <p className="text-sm text-muted-foreground">
            Key soil metrics over time
          </p>
        </div>
        <Icon name="TestTube" size={20} className="text-primary" />
      </div>

      <div className="w-full h-80" aria-label="Soil Health Trends Line Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="ph" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              name="pH Level"
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="nitrogen" 
              stroke="var(--color-success)" 
              strokeWidth={2}
              name="Nitrogen (ppm)"
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="phosphorus" 
              stroke="var(--color-warning)" 
              strokeWidth={2}
              name="Phosphorus (ppm)"
              dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="potassium" 
              stroke="var(--color-secondary)" 
              strokeWidth={2}
              name="Potassium (ppm)"
              dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SoilHealthTrends;