'use client';
import { themes } from '@/lib/themes';

export default function ThemeGallery({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="theme-gallery" role="radiogroup" aria-label="Color theme">
      {themes.map(t => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={active}
            title={t.name}
            className={active ? 'theme-option theme-option-active' : 'theme-option'}
            onClick={() => onChange(t.id)}
          >
            <span className="theme-chips" aria-hidden="true">
              {t.colors.map((c, i) => (
                <span key={i} style={{ background: c }} />
              ))}
            </span>
            <span className="theme-name">{t.name}</span>
          </button>
        );
      })}
    </div>
  );
}
