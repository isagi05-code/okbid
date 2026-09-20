import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let icon = <Info size={18} color="var(--color-indigo)" />;
        let borderColor = 'var(--border-indigo)';

        if (toast.type === 'success') {
          icon = <CheckCircle2 size={18} color="var(--color-emerald)" />;
          borderColor = 'var(--border-emerald)';
        } else if (toast.type === 'error') {
          icon = <AlertCircle size={18} color="var(--color-rose)" />;
          borderColor = 'rgba(244, 63, 94, 0.4)';
        }

        return (
          <div
            key={toast.id}
            className="toast-item"
            style={{ borderColor }}
          >
            <div style={{ flexShrink: 0, marginTop: '2px' }}>{icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-white)' }}>
                {toast.title}
              </div>
              <div
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  marginTop: '2px',
                  lineHeight: 1.35
                }}
              >
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                padding: '2px'
              }}
              aria-label="Dismiss toast"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
