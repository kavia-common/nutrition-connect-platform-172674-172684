import React from 'react';
import Card from '../components/ui/Card';
import DataTable from '../components/ui/DataTable';
import { useHealth } from '../hooks/useApi';

// PUBLIC_INTERFACE
export default function DashboardClient() {
  const { loading, data, error } = useHealth();
  const cols = [
    { header: 'Metric', accessor: 'metric' },
    { header: 'Value', accessor: 'value' }
  ];
  const rows = [
    { metric: 'Weight', value: '72.5 kg' },
    { metric: 'Calories', value: '2,100 kcal/day' },
  ];
  return (
    <div>
      <Card title="Client Overview">
        <div style={{ marginBottom: 12 }}>
          Health: {loading ? 'Checking...' : error ? 'Unavailable' : JSON.stringify(data)}
        </div>
        <DataTable columns={cols} data={rows} />
      </Card>
    </div>
  );
}
