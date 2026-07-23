import React from 'react';
import { Helmet } from 'react-helmet';
import { Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import BackgroundImagery from './components/BackgroundImagery';
import AppHeader from './components/AppHeader';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-6 h-6 bg-primary-foreground rounded-full" />
          </div>
          <p className="text-muted-foreground font-body">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Sign In - CropRotate Pro | Agricultural Management Platform</title>
        <meta 
          name="description" 
          content="Sign in to CropRotate Pro to access your agricultural management dashboard. Optimize crop yields and soil health with data-driven rotation recommendations." 
        />
        <meta name="keywords" content="agriculture, crop rotation, farming, soil health, login" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="/login" />
      </Helmet>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <BackgroundImagery />

        <div className="relative z-10 min-h-screen flex flex-col">
          <AppHeader />

          <main className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <LoginForm />
                </div>

                <div className="order-1 lg:order-2">
                  <div className="lg:pl-8">
                    <TrustSignals />
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer className="relative z-10 bg-card/95 backdrop-blur-sm border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground font-body">
                  <span>&copy; {new Date()?.getFullYear()} CropRotate Pro</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">Agricultural Intelligence Platform</span>
                </div>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground font-body">
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>

        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-center">
            <p className="text-xs text-primary font-body">
              Optimized for field use on mobile devices
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;