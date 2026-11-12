'use client';

export default function ExportBar({
  disabled,
  onSvg,
  onPng,
}: {
  disabled?: boolean;
  onSvg: () => void;
  onPng: () => void;
}) {
  return (
    <div className="export-actions">
      <button type="button" className="button button-secondary button-small" onClick={onSvg} disabled={disabled}>
        Download SVG
      </button>
      <button type="button" className="button button-primary button-small" onClick={onPng} disabled={disabled}>
        Download PNG
      </button>
    </div>
  );
}
