import React, { useEffect, useState, useMemo } from 'react';
import { fetchEndpoint } from '../api';
import DataTable from './DataTable';
import DetailModal from './DetailModal';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = `https://${codespace}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { raw, items } = await fetchEndpoint(endpoint);
        console.log('[Leaderboard] Endpoint', endpoint);
        console.log('[Leaderboard] Raw response', raw);
        setData(items);
      } catch (err) {
        console.error('[Leaderboard] Fetch error', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [endpoint, refreshKey]);

  const columns = useMemo(() => {
    if (data.length === 0) return [{ key: 'user', label: 'User' }, { key: 'score', label: 'Score' }];
    const sample = data[0];
    const keys = Object.keys(sample).slice(0, 5);
    return keys.map(k => ({ key: k, label: k.charAt(0).toUpperCase() + k.slice(1) }));
  }, [data]);

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="card-title mb-0">Leaderboard</h3>
          <button className="btn btn-outline-primary btn-sm" onClick={() => setRefreshKey(k => k + 1)}>Refresh</button>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">Error: {error.message}</div>}
          <DataTable
            columns={columns}
            data={data}
            loading={loading}
            emptyMessage="No leaderboard entries found"
            onRowClick={item => setSelected(item)}
          />
          <small className="text-muted">Endpoint: {endpoint}</small>
        </div>
      </div>
      {selected && (
        <DetailModal
          title="Leaderboard Entry"
          item={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default Leaderboard;
