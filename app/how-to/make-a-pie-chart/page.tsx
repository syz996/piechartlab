import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const TITLE = 'How to Make a Pie Chart (Step by Step, Free)';
const DESC =
  'A step-by-step guide to making a pie chart: sort your data, convert it to percentages, check the slices, then download a PNG or SVG. Free, no signup.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/how-to/make-a-pie-chart/' },
  openGraph: {
    type: 'article',
    url: '/how-to/make-a-pie-chart/',
    siteName: 'PieChartLab',
    title: TITLE,
    description: DESC,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'How to make a pie chart' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: ['/og.png'],
  },
};

const STEPS = [
  {
    name: 'Start from one total',
    text: 'A pie chart answers one question: how does this whole split into parts? Write down the total first — a monthly budget, 400 survey answers, a team of 30 people. If the numbers you want to show do not add up to one whole, a bar chart is the honest choice, because every slice has to be a share of the same total.',
  },
  {
    name: 'Turn your values into percentages',
    text: 'Divide each value by the total and multiply by 100. Rent of 1,200 out of 3,000 becomes 40%, which is 144 degrees of the circle. You rarely need to do this by hand: type the raw numbers into the tool and it draws the angles and shows the percentages on the slices and in the legend. Check that the percentages you see add up to 100%, because rounding is what usually goes wrong.',
  },
  {
    name: 'Order the slices so they read cleanly',
    text: 'Put the largest slice first and work clockwise from twelve o\u2019clock; readers compare each slice back to the biggest one. Merge anything below about 5% into a single Other slice, since two thin slices side by side are impossible to tell apart. Five to seven slices is the practical ceiling for a pie.',
  },
  {
    name: 'Label the slices and pick one message',
    text: 'Choose whether labels show names, values or percentages — not all three, because the slice is small. Give the chart a title that states the finding ("Rent is 40% of monthly spending"), not just the topic ("Monthly expenses"). A pie chart is a headline, not a data table.',
  },
  {
    name: 'Export the size you actually need',
    text: 'Download a PNG when the chart is going into a slide deck, a Word document or a chat message. Download an SVG when it will be printed, enlarged, or placed on a retina screen, because the vector file stays sharp at any size and the file is small. Avoid screenshotting the browser window: it carries the surrounding interface with it.',
  },
];

const MISTAKES = [
  {
    name: 'Slices that do not sum to a whole',
    text: 'If you are comparing survey answers where people could pick several options, the percentages can add up to more than 100% and the pie becomes meaningless. Use a bar chart or a stacked bar instead.',
  },
  {
    name: 'Too many categories',
    text: 'Past seven slices the smallest ones become slivers. Group the tail into Other, or switch to a horizontal bar chart where length is easier to compare than angle.',
  },
  {
    name: 'A 3D tilt',
    text: 'Perspective makes the front slices look bigger than the ones at the back, so the chart visually distorts the numbers it is meant to show. Keep the pie flat.',
  },
  {
    name: 'Using it for change over time',
    text: 'A pie has no axis, so it cannot show a trend. If the story is "sales rose in Q3", that is a line or column chart.',
  },
];

const FAQ = [
  {
    q: 'How do I calculate the degrees for a pie chart?',
    a: 'Each slice gets its share of 360 degrees. Divide the value by the total, multiply by 360, and you have the angle — 25% of the total is 90 degrees. The tool does this for you and labels the slice with the percentage, so you only need to enter the raw numbers.',
  },
  {
    q: 'What percentage is too small for a slice?',
    a: 'Below roughly 5% a slice stops being readable, and below 2% it is a line. Anything that small should be merged into an Other category or moved to a bar chart, where a small value is still a visible length.',
  },
  {
    q: 'Should the pie start at the top?',
    a: 'Yes, the convention is to start the first slice at twelve o\u2019clock and go clockwise, largest slice first. Readers expect the biggest share where the clock starts, and any other order makes them work to find it.',
  },
  {
    q: 'Can I paste data from Excel or Google Sheets?',
    a: 'Not yet. Right now you type each label and value, or add a row for each item, so a five-row budget takes about a minute. Selecting two columns in Excel or Google Sheets and pasting them straight in is the next thing we are adding.',
  },
  {
    q: 'Can I download the chart as SVG instead of PNG?',
    a: 'Both are one click away. Use PNG for slides, documents and messaging apps; use SVG for print, posters and any place the chart will be scaled up. The SVG keeps sharp edges at every size and is safe to hand to a designer.',
  },
];

export default function HowToPage() {
  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: TITLE,
    description: DESC,
    totalTime: 'PT5M',
    tool: [{ '@type': 'HowToTool', name: 'PieChartLab pie chart maker' }],
    step: STEPS.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `https://piechartlab.online/how-to/make-a-pie-chart/#step-${i + 1}`,
    })),
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
      <SiteHeader active="/how-to/make-a-pie-chart/" />
      <main className="prose-shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>How to make a pie chart</span>
        </nav>

        <div className="eyebrow">
          <span className="eyebrow-dot" /> GUIDE
        </div>
        <h1>How to make a pie chart</h1>
        <p className="lead">
          Five steps, about five minutes: get your numbers to add up to one total, turn them into
          percentages, order the slices, label them, and export a PNG or an SVG.
        </p>

        <Link className="cta-button" href="/#editor">
          Open the pie chart maker — free, no signup
        </Link>

        <div className="prose">
          {STEPS.map((s, i) => (
            <section key={s.name} id={`step-${i + 1}`}>
              <h2>
                {i + 1}. {s.name}
              </h2>
              <p>{s.text}</p>
            </section>
          ))}

          <h2>Common mistakes to avoid</h2>
          <dl className="prose-list">
            {MISTAKES.map((m) => (
              <div key={m.name}>
                <dt>{m.name}</dt>
                <dd>{m.text}</dd>
              </div>
            ))}
          </dl>

          <h2>Pie chart or bar chart?</h2>
          <p>
            Use a pie when the message is “this part versus the whole” and you have no more than
            about seven parts. Use a bar chart when the message is “A is bigger than B”, when
            several values sit close together, or when the categories do not add up to a single
            total. A donut chart is the same chart with the middle removed, which is worth doing
            when you want to print the total inside the circle.
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
              <Link href="/pie-chart-examples/">Pie chart examples</Link> — what a good one looks
              like next to a bad one.
            </li>
            <li>
              <Link href="/">Pie chart maker</Link> — build it right now in the browser.
            </li>
            <li>
              <Link href="/donut-chart-maker/">Donut chart maker</Link> — the same chart with the
              middle removed.
            </li>
          </ul>
        </div>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
