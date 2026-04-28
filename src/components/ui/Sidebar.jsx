import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle, onNavigate }) => {
  const [collapsed, setCollapsed] = useState(isCollapsed);
  const location = useLocation();

  useEffect(() => {
    setCollapsed(isCollapsed);
  }, [isCollapsed]);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      description: 'Farm overview and KPIs'
    },
    {
      label: 'Crop Rotation Planner',
      path: '/crop-rotation-planner',
      icon: 'Sprout',
      description: 'Plan multi-year rotations'
    },
    {
      label: 'Soil Health Monitoring',
      path: '/soil-health-monitoring',
      icon: 'TestTube',
      description: 'Track field conditions'
    },
    {
      label: 'Reports & Analytics',
      path: '/reports-and-analytics',
      icon: 'BarChart3',
      description: 'Performance insights'
    },
    {
      label: 'About',
      path: '/about',
      icon: 'Info',
      description: 'App information'
    }
  ];

  const handleToggle = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onToggle?.(newCollapsed);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-[900] lg:flex-col bg-card border-r border-border transition-all duration-300 ease-in-out ${
        collapsed ? 'lg:w-16' : 'lg:w-60'
      }`}>
        {/* Header Spacer */}
        <div className="h-16 border-b border-border flex items-center justify-between px-4">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Icon name="Sprout" size={14} color="white" />
              </div>
              <span className="font-heading font-semibold text-sm text-foreground">
                Navigation
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            className="w-8 h-8"
          >
            <Icon name={collapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => onNavigate?.(item?.path)}
                className={`group flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-body transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item?.label : ''}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={`flex-shrink-0 ${isActive ? 'text-primary-foreground' : ''}`}
                />
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{item?.label}</div>
                    <div className="text-xs opacity-75 truncate mt-0.5">
                      {item?.description}
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className={`flex items-center space-x-3 px-3 py-2 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <Icon name="Leaf" size={16} color="white" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-data text-success font-medium">
                  System Status
                </div>
                <div className="text-xs text-muted-foreground">
                  All systems operational
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[900] bg-card border-t border-border">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => onNavigate?.(item?.path)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'text-primary' :'text-muted-foreground'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={isActive ? 'text-primary' : 'text-muted-foreground'}
                />
                <span className="text-xs font-caption font-medium truncate max-w-[60px]">
                  {item?.label?.split(' ')?.[0]}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
      {/* Content Spacer for Mobile */}
      <div className="lg:hidden h-20" />
    </>
  );
};

export default Sidebar;