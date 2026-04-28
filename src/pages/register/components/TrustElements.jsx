import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustElements = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Bank-Level Security',
      description: '256-bit SSL encryption protects your data'
    },
    {
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'Your farm data stays confidential and secure'
    },
    {
      icon: 'Award',
      title: 'USDA Approved',
      description: 'Certified agricultural data standards'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Corn & Soybean Farmer',
      location: 'Iowa',
      quote: `CropRotate Pro increased my yields by 15% in the first year. The soil health insights are invaluable.`,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Agricultural Consultant',
      location: 'California',
      quote: `I use this for all my clients. The rotation recommendations are spot-on and save hours of planning.`,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    },
    {
      name: 'Dr. Emily Chen',
      role: 'Extension Officer',
      location: 'Nebraska',
      quote: `The scientific approach to crop rotation planning is exactly what modern agriculture needs.`,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face'
    }
  ];

  const partnerships = [
    { name: 'USDA', logo: 'Building' },
    { name: 'Land Grant Universities', logo: 'GraduationCap' },
    { name: 'Agricultural Research Centers', logo: 'Microscope' },
    { name: 'Farming Cooperatives', logo: 'Users' }
  ];

  return (
    <div className="space-y-8">
      {/* Security Features */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4 text-center">
          Your Data is Protected
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name={feature?.icon} size={20} className="text-success" />
              </div>
              <h4 className="font-body font-semibold text-sm text-foreground mb-1">
                {feature?.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {feature?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4 text-center">
          Trusted by Agricultural Professionals
        </h3>
        <div className="space-y-4">
          {testimonials?.map((testimonial, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground font-body italic mb-2">
                    "{testimonial?.quote}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-body font-semibold text-foreground">
                        {testimonial?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial?.role} • {testimonial?.location}
                      </p>
                    </div>
                    <div className="flex text-warning">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon key={i} name="Star" size={12} className="fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Partnerships */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4 text-center">
          Research Partners
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {partnerships?.map((partner, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name={partner?.logo} size={20} className="text-primary" />
              </div>
              <p className="text-xs text-muted-foreground font-caption">
                {partner?.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Statistics */}
      <div className="bg-gradient-to-r from-primary/5 to-success/5 rounded-lg p-6 border border-primary/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-heading font-bold text-primary">15,000+</p>
            <p className="text-xs text-muted-foreground font-caption">Active Farmers</p>
          </div>
          <div>
            <p className="text-2xl font-heading font-bold text-success">2.3M</p>
            <p className="text-xs text-muted-foreground font-caption">Acres Managed</p>
          </div>
          <div>
            <p className="text-2xl font-heading font-bold text-accent">18%</p>
            <p className="text-xs text-muted-foreground font-caption">Avg. Yield Increase</p>
          </div>
          <div>
            <p className="text-2xl font-heading font-bold text-primary">99.9%</p>
            <p className="text-xs text-muted-foreground font-caption">Uptime</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustElements;