import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertSystem = ({ alerts, onDismiss, onViewDetails }) => {
  const [expandedAlert, setExpandedAlert] = useState(null);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getAlertBg = (type) => {
    switch (type) {
      case 'critical': return 'bg-error/10 border-error/20';
      case 'warning': return 'bg-warning/10 border-warning/20';
      case 'info': return 'bg-primary/10 border-primary/20';
      default: return 'bg-muted/10 border-border';
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-error text-error-foreground',
      medium: 'bg-warning text-warning-foreground',
      low: 'bg-success text-success-foreground'
    };
    
    return colors?.[priority] || 'bg-muted text-muted-foreground';
  };

  const criticalAlerts = alerts?.filter(alert => alert?.type === 'critical');
  const warningAlerts = alerts?.filter(alert => alert?.type === 'warning');
  const infoAlerts = alerts?.filter(alert => alert?.type === 'info');

  if (alerts?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h3 className="font-heading font-semibold text-foreground mb-2">
            All Systems Normal
          </h3>
          <p className="text-sm text-muted-foreground font-body">
            No soil health alerts at this time. All fields are within optimal ranges.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Alert Summary */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Bell" size={20} className="text-primary" />
            <h3 className="font-heading font-semibold text-foreground">
              Soil Health Alerts
            </h3>
          </div>
          
          <div className="flex items-center space-x-4">
            {criticalAlerts?.length > 0 && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-error rounded-full" />
                <span className="text-sm font-data text-error">
                  {criticalAlerts?.length} Critical
                </span>
              </div>
            )}
            {warningAlerts?.length > 0 && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-warning rounded-full" />
                <span className="text-sm font-data text-warning">
                  {warningAlerts?.length} Warning
                </span>
              </div>
            )}
            {infoAlerts?.length > 0 && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm font-data text-primary">
                  {infoAlerts?.length} Info
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Alert List */}
      <div className="space-y-3">
        {alerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`border rounded-lg overflow-hidden transition-all duration-200 ${getAlertBg(alert?.type)}`}
          >
            <div className="p-4">
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getAlertBg(alert?.type)}`}>
                  <Icon 
                    name={getAlertIcon(alert?.type)} 
                    size={20} 
                    className={getAlertColor(alert?.type)} 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-heading font-semibold text-foreground">
                        {alert?.title}
                      </h4>
                      <span className={`text-xs font-caption px-2 py-1 rounded-full ${getPriorityBadge(alert?.priority)}`}>
                        {alert?.priority?.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedAlert(
                          expandedAlert === alert?.id ? null : alert?.id
                        )}
                        iconName={expandedAlert === alert?.id ? "ChevronUp" : "ChevronDown"}
                      >
                        Details
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDismiss?.(alert?.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-foreground font-body mb-3">
                    {alert?.message}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-caption">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{alert?.field}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{alert?.timestamp}</span>
                      </div>
                    </div>
                    
                    {alert?.actionRequired && (
                      <span className="text-error font-medium">
                        Action Required
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedAlert === alert?.id && (
              <div className="border-t border-border bg-card/50 p-4">
                <div className="space-y-4">
                  {/* Current Values */}
                  <div>
                    <h5 className="font-body font-semibold text-foreground mb-2">
                      Current Readings
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {alert?.readings?.map((reading, index) => (
                        <div key={index} className="bg-muted/50 rounded p-2">
                          <div className="text-xs text-muted-foreground font-caption">
                            {reading?.parameter}
                          </div>
                          <div className={`font-data font-semibold ${
                            reading?.status === 'critical' ? 'text-error' :
                            reading?.status === 'warning' ? 'text-warning' : 'text-foreground'
                          }`}>
                            {reading?.value} {reading?.unit}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  {alert?.recommendations && (
                    <div>
                      <h5 className="font-body font-semibold text-foreground mb-2">
                        Recommended Actions
                      </h5>
                      <ul className="space-y-2">
                        {alert?.recommendations?.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Icon name="ArrowRight" size={14} className="text-primary mt-0.5" />
                            <span className="text-sm text-foreground font-body">
                              {rec}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 pt-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onViewDetails?.(alert)}
                      iconName="ExternalLink"
                    >
                      View Field Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Calendar"
                    >
                      Schedule Action
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Phone"
                    >
                      Contact Expert
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Zap" size={16} className="text-primary" />
            <span className="font-body font-medium text-foreground">
              Quick Actions
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Phone">
              Emergency Contact
            </Button>
            <Button variant="outline" size="sm" iconName="FileText">
              Generate Report
            </Button>
            <Button variant="default" size="sm" iconName="Plus">
              Schedule Test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertSystem;