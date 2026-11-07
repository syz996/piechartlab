'use client';
import { useMemo, useRef, useState } from 'react';
import { arcPath, getPercentages, Slice } from '@/lib/chart';
import { themes } from '@/lib/themes';
import { FAQS, STEPS, TOOLS } from '@/lib/content';
import { SITE_URL } from '@/lib/site';

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
    <header className="topbar"><a className="brand" href="/"><span className="brand-mark">◔</span> PieChartLab</a><nav><a className="nav-active" href="#editor">Chart maker</a><a href="#how-it-works">How it works</a><a href="#faq">FAQ</a></nav><span className="topbar-note">Free online tool</span></header>
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
    <section className="below-content" id="how-it-works"><div className="section-kicker">GET STARTED</div><h2>A pie chart, made simple</h2><div className="steps"><article><span>01</span><h3>Enter your data</h3><p>Add labels and values, or replace the sample data with your own numbers.</p></article><article><span>02</span><h3>Make it yours</h3><p>Choose a color theme, adjust labels, and switch between pie and donut.</p></article><article><span>03</span><h3>Download and share</h3><p>Export a crisp PNG for documents or SVG for scalable graphics.</p></article></div></section>
    <section className="faq" id="faq"><div className="section-kicker">HELP CENTER</div><h2>Frequently asked questions</h2><details><summary>Is this pie chart maker free?</summary><p>Yes. You can create and download charts without creating an account.</p></details><details><summary>Can I download my chart?</summary><p>Yes. Download your chart as PNG or SVG directly from the preview area.</p></details><details><summary>Does my data get uploaded?</summary><p>This prototype processes chart data in your browser. It does not send your chart values to a server.</p></details></section>
    <footer><a className="brand" href="/"><span className="brand-mark">◔</span> PieChartLab</a><span>Simple charts. Clear decisions.</span><span>© 2026 PieChartLab</span></footer>
  </main>;
}
