import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AppHeader = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <header className="relative z-10 w-full bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link to="/login" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Sprout" size={24} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl text-foreground">
                CropRotate Pro
              </span>
              <span className="font-caption text-xs text-muted-foreground -mt-1">
                Agricultural Intelligence Platform
              </span>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/login"
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              to="/login"
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/login"
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
            >
              Resources
            </Link>
            <Link
              to="/login"
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
            >
              Support
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={() => window.location.href = '/login'}
              className="hidden sm:flex"
            >
              Sign In
            </Button>
            <Button
              variant="default"
              onClick={() => window.location.href = '/register'}
              iconName="UserPlus"
              iconPosition="left"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Tagline Banner */}
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3 text-center">
            <p className="text-sm font-body text-primary">
              <Icon name="TrendingUp" size={16} className="inline mr-2" />
              Optimize crop yields and soil health with data-driven rotation recommendations
              <span className="hidden sm:inline"> • Trusted by 15,000+ farmers since {currentYear - 3}</span>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;