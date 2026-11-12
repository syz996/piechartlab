'use client';
import { useMemo, useRef, useState } from 'react';
import { arcPath, getPercentages, Slice } from '@/lib/chart';
import { themes } from '@/lib/themes';
import { FAQS, STEPS, TOOLS } from '@/lib/content';
import { SITE_URL } from '@/lib/site';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

const initial: Slice[] = [
  { id: '1', label: 'Rent', value: 1200 },
  { id: '2', label: 'Groceries', value: 600 },
  { id: '3', label: 'Transport', value: 400 },
  { id: '4', label: 'Fun', value: 300 },
  { id: '5', label: 'Savings', value: 500 },
];
const APP_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Pie Chart Maker',
  url: SITE_URL,
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Create a pie chart online for free. Edit data, customize colors and labels, and download as PNG or SVG. No signup required.',
};

const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

type LabelMode = 'percent' | 'value' | 'label' | 'none';
export default function ChartStudio() {
  const [slices, setSlices] = useState(initial);
  const [themeId, setThemeId] = useState('vivid');
  const [labelMode, setLabelMode] = useState<LabelMode>('percent');
  const [legend, setLegend] = useState(true);
  const [donut, setDonut] = useState(false);
  const [hole, setHole] = useState(58);
  const [title, setTitle] = useState('Monthly expenses');
  const [notice, setNotice] = useState('');
  const svgRef = useRef<SVGSVGElement>(null);
  const theme = themes.find(t => t.id === themeId) ?? themes[0];
  const percentages = useMemo(() => getPercentages(slices), [slices]);
  const total = slices.reduce((sum, s) => sum + (Number.isFinite(s.value) && s.value > 0 ? s.value : 0), 0);
  const valid = slices.length > 0 && total > 0;
  const update = (id: string, patch: Partial<Slice>) => setSlices(old => old.map(s => s.id === id ? { ...s, ...patch } : s));
  const add = () => setSlices(old => [...old, { id: crypto.randomUUID(), label: `Item ${old.length + 1}`, value: 100 }]);
  const remove = (id: string) => setSlices(old => old.filter(s => s.id !== id));
  const exportSvg = () => {
    if (!svgRef.current) return;
    const clone = svgRef.current.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', '900'); clone.setAttribute('height', '560');
    const blob = new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'pie-chart.svg'; a.click(); URL.revokeObjectURL(url);
  };
  const exportPng = () => {
    if (!svgRef.current) return;
    const clone = svgRef.current.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); clone.setAttribute('width', '1800'); clone.setAttribute('height', '1120');
    const source = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' }); const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => { const canvas = document.createElement('canvas'); canvas.width = 1800; canvas.height = 1120; const ctx = canvas.getContext('2d'); if (ctx) { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 1800, 1120); ctx.drawImage(img, 0, 0, 1800, 1120); canvas.toBlob(png => { if (!png) return; const pngUrl = URL.createObjectURL(png); const a = document.createElement('a'); a.href = pngUrl; a.download = 'pie-chart.png'; a.click(); URL.revokeObjectURL(pngUrl); }, 'image/png'); } URL.revokeObjectURL(url); };
    img.onerror = () => { URL.revokeObjectURL(url); setNotice('PNG export failed. Try SVG instead.'); };
    img.src = url;
  };
  let cursor = 0;
  const segments = slices.map((slice, i) => { const pct = percentages[i] ?? 0; const start = cursor; const end = cursor + (total > 0 ? (Math.max(0, slice.value) / total) * 360 : 0); cursor = end; return { slice, pct, start, end, color: theme.colors[i % theme.colors.length] }; });

  return <main className="page-shell">
    <SiteHeader active="/" />
    <section className="intro"><div className="eyebrow"><span className="eyebrow-dot" /> FREE ONLINE TOOL</div><h1>Pie Chart Maker</h1><p>Create a clear pie chart in seconds. Edit your data, customize the look, and download your chart — no signup required.</p></section>
    <section className="studio" id="editor">
      <div className="studio-heading"><div><div className="section-kicker">CHART WORKSPACE</div><h2>Your chart</h2></div><div className="live-state"><span /> Live preview</div></div>
      <div className="workspace-grid">
        <section className="preview-panel">
          <div className="preview-toolbar"><span className="panel-title">Preview</span><div className="export-actions"><button className="button button-secondary button-small" onClick={exportSvg}>Download SVG</button><button className="button button-primary button-small" onClick={exportPng}>Download PNG</button></div></div>
          <div className="chart-stage">
            {valid ? <svg ref={svgRef} className="chart-svg" viewBox="0 0 620 390" role="img" aria-label="Pie chart preview">
              <rect x="0" y="0" width="620" height="390" fill="#fff" />
              <text x="310" y="34" textAnchor="middle" className="chart-heading">{title || 'Untitled chart'}</text>
              <g transform="translate(0 5)">
                {segments.map(({ slice, pct, start, end, color }, i) => {
                  const path = arcPath(270, 190, 126, start, end);
                  const mid = (start + end) / 2; const rad = (mid - 90) * Math.PI / 180; const labelR = donut ? hole * 1.26 + 12 : 78;
                  const lx = Number((270 + labelR * Math.cos(rad)).toFixed(3));
                  const ly = Number((190 + labelR * Math.sin(rad)).toFixed(3));
                  const text = labelMode === 'percent' ? `${pct.toFixed(1)}%` : labelMode === 'value' ? String(slice.value) : slice.label;
                  return <g key={slice.id}>{end - start >= 359.99 ? <circle cx="270" cy="190" r="126" fill={color} stroke="#fff" strokeWidth="2" /> : <path d={path} fill={color} stroke="#fff" strokeWidth="2" />}{labelMode !== 'none' && pct >= 4 && <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="slice-label">{text}</text>}</g>;
                })}
                {donut && <circle cx="270" cy="190" r={hole * 1.26} fill="#fff" />}
                {donut && <g><text x="270" y="183" textAnchor="middle" className="donut-total">{total.toLocaleString()}</text><text x="270" y="204" textAnchor="middle" className="donut-caption">TOTAL</text></g>}
              </g>
              {legend && <g>{segments.map(({ slice, color }, i) => { const col = i < 5 ? 0 : 1; const row = i % 5; const x = col === 0 ? 455 : 545; const y = 112 + row * 34; return <g key={slice.id}><rect x={x - 4} y={y - 9} width="10" height="10" rx="3" fill={color} /><text x={x + 12} y={y} className="legend-label">{slice.label.length > 10 ? slice.label.slice(0, 9) + '…' : slice.label}</text></g>; })}</g>}
            </svg> : <div className="empty-preview"><div className="empty-icon">◔</div><strong>Your chart will appear here</strong><span>Add at least one item with a value above zero.</span></div>}
          </div>
          <div className="preview-foot"><span><span className="status-dot" /> Changes update automatically</span><span>{slices.length} data points</span></div>
        </section>
        <aside className="controls-column">
          <section className="control-card data-card"><div className="card-heading"><div><div className="section-kicker">01 / DATA</div><h3>Your data</h3></div><span className="total-chip">Total <b>{total.toLocaleString()}</b></span></div>
            <div className="data-head"><span>LABEL</span><span>VALUE</span><span /></div>
            <div className="data-rows">{slices.map((s, i) => <div className="data-row" key={s.id}><span className="row-color" style={{ background: theme.colors[i % theme.colors.length] }} /><input aria-label={`Label ${i + 1}`} value={s.label} onChange={e => update(s.id, { label: e.target.value })} /><input aria-label={`Value ${i + 1}`} className="number-input" type="number" min="0" value={s.value} onChange={e => update(s.id, { value: Math.max(0, Number(e.target.value) || 0) })} /><button className="remove-row" aria-label={`Remove ${s.label}`} onClick={() => remove(s.id)}>×</button></div>)}</div>
            <button className="add-row" onClick={add}>＋ <span>Add a row</span></button>
            <div className="data-bottom"><span>{slices.length} rows</span><button onClick={() => setSlices(initial)}>Reset sample data</button></div>
          </section>
          <section className="control-card settings-card"><div className="card-heading"><div><div className="section-kicker">02 / STYLE</div><h3>Customize</h3></div></div>
            <label className="field-label" htmlFor="chart-title">Chart title</label><input id="chart-title" className="text-field" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter chart title" />
            <div className="field-block"><span className="field-label">Color theme</span><select className="text-field" value={themeId} onChange={e => setThemeId(e.target.value)}>{themes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select><div className="swatches">{theme.colors.slice(0, 8).map(c => <span key={c} style={{ background: c }} />)}</div></div>
            <div className="settings-two"><div><label className="field-label" htmlFor="label-mode">Slice labels</label><select id="label-mode" className="text-field" value={labelMode} onChange={e => setLabelMode(e.target.value as LabelMode)}><option value="percent">Percentages</option><option value="value">Values</option><option value="label">Names</option><option value="none">None</option></select></div><div><label className="field-label" htmlFor="chart-type">Chart shape</label><select id="chart-type" className="text-field" value={donut ? 'donut' : 'pie'} onChange={e => setDonut(e.target.value === 'donut')}><option value="pie">Pie chart</option><option value="donut">Donut chart</option></select></div></div>
            {donut && <div className="field-block"><div className="range-heading"><label className="field-label" htmlFor="hole-size">Hole size</label><span>{hole}%</span></div><input id="hole-size" type="range" min="35" max="72" value={hole} onChange={e => setHole(Number(e.target.value))} /></div>}
            <label className="toggle-line"><span><b>Show legend</b><small>Display category names beside chart</small></span><input type="checkbox" checked={legend} onChange={e => setLegend(e.target.checked)} /></label>
          </section>
        </aside>
      </div>
      {notice && <p className="notice">{notice}</p>}
    </section>
    <section className="explainer" id="what-is-a-pie-chart">
      <div className="section-kicker">THE BASICS</div>
      <h2>What is a pie chart, and when should you use one?</h2>
      <p>A pie chart shows how one total splits into parts. Each slice is a category and its angle is that category&apos;s share of the whole, so a slice worth 25% takes up a quarter of the circle. It works best when you have a handful of categories that add up to something real — a monthly budget, a survey result, a traffic breakdown, a class of students. The chart only means something if the slices sum to 100%.</p>
      <p>It is the wrong choice when the parts do not add up to a whole, when there are more than about seven categories, or when the slices look almost the same size. At that point a bar chart beats it every time, because comparing lengths is far easier for the eye than comparing angles. If you need to show change over time, use a line chart: a pie has no axis, so it cannot show a trend.</p>
      <h2>Pie chart or bar chart — which one?</h2>
      <p>Pick a pie when the message is &quot;this part versus the whole&quot; and you have five to seven parts. Pick a bar chart when the message is &quot;A is bigger than B&quot; or when several values sit close together, since bars give the reader a shared baseline to measure against. A donut chart is the same as a pie with the middle removed — useful when you want to put the total, or a single headline number, inside the chart.</p>
      <h2>Common ways people use this pie chart maker</h2>
      <p>This tool is used most often for a monthly budget split, a marketing channel breakdown, survey and poll results, and school or team project figures. In each case the workflow is the same: type your labels and values, check the percentages the tool calculates, adjust the colors and labels, then download a PNG for a document or an SVG for anything that will be printed or resized.</p>
    </section>
    <section className="below-content" id="how-it-works">
      <div className="section-kicker">GET STARTED</div>
      <h2>How to make a pie chart</h2>
      <div className="steps">
        {STEPS.map((s, i) => (
          <article key={s.name}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            <h3>{s.name}</h3>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
    </section>
    <p className="faq-more">
      New to pie charts? Start with{' '}
      <a href="/how-to/make-a-pie-chart/">how to make a pie chart</a>, or browse{' '}
      <a href="/pie-chart-examples/">pie chart examples</a> before you build one.
    </p>
    <section className="faq" id="faq">
      <div className="section-kicker">HELP CENTER</div>
      <h2>Frequently asked questions</h2>
      {FAQS.map(({ q, a }) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </section>

    {TOOLS.some(t => t.live) && (
      <section className="related">
        <h2>Related tools</h2>
        <ul>
          {TOOLS.filter(t => t.live).map(t => (
            <li key={t.href}><a href={t.href}>{t.label}</a></li>
          ))}
        </ul>
      </section>
    )}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_LD) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
    <SiteFooter />
  </main>;
}
