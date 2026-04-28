import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ items = [], separator = 'ChevronRight' }) => {
  const location = useLocation();

  // Auto-generate breadcrumbs if no items provided
  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Dashboard', path: '/dashboard', icon: 'Home' }];

    const routeMap = {
      'crop-rotation-planner': { label: 'Crop Rotation Planner', icon: 'Sprout' },
      'soil-health-monitoring': { label: 'Soil Health Monitoring', icon: 'TestTube' },
      'reports-and-analytics': { label: 'Reports & Analytics', icon: 'BarChart3' },
      'profile': { label: 'Profile', icon: 'User' },
      'settings': { label: 'Settings', icon: 'Settings' },
      'help': { label: 'Help', icon: 'HelpCircle' }
    };

    pathSegments?.forEach((segment, index) => {
      const route = routeMap?.[segment];
      if (route) {
        const path = '/' + pathSegments?.slice(0, index + 1)?.join('/');
        breadcrumbs?.push({
          label: route?.label,
          path: path,
          icon: route?.icon
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items?.length > 0 ? items : generateBreadcrumbs();

  if (breadcrumbItems?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-body mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems?.map((item, index) => {
          const isLast = index === breadcrumbItems?.length - 1;
          const isFirst = index === 0;

          return (
            <li key={item?.path || index} className="flex items-center space-x-2">
              {!isFirst && (
                <Icon 
                  name={separator} 
                  size={14} 
                  className="text-muted-foreground flex-shrink-0" 
                />
              )}
              <div className="flex items-center space-x-1.5">
                {item?.icon && (
                  <Icon 
                    name={item?.icon} 
                    size={14} 
                    className={isLast ? 'text-foreground' : 'text-muted-foreground'}
                  />
                )}
                
                {isLast ? (
                  <span 
                    className="text-foreground font-medium truncate max-w-[200px]"
                    aria-current="page"
                  >
                    {item?.label}
                  </span>
                ) : (
                  <Link
                    to={item?.path}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 truncate max-w-[150px]"
                  >
                    {item?.label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;