import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportHistory = ({ reports, onDownload, onDelete, onView }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const sortedReports = [...reports]?.sort((a, b) => {
    const aValue = sortBy === 'date' ? new Date(a.createdAt) : a?.[sortBy];
    const bValue = sortBy === 'date' ? new Date(b.createdAt) : b?.[sortBy];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const getReportIcon = (type) => {
    switch (type) {
      case 'yield': return 'TrendingUp';
      case 'soil': return 'TestTube';
      case 'rotation': return 'Sprout';
      case 'financial': return 'DollarSign';
      default: return 'FileText';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'processing': return 'text-warning';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="History" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Report History
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            iconName={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
            iconPosition="left"
          >
            {sortOrder === 'asc' ? 'Oldest' : 'Newest'}
          </Button>
        </div>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedReports?.length > 0 ? (
          sortedReports?.map((report) => (
            <div key={report?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={getReportIcon(report?.type)} size={18} className="text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-sm text-foreground">{report?.name}</h4>
                    <span className={`text-xs font-data ${getStatusColor(report?.status)}`}>
                      {report?.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                    <span>{report?.type?.charAt(0)?.toUpperCase() + report?.type?.slice(1)} Report</span>
                    <span>•</span>
                    <span>{new Date(report.createdAt)?.toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{report?.size}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onView(report?.id)}
                  title="View report"
                >
                  <Icon name="Eye" size={16} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDownload(report?.id)}
                  title="Download report"
                  disabled={report?.status !== 'completed'}
                >
                  <Icon name="Download" size={16} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(report?.id)}
                  title="Delete report"
                  className="text-error hover:text-error hover:bg-error/10"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground font-body">No reports generated yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Generate your first report to see it here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportHistory;