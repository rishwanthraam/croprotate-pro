import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PriorityAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'planting',
      priority: 'high',
      title: 'Optimal Planting Window',
      message: 'Ideal conditions for winter wheat planting in South Field. Soil temperature: 55°F, moisture: optimal.',
      field: 'South Field',
      dueDate: '2024-09-05',
      actionRequired: true,
      dismissed: false
    },
    {
      id: 2,
      type: 'maintenance',
      priority: 'medium',
      title: 'Equipment Maintenance Due',
      message: 'Combine harvester scheduled for pre-season maintenance. Book service appointment before harvest begins.',
      field: 'All Fields',
      dueDate: '2024-09-10',
      actionRequired: true,
      dismissed: false
    },
    {
      id: 3,
      type: 'pest',
      priority: 'medium',
      title: 'Pest Monitoring Alert',
      message: 'Corn borer activity increasing in region. Inspect North Field corn for signs of infestation.',
      field: 'North Field',
      dueDate: '2024-09-02',
      actionRequired: true,
      dismissed: false
    },
    {
      id: 4,
      type: 'weather',
      priority: 'low',
      title: 'Weather Advisory',
      message: 'Light frost possible next week. Consider protective measures for sensitive crops.',
      field: 'All Fields',
      dueDate: '2024-09-08',
      actionRequired: false,
      dismissed: false
    },
    {
      id: 5,
      type: 'soil',
      priority: 'high',
      title: 'Soil Test Results Available',
      message: 'Lab results show phosphorus deficiency in East Field. Fertilizer application recommended before next planting.',
      field: 'East Field',
      dueDate: '2024-09-15',
      actionRequired: true,
      dismissed: false
    }
  ]);

  const activeAlerts = alerts?.filter(alert => !alert?.dismissed);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'planting': return 'Sprout';
      case 'maintenance': return 'Wrench';
      case 'pest': return 'Bug';
      case 'weather': return 'CloudRain';
      case 'soil': return 'TestTube';
      default: return 'AlertTriangle';
    }
  };

  const getAlertColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-error bg-error/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-success bg-success/5';
      default: return 'border-l-muted-foreground bg-muted/5';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'Info';
      default: return 'Bell';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const handleDismiss = (alertId) => {
    setAlerts(alerts?.map(alert => 
      alert?.id === alertId ? { ...alert, dismissed: true } : alert
    ));
  };

  const handleAction = (alertId, actionType) => {
    console.log(`Action ${actionType} for alert ${alertId}`);
    // Handle specific actions based on alert type
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-warning rounded-md flex items-center justify-center">
            <Icon name="AlertTriangle" size={16} color="white" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-lg text-foreground">
              Priority Alerts
            </h2>
            <p className="font-body text-sm text-muted-foreground">
              {activeAlerts?.length} active alerts requiring attention
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Settings"
          iconPosition="left"
        >
          Manage
        </Button>
      </div>
      <div className="space-y-3">
        {activeAlerts?.length > 0 ? (
          activeAlerts?.map((alert) => {
            const daysUntilDue = getDaysUntilDue(alert?.dueDate);
            
            return (
              <div 
                key={alert?.id} 
                className={`border-l-4 rounded-r-lg p-4 ${getAlertColor(alert?.priority)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <Icon 
                      name={getAlertIcon(alert?.type)} 
                      size={16} 
                      className="text-foreground mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-heading font-medium text-foreground">
                          {alert?.title}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Icon 
                            name={getPriorityIcon(alert?.priority)} 
                            size={12} 
                            className={getPriorityColor(alert?.priority)}
                          />
                          <span className={`font-caption text-xs uppercase ${getPriorityColor(alert?.priority)}`}>
                            {alert?.priority}
                          </span>
                        </div>
                      </div>
                      
                      <p className="font-body text-sm text-foreground mb-2 leading-relaxed">
                        {alert?.message}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} />
                          <span className="font-body">{alert?.field}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={12} />
                          <span className="font-data">
                            {daysUntilDue === 0 ? 'Due today' : 
                             daysUntilDue === 1 ? 'Due tomorrow' :
                             daysUntilDue > 0 ? `Due in ${daysUntilDue} days` :
                             `Overdue by ${Math.abs(daysUntilDue)} days`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDismiss(alert?.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    title="Dismiss alert"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
                {alert?.actionRequired && (
                  <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border/50">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAction(alert?.id, 'primary')}
                      className="text-xs"
                    >
                      Take Action
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAction(alert?.id, 'snooze')}
                      className="text-xs"
                    >
                      Snooze
                    </Button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={32} className="mx-auto mb-3 text-success" />
            <h3 className="font-heading font-medium text-foreground mb-1">
              All Clear!
            </h3>
            <p className="font-body text-sm text-muted-foreground">
              No priority alerts at this time
            </p>
          </div>
        )}
      </div>
      {activeAlerts?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-body">
              Last updated: {new Date()?.toLocaleTimeString()}
            </span>
            <button className="font-body hover:text-foreground transition-colors duration-200">
              View all alerts
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriorityAlerts;