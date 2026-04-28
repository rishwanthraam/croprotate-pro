import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ currentUser, notifications = [], onNavigate }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Crop Planner', path: '/crop-rotation-planner', icon: 'Sprout' },
    { label: 'Soil Health', path: '/soil-health-monitoring', icon: 'TestTube' },
    { label: 'Analytics', path: '/reports-and-analytics', icon: 'BarChart3' },
  ];

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationsOpen(false);
  };

  const handleNotificationsToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsProfileOpen(false);
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Sprout" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-semibold text-lg text-foreground">
                CropRotate Pro
              </span>
              <span className="font-caption text-xs text-muted-foreground -mt-1">
                Agricultural Intelligence
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items - Desktop */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => onNavigate?.(item?.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationsToggle}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-data">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevated z-50">
                <div className="p-4 border-b border-border">
                  <h3 className="font-heading font-semibold text-sm">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications?.length > 0 ? (
                    notifications?.slice(0, 5)?.map((notification, index) => (
                      <div
                        key={index}
                        className={`p-4 border-b border-border last:border-b-0 ${
                          !notification?.read ? 'bg-muted/50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification?.type === 'warning' ? 'bg-warning' :
                            notification?.type === 'error' ? 'bg-error' : 'bg-success'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-body text-foreground">
                              {notification?.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 font-data">
                              {notification?.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      <Icon name="Bell" size={24} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm font-body">No notifications</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={handleProfileToggle}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-body font-medium text-foreground">
                  {currentUser?.name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground font-caption">
                  {currentUser?.role || 'Farmer'}
                </p>
              </div>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated z-50">
                <div className="p-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-body text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-body text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </Link>
                  <Link
                    to="/help"
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-body text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    <Icon name="HelpCircle" size={16} />
                    <span>Help</span>
                  </Link>
                  <hr className="my-2 border-border" />
                  <button
                    onClick={() => {
                      // Handle logout
                      setIsProfileOpen(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-body text-error hover:bg-muted rounded-md transition-colors w-full text-left"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => {
              // Handle mobile menu toggle
            }}
          >
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </div>
      {/* Click outside handler */}
      {(isProfileOpen || isNotificationsOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileOpen(false);
            setIsNotificationsOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;