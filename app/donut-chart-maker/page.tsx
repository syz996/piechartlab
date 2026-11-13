import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const TITLE = 'Donut Chart Maker: Free Doughnut Chart Online';
const DESC =
  'Make a donut chart online for free. Type your labels and values, switch the ring on, adjust the colours, and download a PNG or SVG. No signup, nothing uploaded.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/donut-chart-maker/' },
  openGraph: {
    type: 'article',
    url: '/donut-chart-maker/',
    siteName: 'PieChartLab',
    title: TITLE,
    description: DESC,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Donut chart maker' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: ['/og.png'],
  },
};

const BENEFITS = [
  {
    name: 'The hole removes the hardest part to read',
    text: 'Every slice of a circle is an angle, and angles get hard to compare once a slice is small. The hole takes the middle of the circle — where the slivers meet and their tips disappear — out of the picture, so the ring you do see is easier to judge at a glance.',
  },
  {
    name: 'A lighter shape in a dense report',
    text: 'A solid pie is a heavy black mass on a white page. The ring reads lighter, which is why dashboards and slide templates use it: the chart sits next to a table without shouting over it.',
  },
  {
    name: 'Room to label outside the circle',
    text: 'Because the ring is thinner than a full pie, the labels have more space around the outside. On a narrow slide or a phone screen that extra room is what keeps the text from landing on top of the slices.',
  },
];

const WHEN = [
  {
    name: 'Use a donut when the parts add up to one whole',
    text: 'A budget, a set of survey answers where each person picked one option, a team split by department. The ring shows share of a total, and the total has to be real: if the numbers overlap or do not sum to one thing, the chart is lying before you have drawn it.',
  },
  {
    name: 'Use a pie when there are only three or four slices',
    text: 'With very few, very large slices the solid circle reads better; the hole adds nothing. Donut charts earn their space when a legend or a label needs room around the ring.',
  },
  {
    name: 'Use a bar chart when the message is a ranking',
    text: 'If the point is "A is bigger than B", length is easier to compare than angle. The same rule applies to anything under about 5% — merge it into Other, or move the whole thing to a bar chart.',
  },
];

const FAQ = [
  {
    q: 'Is a doughnut chart the same as a donut chart?',
    a: 'Yes — same chart, two spellings. Doughnut is the longer spelling used in the UK and in Excel, donut is the one most people type in the US. This maker draws the same ring either way, so use whichever spelling you were taught.',
  },
  {
    q: 'What is the difference between a donut chart and a pie chart?',
    a: 'Only the middle. A pie is a full circle, a donut is that circle with a hole in it; the slices, the angles and the percentages are calculated exactly the same way. The hole changes how the chart reads, not what it measures.',
  },
  {
    q: 'Can I put a total or a number in the middle of the ring?',
    a: 'Not yet. The ring is drawn with the centre empty, and the total appears in the legend and in the labels on each slice. If the total has to sit inside the hole, put it in the chart title — "Monthly spending: $3,000" reads just as clearly above the ring.',
  },
  {
    q: 'Can I download the donut chart as PNG or SVG?',
    a: 'Yes, both are one click away. PNG is the pixel image for slides, Word, Google Docs and chat; SVG is the vector file that stays sharp when printed or enlarged. Both are generated in your browser, so the download starts immediately.',
  },
  {
    q: 'Does the tool send my numbers anywhere?',
    a: 'No. All of the maths and the drawing happen locally in your browser, so the labels and figures you type never leave your device. Nothing is stored for you either: closing the tab clears the data, so download the chart before you leave the page.',
  },
  {
    q: 'How many slices should a donut chart have?',
    a: 'Three to six. Past seven the thin slices on the ring become slivers that no reader can tell apart, and anything under about 5% should be grouped into Other. The point of the chart is one comparison, not an inventory of every category you have.',
  },
];

export default function DonutChartMakerPage() {
  const appLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Donut Chart Maker',
    url: 'https://piechartlab.online/donut-chart-maker/',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description:
      'Create a donut chart online for free. Edit data, switch between pie and donut, customize colors and labels, and download as PNG or SVG. No signup required.',
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <SiteHeader active="/donut-chart-maker/" />
      <main className="prose-shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Donut chart maker</span>
        </nav>

        <div className="eyebrow">
          <span className="eyebrow-dot" /> TOOL
        </div>
        <h1>Donut chart maker</h1>
        <p className="lead">
          Type your labels and values, switch the ring on, and the donut chart redraws as you edit.
          Free, no signup, and the numbers never leave your browser.
        </p>

        <Link className="cta-button" href="/#editor">
          Open the chart maker — free, no signup
        </Link>

        <div className="prose">
          <h2>What a donut chart is for</h2>
          <p>
            A donut chart is a pie chart with the middle taken out. The parts of the whole sit on the
            ring instead of filling the circle, and the slices are still angles of the same 360
            degrees, so the percentages are calculated exactly as they are for a pie. What changes is
            how easy the result is to read.
          </p>

          <dl className="prose-list">
            {BENEFITS.map((b) => (
              <div key={b.name}>
                <dt>{b.name}</dt>
                <dd>{b.text}</dd>
              </div>
            ))}
          </dl>

          <h2>Donut, pie or bar?</h2>
          <dl className="prose-list">
            {WHEN.map((w) => (
              <div key={w.name}>
                <dt>{w.name}</dt>
                <dd>{w.text}</dd>
              </div>
            ))}
          </dl>

          <h2>How to make a donut chart here</h2>
          <p>
            The maker opens with five sample rows — rent, groceries, transport, fun, savings — so you
            can see the ring before you type anything. Replace those numbers with your own and the
            chart follows on every keystroke.
          </p>
          <ol>
            <li>
              <strong>Enter one label and one value per row.</strong> Use the raw numbers, not the
              percentages: the tool works out the shares and the angles for you.
            </li>
            <li>
              <strong>Switch the chart type to the donut.</strong> The same data becomes a ring; the
              proportions do not change.
            </li>
            <li>
              <strong>Choose what the labels show.</strong> Percentages suit a report, values suit an
              audience that already knows the scale. Pick one, not both.
            </li>
            <li>
              <strong>Pick a colour set from the swatches</strong>, then export a PNG for slides or an
              SVG for print.
            </li>
          </ol>

          <h2>关于这枚环的几句话</h2>
          <p>
            The hole is not decoration. It removes the crowded centre where short slices meet, and it
            gives the labels somewhere to breathe. If you find yourself printing the total in the
            middle, remember that the version here leaves it in the legend and in the title instead.
          </p>

          <h2>Frequently asked questions</h2>
          {FAQ.map(({ q, a }) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}

          <h2>Related</h2>
          <ul className="prose-links">
            <li>
              <Link href="/">Pie chart maker</Link> — build the same chart as a full pie, right now in
              the browser.
            </li>
            <li>
              <Link href="/how-to/make-a-pie-chart/">How to make a pie chart</Link> — the five steps
              that apply to a donut too.
            </li>
            <li>
              <Link href="/pie-chart-examples/">Pie chart examples</Link> — what a good one looks like
              next to a bad one.
            </li>
          </ul>
        </div>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}