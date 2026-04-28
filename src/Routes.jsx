import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ReportsAndAnalytics from './pages/reports-and-analytics';
import SoilHealthMonitoring from './pages/soil-health-monitoring';
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import CropRotationPlanner from './pages/crop-rotation-planner';
import SettingsPage from './pages/settings';
import HelpPage from './pages/help';
import ProfilePage from './pages/profile';
import Register from './pages/register';
import About from './pages/about';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CropRotationPlanner />} />
        <Route path="/reports-and-analytics" element={<ReportsAndAnalytics />} />
        <Route path="/soil-health-monitoring" element={<SoilHealthMonitoring />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/crop-rotation-planner" element={<CropRotationPlanner />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
