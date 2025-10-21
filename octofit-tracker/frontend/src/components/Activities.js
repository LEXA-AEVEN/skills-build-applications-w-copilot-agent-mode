import React, { useEffect, useState, useMemo } from 'react';
import { fetchEndpoint } from '../api';
import DataTable from './DataTable';
import DetailModal from './DetailModal';

const Activities = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = `https://${codespace}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { raw, items } = await fetchEndpoint(endpoint);
        console.log('[Activities] Endpoint', endpoint);
        console.log('[Activities] Raw response', raw);
        setData(items);
      } catch (err) {
        console.error('[Activities] Fetch error', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [endpoint, refreshKey]);

  useEffect(() => {
    const q = query.toLowerCase();
    setFiltered(
      data.filter(item =>
        Object.values(item).some(val => typeof val === 'string' && val.toLowerCase().includes(q))
      )
    );
  }, [query, data]);

  const columns = useMemo(() => {
    if (data.length === 0) return [{ key: 'name', label: 'Name' }];
    // derive a limited set of columns
    const sample = data[0];
    const keys = Object.keys(sample).slice(0, 5); // cap columns
    return keys.map(k => ({ key: k, label: k.charAt(0).toUpperCase() + k.slice(1) }));
  }, [data]);

  const displayed = query ? filtered : data;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="card-title mb-0">Activities</h3>
          <div className="btn-group" role="group">
            <button className="btn btn-outline-primary btn-sm" onClick={() => setRefreshKey(k => k + 1)}>
              Refresh
            </button>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => setQuery('')}>Clear Filter</button>
          </div>
        </div>
        <div className="card-body">
          <form className="row g-2 mb-3" onSubmit={e => e.preventDefault()}>
            <div className="col-auto">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-sm btn-primary" onClick={() => setRefreshKey(k => k + 1)}>Reload</button>
            </div>
          </form>
          {error && <div className="alert alert-danger">Error: {error.message}</div>}
          <DataTable
            columns={columns}
            data={displayed}
            loading={loading}
            emptyMessage="No activities found"
            onRowClick={item => setSelected(item)}
          />
          <small className="text-muted">Endpoint: {endpoint}</small>
        </div>
      </div>
      {selected && (
        <DetailModal
          title="Activity Details"
          item={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default Activities;
