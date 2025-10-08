import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

// PUBLIC_INTERFACE
export default function Billing() {
  return (
    <div>
      <Card title="Subscription">
        <p>Your plan: Pro (monthly)</p>
        <Button>Manage Billing</Button>
      </Card>
    </div>
  );
}
