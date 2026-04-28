import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FieldNotesSummary = () => {
  const [showAll, setShowAll] = useState(false);

  const fieldNotes = [
    {
      id: 1,
      date: '2024-08-30',
      field: 'North Field',
      type: 'observation',
      title: 'Corn tasseling observed',
      content: `Corn plants showing good tasseling development. Estimated 85% of plants have emerged tassels.\nSoil moisture appears adequate. No signs of pest damage observed.`,
      author: 'John Smith',
      priority: 'normal',
      tags: ['corn', 'growth-stage', 'tasseling']
    },
    {
      id: 2,
      date: '2024-08-29',
      field: 'South Field',
      type: 'maintenance',
      title: 'Irrigation system check',
      content: `Completed routine inspection of drip irrigation lines.\nReplaced 3 damaged emitters in section B. Water pressure normal at 25 PSI.`,
      author: 'John Smith',
      priority: 'high',
      tags: ['irrigation', 'maintenance', 'equipment']
    },
    {
      id: 3,
      date: '2024-08-28',
      field: 'East Field',
      type: 'pest',
      title: 'Minor aphid presence detected',
      content: `Small aphid colonies found on 5% of soybean plants in northeast corner.\nBeneficial insects (ladybugs) also present. Monitoring situation before treatment decision.`,
      author: 'John Smith',
      priority: 'medium',
      tags: ['soybeans', 'aphids', 'pest-management']
    },
    {
      id: 4,
      date: '2024-08-27',
      field: 'West Field',
      type: 'soil',
      title: 'Soil compaction in gateway',
      content: `Heavy machinery traffic has caused compaction near field entrance.\nRecommend deep tillage before next planting season. Consider alternative access route.`,
      author: 'John Smith',
      priority: 'medium',
      tags: ['soil-health', 'compaction', 'field-access']
    },
    {
      id: 5,
      date: '2024-08-26',
      field: 'North Field',
      type: 'weather',
      title: 'Storm damage assessment',
      content: `Inspected field after yesterday's thunderstorm.\nMinor lodging in 2% of corn plants. No significant yield impact expected.`,
      author: 'John Smith',priority: 'low',
      tags: ['weather', 'storm-damage', 'corn']
    }
  ];

  const displayedNotes = showAll ? fieldNotes : fieldNotes?.slice(0, 3);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'observation': return 'Eye';
      case 'maintenance': return 'Wrench';
      case 'pest': return 'Bug';
      case 'soil': return 'Layers';
      case 'weather': return 'Cloud';
      default: return 'FileText';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'observation': return 'text-primary';
      case 'maintenance': return 'text-warning';
      case 'pest': return 'text-error';
      case 'soil': return 'text-secondary';
      case 'weather': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-secondary rounded-md flex items-center justify-center">
            <Icon name="FileText" size={16} color="white" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-lg text-foreground">
              Recent Field Notes
            </h2>
            <p className="font-body text-sm text-muted-foreground">
              Latest observations and activities
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
        >
          Add Note
        </Button>
      </div>
      <div className="space-y-4">
        {displayedNotes?.map((note) => (
          <div key={note?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getTypeIcon(note?.type)} 
                  size={16} 
                  className={getTypeColor(note?.type)}
                />
                <div>
                  <h3 className="font-heading font-medium text-foreground">
                    {note?.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="font-body text-xs text-muted-foreground">
                      {note?.field}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="font-data text-xs text-muted-foreground">
                      {new Date(note.date)?.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getPriorityColor(note?.priority)}`} />
                <span className="font-caption text-xs text-muted-foreground capitalize">
                  {note?.priority}
                </span>
              </div>
            </div>
            
            <p className="font-body text-sm text-foreground mb-3 leading-relaxed">
              {note?.content?.split('\n')?.map((line, index) => (
                <span key={index}>
                  {line}
                  {index < note?.content?.split('\n')?.length - 1 && <br />}
                </span>
              ))}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {note?.tags?.map((tag, index) => (
                  <span 
                    key={index}
                    className="font-caption text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <span className="font-body text-xs text-muted-foreground">
                by {note?.author}
              </span>
            </div>
          </div>
        ))}
      </div>
      {fieldNotes?.length > 3 && (
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            iconName={showAll ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAll ? 'Show Less' : `Show All ${fieldNotes?.length} Notes`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FieldNotesSummary;