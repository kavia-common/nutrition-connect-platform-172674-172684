import React from 'react';

// PUBLIC_INTERFACE
export default function Modal({ open, title, onClose, children, actions }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        {title && <div className="modal-header"><h3>{title}</h3><button className="btn btn-secondary" onClick={onClose}>✕</button></div>}
        <div className="modal-body">{children}</div>
        {actions && <div className="modal-footer">{actions}</div>}
      </div>
    </div>
  );
}
