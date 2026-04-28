import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const FinancialImpactAnalysis = ({ data, isLoading, totalRevenue, totalCosts, netProfit }) => {
  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Loader2" size={20} className="animate-spin" />
            <span className="font-body">Loading financial data...</span>
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
            Financial Impact Analysis
          </h3>
          <p className="text-sm text-muted-foreground">
            Revenue and cost trends over time
          </p>
        </div>
        <Icon name="DollarSign" size={20} className="text-success" />
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Total Revenue</span>
          </div>
          <div className="font-data font-bold text-xl text-foreground">
            ${totalRevenue?.toLocaleString()}
          </div>
        </div>

        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingDown" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">Total Costs</span>
          </div>
          <div className="font-data font-bold text-xl text-foreground">
            ${totalCosts?.toLocaleString()}
          </div>
        </div>

        <div className={`${netProfit >= 0 ? 'bg-success/10 border-success/20' : 'bg-error/10 border-error/20'} border rounded-lg p-4`}>
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calculator" size={16} className={netProfit >= 0 ? 'text-success' : 'text-error'} />
            <span className={`text-sm font-medium ${netProfit >= 0 ? 'text-success' : 'text-error'}`}>
              Net Profit
            </span>
          </div>
          <div className="font-data font-bold text-xl text-foreground">
            ${netProfit?.toLocaleString()}
          </div>
        </div>
      </div>
      {/* Area Chart */}
      <div className="w-full h-64" aria-label="Financial Impact Area Chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="month"
              stroke="var(--color-muted-foreground)"
              fontSize={10}
              tickLine={false}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              fontSize={10}
              tickLine={false}
              width={50}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                fontSize: '11px'
              }}
              formatter={(value) => [`$${value?.toLocaleString()}`, '']}
            />
            <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
            <Area
              type="monotone"
              dataKey="revenue"
              stackId="1"
              stroke="var(--color-success)"
              fill="var(--color-success)"
              fillOpacity={0.6}
              name="Revenue"
            />
            <Area
              type="monotone"
              dataKey="costs"
              stackId="2"
              stroke="var(--color-warning)"
              fill="var(--color-warning)"
              fillOpacity={0.6}
              name="Costs"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialImpactAnalysis;