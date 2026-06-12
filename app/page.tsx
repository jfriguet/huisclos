'use client'
import { useState, useCallback } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import { CATEGORIES, SUBCATEGORIES, HOTELS, EVENTS } from '../lib/data'

export default function Home() {
  const [activeExp, setActiveExp] = useState<string>('all')
  const [activeSub, setActiveSub] = useState<string>('all')
  const [activeAccess, setActiveAccess] = useState<string>('all')
  const [activeType, setActiveType] = useState<string>('all')
  const [activeHotel, setActiveHotel] = useState<string>('all')

  const handleSetExp = (exp: string) => {
    setActiveExp(exp)
    setActiveSub('all')
  }

  const getEvDay = useCallback((d: Date) => {
    const dow = d.getDay()
    return EVENTS.filter((ev: any) => {
      if (activeExp !== 'all' && ev.exp !== activeExp) return false
      if (activeSub !== 'all' && ev.sub !== activeSub) return false
      if (activeAccess !== 'all' && ev.access !== activeAccess) return false
      if (activeHotel !== 'all' && ev.hotelKey !== activeHotel) return false
      if (activeType === 'recurrent' && !ev.recurrent) return false
      if (activeType === 'oneshot' && ev.recurrent) return false
      if (ev.recurrent) return ev.days.includes(dow)
      return ev.date === d.toISOString().split('T')[0]
    })
  }, [activeExp, activeSub, activeAccess, activeType, activeHotel])

  const subs: string[] = (SUBCATEGORIES as Record<string, string[]>)[activeExp] || []

  return (
    <div className="page-wrapper">
      <Header
        activeExp={activeExp}
        setActiveExp={handleSetExp}
        categories={CATEGORIES}
      />

      {subs.length > 0 && (
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border)',
          background: '#F8F8F8',
          overflowX: 'auto'
        }}>
          {['Tout', ...subs].map((s: string, i: number) => {
            const key = i === 0 ? 'all' : s
            return (
              <button key={key} onClick={() => setActiveSub(key)} style={{
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                padding: '9px 18px',
                background: 'transparent',
                border: 'none',
                borderRight: '1px solid var(--border)',
                cursor: 'pointer',
                color: activeSub === key ? 'var(--blue)' : 'var(--gris)',
                fontWeight: activeSub === key ? 500 : 400,
                whiteSpace: 'nowrap' as const,
              }}>
                {s}
              </button>
            )
          })}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        minHeight: 'calc(100vh - 320px)',
      }}>
        <Sidebar
          activeAccess={activeAccess}
          setActiveAccess={setActiveAccess}
          activeType={activeType}
          setActiveType={setActiveType}
          activeHotel={activeHotel}
          setActiveHotel={setActiveHotel}
          hotels={HOTELS}
          getEvDay={getEvDay}
        />
        <Feed getEvDay={getEvDay} />
      </div>
    </div>
  )
}