import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CropRotationTimeline = () => {
  const [selectedField, setSelectedField] = useState('field-1');

  const rotationData = [
    {
      id: 'field-1',
      name: 'North Field (12 acres)',
      seasons: [
        {
          season: 'Spring 2024',
          crop: 'Corn',
          status: 'completed',
          plantDate: '2024-04-15',
          harvestDate: '2024-09-20',
          yield: '185 bu/acre',
          color: 'bg-success'
        },
        {
          season: 'Fall 2024',
          crop: 'Cover Crop (Rye)',
          status: 'active',
          plantDate: '2024-10-01',
          harvestDate: '2025-04-01',
          yield: 'N/A',
          color: 'bg-accent'
        },
        {
          season: 'Spring 2025',
          crop: 'Soybeans',
          status: 'planned',
          plantDate: '2025-05-01',
          harvestDate: '2025-10-15',
          yield: 'Projected: 55 bu/acre',
          color: 'bg-secondary'
        }
      ]
    },
    {
      id: 'field-2',
      name: 'South Field (8 acres)',
      seasons: [
        {
          season: 'Spring 2024',
          crop: 'Soybeans',
          status: 'completed',
          plantDate: '2024-05-10',
          harvestDate: '2024-10-05',
          yield: '52 bu/acre',
          color: 'bg-success'
        },
        {
          season: 'Fall 2024',
          crop: 'Winter Wheat',
          status: 'active',
          plantDate: '2024-10-20',
          harvestDate: '2025-07-15',
          yield: 'N/A',
          color: 'bg-warning'
        },
        {
          season: 'Fall 2025',
          crop: 'Corn',
          status: 'planned',
          plantDate: '2025-04-20',
          harvestDate: '2025-09-25',
          yield: 'Projected: 180 bu/acre',
          color: 'bg-primary'
        }
      ]
    }
  ];

  const currentField = rotationData?.find(field => field?.id === selectedField);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'active': return 'Clock';
      case 'planned': return 'Calendar';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'active': return 'text-warning';
      case 'planned': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <Icon name="Sprout" size={16} color="white" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-lg text-foreground">
              Crop Rotation Timeline
            </h2>
            <p className="font-body text-sm text-muted-foreground">
              Multi-year rotation planning and tracking
            </p>
          </div>
        </div>
        
        <select
          value={selectedField}
          onChange={(e) => setSelectedField(e?.target?.value)}
          className="font-body text-sm border border-border rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {rotationData?.map(field => (
            <option key={field?.id} value={field?.id}>
              {field?.name}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-4">
        <h3 className="font-heading font-medium text-foreground mb-4">
          {currentField?.name}
        </h3>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
          
          {currentField?.seasons?.map((season, index) => (
            <div key={index} className="relative flex items-start space-x-4 pb-8 last:pb-0">
              {/* Timeline Dot */}
              <div className={`relative z-10 w-12 h-12 ${season?.color} rounded-full flex items-center justify-center border-4 border-background`}>
                <Icon 
                  name={getStatusIcon(season?.status)} 
                  size={16} 
                  color="white" 
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-heading font-semibold text-foreground">
                        {season?.crop}
                      </h4>
                      <span className="font-caption text-xs px-2 py-1 bg-background rounded-full text-muted-foreground">
                        {season?.season}
                      </span>
                    </div>
                    <div className={`flex items-center space-x-1 ${getStatusColor(season?.status)}`}>
                      <Icon name={getStatusIcon(season?.status)} size={14} />
                      <span className="font-data text-xs capitalize">
                        {season?.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-body text-muted-foreground">Plant Date:</span>
                      <p className="font-data text-foreground">
                        {new Date(season.plantDate)?.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="font-body text-muted-foreground">Harvest Date:</span>
                      <p className="font-data text-foreground">
                        {new Date(season.harvestDate)?.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="font-body text-muted-foreground">Yield:</span>
                      <p className="font-data text-foreground">
                        {season?.yield}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CropRotationTimeline;