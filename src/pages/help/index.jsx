import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const HelpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <Helmet>
        <title>Help - CropRotate Pro | Support Center</title>
        <meta
          name="description"
          content="Get support and help information for CropRotate Pro."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto space-y-8">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold">
                Help Center
              </p>
              <h1 className="mt-4 text-3xl md:text-4xl font-heading font-bold text-foreground">
                Need help? We&apos;re here for you.
              </h1>
              <p className="mt-3 text-sm text-muted-foreground max-w-3xl">
                Browse support resources, contact our team, or return to the home page to continue using CropRotate Pro.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Button
                variant="default"
                size="lg"
                iconName="ArrowLeft"
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Mail"
                onClick={() => window.location.assign('mailto:support@croprotatepro.com')}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-xl font-semibold text-foreground mb-3">Frequently Asked Questions</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">How do I update my profile?</p>
                <p>Use the Settings page to update your bio, contact details, and farm profile.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Why am I seeing a 404?</p>
                <p>Most 404 issues are caused by missing routes. This page ensures the app routes are available for help links.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-xl font-semibold text-foreground mb-3">Helpful Links</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <Button variant="secondary" size="lg" onClick={() => navigate('/settings')}>
                Go to Settings
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/profile')}>
                Go to Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
