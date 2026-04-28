import React from 'react';
import Icon from '../../../components/AppIcon';

const SoilHealthSummary = ({ summaryData }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return { name: 'TrendingUp', color: 'text-success' };
    if (trend < 0) return { name: 'TrendingDown', color: 'text-error' };
    return { name: 'Minus', color: 'text-muted-foreground' };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryData?.map((metric) => {
        const trendIcon = getTrendIcon(metric?.trend);
        return (
          <div key={metric?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-soft transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${getScoreBgColor(metric?.score)} flex items-center justify-center`}>
                <Icon name={metric?.icon} size={24} className={getScoreColor(metric?.score)} />
              </div>
              <div className={`flex items-center space-x-1 ${trendIcon?.color}`}>
                <Icon name={trendIcon?.name} size={16} />
                <span className="text-sm font-data">
                  {Math.abs(metric?.trend)}%
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-semibold text-foreground">
                {metric?.title}
              </h3>
              <div className="flex items-baseline space-x-2">
                <span className={`text-2xl font-data font-bold ${getScoreColor(metric?.score)}`}>
                  {metric?.value}
                </span>
                <span className="text-sm text-muted-foreground font-body">
                  {metric?.unit}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-caption">
                  Score: {metric?.score}/100
                </span>
                <span className="text-xs text-muted-foreground font-caption">
                  {metric?.lastUpdated}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2 mt-3">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    metric?.score >= 80 ? 'bg-success' : 
                    metric?.score >= 60 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${metric?.score}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SoilHealthSummary;