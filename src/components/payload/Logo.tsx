import React from 'react';

export default function Logo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <img
        src="/images/LogoGH.webp"
        alt="GH Bâtiment"
        style={{ width: '180px', height: 'auto' }}
      />
      <span
        style={{
          fontSize: '13px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#78716C',
          fontWeight: 500,
        }}
      >
        Administration
      </span>
    </div>
  );
}
