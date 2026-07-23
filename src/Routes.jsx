import React from "react";
import { HashRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
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
    <HashRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

        {/* Protected routes - require real login */}
        <Route path="/" element={<ProtectedRoute><CropRotationPlanner /></ProtectedRoute>} />
        <Route path="/reports-and-analytics" element={<ProtectedRoute><ReportsAndAnalytics /></ProtectedRoute>} />
        <Route path="/soil-health-monitoring" element={<ProtectedRoute><SoilHealthMonitoring /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/help" element={<ProtectedRoute><HelpPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/crop-rotation-planner" element={<ProtectedRoute><CropRotationPlanner /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default Routes;