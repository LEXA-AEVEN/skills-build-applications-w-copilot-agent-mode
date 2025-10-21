import React from 'react';

export default function DetailModal({ id="detailModal", title="Details", item, onClose }) {
  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} role="dialog" aria-labelledby={`${id}Label`} aria-modal="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>{title}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <pre className="mb-0 bg-light p-3 border rounded" style={{ maxHeight: '60vh', overflow: 'auto' }}>
{JSON.stringify(item, null, 2)}
            </pre>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
