import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

// PUBLIC_INTERFACE
export default function Plans() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Card title="Plans" footer={<Button onClick={() => setOpen(true)}>Create Plan</Button>}>
        <p>View and manage nutrition plans.</p>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)} title="New Plan" actions={<Button onClick={() => setOpen(false)}>Save</Button>}>
        <p>Plan builder coming soon.</p>
      </Modal>
    </div>
  );
}
