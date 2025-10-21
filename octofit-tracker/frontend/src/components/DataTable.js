import React from 'react';

// Generic bootstrap table component
// columns: [{key: 'name', label: 'Name'}]
// data: array of objects
// onRowClick: function(item)
export default function DataTable({ columns, data, loading, emptyMessage, onRowClick }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            {columns.map(col => (
              <th key={col.key} scope="col">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center">Loading...</td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center">{emptyMessage || 'No data found.'}</td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={idx} role="button" onClick={() => onRowClick && onRowClick(item)}>
                {columns.map(col => (
                  <td key={col.key}>{renderCell(item[col.key])}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function renderCell(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return value.toString();
}
