import React from 'react';
import Card from '../components/ui/Card';
import Tabs from '../components/ui/Tabs';

// PUBLIC_INTERFACE
export default function Onboarding() {
  const tabs = [
    { label: 'Profile', content: <p>Complete your profile information.</p> },
    { label: 'Goals', content: <p>Set your nutrition and fitness goals.</p> },
    { label: 'Preferences', content: <p>Tell us your dietary preferences.</p> }
  ];
  return (
    <div>
      <Card title="Onboarding">
        <Tabs tabs={tabs} />
      </Card>
    </div>
  );
}
