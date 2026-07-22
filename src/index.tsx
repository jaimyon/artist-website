import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

const SOCIAL_LINKS = [
  { name: 'IMDb', href: 'https://www.imdb.com/name/nm1830014/?ref_=nv_sr_srsg_0_tt_0_nm_5_in_0_q_Jaimyon%20Parker', word: true },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/jaimyonparker/',
    path: 'M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.67.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13C21.33 1.35 20.65.94 19.86.63 19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88z',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/jaimyon.parker.2025/',
    path: 'M22.68 0H1.32C.59 0 0 .59 0 1.32v21.36C0 23.41.59 24 1.32 24h11.5v-9.29H9.69v-3.62h3.13V8.41c0-3.1 1.89-4.79 4.66-4.79 1.33 0 2.47.1 2.8.14v3.24l-1.92.00c-1.51 0-1.8.72-1.8 1.77v2.32h3.6l-.47 3.62h-3.13V24h6.13c.73 0 1.32-.59 1.32-1.32V1.32C24 .59 23.41 0 22.68 0z',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@jaimyon?is_from_webapp=1&sender_device=pc',
    path: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.19 8.19 0 0 0 4.77 1.52V6.73a4.81 4.81 0 0 1-1.84-.04z',
  },
]

function socialLinksHtml(size = 14) {
  return SOCIAL_LINKS.map((s) => {
    if (s.word) {
      return `<a href="${s.href}" target="_blank" rel="noopener noreferrer" class="social-link social-link-word" aria-label="${s.name}">${s.name}</a>`
    }
    return `<a href="${s.href}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="${s.name}" title="${s.name}"><svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" aria-hidden="true"><path d="${s.path}"/></svg></a>`
  }).join('')
}

const NAV_SECTIONS = [
  { id: 'acting', label: 'Acting' },
  { id: 'skp', label: 'Skeleton Key' },
  { id: 'photography', label: 'Photography' },
  { id: 'design', label: 'Design' },
  { id: 'about', label: 'About' },
]

const CREDITS = [
  { project: 'Therapy', role: 'Supporting', production: 'Skeleton Key Pictures', type: 'Short' },
  { project: 'The Silent Contender', role: 'Supporting', production: 'Write Time Media', type: 'Short' },
  { project: 'All Rise', role: 'Co-Star', production: 'OWN Productions', type: 'Series' },
  { project: 'Better Things', role: 'Guest Star', production: 'FX Productions', type: 'Series' },
  { project: 'In The Cut', role: 'Recurring', production: 'Bent Outta Shape Productions', type: 'Series' },
  { project: 'Bones', role: 'Guest Star', production: '20th Century Fox', type: 'Series' },
  { project: 'Transgress', role: 'Supporting', production: 'Silver Lining Entertainment', type: 'Short' },
  { project: 'Angels Ladder', role: 'Supporting', production: 'Hozgoz Entertainment', type: 'Short' },
  { project: 'Dead Cruelty', role: 'Supporting', production: 'DOB Productions', type: 'Feature' },
  { project: 'I Got The Hook Up 2', role: 'Supporting', production: 'Genius Minds', type: 'Feature' },
]

const ACTING_GALLERY = [
  { id: 'headshot-1', kind: 'Headshot', label: 'Photo: Michael Roud', ratio: '3/4', img: '/static/images/acting/headshot-1.jpg' },
  { id: 'headshot-2', kind: 'Headshot', label: 'Photo: Inda Reid', ratio: '3/4', img: '/static/images/acting/headshot-2.jpg' },
  { id: 'onset-1', kind: 'On set', label: 'The Long Return', ratio: '4/3', img: '/static/images/acting/onset-1.jpg' },
  { id: 'onset-2', kind: 'On set', label: 'Blueprint', ratio: '4/3', img: '/static/images/acting/onset-2.jpg' },
  { id: 'editorial-1', kind: 'Editorial', label: 'Northlight № 04', ratio: '3/4', img: '/static/images/acting/editorial-1.jpg' },
  { id: 'modeling-1', kind: 'Modeling', label: 'Aesop AW24', ratio: '3/4', img: '/static/images/acting/modeling-1.jpg' },
  { id: 'onset-3', kind: 'On set', label: 'Nightbloom', ratio: '4/3', img: '/static/images/acting/onset-3.jpg' },
  { id: 'modeling-2', kind: 'Modeling', label: 'Ferragamo SS25', ratio: '3/4', img: '/static/images/acting/modeling-2.jpg' },
  { id: 'editorial-2', kind: 'Editorial', label: "L'Officiel Hommes", ratio: '3/4', img: '/static/images/acting/editorial-2.jpg' },
  { id: 'onset-4', kind: 'On set', label: 'Halcyon', ratio: '4/3', img: '/static/images/acting/onset-4.jpg' },
  { id: 'headshot-3', kind: 'Headshot', label: 'Character · 2024', ratio: '3/4', img: '/static/images/acting/headshot-3.jpg' },
  { id: 'onset-5', kind: 'On set', label: 'Interior. Kitchen.', ratio: '4/3', img: '/static/images/acting/onset-5.jpg' },
]

const REEL_OPTIONS = [
  { id: 'acting-reel', label: 'Acting Reel', duration: '01:59', img: 'https://i.ytimg.com/vi/4rKW78wrz18/maxresdefault.jpg', youtubeId: '4rKW78wrz18' },
  { id: 'better-things', label: 'Better Things | FX', duration: '04:18', img: 'https://i.ytimg.com/vi/W6z46fLzoMc/maxresdefault.jpg', youtubeId: 'W6z46fLzoMc' },
  { id: 'bones', label: 'Bones | FOX', duration: '00:58', img: 'https://i.ytimg.com/vi/dTg3-Ag71mY/maxresdefault.jpg', youtubeId: 'dTg3-Ag71mY' },
  { id: 'in-the-cut', label: 'In The Cut | BOUNCE', duration: '02:13', img: 'https://i.ytimg.com/vi/L9LmjvYnHm0/maxresdefault.jpg', youtubeId: 'L9LmjvYnHm0' },
  { id: 'therapy', label: 'Therapy | SKP', duration: '06:30', img: 'https://i.ytimg.com/vi/sbBgzsdnghQ/maxresdefault.jpg', youtubeId: 'sbBgzsdnghQ' },
]

const SLATE = [
  { title: 'The Long Return', meta: 'Feature · Dir. M. Okafor · 2025', status: 'In post', cls: '' },
  { title: 'Salt of the Land', meta: 'Feature · Dir. R. Adeyemi', status: 'In development', cls: 'dev' },
  { title: 'Interior. Kitchen. Dawn.', meta: 'Short · Dir. R. Adeyemi · 2023', status: 'Released', cls: 'released' },
  { title: 'Untitled Iyer Project', meta: 'Limited Series · Dir. P. Iyer', status: 'In development', cls: 'dev' },
]

const PRESS = [
  { fest: 'Sundance', note: 'Official Selection — 2024' },
  { fest: 'Rotterdam', note: 'Bright Future — 2024' },
  { fest: 'SXSW', note: 'Narrative Spotlight — 2023' },
  { fest: 'TIFF', note: 'Discovery — 2022' },
]

const SERIES = [
  {
    num: 'S01',
    title: 'Interior States',
    year: '2024',
    loc: 'Los Angeles',
    layout: 'layout-a',
    images: [
      '/static/images/photo/s01-1.jpg',
      '/static/images/photo/s01-2.jpg',
      '/static/images/photo/s01-3.jpg',
      '/static/images/photo/s01-4.jpg',
    ],
  },
  {
    num: 'S02',
    title: 'Portraits, Between Takes',
    year: '2023–24',
    loc: 'NYC · LA · Mexico City',
    layout: 'layout-b',
    images: [
      '/static/images/photo/s02-1.jpg',
      '/static/images/photo/s02-2.jpg',
      '/static/images/photo/s02-3.jpg',
      '/static/images/photo/s02-4.jpg',
    ],
  },
  {
    num: 'S03',
    title: 'Salt / Light',
    year: '2023',
    loc: 'Baja California',
    layout: 'layout-c',
    images: [
      '/static/images/photo/s03-1.jpg',
      '/static/images/photo/s03-2.jpg',
      '/static/images/photo/s03-3.jpg',
      '/static/images/photo/s03-4.jpg',
    ],
  },
]

const DESIGN_WORK = [
  { name: 'Halcyon', tag: 'Film / Key art', img: '/static/images/design/halcyon.jpg' },
  { name: 'Nightbloom', tag: 'Film / Title design', img: '/static/images/design/nightbloom.jpg' },
  { name: 'Northlight Journal', tag: 'Editorial', img: '/static/images/design/northlight.jpg' },
  { name: 'SKP Slate 24', tag: 'Identity', img: '/static/images/design/skp-slate.jpg' },
  { name: 'Room in Salamanca', tag: 'Poster', img: '/static/images/design/salamanca.jpg' },
  { name: 'The Cartographer', tag: 'Book cover', img: '/static/images/design/cartographer.jpg' },
  { name: 'Interior. Kitchen.', tag: 'Film / Titles', img: '/static/images/design/interior-kitchen.jpg' },
  { name: 'Field Guide № 03', tag: 'Print', img: '/static/images/design/field-guide.jpg' },
  { name: 'Blueprint OST', tag: 'Sleeve', img: '/static/images/design/blueprint-ost.jpg' },
]

function navHtml() {
  const links = NAV_SECTIONS.map((s) => `<a href="#${s.id}">${s.label}</a>`).join('')
  return `
  <nav class="nav">
    <a href="#top" class="nav-logo">Jaimyon Parker<em> — index</em></a>
    <div class="nav-links" id="nav-links">
      ${links}
      <a href="#contact">Contact</a>
      <span class="nav-divider" aria-hidden="true"></span>
      <span class="nav-socials">${socialLinksHtml(14)}</span>
    </div>
    <button class="nav-mobile-toggle" aria-label="Toggle menu">Menu</button>
  </nav>`
}

function sectionRailHtml() {
  const items = [{ id: 'acting', label: '01 Acting' }, { id: 'skp', label: '02 Skeleton Key' }, { id: 'photography', label: '03 Photography' }, { id: 'design', label: '04 Design' }, { id: 'about', label: '05 About' }]
  const links = items
    .map((it) => `<a href="#${it.id}" data-target="${it.id}"><span>${it.label}</span></a>`)
    .join('')
  return `
  <aside class="section-rail" aria-hidden="true">
    <a href="#top"><span>Top</span></a>
    ${links}
    <a href="#contact" data-target="contact"><span>Contact</span></a>
  </aside>`
}

function sectionHeadHtml(idx: number, label: string, meta: string) {
  return `
  <div class="section-head reveal">
    <div><span class="idx">${String(idx).padStart(2, '0')} /</span> <span class="label">${label}</span></div>
    <div class="meta">${meta}</div>
  </div>`
}

function heroHtml() {
  return `
  <header class="hero" id="top">
    <div class="hero-media">
      <img src="/static/images/brand/hero-portrait.jpg" alt="Cinematic portrait of Jaimyon Parker" fetchpriority="high" />
    </div>

    <button class="hero-sound" aria-label="Toggle sound indicator">
      <span class="bars"><span></span><span></span><span></span><span></span></span>
      <span class="sound-label">Sound on</span>
    </button>

    <div class="hero-scroll">Scroll ↓ Roll credits</div>

    <div class="hero-inner">
      <div></div>
      <div>
        <h1 class="hero-name reveal-clip"><span>Jaimyon Parker</span></h1>
        <div class="hero-meta">
          <div class="roles">
            <span>Actor</span><span>Producer</span><span>Photographer</span><span>Designer</span>
          </div>
          <div class="loc">Los Angeles · New York · Worldwide</div>
          <div class="right">Est. 2016 · 41°N 74°W</div>
        </div>
      </div>
    </div>
  </header>`
}

function aboutHtml() {
  return `
  <section class="about" id="about" data-section="about">
    ${sectionHeadHtml(5, 'About', 'Bio · Ethos')}
    <div class="about-body">
      <div class="about-portrait reveal">
        <img src="/static/images/brand/about-portrait.jpg" alt="Editorial portrait of Jaimyon Parker" loading="lazy" />
      </div>
      <div class="about-text">
        <p class="lede reveal">A storyteller working across the frame — <em>on it, behind it, and around it.</em></p>
        <p class="body-lg reveal" style="--rd:120ms">
          Jaimyon Parker is an actor and multidisciplinary artist whose practice moves fluidly
          between performance, production, and visual craft. Founder of Skeleton Key Pictures,
          a company built to develop patient, character-first cinema. His photography and
          graphic work extend the same instinct — quiet observation, cinematic composition, and
          a careful eye for the interior life of things.
        </p>
        <p class="body-lg reveal" style="--rd:220ms">
          Based between Los Angeles and New York. Available for select collaborations across
          film, television, editorial, and brand.
        </p>
        <div class="about-roles">
          <div class="about-role reveal">Discipline 01<strong>Acting</strong></div>
          <div class="about-role reveal" style="--rd:80ms">Discipline 02<strong>Producing</strong></div>
          <div class="about-role reveal" style="--rd:160ms">Discipline 03<strong>Photography</strong></div>
          <div class="about-role reveal" style="--rd:240ms">Discipline 04<strong>Graphic Design</strong></div>
        </div>
      </div>
    </div>
  </section>`
}

function actingGalleryHtml() {
  const items = ACTING_GALLERY.map(
    (img) => `
      <figure class="acting-gallery-item" style="--ar:${img.ratio}">
        <div class="frame" data-lightbox="acting"><img src="${img.img}" alt="${img.kind} — ${img.label}" loading="lazy" /></div>
        <figcaption><span class="k">${img.kind}</span><span class="l">${img.label}</span></figcaption>
      </figure>`
  ).join('')
  return `
  <div class="acting-gallery">
    <div class="acting-gallery-head reveal">
      <div class="section-head" style="margin:0;border-bottom:none">
        <div><span class="idx">02.5 /</span> <span class="label">Portfolio</span></div>
        <div class="meta">Headshots · Editorial · Modeling · On set</div>
      </div>
      <div class="acting-gallery-nav">
        <button data-rail-nav="prev" aria-label="Scroll left">←</button>
        <button data-rail-nav="next" aria-label="Scroll right">→</button>
      </div>
    </div>
    <div class="acting-gallery-rail reveal">
      ${items}
      <div class="acting-gallery-endcap"><span>End</span></div>
    </div>
  </div>`
}

function reelMenuHtml() {
  const items = REEL_OPTIONS.map(
    (r, i) => `<button type="button" class="reel-menu-item${i === 0 ? ' active' : ''}" data-reel-id="${r.id}" data-reel-img="${r.img}" data-reel-label="${r.label}" data-reel-duration="${r.duration}"${r.youtubeId ? ` data-reel-youtube="${r.youtubeId}"` : ''}>${r.label}</button>`
  ).join('')
  return `<div class="reel-menu reveal" style="--rd:240ms" role="tablist" aria-label="Choose a reel to preview">${items}</div>`
}

function actingHtml() {
  const rows = CREDITS.map(
    (c) => `
      <tr>
        <td class="project">${c.project}<span class="type-tag">${c.type}</span></td>
        <td class="role hide-sm">${c.role}</td>
        <td class="director">${c.production}</td>
      </tr>`
  ).join('')
  return `
  <section class="acting" id="acting" data-section="acting">
    ${sectionHeadHtml(1, 'Acting', 'Reel · Selected credits · Representation')}

    <div class="acting-hero">
      <div class="reveal">
        <span class="eyebrow"><span class="dot"></span>2025 Showreel</span>
        <h2 class="display-3">Ten years, twenty roles, one throughline — <em style="font-style:italic;opacity:.55">presence.</em></h2>
      </div>
      <div class="reel-wrap">
        <div class="reel reveal" style="--rd:180ms" role="button" tabindex="0" aria-label="Play ${REEL_OPTIONS[0].label}"${REEL_OPTIONS[0].youtubeId ? ` data-youtube-id="${REEL_OPTIONS[0].youtubeId}"` : ''}>
          <img src="${REEL_OPTIONS[0].img}" alt="" />
          <span class="reel-label">REEL · ${REEL_OPTIONS[0].label}</span>
          <span class="reel-duration">${REEL_OPTIONS[0].duration}</span>
          <div class="play">Play</div>
        </div>
        ${reelMenuHtml()}
      </div>
    </div>

    <div class="reveal">
      <div class="eyebrow"><span class="dot"></span>Selected credits</div>
      <table class="credits">
        <thead><tr><th>Project</th><th class="hide-sm">Role</th><th>Production</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>

    ${actingGalleryHtml()}

    <div class="reps">
      <div class="rep-card reveal">
        <div class="lbl">Management (US)</div>
        <div class="name">ATN Entertainment</div>
        <div class="co">Jennifer DaRe</div>
        <a href="mailto:jennifer@atnentertainment.com">jennifer@atnentertainment.com</a>
      </div>
      <div class="rep-card reveal" style="--rd:100ms">
        <div class="lbl">Agent</div>
        <div class="name">Pastorini Bosby</div>
        <div class="co">Tierra Hollis</div>
        <a href="mailto:tierra@pbtalent.com">tierra@pbtalent.com</a>
      </div>
      <div class="rep-card reveal" style="--rd:200ms">
        <div class="lbl">Legal</div>
        <div class="name">Dieterich & Associates</div>
        <div class="co">Christopher Dieterich</div>
        <a href="mailto:venturelaw@gmail.com">venturelaw@gmail.com</a>
      </div>
    </div>
  </section>`
}

function skpHtml() {
  const slateItems = SLATE.map(
    (p) => `
      <div class="slate-item">
        <div class="status ${p.cls}"><span class="dot"></span> ${p.status}</div>
        <div class="arrow">↗</div>
        <div><div class="title">${p.title}</div><div class="meta">${p.meta}</div></div>
      </div>`
  ).join('')
  const pressItems = PRESS.map(
    (p) => `<div class="press-item"><div class="fest">${p.fest}</div><div class="note">${p.note}</div></div>`
  ).join('')
  return `
  <section class="skp" id="skp" data-section="skp">
    ${sectionHeadHtml(2, 'Skeleton Key Pictures', 'Production company · Est. 2019')}

    <div class="skp-mark reveal">
      <div class="key"></div>
      <div>Skeleton Key Pictures</div>
    </div>

    <div class="skp-hero">
      <div class="skp-manifesto reveal">
        <p>We make <em>patient</em> cinema — films that trust their audience and stay with their characters long after the scene should end.</p>
        <p class="sub">Founded in 2019, Skeleton Key develops and produces feature films and limited series with an emphasis on first- and second-time directors, character-driven scripts, and long collaborations.</p>
      </div>
      <div class="reveal" style="--rd:160ms">
        <div class="eyebrow"><span class="dot"></span>Current slate</div>
        <div class="slate">${slateItems}</div>
      </div>
    </div>

    <div class="press-strip reveal">
      <div class="lbl">Selected press &amp; festivals</div>
      <div class="press-list">${pressItems}</div>
    </div>
  </section>`
}

function photographyHtml() {
  const seriesHtml = SERIES.map((s) => {
    const items = s.images
      .map(
        (src, j) => `
        <div class="frame" data-lightbox="photo-${s.num}"><img src="${src}" alt="${s.title} — ${String(j + 1).padStart(2, '0')}" loading="lazy" /></div>`
      )
      .join('')
    return `
      <div class="photo-series">
        <div class="series-head reveal">
          <div class="num">${s.num}</div>
          <div class="title">${s.title}</div>
          <div class="meta">${s.loc} · ${s.year}</div>
        </div>
        <div class="series-grid ${s.layout} reveal">${items}</div>
      </div>`
  }).join('')
  return `
  <section class="photography" id="photography" data-section="photography">
    ${sectionHeadHtml(3, 'Photography', 'Curated series · 2021–2025')}
    ${seriesHtml}
  </section>`
}

function designHtml() {
  const items = DESIGN_WORK.map(
    (d, i) => `
      <div class="design-item reveal" style="--rd:${(i % 3) * 80}ms">
        <div class="frame" data-lightbox="design"><img src="${d.img}" alt="${d.name}" loading="lazy" /></div>
        <div class="caption"><span class="name">${d.name}</span><span class="tag">${d.tag}</span></div>
      </div>`
  ).join('')
  return `
  <section class="design" id="design" data-section="design">
    ${sectionHeadHtml(4, 'Graphic Design', 'Identity · Editorial · Film titles')}
    <div class="design-grid">${items}</div>
  </section>`
}

function contactHtml() {
  return `
  <section class="contact" id="contact" data-section="contact">
    ${sectionHeadHtml(6, 'Contact', 'Available for select work')}
    <h2 class="contact-head reveal">Let's make <em>something</em> — <br/>worth the runtime.</h2>
    <div class="contact-grid">
      <a class="contact-card reveal" href="mailto:booking@jaimyon.com">
        <div class="lbl">01 — Acting</div>
        <div><div class="kind">Booking</div><div class="desc">Feature, series, and select commercial inquiries via Harper &amp; Vale.</div></div>
        <div class="email">booking@jaimyon.com</div>
      </a>
      <a class="contact-card reveal" style="--rd:80ms" href="mailto:photodesign@jaimyon.com">
        <div class="lbl">02 — Creative</div>
        <div><div class="kind">Collaborate</div><div class="desc">Photography, design, and cross-disciplinary projects.</div></div>
        <div class="email">photodesign@jaimyon.com</div>
      </a>
      <a class="contact-card reveal" style="--rd:160ms" href="mailto:press@jaimyon.com">
        <div class="lbl">03 — Press</div>
        <div><div class="kind">Press</div><div class="desc">Interviews, features, and image requests.</div></div>
        <div class="email">press@jaimyon.com</div>
      </a>
      <a class="contact-card reveal" style="--rd:240ms" href="mailto:submissions@skeletonkeypictures.com">
        <div class="lbl">04 — SKP</div>
        <div><div class="kind">Submissions</div><div class="desc">Scripts, treatments, and partnership inquiries for Skeleton Key Pictures.</div></div>
        <div class="email">submissions@skeletonkeypictures.com</div>
      </a>
    </div>

    <footer class="footer">
      <div>© 2026 Jaimyon Parker · All rights reserved</div>
      <div class="center">Jaimyon Parker</div>
      <div class="socials">
        <a href="https://www.imdb.com/name/nm1830014/?ref_=nv_sr_srsg_0_tt_0_nm_5_in_0_q_Jaimyon%20Parker" target="_blank" rel="noopener noreferrer">IMDb</a>
        <a href="https://www.instagram.com/jaimyonparker/" target="_blank" rel="noopener noreferrer"> Artist Instagram</a>
        <a href="https://www.instagram.com/thruthelensofjaimyon/" target="_blank" rel="noopener noreferrer"> Photography & Design Instagram</a>
        <a href="https://www.facebook.com/jaimyon.parker.2025/" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://www.tiktok.com/@jaimyon?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">TikTok</a>
      </div>
    </footer>
  </section>`
}

function pageHtml() {
  return `<!doctype html>
<html lang="en" data-grain="off" data-cursor="default" data-sound="on">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Jaimyon Parker — Actor · Producer · Photographer · Designer</title>
  <meta name="description" content="Jaimyon Parker — actor and multidisciplinary creative. Founder, Skeleton Key Pictures. Acting, production, photography, and graphic design." />
  <meta property="og:title" content="Jaimyon Parker — Actor · Producer · Photographer · Designer" />
  <meta property="og:description" content="Founder, Skeleton Key Pictures. Explore acting credits, the SKP slate, photography series, and graphic design work." />
  <meta property="og:image" content="/static/images/brand/hero-portrait.jpg" />
  <meta name="theme-color" content="#000000" />
  <link rel="icon" type="image/png" href="/static/favicon.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="preload" as="image" href="/static/images/brand/hero-portrait.jpg" fetchpriority="high" />
  <link rel="stylesheet" href="/static/style.css" />
</head>
<body>
  <a href="#top" class="skip-link">Skip to content</a>
  <div class="crosshair" aria-hidden="true"></div>
  <div class="grain" aria-hidden="true"></div>

  ${navHtml()}
  ${sectionRailHtml()}
  ${heroHtml()}
  ${actingHtml()}
  ${skpHtml()}
  ${photographyHtml()}
  ${designHtml()}
  ${aboutHtml()}
  ${contactHtml()}

  <div id="lightbox-root"></div>

  <script src="/static/app.js"></script>
</body>
</html>`
}

app.get('/', (c) => c.html(pageHtml()))

export default app
