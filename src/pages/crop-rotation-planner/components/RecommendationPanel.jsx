import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationPanel = ({ 
  rotationPlan, 
  selectedField, 
  selectedYear, 
  onApplyRecommendation 
}) => {
  const [activeTab, setActiveTab] = useState('recommendations');

  // Mock recommendation data
  const generateRecommendations = () => {
    const recommendations = [
      {
        id: 'rec-001',
        type: 'optimal',
        crop: {
          id: 'soybean-001',
          name: 'Soybeans',
          icon: 'Leaf',
          color: '#10B981'
        },
        confidence: 92,
        reasons: [
          'Excellent nitrogen fixation after corn',
          'Breaks pest cycles effectively',
          'High market demand projected'
        ],
        benefits: {
          soilHealth: 85,
          yieldPotential: 78,
          economicReturn: 88
        }
      },
      {
        id: 'rec-002',
        type: 'alternative',
        crop: {
          id: 'wheat-001',
          name: 'Winter Wheat',
          icon: 'Wheat',
          color: '#D97706'
        },
        confidence: 78,
        reasons: [
          'Good cover crop benefits',
          'Early harvest allows double cropping',
          'Stable market prices'
        ],
        benefits: {
          soilHealth: 72,
          yieldPotential: 65,
          economicReturn: 75
        }
      },
      {
        id: 'rec-003',
        type: 'caution',
        crop: {
          id: 'corn-001',
          name: 'Field Corn',
          icon: 'Wheat',
          color: '#F59E0B'
        },
        confidence: 45,
        reasons: [
          'Continuous corn reduces yields',
          'Increased pest pressure risk',
          'Higher input costs required'
        ],
        benefits: {
          soilHealth: 35,
          yieldPotential: 55,
          economicReturn: 48
        }
      }
    ];

    return recommendations;
  };

  const recommendations = useMemo(() => generateRecommendations(), [rotationPlan, selectedField, selectedYear]);

  const soilHealthAnalysis = {
    currentScore: 78,
    projectedScore: 85,
    factors: [
      { name: 'Organic Matter', current: 3.2, projected: 3.8, unit: '%' },
      { name: 'pH Level', current: 6.5, projected: 6.7, unit: '' },
      { name: 'Nitrogen', current: 45, projected: 65, unit: 'ppm' },
      { name: 'Phosphorus', current: 32, projected: 35, unit: 'ppm' }
    ]
  };

  const yieldProjections = {
    fiveYearAverage: 185,
    projectedYield: 198,
    confidenceInterval: '±12 bu/acre',
    factors: [
      { name: 'Rotation Benefit', impact: '+8%' },
      { name: 'Soil Health', impact: '+5%' },
      { name: 'Weather Risk', impact: '-3%' }
    ]
  };

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'optimal': return 'CheckCircle';
      case 'alternative': return 'Info';
      case 'caution': return 'AlertTriangle';
      default: return 'Circle';
    }
  };

  const getRecommendationColor = (type) => {
    switch (type) {
      case 'optimal': return 'text-success';
      case 'alternative': return 'text-primary';
      case 'caution': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const tabs = [
    { id: 'recommendations', label: 'Recommendations', icon: 'Lightbulb' },
    { id: 'soil-health', label: 'Soil Health', icon: 'TestTube' },
    { id: 'yield-projection', label: 'Yield Forecast', icon: 'TrendingUp' }
  ];

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Brain" size={20} className="text-primary" />
          <h2 className="font-heading font-semibold text-lg text-foreground">
            AI Insights
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-1 px-2 py-1.5 rounded-md text-xs font-body transition-all duration-200 ${
                activeTab === tab?.id
                  ? 'bg-card text-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={14} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-body mb-4">
              {selectedField && selectedYear ? (
                `Recommendations for ${selectedField} in ${selectedYear}`
              ) : (
                'Select a field and year to see recommendations'
              )}
            </div>

            {recommendations?.map((rec) => (
              <div
                key={rec?.id}
                className="p-4 rounded-lg border border-border bg-card hover:shadow-soft transition-shadow"
              >
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={getRecommendationIcon(rec?.type)} 
                    size={20} 
                    className={getRecommendationColor(rec?.type)}
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div 
                        className="w-6 h-6 rounded flex items-center justify-center"
                        style={{ backgroundColor: rec?.crop?.color + '20' }}
                      >
                        <Icon 
                          name={rec?.crop?.icon} 
                          size={14} 
                          style={{ color: rec?.crop?.color }}
                        />
                      </div>
                      <h3 className="font-body font-medium text-foreground">
                        {rec?.crop?.name}
                      </h3>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-data">
                        {rec?.confidence}% match
                      </span>
                    </div>

                    <ul className="space-y-1 mb-3">
                      {rec?.reasons?.map((reason, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-start space-x-1">
                          <Icon name="ArrowRight" size={12} className="mt-0.5 flex-shrink-0" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Benefits */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Soil Health</div>
                        <div className="font-data font-medium text-sm text-foreground">
                          {rec?.benefits?.soilHealth}%
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Yield</div>
                        <div className="font-data font-medium text-sm text-foreground">
                          {rec?.benefits?.yieldPotential}%
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Economic</div>
                        <div className="font-data font-medium text-sm text-foreground">
                          {rec?.benefits?.economicReturn}%
                        </div>
                      </div>
                    </div>

                    <Button
                      variant={rec?.type === 'optimal' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onApplyRecommendation?.(rec)}
                      className="w-full"
                    >
                      Apply Recommendation
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'soil-health' && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-body font-medium text-foreground">Overall Soil Health</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-data text-muted-foreground">
                    {soilHealthAnalysis?.currentScore}
                  </span>
                  <Icon name="ArrowRight" size={14} className="text-muted-foreground" />
                  <span className="text-sm font-data text-success font-medium">
                    {soilHealthAnalysis?.projectedScore}
                  </span>
                </div>
              </div>
              
              <div className="w-full bg-border rounded-full h-2">
                <div 
                  className="bg-success h-2 rounded-full transition-all duration-500"
                  style={{ width: `${soilHealthAnalysis?.projectedScore}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3">
              {soilHealthAnalysis?.factors?.map((factor, index) => (
                <div key={index} className="p-3 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-body text-foreground">{factor?.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-data text-muted-foreground">
                        {factor?.current}{factor?.unit}
                      </span>
                      <Icon name="ArrowRight" size={12} className="text-muted-foreground" />
                      <span className="text-sm font-data text-success">
                        {factor?.projected}{factor?.unit}
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-border rounded-full h-1.5">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${(factor?.projected / (factor?.projected * 1.2)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'yield-projection' && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="text-center mb-4">
                <h3 className="font-heading font-semibold text-2xl text-foreground">
                  {yieldProjections?.projectedYield}
                </h3>
                <p className="text-sm text-muted-foreground">
                  bu/acre projected yield
                </p>
                <p className="text-xs text-muted-foreground font-data">
                  {yieldProjections?.confidenceInterval}
                </p>
              </div>

              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="text-center">
                  <div className="text-muted-foreground">5-Year Avg</div>
                  <div className="font-data font-medium">{yieldProjections?.fiveYearAverage}</div>
                </div>
                <Icon name="TrendingUp" size={16} className="text-success" />
                <div className="text-center">
                  <div className="text-muted-foreground">Improvement</div>
                  <div className="font-data font-medium text-success">
                    +{yieldProjections?.projectedYield - yieldProjections?.fiveYearAverage}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-body font-medium text-foreground">Impact Factors</h4>
              {yieldProjections?.factors?.map((factor, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <span className="text-sm font-body text-foreground">{factor?.name}</span>
                  <span className={`text-sm font-data font-medium ${
                    factor?.impact?.startsWith('+') ? 'text-success' : 'text-warning'
                  }`}>
                    {factor?.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationPanel;