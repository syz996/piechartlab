import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const TITLE = 'Pie Chart Examples: Good, Bad, and How to Fix Them';
const DESC =
  'Real pie chart examples for budgets, surveys and reports — plus the four layouts that fail and the plain fix for each. Open any example in the free maker.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/pie-chart-examples/' },
  openGraph: {
    type: 'article',
    url: '/pie-chart-examples/',
    siteName: 'PieChartLab',
    title: TITLE,
    description: DESC,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Pie chart examples' }],
  },
    twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: ['/og.png'],
  },
};

const EXAMPLES = [
  {
    name: 'Monthly spending budget',
    use: 'Rent 1,200 · Groceries 600 · Transport 400 · Savings 500 · Fun 300 (total 3,000)',
    good: 'Five slices, each is a real share of one income, largest first. Rent reads as 40% at a glance, which is the message.',
    slug: 'monthly-budget',
  },
  {
    name: 'Traffic by channel',
    use: 'Organic 5,400 · Direct 2,100 · Referral 900 · Email 600 (total 9,000)',
    good: 'Four channels that add up to all sessions, so the slices are honest shares. Merge everything under 5% into Other.',
    slug: 'traffic-channels',
  },
  {
    name: 'Survey: one answer per person',
    use: 'Very satisfied 48% · Satisfied 31% · Neutral 12% · Dissatisfied 9%',
    good: 'One answer per respondent, so the percentages sum to 100% and the pie is legitimate.',
    slug: 'survey-results',
  },
  {
    name: 'Class or team project time',
    use: 'Research 12h · Drafting 8h · Design 6h · Review 4h (total 30h)',
    good: 'Each slice is a share of the same total hours, and four slices is well inside the readable range.',
    slug: 'project-time',
  },
];

export default function ExamplesPage() {
  return (
    <>
      <SiteHeader active="/pie-chart-examples/" />
      <main className="prose-shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Pie chart examples</span>
        </nav>
        <div className="eyebrow">
          <span className="eyebrow-dot" /> EXAMPLES
        </div>
        <h1>Pie chart examples</h1>
        <p className="lead">
          Four layouts that work, the four that quietly lie about the data, and the fix for each.
        </p>
        <Link className="cta-button" href="/#editor">Build one with your own numbers</Link>

        <div className="prose">
          <h2>Examples that work</h2>
          {EXAMPLES.map((e) => (
            <section key={e.slug} id={e.slug}>
              <h3>{e.name}</h3>
              <p className="mono">{e.use}</p>
              <p>{e.good}</p>
            </section>
          ))}

          <h2>Examples that fail, and the fix</h2>
          <dl className="prose-list">
            <div>
              <dt>Twelve slices of a survey</dt>
              <dd>Half the slices are thinner than the labels. Group the tail into Other until you are at seven, or switch to a horizontal bar chart.</dd>
            </div>
            <div>
              <dt>A “market share” pie that sums to 140%</dt>
              <dd>Multi-select answers cannot be shares of one total. Show the counts side by side instead.</dd>
            </div>
            <div>
              <dt>A tilted 3D pie</dt>
              <dd>Perspective makes the near slices look larger. Set the chart flat; the numbers should not depend on where a slice sits.</dd>
            </div>
            <div>
              <dt>Six equal slices</dt>
              <dd>When every share is close, the reader cannot rank them by angle. A bar chart with a shared baseline shows the difference immediately.</dd>
            </div>
          </dl>

          <h2>How to read these examples</h2>
          <p>
            Every example above follows the same two rules: the slices add up to one real total,
            and the largest slice sits first, clockwise from the top. If you copy the numbers into
            the <Link href="/">pie chart maker</Link> you get the same chart in your own colors,
            and you can download it as PNG or SVG. The step-by-step method is in
            {' '}<Link href="/how-to/make-a-pie-chart/">how to make a pie chart</Link>.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
