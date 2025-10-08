import React from 'react';
import Card from '../components/ui/Card';
import DataTable from '../components/ui/DataTable';

// PUBLIC_INTERFACE
export default function Tracking() {
  const cols = [
    { header: 'Date', accessor: 'date' },
    { header: 'Calories', accessor: 'cal' },
    { header: 'Protein', accessor: 'protein' },
  ];
  const rows = [
    { date: '2025-01-01', cal: 2100, protein: '120g' },
    { date: '2025-01-02', cal: 1975, protein: '110g' }
  ];
  return (
    <div>
      <Card title="Progress Tracking">
        <DataTable columns={cols} data={rows} />
      </Card>
    </div>
  );
}
