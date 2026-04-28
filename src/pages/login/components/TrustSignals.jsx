import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const certifications = [
    {
      id: 1,
      name: 'USDA Certified',
      icon: 'Shield',
      description: 'Agricultural compliance verified'
    },
    {
      id: 2,
      name: 'University Partnership',
      icon: 'GraduationCap',
      description: 'Research-backed recommendations'
    },
    {
      id: 3,
      name: 'Organic Certified',
      icon: 'Leaf',
      description: 'Sustainable farming practices'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      role: 'Organic Farmer',
      location: 'Nebraska',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
      quote: "CropRotate Pro increased our yield by 23% while improving soil health. The rotation recommendations are spot-on."
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      role: 'Farm Manager',
      location: 'Iowa',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      quote: "The predictive analytics helped us avoid costly mistakes. Our soil tests show remarkable improvement."
    }
  ];

  const stats = [
    {
      value: '15,000+',
      label: 'Active Farmers',
      icon: 'Users'
    },
    {
      value: '2.3M',
      label: 'Acres Managed',
      icon: 'MapPin'
    },
    {
      value: '98%',
      label: 'Success Rate',
      icon: 'TrendingUp'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Certifications */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-center">
          Trusted by Agricultural Professionals
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {certifications?.map((cert) => (
            <div key={cert?.id} className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon name={cert?.icon} size={20} className="text-success" />
              </div>
              <h4 className="text-sm font-body font-medium text-foreground">
                {cert?.name}
              </h4>
              <p className="text-xs text-muted-foreground font-body mt-1">
                {cert?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Statistics */}
      <div className="bg-primary/5 border border-primary/10 rounded-xl p-6">
        <div className="grid grid-cols-3 gap-4">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Icon name={stat?.icon} size={16} className="text-primary" />
              </div>
              <div className="text-xl font-heading font-bold text-primary">
                {stat?.value}
              </div>
              <div className="text-xs text-muted-foreground font-body">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-foreground text-center">
          What Farmers Say
        </h3>
        {testimonials?.map((testimonial) => (
          <div key={testimonial?.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground font-body italic mb-2">
                  "{testimonial?.quote}"
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-body font-medium text-foreground">
                    {testimonial?.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {testimonial?.role}, {testimonial?.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Security Notice */}
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Lock" size={16} className="text-success" />
          <span className="text-sm font-body font-medium text-foreground">
            Secure & Private
          </span>
        </div>
        <p className="text-xs text-muted-foreground font-body">
          Your farm data is encrypted and protected. We never share your information with third parties.
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;