import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    fullName: 'Ava Thompson',
    email: 'ava@croprotatepro.com',
    role: 'Farm Manager',
    farmName: 'Golden Harvest Farm',
    farmLocation: 'Willow Creek, Oregon',
    bio: 'Experienced farmer focused on regenerative practices, soil health, and efficient crop rotation strategies.',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (field) => (event) => {
    setProfile((current) => ({
      ...current,
      [field]: event.target.value,
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <Helmet>
        <title>Settings - CropRotate Pro | Account Preferences</title>
        <meta
          name="description"
          content="Manage your account settings, personal bio, and farm profile in CropRotate Pro."
        />
      </Helmet>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold">
            Account Settings
          </p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Update your bio and profile details
          </h1>
          <p className="max-w-3xl mx-auto text-sm text-muted-foreground">
            Keep your profile up to date so CropRotate Pro can personalize farm recommendations
            and make it easier to manage your account.
          </p>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-soft">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-2">Bio Details</h2>
              <p className="text-sm text-muted-foreground">
                Edit your personal and farm information below.
              </p>
            </div>

            <div className="space-y-6">
              <Input
                label="Full Name"
                placeholder="Enter your name"
                value={profile.fullName}
                onChange={handleChange('fullName')}
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={profile.email}
                onChange={handleChange('email')}
              />
              <Input
                label="Role"
                placeholder="e.g. Farmer, Agronomist"
                value={profile.role}
                onChange={handleChange('role')}
              />
              <Input
                label="Farm Name"
                placeholder="Enter your farm name"
                value={profile.farmName}
                onChange={handleChange('farmName')}
              />
              <Input
                label="Farm Location"
                placeholder="Enter your city or region"
                value={profile.farmLocation}
                onChange={handleChange('farmLocation')}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Short Bio</label>
                <textarea
                  rows="5"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={profile.bio}
                  onChange={handleChange('bio')}
                />
                <p className="text-sm text-muted-foreground">
                  Share a little information about yourself and your farm.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 items-end">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button variant="outline" size="lg" iconName="ArrowLeft" onClick={() => navigate('/') }>
                  Back to Home
                </Button>
                <Button variant="default" size="lg" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
              {saved && (
                <p className="text-sm text-success">Your changes have been saved successfully.</p>
              )}
            </div>
          </div>

          <aside className="bg-card border border-border rounded-3xl p-8 shadow-soft">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Profile Summary</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Your settings are used to personalize dashboard recommendations, crop rotation guidance,
                  and farm insights.
                </p>
              </div>

              <div className="rounded-3xl bg-secondary/5 p-6">
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium text-foreground">{profile.fullName}</p>
              </div>

              <div className="rounded-3xl bg-secondary/5 p-6">
                <p className="text-sm text-muted-foreground">Farm</p>
                <p className="font-medium text-foreground">{profile.farmName}</p>
              </div>

              <div className="rounded-3xl bg-secondary/5 p-6">
                <p className="text-sm text-muted-foreground">Focus</p>
                <p className="font-medium text-foreground">Soil health, crop diversity, and sustainable yield growth</p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
