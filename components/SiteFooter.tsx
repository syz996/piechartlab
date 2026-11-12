import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer>
      <Link className="brand" href="/">
        <span className="brand-mark">◔</span> PieChartLab
      </Link>
      <nav className="foot-links">
        <Link href="/">Pie chart maker</Link>
        <Link href="/how-to/make-a-pie-chart/">How to make a pie chart</Link>
        <Link href="/pie-chart-examples/">Pie chart examples</Link>
        <Link href="/donut-chart-maker/">Donut chart maker</Link>
      </nav>
      <span>© 2026 PieChartLab</span>
    </footer>
  );
}
