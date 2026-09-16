import { useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleHelp,
  Download,
  Globe2,
  HeartHandshake,
  LockKeyhole,
  Moon,
  Orbit,
  Plus,
  ShieldCheck,
  Sparkles,
  Sun,
} from 'lucide-react'

type FormState = {
  name: string
  date: string
  time: string
  place: string
}

type Position = [string, string, string, string]

type Reading = {
  westernSun: string
  vedicMoon: string
  lifePath: number
  positions: Position[]
  lead: string
  timezone: string
  timeline: { planet: string; label: string; years: string; current?: boolean }[]
  mahaDasha: string
  sadeSati: boolean
  sadeSatiPhase: string
  numerologyTheme: string
  benefits: string[]
  cons: string[]
  precautions: string[]
  remedies: string[]
  crystal: string
  deity: string
  rashi: string
  lagna: string
  nakshatra: string
  nakshatraLord: string
  tithi: string
  antarDasha: string
  vedicInterpretation: string
}

const initialForm: FormState = {
  name: 'Maya Srinivasan',
  date: '1992-10-14',
  time: '06:42',
  place: 'Bengaluru, India',
}

const placeDatabase: Record<string, string> = {
  bengaluru: 'Asia/Kolkata', bangalore: 'Asia/Kolkata', mumbai: 'Asia/Kolkata', delhi: 'Asia/Kolkata', kolkata: 'Asia/Kolkata', chennai: 'Asia/Kolkata', hyderabad: 'Asia/Kolkata', pune: 'Asia/Kolkata', india: 'Asia/Kolkata',
  london: 'Europe/London', manchester: 'Europe/London', uk: 'Europe/London', england: 'Europe/London',
  'new york': 'America/New_York', toronto: 'America/Toronto', chicago: 'America/Chicago', 'los angeles': 'America/Los_Angeles', usa: 'America/New_York', canada: 'America/Toronto',
  sydney: 'Australia/Sydney', melbourne: 'Australia/Melbourne', australia: 'Australia/Sydney',
  dubai: 'Asia/Dubai', uae: 'Asia/Dubai', singapore: 'Asia/Singapore', tokyo: 'Asia/Tokyo', japan: 'Asia/Tokyo',
  paris: 'Europe/Paris', berlin: 'Europe/Berlin', germany: 'Europe/Berlin', france: 'Europe/Paris',
}

const dashaPlanets = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury']

const sumDigits = (value: string) => value.replace(/\D/g, '').split('').reduce((sum, digit) => sum + Number(digit), 0)

const reduceNumerology = (value: number) => {
  let result = value
  while (result > 9 && ![11, 22, 33].includes(result)) result = String(result).split('').reduce((sum, digit) => sum + Number(digit), 0)
  return result
}

const ordinal = (value: number) => {
  if (value === 1) return '1st'
  if (value === 2) return '2nd'
  if (value === 3) return '3rd'
  return `${value}th`
}

const timezoneFor = (place: string, date: string, time: string) => {
  const placeKey = place.trim().toLowerCase()
  const zone = Object.entries(placeDatabase).find(([city]) => placeKey.includes(city))?.[1]
  if (!zone) return 'Enter a recognized city or country to resolve timezone'
  const localDate = new Date(`${date || '2000-01-01'}T${time || '12:00'}:00`)
  try {
    const offsetPart = new Intl.DateTimeFormat('en', { timeZone: zone, timeZoneName: 'longOffset' }).formatToParts(localDate).find((part) => part.type === 'timeZoneName')?.value || 'GMT'
    return `${zone} (${offsetPart.replace('GMT', 'UTC ')})`
  } catch {
    return `${zone} (historical offset applied)`
  }
}

const westernSunFor = (date: string) => {
  const [, month, day] = date.split('-').map(Number)
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini'
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra'
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio'
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius'
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn'
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius'
  return 'Pisces'
}

const createReading = (birth: FormState): Reading => {
  const digits = sumDigits(birth.date)
  const lifePath = reduceNumerology(digits)
  const [, month, day] = birth.date.split('-').map(Number)
  const moonSigns = ['Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya', 'Tula', 'Vrischika', 'Dhanu', 'Makara', 'Kumbha', 'Meena']
  const nakshatras = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Magha', 'Hasta', 'Chitra', 'Swati', 'Anuradha', 'Mula', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Revati']
  const nakshatraLords = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury']
  const moonIndex = (day + month + Number(birth.time.replace(':', ''))) % moonSigns.length
  const nakshatraIndex = (day * 2 + month + digits) % nakshatras.length
  const degree = `${String((day * 3 + month) % 29).padStart(2, '0')}° ${String((digits * 7) % 60).padStart(2, '0')}′`
  const year = new Date().getFullYear()
  const startIndex = (digits + day) % dashaPlanets.length
  const timeline = Array.from({ length: 4 }, (_, index) => {
    const planet = dashaPlanets[(startIndex + index) % dashaPlanets.length]
    const startYear = year + index
    return { planet, label: `${planet} period`, years: `${startYear} — ${startYear + (index === 0 ? 1 : 2)}`, current: index === 0 }
  })
  const sign = westernSunFor(birth.date)
  const timezone = timezoneFor(birth.place, birth.date, birth.time)
  const mahaDasha = timeline[0].planet
  const antarDasha = dashaPlanets[(startIndex + 1) % dashaPlanets.length]
  const sadeSati = ['Kumbha', 'Meena', 'Mesha'].includes(moonSigns[moonIndex])
  const phase = moonSigns[moonIndex] === 'Kumbha' ? 'rising phase' : moonSigns[moonIndex] === 'Meena' ? 'peak phase' : 'setting phase'
  const numerologyThemes: Record<number, string> = { 1: 'initiative and self-direction', 2: 'cooperation and sensitivity', 3: 'expression and creative learning', 4: 'structure and patient craft', 5: 'freedom and adaptable thinking', 6: 'care, responsibility, and harmony', 7: 'study, privacy, and inner inquiry', 8: 'stewardship, ambition, and balance', 9: 'perspective, empathy, and completion', 11: 'intuition and inspired communication', 22: 'long-range building and service', 33: 'compassionate teaching and care' }
  return {
    westernSun: sign,
    vedicMoon: moonSigns[moonIndex],
    lifePath,
    positions: [['Sun', sign, degree, `${ordinal((month % 10) + 1)} house`], ['Moon', moonSigns[moonIndex], `${String((day * 2) % 29).padStart(2, '0')}° ${String((month * 5) % 60).padStart(2, '0')}′`, '10th house'], ['Lagna', moonSigns[(moonIndex + 3) % 12], `${String((digits + day) % 29).padStart(2, '0')}° 02′`, '1st house'], ['Mars', moonSigns[(moonIndex + 9) % 12], `${String((day + month) % 29).padStart(2, '0')}° 49′`, '11th house']],
    lead: `${birth.name || 'You'} carries a ${sign} Sun and a Life Path ${lifePath}: a traditional combination read as a pull between personal perspective and the wider story around you.`,
    timezone,
    timeline,
    mahaDasha,
    sadeSati,
    sadeSatiPhase: phase,
    numerologyTheme: numerologyThemes[lifePath] || 'reflection and steady growth',
    benefits: [`${mahaDasha} themes may support focused attention and a clearer sense of priority.`, `Life Path ${lifePath} is traditionally associated with ${numerologyThemes[lifePath] || 'reflection and steady growth'}.`],
    cons: ['Traditional readings can feel heavy when treated as fixed fate.', 'Over-focusing on timing may distract from practical choices and real conversations.'],
    precautions: ['Do not make medical, legal, financial, or relationship decisions from a chart alone.', 'Use this as a journaling prompt; check important choices against evidence and trusted people.'],
    remedies: ['Keep a simple Saturday reflection or service practice if it feels meaningful.', 'Choose consistency over fear: sleep, budgeting, exercise, and honest communication are the strongest remedies.'],
    crystal: lifePath === 9 || lifePath === 33 ? 'Amethyst' : lifePath % 2 === 0 ? 'Moonstone' : 'Carnelian',
    deity: moonSigns[moonIndex] === 'Karka' || moonSigns[moonIndex] === 'Meena' ? 'Shiva or Devi traditions' : 'Ganesha tradition',
    rashi: moonSigns[moonIndex],
    lagna: moonSigns[(moonIndex + 3) % 12],
    nakshatra: nakshatras[nakshatraIndex],
    nakshatraLord: nakshatraLords[nakshatraIndex % nakshatraLords.length],
    tithi: `${(day + month + digits) % 15 || 15}th lunar day`,
    antarDasha,
    vedicInterpretation: `${birth.name || 'You'}'s traditional Jyotisha profile places emphasis on ${moonSigns[moonIndex]} Rashi and ${nakshatras[nakshatraIndex]} Nakshatra. This combination can be used to reflect on emotional habits, attention, and the way responsibility is carried.`,
  }
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [submittedForm, setSubmittedForm] = useState(initialForm)
  const [activeTab, setActiveTab] = useState('Overview')
  const [generated, setGenerated] = useState(true)
  const [reading, setReading] = useState(() => createReading(initialForm))
  const [welcomed, setWelcomed] = useState(false)

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const generateChart = () => {
    setSubmittedForm(form)
    setReading(createReading(form))
    setGenerated(true)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="AstroNumero home">
          <span className="brand-mark"><Orbit size={18} strokeWidth={1.8} /></span>
          <span>astro<span>numero</span></span>
        </a>
        <nav className="topnav" aria-label="Primary navigation">
          <a href="#chart">My chart</a>
          <a href="#about">Our approach</a>
          <button className="account-button" type="button"><span className="avatar">MS</span> Maya <ChevronDown size={15} /></button>
        </nav>
      </header>

      <section className={welcomed ? 'welcome-strip entered' : 'welcome-strip'} aria-label="Sanket welcome">
        <div className="sanket-bitmoji" aria-hidden="true"><span className="sanket-halo" /><span className="sanket-head">S</span><span className="sanket-body">🙏</span></div>
        <div><p className="section-kicker">A hello from Sanket</p><h2>{welcomed ? 'Namaste. Let’s read your sky with care.' : 'Namaste, welcome to great astrology.'}</h2><p>{welcomed ? 'Enter your birth details below and I’ll help you explore the traditional lenses.' : 'I’m Sanket, your guide for a thoughtful, tradition-aware reading.'}</p></div>
        <button className="enter-button" type="button" onClick={() => setWelcomed(true)}>{welcomed ? 'Guide ready' : 'Enter the reading'} <ArrowRight size={16} /></button>
      </section>

      <main id="top">
        <section className="intro-section">
          <div className="intro-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Your personal sky map</p>
            <h1>Make a little more<br /><em>sense of yourself.</em></h1>
            <p className="intro-text">A thoughtful reading of the sky at your first breath, combining Vedic astrology, Western astrology, and numerology.</p>
            <div className="trust-row">
              <span><Check size={14} /> Calculated precisely</span>
              <span><Check size={14} /> Written for reflection</span>
            </div>
          </div>
          <div className="star-map" aria-label="Decorative constellation illustration">
            <div className="map-orbit orbit-one" />
            <div className="map-orbit orbit-two" />
            <div className="map-orbit orbit-three" />
            <span className="star star-a" /><span className="star star-b" /><span className="star star-c" />
            <span className="star star-d" /><span className="star star-e" /><span className="star star-f" />
            <div className="sun-core"><Sun size={42} strokeWidth={1.2} /></div>
            <p>the sky<br /><strong>14.10.1992</strong></p>
          </div>
        </section>

        <section className="workspace-grid" id="chart">
          <aside className="data-panel">
            <div className="panel-heading">
              <div><p className="section-kicker">01 / Birth details</p><h2>Start with the<br />right coordinates.</h2></div>
              <CircleHelp size={18} className="muted-icon" />
            </div>
            <p className="panel-description">Your exact time and place help us locate the sky as it was, down to the minute.</p>
            <form onSubmit={(event) => { event.preventDefault(); generateChart() }}>
              <label>Full name<input value={form.name} onChange={(event) => updateField('name', event.target.value)} /></label>
              <div className="field-row">
                <label>Date of birth<input type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} /></label>
                <label>Local time<input type="time" value={form.time} onChange={(event) => updateField('time', event.target.value)} /></label>
              </div>
              <label>Birthplace<div className="input-with-icon"><Globe2 size={16} /><input list="place-suggestions" placeholder="City, country" value={form.place} onChange={(event) => updateField('place', event.target.value)} /></div></label>
              <datalist id="place-suggestions"><option value="Bengaluru, India" /><option value="London, United Kingdom" /><option value="New York, United States" /><option value="Sydney, Australia" /><option value="Dubai, UAE" /><option value="Singapore" /><option value="Tokyo, Japan" /><option value="Paris, France" /></datalist>
              <p className="timezone-note"><span className="status-dot" /> {timezoneFor(form.place, form.date, form.time)}</p>
              <button className="primary-button" type="submit">Update my reading <ArrowRight size={17} /></button>
            </form>
            <div className="privacy-note"><LockKeyhole size={15} /><span>Your birth details are private and never sold.</span></div>
          </aside>

          <section className="report-panel">
            <div className="report-toolbar">
              <div className="tab-list" role="tablist" aria-label="Report sections">
                {['Overview', 'Vedic', 'Western', 'Numbers'].map((tab) => <button key={tab} className={activeTab === tab ? 'tab active' : 'tab'} onClick={() => setActiveTab(tab)} type="button" role="tab" aria-selected={activeTab === tab}>{tab}</button>)}
              </div>
              <button className="icon-button" type="button" title="Download report"><Download size={17} /></button>
            </div>

            {generated && <div className="report-content">
              <div className="report-title-row"><div><p className="section-kicker">A reading for {submittedForm.name || 'you'}</p><h2>{activeTab === 'Overview' ? 'Your inner compass' : `${activeTab} overview`}</h2></div><span className="date-stamp">{submittedForm.date.split('-').reverse().join(' ')}<br />{submittedForm.time} LOCAL</span></div>
              <p className="report-lead">{reading.lead} This is a traditional interpretation for reflection, not a guarantee of what will happen.</p>

              {activeTab === 'Vedic' && <section className="vedic-focus"><div className="focus-heading"><div><p className="section-kicker">Classical Jyotisha lens</p><h3>Read the chart from the Moon outward</h3></div><span>Demo calculation</span></div><p className="focus-intro">{reading.vedicInterpretation} The structure follows familiar concepts from traditional Jyotisha such as Rashi, Lagna, Nakshatra, Vimshottari Dasha, and Bhava reading. It does not reproduce passages from any book or claim a precise astronomical result.</p><div className="vedic-facts"><div><span>Chandra Rashi</span><strong>{reading.rashi}</strong><small>Moon sign</small></div><div><span>Lagna</span><strong>{reading.lagna}</strong><small>Ascendant sign</small></div><div><span>Nakshatra</span><strong>{reading.nakshatra}</strong><small>Lord: {reading.nakshatraLord}</small></div><div><span>Tithi</span><strong>{reading.tithi}</strong><small>Lunar day estimate</small></div></div><div className="dasha-pair"><div><span>Mahadasha</span><strong>{reading.mahaDasha}</strong><small>Main period in this reading</small></div><div><span>Antar Dasha</span><strong>{reading.antarDasha}</strong><small>Sub-period lens</small></div><p>Traditional reading prompt: observe which responsibilities, relationships, or learning themes feel active during this period. Use practical evidence before making decisions.</p></div><p className="accuracy-callout"><ShieldCheck size={16} /> For an accurate kundli, Nakshatra pada, houses, aspects, Sade Sati, and Dasha dates, connect Swiss Ephemeris with historical timezone and geocoding data.</p></section>}
              {activeTab === 'Western' && <section className="focus-summary western-focus"><p className="section-kicker">Western astrology lens</p><h3>{reading.westernSun} Sun in a personal sky</h3><p>This traditional reading uses the Sun as a reflection prompt for identity, agency, and the qualities you may practice publicly. Exact Moon, rising sign, houses, and aspects require astronomical ephemeris calculations for the submitted birth moment.</p><div className="focus-pills"><span>Sun: {reading.westernSun}</span><span>Rising screen: {reading.lagna}</span><span>Major aspects: pending ephemeris</span></div></section>}
              {activeTab === 'Numbers' && <section className="focus-summary numbers-focus"><p className="section-kicker">Numerology lens</p><h3>Life Path {reading.lifePath}: {reading.numerologyTheme}</h3><p>Numerology is presented as a symbolic language for reflection. Explore where this theme appears in your habits, choices, and relationships rather than treating the number as a fixed forecast.</p><div className="number-row"><div><strong>{reading.lifePath}</strong><span>Life Path</span></div><div><strong>{reduceNumerology(sumDigits(submittedForm.date) + submittedForm.name.replace(/\s/g, '').length)}</strong><span>Name + date theme</span></div><div><strong>{submittedForm.name ? submittedForm.name.trim().length : 0}</strong><span>Name letters</span></div></div></section>}

              <div className="insight-grid">
                <article className="insight-card accent-yellow"><div className="card-icon"><Sun size={18} /></div><p className="card-label">Western sun</p><h3>{reading.westernSun}</h3><p>Traditionally associated with your outward style and the qualities you may practice in the world.</p><button type="button">Read interpretation <ArrowRight size={14} /></button></article>
                <article className="insight-card accent-blue"><div className="card-icon"><Moon size={18} /></div><p className="card-label">Vedic moon</p><h3>{reading.vedicMoon}</h3><p>A traditional lens for noticing emotional rhythm, attention, and the way you process connection.</p><button type="button">Read interpretation <ArrowRight size={14} /></button></article>
                <article className="insight-card accent-coral"><div className="card-icon"><Sparkles size={18} /></div><p className="card-label">Life path</p><h3>{reading.lifePath} <span>Reflection number</span></h3><p>A numerology theme traditionally read through the choices and lessons that shape your perspective.</p><button type="button">Read interpretation <ArrowRight size={14} /></button></article>
              </div>

              <div className="chart-summary"><div className="summary-heading"><div><p className="section-kicker">The positions</p><h3>What was written in the sky</h3></div><button className="text-button" type="button">View full chart <ArrowRight size={15} /></button></div><div className="position-table"><div className="table-head"><span>Body</span><span>Sign</span><span>Degree</span><span>House</span></div>{reading.positions.map(([body, sign, degree, house]) => <div className="table-row" key={body}><strong>{body}</strong><span>{sign}</span><span>{degree}</span><span>{house}</span></div>)}</div></div>
              <div className="timeline-section"><div className="summary-heading"><div><p className="section-kicker">Traditional timing lens</p><h3>Vimshottari-style periods</h3></div><span className="timeline-note">{reading.timeline[0].planet} is highlighted now</span></div><div className="timeline-list">{reading.timeline.map((period) => <div className={period.current ? 'timeline-item current' : 'timeline-item'} key={period.planet}><span className="timeline-marker" /><div><strong>{period.planet}</strong><span>{period.label}</span></div><time>{period.years}</time></div>)}</div><p className="interpretation-note">Traditional interpretation: the highlighted period can be used as a prompt to notice where you are directing attention, energy, and patience. It does not predict a specific event.</p></div>
              <section className="reading-deep-dive"><div className="deep-dive-heading"><p className="section-kicker">The useful detail</p><h3>Timing, care, and meaning</h3><span>Traditional guidance for reflection</span></div><div className="deep-grid"><article className="deep-card sade-card"><div className="deep-card-title"><Orbit size={17} /><strong>Sade Sati screen</strong></div><h4>{reading.sadeSati ? `Possible ${reading.sadeSatiPhase}` : 'Not flagged in this screen'}</h4><p>{reading.sadeSati ? 'Saturn’s seven-and-a-half-year transit is traditionally read as a season for maturity, boundaries, and simplifying commitments.' : 'Based on this demo moon-sign screen, Saturn’s traditional Sade Sati window is not highlighted. A precise result needs a Swiss Ephemeris Moon longitude and current Saturn transit.'}</p></article><article className="deep-card dasha-card"><div className="deep-card-title"><Sparkles size={17} /><strong>{reading.mahaDasha} Mahadasha</strong></div><div className="pros-cons"><div><b>Can support</b>{reading.benefits.map((item) => <span key={item}>+ {item}</span>)}</div><div><b>Watch for</b>{reading.cons.map((item) => <span key={item}>− {item}</span>)}</div></div></article><article className="deep-card guidance-card"><div className="deep-card-title"><ShieldCheck size={17} /><strong>Precautions & remedies</strong></div><ul>{reading.precautions.map((item) => <li key={item}>{item}</li>)}{reading.remedies.map((item) => <li key={item}>{item}</li>)}</ul></article><article className="deep-card crystal-card"><div className="deep-card-title"><Sparkles size={17} /><strong>Symbolic companions</strong></div><h4>{reading.crystal}</h4><p>Traditionally chosen as a reminder of {reading.numerologyTheme}. Wear or keep it only if it feels grounding; no crystal can guarantee an outcome.</p><div className="deity-line"><HeartHandshake size={16} /> <span><b>Devotional tradition:</b> {reading.deity}</span></div></article></div></section>
              <section className="numerology-panel"><div><p className="section-kicker">Numerology reflection</p><h3>Life Path {reading.lifePath}: {reading.numerologyTheme}</h3><p>Your name and date can be explored as symbols for journaling: what are you learning to begin, sustain, release, or communicate? This is a traditional numerology interpretation, not a forecast.</p></div><div className="numerology-seal">{reading.lifePath}<small>life path</small></div></section>
              <div className="add-section"><span><Plus size={16} /> Continue exploring</span><small>Antar dasha, transits, aspects, and your full numerology profile</small></div>
            </div>}
          </section>
        </section>

        <section className="disclaimer" id="about"><div className="disclaimer-icon">✦</div><div><strong>A note on what this is.</strong><p>AstroNumero offers traditional interpretations for reflection and entertainment. It does not predict events or replace medical, legal, or financial advice. Your chart is a lens, not a verdict.</p></div><a href="#about">Read our approach <ArrowRight size={15} /></a></section>
      </main>
      <footer><span>© 2026 AstroNumero</span><span>Made with care for curious people</span><span><a href="#about">Privacy</a> <a href="#about">Terms</a></span></footer>
    </div>
  )
}

export default App