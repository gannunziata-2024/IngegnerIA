import React from 'react';

/**
 * Official CNI & C3i Institution Logo Banner (Vector SVG)
 * Replicates the dual header layout from the official branding asset (CNI-C3i).
 */
export const InstitutionLogosBanner: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto' }) => {
  return (
    <svg
      viewBox="0 0 900 130"
      className={`select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Consiglio Nazionale degli Ingegneri e C3i Comitato Italiano Ingegneria dell'Informazione"
    >
      {/* CNI Logo (Left side) */}
      <g transform="translate(10, 15)">
        {/* Red I mark */}
        <rect x="0" y="0" width="16" height="96" fill="#cd061e" />
        <rect x="-6" y="0" width="28" height="6" fill="#cd061e" />
        <rect x="-6" y="90" width="28" height="6" fill="#cd061e" />

        {/* Text */}
        <text x="32" y="38" fontFamily="serif" fontSize="20" fontWeight="bold" fill="#ffffff" letterSpacing="0.05em">
          CONSIGLIO NAZIONALE
        </text>
        <text x="32" y="68" fontFamily="serif" fontSize="22" fontWeight="bold" fill="#ffffff" letterSpacing="0.08em">
          DEGLI <tspan fill="#cd061e">INGEGNERI</tspan>
        </text>
      </g>

      {/* Italian Republic Emblem (Center) */}
      <g transform="translate(435, 20)" opacity="0.85">
        <circle cx="20" cy="50" r="22" stroke="#7dd3fc" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M20 28 L23 40 L35 43 L23 46 L20 58 L17 46 L5 43 L17 40 Z" fill="#7dd3fc" opacity="0.7" transform="scale(0.65) translate(11, 22)" />
        <text x="-4" y="82" fontFamily="sans-serif" fontSize="7" fill="#94a3b8" letterSpacing="0.1em">REPUBBLICA ITALIANA</text>
      </g>

      {/* C3i Logo (Right side) */}
      <g transform="translate(565, 15)">
        {/* Red I mark */}
        <rect x="0" y="0" width="16" height="96" fill="#cd061e" />
        <rect x="-6" y="0" width="28" height="6" fill="#cd061e" />
        <rect x="-6" y="90" width="28" height="6" fill="#cd061e" />

        {/* C3i Text */}
        <text x="30" y="68" fontFamily="sans-serif" fontSize="62" fontWeight="800" fill="#cbd5e1" letterSpacing="-0.03em">
          C3i
        </text>
        <text x="145" y="38" fontFamily="sans-serif" fontSize="13" fontWeight="bold" fill="#ffffff" letterSpacing="0.04em">
          COMITATO ITALIANO
        </text>
        <text x="145" y="58" fontFamily="sans-serif" fontSize="13" fontWeight="bold" fill="#ffffff" letterSpacing="0.04em">
          INGEGNERIA
        </text>
        <text x="145" y="78" fontFamily="sans-serif" fontSize="13" fontWeight="bold" fill="#cd061e" letterSpacing="0.06em">
          INFORMAZIONE
        </text>
      </g>
    </svg>
  );
};
