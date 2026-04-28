import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, unit, change, changeType, icon, color = 'primary', description }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-soft transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-8 h-8 bg-${color} rounded-md flex items-center justify-center`}>
              <Icon name={icon} size={16} color="white" />
            </div>
            <h3 className="font-heading font-medium text-sm text-muted-foreground">
              {title}
            </h3>
          </div>
          
          <div className="flex items-baseline space-x-2 mb-1">
            <span className="font-heading font-bold text-2xl text-foreground">
              {value}
            </span>
            {unit && (
              <span className="font-body text-sm text-muted-foreground">
                {unit}
              </span>
            )}
          </div>
          
          {change && (
            <div className="flex items-center space-x-1">
              <Icon name={getChangeIcon()} size={14} className={getChangeColor()} />
              <span className={`font-data text-xs ${getChangeColor()}`}>
                {change}
              </span>
              <span className="font-body text-xs text-muted-foreground">
                vs last period
              </span>
            </div>
          )}
          
          {description && (
            <p className="font-body text-xs text-muted-foreground mt-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KPICard;