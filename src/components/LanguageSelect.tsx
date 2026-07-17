import React from 'react';
import { useLang, languagesList } from '../context/LangContext';
import { Globe } from 'lucide-react';

const LanguageSelect: React.FC = () => {
  const { currentLang, setLanguage } = useLang();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as any);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative' }}>
      <Globe size={16} className="social-icon" style={{ color: 'var(--color-green)' }} />
      <select
        value={currentLang}
        onChange={handleChange}
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          color: 'var(--color-white)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '4px 28px 4px 10px',
          borderRadius: 'var(--border-radius-sm)',
          fontSize: '0.8rem',
          fontWeight: 600,
          cursor: 'pointer',
          outline: 'none',
          appearance: 'none',
          backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23ffffff\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 8px center',
          backgroundSize: '12px',
        }}
        className="lang-select-box"
      >
        {languagesList.map((lang) => (
          <option key={lang.code} value={lang.code} style={{ color: 'var(--color-dark)' }}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelect;
