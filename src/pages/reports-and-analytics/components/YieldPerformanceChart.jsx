import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const YieldPerformanceChart = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Loader2" size={20} className="animate-spin" />
            <span className="font-body">Loading yield data...</span>
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
            Yield Performance Comparison
          </h3>
          <p className="text-sm text-muted-foreground">
            Crop yields across different fields and seasons
          </p>
        </div>
        <Icon name="TrendingUp" size={20} className="text-success" />
      </div>

      <div className="w-full h-64" aria-label="Yield Performance Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="field"
              stroke="var(--color-muted-foreground)"
              fontSize={10}
              tickLine={false}
              angle={-20}
              textAnchor="end"
              height={50}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              fontSize={10}
              tickLine={false}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                fontSize: '11px'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
            <Bar
              dataKey="currentYear"
              fill="var(--color-primary)"
              name="2024 Yield"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="previousYear"
              fill="var(--color-secondary)"
              name="2023 Yield"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="target"
              fill="var(--color-accent)"
              name="Target"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default YieldPerformanceChart;