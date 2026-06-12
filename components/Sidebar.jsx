'use client'
import { useState } from 'react'

const MONTHS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
const DAYS_S = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']

export default function Sidebar({ activeAccess, setActiveAccess, activeType, setActiveType, activeHotel, setActiveHotel, hotels, getEvDay }) {
  const [miniDate, setMiniDate] = useState(new Date(2026, 5, 1))

  const y = miniDate.getFullYear()
  const m = miniDate.getMonth()
  const first = new Date(y, m, 1)
  const offset = first.getDay() === 0 ? 6 : first.getDay() - 1
  const cells = []
  for (let i = 0; i < 35; i++) {
    cells.push(new Date(y, m, 1 - offset + i))
  }
  const today = new Date(2026, 5, 11)

  const sectionTitle = (label) => (
    <div style={{
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: '13px', fontWeight: 700,
      letterSpacing: '0.22em', textTransform: 'uppercase',
      color: 'var(--gris)', marginBottom: '12px',
      borderBottom: '1px solid var(--border)',
      paddingBottom: '6px',
    }}>
      {label}
    </div>
  )

  return (
    <aside style={{
      borderRight: '2px solid var(--noir)',
      padding: '28px 22px',
      display: 'flex', flexDirection: 'column', gap: '28px',
      position: 'sticky', top: 0, height: '100vh',
      overflowY: 'auto', background: 'var(--white)',
    }}>

      {/* Accès */}
      <div>
        {sectionTitle('Accès')}
        {[
          { key: 'all', label: 'Tous', color: 'var(--noir)' },
          { key: 'gratuit', label: 'Gratuit', color: '#4A8A4A' },
          { key: 'resa', label: 'Sur réservation', color: '#8A6A10' },
          { key: 'payant', label: 'Payant', color: '#AA4433' },
          { key: 'residents', label: 'Résidents', color: 'var(--blue)' },
        ].map(a => (
          <button key={a.key} onClick={() => setActiveAccess(a.key)} style={{
            fontSize: '14px',
            padding: '6px 0',
            background: 'transparent', border: 'none',
            cursor: 'pointer',
            color: activeAccess === a.key ? 'var(--noir)' : 'var(--gris)',
            textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: '9px',
            fontWeight: activeAccess === a.key ? 600 : 400,
            width: '100%',
            fontFamily: "'Inter', sans-serif",
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: a.color, flexShrink: 0, display: 'inline-block'
            }} />
            {a.label}
          </button>
        ))}
      </div>

      {/* Type */}
      <div>
        {sectionTitle('Type')}
        {[
          { key: 'all', label: 'Tous', icon: '◎' },
          { key: 'recurrent', label: 'Récurrents', icon: '↻' },
          { key: 'oneshot', label: 'One shot', icon: '✦' },
        ].map(t => (
          <button key={t.key} onClick={() => setActiveType(t.key)} style={{
            fontSize: '14px',
            padding: '6px 0',
            background: 'transparent', border: 'none',
            cursor: 'pointer',
            color: activeType === t.key ? 'var(--blue)' : 'var(--gris)',
            textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: '9px',
            fontWeight: activeType === t.key ? 600 : 400,
            width: '100%',
            fontFamily: "'Inter', sans-serif",
          }}>
            <span style={{ fontSize: '15px', width: 18, textAlign: 'center' }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Hôtels */}
      <div>
        {sectionTitle('Hôtel')}
        {hotels.map(h => (
          <button key={h.key} onClick={() => setActiveHotel(h.key)} style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '20px', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.04em',
            padding: '5px 0',
            background: 'transparent', border: 'none',
            cursor: 'pointer',
            color: activeHotel === h.key ? 'var(--blue)' : 'var(--gris)',
            textAlign: 'left', width: '100%', display: 'block',
          }}>
            {activeHotel === h.key ? '→ ' : ''}{h.label}
          </button>
        ))}
      </div>

      {/* Mini calendrier */}
      <div style={{ marginTop: 'auto' }}>
        {sectionTitle('Calendrier')}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <button onClick={() => setMiniDate(new Date(y, m - 1, 1))} style={{
            fontSize: '13px', padding: '4px 9px',
            border: '1.5px solid var(--border)',
            background: 'transparent', cursor: 'pointer', color: 'var(--gris)'
          }}>←</button>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '15px', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.06em'
          }}>
            {MONTHS[m].slice(0, 4).toUpperCase()} {y}
          </span>
          <button onClick={() => setMiniDate(new Date(y, m + 1, 1))} style={{
            fontSize: '13px', padding: '4px 9px',
            border: '1.5px solid var(--border)',
            background: 'transparent', cursor: 'pointer', color: 'var(--gris)'
          }}>→</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px' }}>
          {DAYS_S.slice(1).concat(DAYS_S[0]).map(d => (
            <div key={d} style={{
              fontSize: '8px', textAlign: 'center', color: 'var(--gris)',
              padding: '3px 0', letterSpacing: '0.08em', fontWeight: 600,
            }}>{d[0]}</div>
          ))}
          {cells.map((d, i) => {
            const isToday = d.toDateString() === today.toDateString()
            const other = d.getMonth() !== m
            const hasEv = !other && getEvDay(d).length > 0
            return (
              <div key={i} onClick={() => {
                const dateKey = d.toISOString().split('T')[0]
                const el = document.getElementById('day-' + dateKey)
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }} style={{
                textAlign: 'center', padding: '4px 1px',
                cursor: 'pointer', borderRadius: '2px',
                background: isToday ? 'var(--blue-pale)' : 'transparent',
                opacity: other ? 0.25 : 1,
              }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '13px', fontWeight: 600,
                  color: isToday ? 'var(--blue)' : 'var(--noir)',
                }}>{d.getDate()}</div>
                {hasEv && <div style={{
                  width: 3, height: 3, borderRadius: '50%',
                  background: 'var(--blue)', margin: '1px auto 0'
                }} />}
              </div>
            )
          })}
        </div>
      </div>

    </aside>
  )
}