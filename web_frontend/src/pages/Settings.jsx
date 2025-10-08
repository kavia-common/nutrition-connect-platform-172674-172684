import React from 'react';
import Card from '../components/ui/Card';

// PUBLIC_INTERFACE
export default function Settings() {
  return (
    <div>
      <Card title="Settings">
        <div className="field">
          <label>Unit System</label>
          <select defaultValue="metric">
            <option value="metric">Metric</option>
            <option value="imperial">Imperial</option>
          </select>
        </div>
      </Card>
    </div>
  );
}
