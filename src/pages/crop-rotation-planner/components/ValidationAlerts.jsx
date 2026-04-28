import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ValidationAlerts = ({ alerts, onDismiss, onResolve }) => {
  const [visibleAlerts, setVisibleAlerts] = useState([]);

  // Mock validation alerts
  const mockAlerts = [
    {
      id: 'alert-001',
      type: 'error',
      severity: 'high',
      title: 'Incompatible Crop Sequence',
      message: 'Corn planted after corn in North Field (2025) may reduce yields by 15-20%',
      field: 'North Field',
      year: 2025,
      suggestions: [
        'Consider planting soybeans instead',
        'Add cover crop to break the cycle',
        'Increase fertilizer application if continuing'
      ],
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 'alert-002',
      type: 'warning',
      severity: 'medium',
      title: 'Soil Nutrient Depletion Risk',
      message: 'Continuous high-nitrogen crops may deplete soil phosphorus levels',
      field: 'South Field',
      year: 2026,
      suggestions: [
        'Include legume crops in rotation',
        'Schedule soil testing',
        'Consider phosphorus supplementation'
      ],
      timestamp: new Date(Date.now() - 600000)
    },
    {
      id: 'alert-003',
      type: 'info',
      severity: 'low',
      title: 'Optimization Opportunity',
      message: 'Adding winter wheat could improve soil coverage and reduce erosion',
      field: 'East Field',
      year: 2024,
      suggestions: [
        'Plant winter wheat as cover crop',
        'Consider no-till practices',
        'Evaluate economic benefits'
      ],
      timestamp: new Date(Date.now() - 900000)
    }
  ];

  useEffect(() => {
    setVisibleAlerts(alerts || mockAlerts);
  }, [alerts]);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getAlertBgColor = (type) => {
    switch (type) {
      case 'error': return 'bg-error/10 border-error/20';
      case 'warning': return 'bg-warning/10 border-warning/20';
      case 'info': return 'bg-primary/10 border-primary/20';
      default: return 'bg-muted/10 border-border';
    }
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      high: 'bg-error text-error-foreground',
      medium: 'bg-warning text-warning-foreground',
      low: 'bg-primary text-primary-foreground'
    };

    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-data font-medium ${colors?.[severity]}`}>
        {severity?.toUpperCase()}
      </span>
    );
  };

  const handleDismiss = (alertId) => {
    setVisibleAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
    onDismiss?.(alertId);
  };

  const handleResolve = (alertId, suggestion) => {
    onResolve?.(alertId, suggestion);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (visibleAlerts?.length === 0) {
    return (
      <div className="p-6 text-center bg-success/5 border border-success/20 rounded-lg">
        <Icon name="CheckCircle" size={32} className="mx-auto text-success mb-2" />
        <h3 className="font-heading font-medium text-foreground mb-1">
          All Clear!
        </h3>
        <p className="text-sm text-muted-foreground">
          No validation issues found in your rotation plan
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="AlertTriangle" size={20} className="text-warning" />
          <h3 className="font-heading font-semibold text-foreground">
            Validation Alerts
          </h3>
          <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full font-data">
            {visibleAlerts?.length}
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setVisibleAlerts([])}
          iconName="X"
        >
          Dismiss All
        </Button>
      </div>
      <div className="space-y-3">
        {visibleAlerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`p-4 rounded-lg border ${getAlertBgColor(alert?.type)}`}
          >
            <div className="flex items-start space-x-3">
              <Icon 
                name={getAlertIcon(alert?.type)} 
                size={20} 
                className={`${getAlertColor(alert?.type)} flex-shrink-0 mt-0.5`}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-body font-medium text-foreground">
                    {alert?.title}
                  </h4>
                  {getSeverityBadge(alert?.severity)}
                </div>

                <p className="text-sm text-foreground mb-3">
                  {alert?.message}
                </p>

                <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{alert?.field}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{alert?.year}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{formatTimeAgo(alert?.timestamp)}</span>
                  </div>
                </div>

                {alert?.suggestions && alert?.suggestions?.length > 0 && (
                  <div className="mb-3">
                    <h5 className="text-xs font-body font-medium text-foreground mb-2">
                      Suggested Actions:
                    </h5>
                    <ul className="space-y-1">
                      {alert?.suggestions?.map((suggestion, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="ArrowRight" size={12} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground flex-1">
                            {suggestion}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleResolve(alert?.id, suggestion)}
                            className="text-xs px-2 py-1 h-auto"
                          >
                            Apply
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDismiss(alert?.id)}
                    iconName="X"
                  >
                    Dismiss
                  </Button>
                  
                  {alert?.type === 'error' && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleResolve(alert?.id, alert?.suggestions?.[0])}
                      iconName="CheckCircle"
                    >
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValidationAlerts;