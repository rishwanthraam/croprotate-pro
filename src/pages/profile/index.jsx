import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <Helmet>
        <title>Profile - CropRotate Pro | Your Account</title>
        <meta
          name="description"
          content="View your profile details and access account settings in CropRotate Pro."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto space-y-8">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold">
                Your Profile
              </p>
              <h1 className="mt-4 text-3xl md:text-4xl font-heading font-bold text-foreground">
                Manage your account information
              </h1>
              <p className="mt-3 text-sm text-muted-foreground max-w-3xl">
                View your profile summary and access settings to update your details.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Button variant="default" size="lg" onClick={() => navigate('/') }>
                Back to Home
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/settings')}>
                Edit Settings
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Profile Summary</h2>
              <p className="text-sm text-muted-foreground">Ava Thompson</p>
              <p className="text-sm text-muted-foreground">Farm Manager</p>
              <p className="text-sm text-muted-foreground">Golden Harvest Farm</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Contact</h2>
              <p className="text-sm text-muted-foreground">ava@croprotatepro.com</p>
              <p className="text-sm text-muted-foreground">Willow Creek, Oregon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
