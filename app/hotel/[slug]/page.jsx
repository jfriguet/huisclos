'use client'
import { useState, useEffect, use } from 'react'
import { supabase } from '../../../lib/supabase'

const PRICE_RANGE = {
  1: '€',
  2: '€€',
  3: '€€€',
  4: '€€€€',
}

const CAT_LABELS = {
  pool: '🏊 Piscine',
  rooftop: '🌇 Rooftop',
  brunch: '🥐 Brunch',
  bar: '🍸 Bar',
  spa: '💆 Spa',
  events: '🎶 Events',
  restaurant: '🍽️ Restaurant',
  work: '💻 Work',
}

export default function HotelPage({ params }) {
  const { slug } = use(params)
  const [hotel, setHotel] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: hotelData } = await supabase
        .from('hotels')
        .select('*')
        .eq('slug', slug)
        .single()

      const { data: eventsData } = await supabase
        .from('events')
        .select('*')
        .eq('hotel_key', slug)

      setHotel(hotelData)
      setEvents(eventsData || [])
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh',
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: '24px', fontWeight: 700,
      letterSpacing: '0.1em', textTransform: 'uppercase',
      color: '#888',
    }}>
      Chargement...
    </div>
  )

  if (!hotel) return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh',
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: '24px', fontWeight: 700,
      color: '#888',
    }}>
      Hôtel introuvable
    </div>
  )

  const recurringEvents = events.filter(e => e.recurrent)
  const oneshotEvents = events.filter(e => !e.recurrent)

  return (
    <div className="page-wrapper">

      {/* NAV RETOUR */}
      <div style={{
        padding: '16px 32px',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        background: 'white',
      }}>
        <a href="/" style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: '13px', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: '#888', textDecoration: 'none',
        }}>
          ← Huis Clos
        </a>
      </div>

      {/* HERO HOTEL */}
      <div style={{
        background: '#0A0A0A',
        padding: '48px 32px 40px',
        borderBottom: '2px solid #0A0A0A',
      }}>
        <div style={{
          fontSize: '10px', letterSpacing: '0.28em',
          textTransform: 'uppercase', color: '#4A7FD4',
          marginBottom: '12px', fontWeight: 600,
        }}>
          {hotel.quartier} · Paris
        </div>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: '64px', fontWeight: 800,
          textTransform: 'uppercase', color: 'white',
          letterSpacing: '0.02em', lineHeight: 1,
          marginBottom: '16px',
        }}>
          {hotel.name}
        </div>
        <p style={{
          fontSize: '14px', color: 'rgba(255,255,255,0.55)',
          lineHeight: 1.7, fontWeight: 300,
          maxWidth: '560px', marginBottom: '28px',
        }}>
          {hotel.description_fr}
        </p>

        {/* Infos pratiques */}
        <div style={{
          display: 'flex', gap: '24px', flexWrap: 'wrap',
        }}>
          {hotel.price_range && (
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '16px', fontWeight: 700,
              color: '#4A7FD4', letterSpacing: '0.04em',
            }}>
              {PRICE_RANGE[hotel.price_range]}
            </div>
          )}
          {hotel.address && (
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              📍 {hotel.address}
            </div>
          )}
          {hotel.metro && (
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🚇 {hotel.metro}
            </div>
          )}
          {hotel.phone && (
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              📞 {hotel.phone}
            </div>
          )}
        </div>
      </div>

      {/* CATÉGORIES DISPO */}
      <div style={{
        padding: '28px 32px',
        borderBottom: '2px solid #0A0A0A',
        background: 'white',
      }}>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: '11px', fontWeight: 700,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#888', marginBottom: '16px',
        }}>
          Expériences disponibles
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {(hotel.categories || []).map(cat => (
            <div key={cat} style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '15px', fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '8px 18px',
              border: '1.5px solid #0A0A0A',
              color: '#0A0A0A',
            }}>
              {CAT_LABELS[cat] || cat}
            </div>
          ))}
        </div>
      </div>

      {/* ÉVÉNEMENTS RÉCURRENTS */}
      {recurringEvents.length > 0 && (
        <div style={{ padding: '0 32px' }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#888', padding: '24px 0 12px',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
          }}>
            ↻ Toujours au programme
          </div>
          {recurringEvents.map((ev, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr auto',
              padding: '16px 0',
              borderBottom: '1px solid rgba(0,0,0,0.08)',
              alignItems: 'center', gap: '20px',
            }}>
              <div>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '20px', fontWeight: 700,
                  textTransform: 'uppercase', color: '#0A0A0A',
                  letterSpacing: '0.03em', lineHeight: 1, marginBottom: '4px',
                }}>
                  {ev.name}
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '14px', fontStyle: 'italic',
                  color: '#888',
                }}>
                  {ev.time_range}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '16px', fontWeight: 700,
                  color: '#4A7FD4',
                }}>
                  {ev.price}
                </div>
                <div style={{
                  fontSize: '9px', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: '#888',
                  marginTop: '4px',
                }}>
                  {ev.access === 'gratuit' ? 'Gratuit' : ev.access === 'resa' ? 'Sur résa' : 'Payant'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ÉVÉNEMENTS PONCTUELS */}
      {oneshotEvents.length > 0 && (
        <div style={{ padding: '0 32px 48px' }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#888', padding: '24px 0 12px',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
          }}>
            ✦ Événements à venir
          </div>
          {oneshotEvents.map((ev, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '80px 1fr auto',
              padding: '16px 0',
              borderBottom: '1px solid rgba(0,0,0,0.08)',
              alignItems: 'center', gap: '20px',
            }}>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '32px', fontWeight: 800,
                color: '#4A7FD4', lineHeight: 1,
                letterSpacing: '-0.01em',
              }}>
                {ev.date ? new Date(ev.date).getDate() : ''}
                <div style={{
                  fontSize: '10px', fontWeight: 600,
                  letterSpacing: '0.1em', color: '#888',
                }}>
                  {ev.date ? new Date(ev.date).toLocaleString('fr-FR', { month: 'short' }).toUpperCase() : ''}
                </div>
              </div>
              <div>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '20px', fontWeight: 700,
                  textTransform: 'uppercase', color: '#0A0A0A',
                  letterSpacing: '0.03em', lineHeight: 1, marginBottom: '4px',
                }}>
                  {ev.name}
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '14px', fontStyle: 'italic', color: '#888',
                }}>
                  {ev.time_range}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '16px', fontWeight: 700, color: '#4A7FD4',
                }}>
                  {ev.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIENS */}
      <div style={{
        padding: '24px 32px',
        borderTop: '2px solid #0A0A0A',
        display: 'flex', gap: '12px',
      }}>
        {hotel.website && (
          <a href={hotel.website} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '13px', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '10px 20px',
            background: '#0A0A0A', color: 'white',
            textDecoration: 'none',
          }}>
            Site officiel →
          </a>
        )}
        {hotel.instagram && (
          <a href={`https://instagram.com/${hotel.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '13px', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '10px 20px',
            border: '1.5px solid #0A0A0A', color: '#0A0A0A',
            textDecoration: 'none',
          }}>
            Instagram
          </a>
        )}
      </div>

    </div>
  )
}