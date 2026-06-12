'use client'
import { useState, useEffect, useRef } from 'react'
import { ACCESS_LABELS, EDITORIAL_BLOCKS } from '../lib/data'

const DAYS_FR = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']
const MONTHS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']

const tagStyle = (type) => ({
  fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em',
  textTransform: 'uppercase', padding: '3px 10px',
  borderRadius: '2px', whiteSpace: 'nowrap', border: '1.5px solid',
  ...(type === 'gratuit' && { background: '#F5F5F5', color: '#555', borderColor: 'rgba(0,0,0,0.1)' }),
  ...(type === 'resa' && { background: '#F5F5F5', color: '#555', borderColor: 'rgba(0,0,0,0.1)' }),
  ...(type === 'payant' && { background: '#F5F5F5', color: '#555', borderColor: 'rgba(0,0,0,0.1)' }),
  ...(type === 'residents' && { background: 'var(--blue-pale)', color: 'var(--blue)', borderColor: 'rgba(74,127,212,0.2)' }),
  ...(type === 'rec' && { background: '#F5F5F5', color: '#AAAAAA', borderColor: 'rgba(0,0,0,0.07)' }),
  ...(type === 'one' && { background: 'var(--blue-pale)', color: 'var(--blue)', borderColor: 'rgba(74,127,212,0.15)' }),
})

function EventPopup({ ev, onClose }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 100,
        }}
      />
      <div style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'var(--white)',
        border: '2px solid var(--noir)',
        width: '420px',
        zIndex: 101,
        boxShadow: '8px 12px 40px rgba(0,0,0,0.2)',
      }}>
        <div style={{
          background: 'var(--noir)',
          padding: '20px 24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '28px', fontWeight: 800,
              textTransform: 'uppercase', color: 'white',
              letterSpacing: '0.03em', lineHeight: 1,
            }}>{ev.hotel_name}</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '17px', fontStyle: 'italic',
              color: 'rgba(255,255,255,0.6)', marginTop: '4px',
            }}>{ev.name}</div>
          </div>
          <button onClick={onClose} style={{
            background: 'transparent', border: 'none',
            color: 'rgba(255,255,255,0.6)', fontSize: '20px',
            cursor: 'pointer', padding: '0 0 0 16px', lineHeight: 1,
          }}>✕</button>
        </div>

        <div style={{ padding: '20px 24px' }}>
          {[
            { label: 'Horaires', value: ev.time_range, big: true },
            { label: 'Tarif', value: ev.price },
            { label: 'Accès', value: ACCESS_LABELS[ev.access] },
            { label: 'Type', value: ev.recurrent ? '↻ Récurrent' : '✦ One shot' },
            { label: 'Catégorie', value: ev.exp?.charAt(0).toUpperCase() + ev.exp?.slice(1) },
          ].map((row, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid var(--border)',
            }}>
              <span style={{
                fontSize: '9px', letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gris)', fontWeight: 500,
              }}>{row.label}</span>
              <span style={{
                fontFamily: row.big ? "'Barlow Condensed', sans-serif" : "'Inter', sans-serif",
                fontSize: row.big ? '22px' : '13px',
                fontWeight: row.big ? 700 : 400,
                color: row.big ? 'var(--blue)' : 'var(--noir)',
              }}>{row.value}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: '0 24px 24px' }}>
          <button onClick={onClose} style={{
            width: '100%', padding: '14px',
            background: 'var(--blue)', color: 'white',
            border: 'none', cursor: 'pointer',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '14px', fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>
            Voir sur le site de l'hôtel →
          </button>
        </div>
      </div>
    </>
  )
}

function EventRow({ ev, onSelect }) {
  return (
    <div
      onClick={() => onSelect(ev)}
      onMouseEnter={e => (e.currentTarget.style.background = '#FAFAFA')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      style={{
        display: 'grid', gridTemplateColumns: '100px 1fr auto',
        padding: '16px 20px',
        borderBottom: '1px solid var(--border)',
        cursor: 'pointer',
        alignItems: 'start', gap: '20px',
        transition: 'background 0.1s',
      }}
    >
      <div style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: '18px', fontWeight: 700,
        color: 'var(--blue)', letterSpacing: '0.04em',
        paddingTop: '2px',
      }}>
        {ev.time_range}
      </div>
      <div>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: '24px', fontWeight: 800,
          textTransform: 'uppercase', color: 'var(--noir)',
          letterSpacing: '0.03em', lineHeight: 1, marginBottom: '3px',
        }}>
          {ev.hotel_name}
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '16px', fontStyle: 'italic',
          color: 'var(--gris)', lineHeight: 1.3, marginBottom: '8px',
        }}>
          {ev.name}
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={tagStyle(ev.access)}>{ACCESS_LABELS[ev.access]}</span>
          <span style={tagStyle(ev.recurrent ? 'rec' : 'one')}>
            {ev.recurrent ? '↻ Récurrent' : '✦ One shot'}
          </span>
        </div>
      </div>
      <div style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: '16px', fontWeight: 600,
        color: 'var(--gris)', paddingTop: '2px', whiteSpace: 'nowrap',
      }}>
        {ev.price}
      </div>
    </div>
  )
}

function DayBlock({ d, evs, isToday, idx, onSelect }) {
  const editorial = EDITORIAL_BLOCKS[idx]
  const dateKey = d.toISOString().split('T')[0]

  return (
    <>
      <div
        id={`day-${dateKey}`}
        style={{
          margin: '16px',
          border: '2px solid var(--noir)',
          borderRadius: '2px',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          borderBottom: '1.5px solid var(--noir)',
          background: isToday ? 'var(--blue-pale)' : 'var(--white)',
        }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '80px', fontWeight: 800,
            color: isToday ? 'var(--blue)' : 'var(--noir)',
            lineHeight: 1, padding: '10px 24px 8px',
            borderRight: '1px solid var(--border)',
            minWidth: '110px', textAlign: 'center',
            letterSpacing: '-0.02em',
          }}>
            {d.getDate()}
          </div>
          <div style={{
            padding: '16px 20px 10px',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'flex-end', flex: 1,
          }}>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '22px', fontWeight: 700,
              textTransform: 'uppercase', color: 'var(--noir)',
              letterSpacing: '0.04em', lineHeight: 1,
            }}>
              {DAYS_FR[d.getDay()]}
            </div>
            <div style={{
              fontSize: '10px', letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gris)', marginTop: '3px',
            }}>
              {MONTHS[d.getMonth()]} {d.getFullYear()}
            </div>
          </div>
          {evs.length > 0 && (
            <div style={{
              fontSize: '9px', letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--blue)',
              fontWeight: 600, padding: '0 20px 12px',
              alignSelf: 'flex-end',
            }}>
              {evs.length} moment{evs.length > 1 ? 's' : ''}
            </div>
          )}
        </div>

        {evs.length === 0 ? (
          <div style={{
            padding: '16px 24px',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '15px', fontStyle: 'italic',
            color: 'var(--gris-light)',
          }}>
            Aucun moment ce jour
          </div>
        ) : (
          evs.map((ev, i) => <EventRow key={i} ev={ev} onSelect={onSelect} />)
        )}
      </div>

      {editorial && (
        <div style={{
          margin: '0 16px 16px',
          border: '2px solid var(--noir)',
          display: 'grid', gridTemplateColumns: '240px 1fr',
        }}>
          <div style={{ width: '240px', height: '140px', background: editorial.gradient }} />
          <div style={{
            padding: '20px 24px',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', background: '#0A0A0A',
          }}>
            <div style={{
              fontSize: '9px', letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--blue)',
              marginBottom: '8px', fontWeight: 600,
            }}>{editorial.eyebrow}</div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '24px', fontWeight: 800,
              textTransform: 'uppercase', color: 'white',
              lineHeight: 1.05, letterSpacing: '0.02em', marginBottom: '8px',
            }}>{editorial.title}</div>
            <p style={{
              fontSize: '12px', color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.65, fontWeight: 300,
            }}>{editorial.text}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default function Feed({ getEvDay }) {
  const startDate = new Date(2026, 5, 11)
  const today = new Date(2026, 5, 11)
  const [days, setDays] = useState(21)
  const [selectedEv, setSelectedEv] = useState(null)
  const feedRef = useRef(null)

  useEffect(() => {
    const el = feedRef.current
    if (!el) return
    const handleScroll = () => {
      if (el.scrollTop + el.clientHeight > el.scrollHeight - 500) {
        setDays(d => d + 14)
      }
    }
    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  const dayList = Array.from({ length: days }, (_, i) => {
    const d = new Date(startDate.getTime() + i * 86400000)
    return {
      d,
      evs: getEvDay(d),
      isToday: d.toDateString() === today.toDateString(),
      idx: i,
    }
  })

  return (
    <>
      <div
        ref={feedRef}
        style={{
          overflowY: 'auto', height: '100vh',
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--gris-light) transparent',
          background: '#F4F0EA',
        }}
      >
        <div style={{ paddingTop: '8px', paddingBottom: '60px' }}>
          {dayList.map(({ d, evs, isToday, idx }) => (
            <DayBlock
              key={d.toISOString()}
              d={d} evs={evs}
              isToday={isToday} idx={idx}
              onSelect={setSelectedEv}
            />
          ))}
        </div>
      </div>

      {selectedEv && (
        <EventPopup ev={selectedEv} onClose={() => setSelectedEv(null)} />
      )}
    </>
  )
}