'use client'

const STATS = [
  { num: '38', label: 'Moments' },
  { num: '6', label: 'Rooftops' },
  { num: '4', label: 'Brunches' },
  { num: '3', label: 'Spas' },
  { num: '12', label: 'Hôtels' },
]

export default function Header({ activeExp, setActiveExp, categories }) {
  return (
    <header style={{
      background: 'var(--white)',
      borderBottom: '2px solid var(--noir)',
      padding: '28px 32px 0',
      textAlign: 'center',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
        <div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '48px', fontWeight: 800, letterSpacing: '0.04em', color: 'var(--noir)', textTransform: 'uppercase', lineHeight: 1 }}>
            Huis <span style={{ color: 'var(--blue)' }}>Clos</span>
          </div>
          <div style={{ fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gris)' }}>
            Paris · Hôtels Lifestyle
          </div>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById('today')
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '9px 18px', border: '1.5px solid var(--noir)', background: 'transparent', cursor: 'pointer' }}
        >
          Aujourd'hui →
        </button>
      </div>

      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '36px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', color: 'var(--noir)', lineHeight: 1.1, margin: '12px 0 6px' }}>
        Cette semaine dans les{' '}
        <em style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300, textTransform: 'none', fontSize: '42px', color: 'var(--blue)' }}>
          hôtels de Paris
        </em>
      </div>

      <p style={{ fontSize: '13px', color: 'var(--gris)', lineHeight: 1.6, fontWeight: 300, maxWidth: '560px', margin: '0 auto 18px' }}>
        Piscines, rooftops, brunches, DJ sets — tout ce qui se passe dans les meilleurs hôtels de Paris, ouvert à tous.
      </p>

      {/* Stats */}
      <div style={{ display: 'flex', justifyContent: 'center', borderTop: '1px solid var(--border)', margin: '0 -32px' }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ padding: '14px 32px', borderRight: i < STATS.length - 1 ? '1px solid var(--border)' : 'none', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '32px', fontWeight: 800, color: 'var(--blue)', lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gris)', marginTop: '2px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Catégories */}
      <nav style={{ display: 'flex', justifyContent: 'center', borderTop: '1px solid var(--border)', margin: '0 -32px', overflowX: 'auto' }}>
        {categories.map((cat, i) => (
          <button
            key={cat.key}
            onClick={() => setActiveExp(cat.key)}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '14px', fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '11px 22px',
              background: activeExp === cat.key ? 'var(--blue-pale)' : 'transparent',
              border: 'none',
              borderRight: '1px solid var(--border)',
              borderLeft: i === 0 ? '1px solid var(--border)' : 'none',
              cursor: 'pointer',
              color: activeExp === cat.key ? 'var(--blue)' : 'var(--gris)',
              whiteSpace: 'nowrap',
            }}
          >
            {cat.label}
          </button>
        ))}
      </nav>
    </header>
  )
}