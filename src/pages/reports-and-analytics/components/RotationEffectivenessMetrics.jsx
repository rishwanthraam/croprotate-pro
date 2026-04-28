import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const RotationEffectivenessMetrics = ({ data, isLoading }) => {
  const COLORS = [
    'var(--color-success)',
    'var(--color-primary)',
    'var(--color-warning)',
    'var(--color-secondary)',
    'var(--color-accent)'
  ];

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Loader2" size={20} className="animate-spin" />
            <span className="font-body">Loading rotation data...</span>
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
            Rotation Effectiveness
          </h3>
          <p className="text-sm text-muted-foreground">
            Success rate by rotation strategy
          </p>
        </div>
        <Icon name="Sprout" size={20} className="text-success" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="w-full h-64" aria-label="Rotation Effectiveness Pie Chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${(percent * 100)?.toFixed(0)}%`}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                fontSize={10}
              >
                {data?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Metrics List */}
        <div className="space-y-2">
          {data?.map((item, index) => (
            <div key={item?.name} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                />
                <div>
                  <div className="font-medium text-xs text-foreground">{item?.name}</div>
                  <div className="text-xs text-muted-foreground">{item?.description}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-data font-semibold text-sm text-foreground">
                  {item?.value}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RotationEffectivenessMetrics;