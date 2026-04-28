import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const AboutPage = () => {
  const features = [
    {
      icon: 'Sprout',
      title: 'Smart Crop Rotation',
      description: 'AI-powered rotation planning that optimizes soil health and maximizes yield potential across multiple seasons.'
    },
    {
      icon: 'TestTube',
      title: 'Soil Health Monitoring',
      description: 'Real-time soil analysis with actionable insights to improve fertility and reduce input costs.'
    },
    {
      icon: 'BarChart3',
      title: 'Performance Analytics',
      description: 'Comprehensive dashboards tracking farm performance, costs, and profitability metrics.'
    },
    {
      icon: 'Sun',
      title: 'Weather Integration',
      description: 'Hyperlocal weather forecasts and climate insights to make data-driven decisions.'
    }
  ];

  const team = [
    {
      name: 'Sarah Mitchell',
      role: 'Product Lead',
      icon: 'User'
    },
    {
      name: 'James Chen',
      role: 'Engineering',
      icon: 'User'
    },
    {
      name: 'Maria Santos',
      role: 'Agriculture Expert',
      icon: 'User'
    }
  ];

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>About - CropRotate Pro | Agricultural Management Platform</title>
        <meta
          name="description"
          content="Learn about CropRotate Pro - your intelligent partner in sustainable agriculture and crop management."
        />
        <meta name="keywords" content="agriculture, crop rotation, farming, about, agricultural technology" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/5 to-background py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-primary))] blur-3xl" />
          </div>

          <motion.div
            className="max-w-4xl mx-auto text-center relative z-10"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-2xl shadow-elevated">
                <Icon name="Sprout" size={40} color="white" />
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6"
            >
              CropRotate Pro
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground font-body max-w-2xl mx-auto"
            >
              Empowering farmers with intelligent crop rotation planning, soil health monitoring,
              and data-driven insights for sustainable agriculture.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-col items-center justify-center gap-4">
              <span className="inline-flex items-center px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium">
                <Icon name="Check" size={16} className="mr-2" />
                Version 1.0.0
              </span>
              <Button variant="outline" size="lg" iconName="ArrowLeft" onClick={() => navigate('/') }>
                Back to Home
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Our Mission</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-xl p-8 shadow-soft"
            >
              <p className="text-lg text-foreground font-body leading-relaxed">
                We believe that sustainable farming starts with smart planning. CropRotate Pro was built
                to help farmers of all sizes make informed decisions about their land, reduce environmental
                impact, and improve profitability through data-driven crop rotation strategies.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 bg-muted/30">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Features</h2>
              <p className="text-muted-foreground font-body">Everything you need to manage your farm effectively</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-elevated transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={feature.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Our Team</h2>
              <p className="text-muted-foreground font-body">Passionate about agriculture and technology</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-soft transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={member.icon} size={32} className="text-secondary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 bg-muted/30">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Get in Touch</h2>
              <p className="text-muted-foreground font-body mb-8">
                Have questions or feedback? We'd love to hear from you.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="default"
                  iconName="Mail"
                  size="lg"
                  onClick={() => window.location.assign('mailto:support@croprotatepro.com')}
                >
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  iconName="MessageCircle"
                  size="lg"
                  onClick={() => navigate('/help')}
                >
                  Join Community
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Icon name="Sprout" size={14} color="white" />
              </div>
              <span className="font-heading font-semibold text-sm text-foreground">
                CropRotate Pro
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-body">
              Built with care for farmers everywhere
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutPage;