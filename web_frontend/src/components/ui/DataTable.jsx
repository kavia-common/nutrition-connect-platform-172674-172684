import React from 'react';

// PUBLIC_INTERFACE
export default function DataTable({ columns = [], data = [] }) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map(c => <th key={c.accessor}>{c.header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map(c => <td key={c.accessor}>{row[c.accessor]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
