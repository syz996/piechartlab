const serialize = (svg: SVGSVGElement, width: number, height: number) => {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', String(width));
  clone.setAttribute('height', String(height));
  return new XMLSerializer().serializeToString(clone);
};

const download = (href: string, filename: string) => {
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  a.click();
};

export function exportSvgFile(svg: SVGSVGElement | null): boolean {
  if (!svg) return false;
  const blob = new Blob([serialize(svg, 900, 560)], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  download(url, 'pie-chart.svg');
  URL.revokeObjectURL(url);
  return true;
}

export function exportPngFile(
  svg: SVGSVGElement | null,
  onError?: (message: string) => void
): void {
  if (!svg) return;
  const blob = new Blob([serialize(svg, 1800, 1120)], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1800;
    canvas.height = 1120;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, 1800, 1120);
      ctx.drawImage(img, 0, 0, 1800, 1120);
      canvas.toBlob(png => {
        if (!png) return;
        const pngUrl = URL.createObjectURL(png);
        download(pngUrl, 'pie-chart.png');
        URL.revokeObjectURL(pngUrl);
      }, 'image/png');
    }
    URL.revokeObjectURL(url);
  };
  img.onerror = () => {
    URL.revokeObjectURL(url);
    onError?.('PNG export failed. Try SVG instead.');
  };
  img.src = url;
}
