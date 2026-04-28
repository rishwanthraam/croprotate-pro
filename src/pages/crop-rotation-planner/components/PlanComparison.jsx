import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PlanComparison = ({ plans, onPlanSelect, onPlanDelete, onCreatePlan }) => {
  const [selectedPlans, setSelectedPlans] = useState([]);

  // Mock plans data
  const mockPlans = [
    {
      id: 'plan-001',
      name: 'Conservative Rotation',
      description: 'Traditional corn-soybean rotation with wheat cover',
      createdDate: '2024-08-15',
      lastModified: '2024-08-28',
      fields: 4,
      years: 5,
      metrics: {
        avgYield: 185,
        soilHealth: 78,
        profitability: 82,
        sustainability: 85
      },
      status: 'active'
    },
    {
      id: 'plan-002',
      name: 'Diversified System',
      description: 'Multi-crop rotation with legumes and cover crops',
      createdDate: '2024-08-20',
      lastModified: '2024-08-30',
      fields: 4,
      years: 5,
      metrics: {
        avgYield: 178,
        soilHealth: 88,
        profitability: 75,
        sustainability: 92
      },
      status: 'draft'
    },
    {
      id: 'plan-003',
      name: 'High-Yield Focus',
      description: 'Optimized for maximum yield potential',
      createdDate: '2024-08-25',
      lastModified: '2024-08-31',
      fields: 4,
      years: 5,
      metrics: {
        avgYield: 205,
        soilHealth: 65,
        profitability: 95,
        sustainability: 68
      },
      status: 'active'
    }
  ];

  const plansList = plans || mockPlans;

  const planOptions = plansList?.map(plan => ({
    value: plan?.id,
    label: plan?.name,
    description: plan?.description
  }));

  const handlePlanSelection = (planId) => {
    setSelectedPlans(prev => {
      if (prev?.includes(planId)) {
        return prev?.filter(id => id !== planId);
      } else if (prev?.length < 3) {
        return [...prev, planId];
      }
      return prev;
    });
  };

  const getSelectedPlansData = () => {
    return plansList?.filter(plan => selectedPlans?.includes(plan?.id));
  };

  const getMetricComparison = (metric) => {
    const selectedPlansData = getSelectedPlansData();
    if (selectedPlansData?.length === 0) return null;

    const values = selectedPlansData?.map(plan => plan?.metrics?.[metric]);
    const max = Math.max(...values);
    const min = Math.min(...values);

    return { max, min, values };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'draft': return 'text-warning';
      case 'archived': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'draft': return 'Edit';
      case 'archived': return 'Archive';
      default: return 'Circle';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="GitCompare" size={20} className="text-primary" />
          <h2 className="font-heading font-semibold text-lg text-foreground">
            Plan Comparison
          </h2>
        </div>
        
        <Button variant="default" onClick={onCreatePlan} iconName="Plus">
          New Plan
        </Button>
      </div>
      {/* Plan Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {plansList?.map((plan) => (
          <div
            key={plan?.id}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedPlans?.includes(plan?.id)
                ? 'border-primary bg-primary/5 shadow-soft'
                : 'border-border bg-card hover:border-primary/50 hover:shadow-soft'
            }`}
            onClick={() => handlePlanSelection(plan?.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-body font-medium text-foreground mb-1">
                  {plan?.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {plan?.description}
                </p>
              </div>
              
              <div className="flex items-center space-x-2 ml-2">
                <Icon 
                  name={getStatusIcon(plan?.status)} 
                  size={14} 
                  className={getStatusColor(plan?.status)}
                />
                {selectedPlans?.includes(plan?.id) && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div>
                <span className="text-muted-foreground">Fields:</span>
                <span className="ml-1 font-data text-foreground">{plan?.fields}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Years:</span>
                <span className="ml-1 font-data text-foreground">{plan?.years}</span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              Modified: {new Date(plan.lastModified)?.toLocaleDateString()}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e?.stopPropagation();
                  onPlanSelect?.(plan?.id);
                }}
                iconName="Eye"
              >
                View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e?.stopPropagation();
                  // Handle edit
                }}
                iconName="Edit"
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Comparison Table */}
      {selectedPlans?.length > 0 && (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-heading font-semibold text-foreground">
              Comparison Results ({selectedPlans?.length} plans selected)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-body font-medium text-foreground">
                    Metric
                  </th>
                  {getSelectedPlansData()?.map((plan) => (
                    <th key={plan?.id} className="text-center p-4 font-body font-medium text-foreground">
                      {plan?.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { key: 'avgYield', label: 'Avg Yield (bu/acre)', format: (val) => val },
                  { key: 'soilHealth', label: 'Soil Health Score', format: (val) => `${val}%` },
                  { key: 'profitability', label: 'Profitability Score', format: (val) => `${val}%` },
                  { key: 'sustainability', label: 'Sustainability Score', format: (val) => `${val}%` }
                ]?.map((metric) => {
                  const comparison = getMetricComparison(metric?.key);
                  
                  return (
                    <tr key={metric?.key}>
                      <td className="p-4 font-body text-foreground">
                        {metric?.label}
                      </td>
                      {getSelectedPlansData()?.map((plan, index) => {
                        const value = plan?.metrics?.[metric?.key];
                        const isMax = comparison && value === comparison?.max;
                        const isMin = comparison && value === comparison?.min && comparison?.max !== comparison?.min;
                        
                        return (
                          <td key={plan?.id} className="p-4 text-center">
                            <span className={`font-data font-medium ${
                              isMax ? 'text-success' : isMin ?'text-error' : 'text-foreground'
                            }`}>
                              {metric?.format(value)}
                            </span>
                            {isMax && (
                              <Icon name="TrendingUp" size={14} className="inline ml-1 text-success" />
                            )}
                            {isMin && (
                              <Icon name="TrendingDown" size={14} className="inline ml-1 text-error" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {selectedPlans?.length === 0 && (
        <div className="text-center py-12 bg-muted/30 rounded-lg border border-border">
          <Icon name="GitCompare" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="font-heading font-medium text-foreground mb-2">
            Select Plans to Compare
          </h3>
          <p className="text-sm text-muted-foreground">
            Choose up to 3 rotation plans to compare their metrics and performance
          </p>
        </div>
      )}
    </div>
  );
};

export default PlanComparison;