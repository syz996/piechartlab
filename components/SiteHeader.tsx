import Link from 'next/link';

const NAV = [
  { href: '/', label: 'Chart maker' },
  { href: '/how-to/make-a-pie-chart/', label: 'How to make one' },
  { href: '/pie-chart-examples/', label: 'Examples' },
];

export default function SiteHeader({ active }: { active?: string }) {
  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <span className="brand-mark">◔</span> PieChartLab
      </Link>
      <nav>
        {NAV.map(({ href, label }) => (
          <Link key={href} href={href} className={active === href ? 'nav-active' : undefined}>
            {label}
          </Link>
        ))}
      </nav>
      <span className="topbar-note">Free online tool</span>
    </header>
  );
}
