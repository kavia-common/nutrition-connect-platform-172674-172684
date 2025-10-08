import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function Tabs({ tabs }) {
  const [active, setActive] = useState(0);
  return (
    <div className="tabs">
      <div className="tab-list">
        {tabs.map((t, idx) => (
          <button
            key={t.label}
            className={`tab ${idx === active ? 'active' : ''}`}
            onClick={() => setActive(idx)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="tab-panel">
        {tabs[active]?.content}
      </div>
    </div>
  );
}
