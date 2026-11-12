# PieChartLab – UI prototype

A lightweight Next.js App Router starter for the Pie Chart Maker interface. The interface follows the supplied design constraints: no hero image, no remote fonts, no first-screen media or scroll animation, a single UI accent color, a white chart canvas, system fonts, and restrained neutral surfaces.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Included in this prototype

- Responsive editor layout with a live SVG pie/donut preview
- Editable labels and numeric values, add/remove rows, reset sample data
- 12 chart color themes (separate from the single UI accent color)
- Percentage/value/name/hidden slice label modes
- Pie/donut selection, donut hole control, legend toggle
- SVG and PNG export
- Static export configuration for deployment environments that support Next.js static output

## Current scope / not yet implemented

This is the first UI implementation, not the complete product specification. CSV parsing, PDF export, shareable URL hash, 3D chart, slice drag-and-drop, collision-aware outside labels, all SEO landing pages, analytics events, sitemap/robots, and final production QA are not included yet. PDF export is intentionally not represented as available.

## Design tokens

- System font stack: `system-ui, -apple-system, Segoe UI, Roboto`
- UI accent: `#2563EB`
- Neutral palette: `#111111`, `#374151`, `#6B7280`, `#9CA3AF`, `#E5E7EB`, `VAR(--SURFACE-2)`
- Body: 16px / 1.6
- Spacing: multiples of 4px
- Inputs/buttons: 8px radius; cards: 12px radius
- Header: 64px; content max-width: 1000px
# piechartlab
