import React from 'react';

// Pure vector graphic path data extracted directly from Inter Bold typography with CNI geometry
export const LOGOTYPE_PATHS = {
  viewBox: '0 0 551 104',
  width: 551,
  height: 104,
  pathIngegner: 'M6.59 9.25L21.48 9.25L21.48 82L6.59 82L6.59 9.25M48.97 50.41L48.97 82L34.33 82L34.33 27.41L48.14 27.41L48.39 41.03L47.51 41.03Q49.66 34.20 54.03 30.46Q58.40 26.73 65.33 26.73Q71 26.73 75.22 29.19Q79.44 31.66 81.76 36.27Q84.08 40.89 84.08 47.28L84.08 82L69.43 82L69.43 49.82Q69.43 44.74 66.82 41.86Q64.21 38.98 59.57 38.98Q56.49 38.98 54.08 40.33Q51.66 41.67 50.32 44.21Q48.97 46.75 48.97 50.41M120.85 103.58Q114.01 103.58 108.94 101.85Q103.86 100.12 100.68 97.09Q97.51 94.06 96.29 90.20L108.89 86.69Q109.57 88.20 111.01 89.64Q112.45 91.08 114.84 92.01Q117.24 92.94 120.75 92.94Q126.37 92.94 129.57 90.37Q132.76 87.81 132.76 82.39L132.76 72.33L131.64 72.33Q130.66 74.53 128.81 76.58Q126.95 78.63 123.95 79.92Q120.95 81.22 116.50 81.22Q110.35 81.22 105.32 78.34Q100.29 75.46 97.29 69.55Q94.29 63.64 94.29 54.61Q94.29 45.38 97.34 39.18Q100.39 32.98 105.44 29.85Q110.50 26.73 116.55 26.73Q121.14 26.73 124.27 28.26Q127.39 29.80 129.32 32.12Q131.25 34.44 132.23 36.59L132.86 36.59L132.86 27.41L147.27 27.41L147.27 81.56Q147.27 88.93 143.87 93.82Q140.48 98.70 134.52 101.14Q128.56 103.58 120.85 103.58M121.09 70.09Q124.85 70.09 127.47 68.23Q130.08 66.38 131.45 62.88Q132.81 59.39 132.81 54.51Q132.81 49.68 131.45 46.06Q130.08 42.45 127.47 40.45Q124.85 38.45 121.09 38.45Q117.24 38.45 114.62 40.52Q112.01 42.60 110.67 46.21Q109.33 49.82 109.33 54.51Q109.33 59.29 110.67 62.79Q112.01 66.28 114.65 68.18Q117.29 70.09 121.09 70.09M184.42 83.07Q176.07 83.07 170.02 79.66Q163.96 76.24 160.72 69.94Q157.47 63.64 157.47 55Q157.47 46.55 160.69 40.20Q163.92 33.86 169.82 30.29Q175.73 26.73 183.69 26.73Q189.06 26.73 193.70 28.44Q198.34 30.14 201.86 33.59Q205.37 37.03 207.35 42.21Q209.33 47.38 209.33 54.41L209.33 58.51L163.48 58.51L163.48 49.33L202.15 49.33L195.31 51.78Q195.31 47.53 194.02 44.38Q192.72 41.23 190.16 39.50Q187.60 37.76 183.84 37.76Q180.03 37.76 177.37 39.52Q174.71 41.28 173.34 44.28Q171.97 47.28 171.97 51.14L171.97 57.63Q171.97 62.37 173.56 65.59Q175.15 68.82 178 70.43Q180.86 72.04 184.67 72.04Q187.26 72.04 189.36 71.31Q191.46 70.57 192.94 69.13Q194.43 67.69 195.21 65.59L208.50 68.08Q207.18 72.58 203.91 75.97Q200.63 79.36 195.73 81.22Q190.82 83.07 184.42 83.07M243.60 103.58Q236.77 103.58 231.69 101.85Q226.61 100.12 223.44 97.09Q220.26 94.06 219.04 90.20L231.64 86.69Q232.32 88.20 233.76 89.64Q235.21 91.08 237.60 92.01Q239.99 92.94 243.51 92.94Q249.12 92.94 252.32 90.37Q255.52 87.81 255.52 82.39L255.52 72.33L254.39 72.33Q253.42 74.53 251.56 76.58Q249.71 78.63 246.70 79.92Q243.70 81.22 239.26 81.22Q233.11 81.22 228.08 78.34Q223.05 75.46 220.04 69.55Q217.04 63.64 217.04 54.61Q217.04 45.38 220.09 39.18Q223.14 32.98 228.20 29.85Q233.25 26.73 239.31 26.73Q243.90 26.73 247.02 28.26Q250.15 29.80 252.08 32.12Q254 34.44 254.98 36.59L255.62 36.59L255.62 27.41L270.02 27.41L270.02 81.56Q270.02 88.93 266.63 93.82Q263.23 98.70 257.28 101.14Q251.32 103.58 243.60 103.58M243.85 70.09Q247.61 70.09 250.22 68.23Q252.83 66.38 254.20 62.88Q255.57 59.39 255.57 54.51Q255.57 49.68 254.20 46.06Q252.83 42.45 250.22 40.45Q247.61 38.45 243.85 38.45Q239.99 38.45 237.38 40.52Q234.77 42.60 233.42 46.21Q232.08 49.82 232.08 54.51Q232.08 59.29 233.42 62.79Q234.77 66.28 237.40 68.18Q240.04 70.09 243.85 70.09M297.17 50.41L297.17 82L282.52 82L282.52 27.41L296.34 27.41L296.58 41.03L295.70 41.03Q297.85 34.20 302.22 30.46Q306.59 26.73 313.53 26.73Q319.19 26.73 323.41 29.19Q327.64 31.66 329.96 36.27Q332.28 40.89 332.28 47.28L332.28 82L317.63 82L317.63 49.82Q317.63 44.74 315.01 41.86Q312.40 38.98 307.76 38.98Q304.69 38.98 302.27 40.33Q299.85 41.67 298.51 44.21Q297.17 46.75 297.17 50.41M369.43 83.07Q361.08 83.07 355.03 79.66Q348.97 76.24 345.73 69.94Q342.48 63.64 342.48 55Q342.48 46.55 345.70 40.20Q348.93 33.86 354.83 30.29Q360.74 26.73 368.70 26.73Q374.07 26.73 378.71 28.44Q383.35 30.14 386.87 33.59Q390.38 37.03 392.36 42.21Q394.34 47.38 394.34 54.41L394.34 58.51L348.49 58.51L348.49 49.33L387.16 49.33L380.32 51.78Q380.32 47.53 379.03 44.38Q377.73 41.23 375.17 39.50Q372.61 37.76 368.85 37.76Q365.04 37.76 362.38 39.52Q359.72 41.28 358.35 44.28Q356.98 47.28 356.98 51.14L356.98 57.63Q356.98 62.37 358.57 65.59Q360.16 68.82 363.01 70.43Q365.87 72.04 369.68 72.04Q372.27 72.04 374.37 71.31Q376.46 70.57 377.95 69.13Q379.44 67.69 380.22 65.59L393.51 68.08Q392.19 72.58 388.92 75.97Q385.64 79.36 380.74 81.22Q375.83 83.07 369.43 83.07M418.99 82L404.35 82L404.35 27.41L418.51 27.41L418.51 36.93L419.09 36.93Q420.61 31.85 424.15 29.27Q427.69 26.68 432.28 26.68Q433.40 26.68 434.72 26.80Q436.04 26.92 437.01 27.17L437.01 40.25Q436.04 39.91 434.18 39.71Q432.32 39.52 430.66 39.52Q427.34 39.52 424.66 40.96Q421.97 42.40 420.48 44.96Q418.99 47.53 418.99 50.95',
  pathCniI: 'M 442.3 9.2 H 466.3 V 11.9 H 442.3 Z M 448.9 9.2 H 459.7 V 82 H 448.9 Z M 442.3 79.4 H 466.3 V 82 H 442.3 Z',
  pathA: 'M488.67 82L472.22 82L497.07 9.25L516.60 9.25L542.09 82L525.54 82L513.87 46.89Q511.77 40.11 509.60 32.02Q507.42 23.94 505.03 14.37L508.30 14.37Q505.96 23.99 503.93 32.12Q501.91 40.25 499.91 46.89L488.67 82M526.57 65.11L487.75 65.11L487.75 53.44L526.57 53.44',
};

/**
 * 100% Vector Graphic Logotype for "IngegnerIA".
 * Every letterform (Ingegner + CNI I + A) is drawn as scalable vector graphic paths.
 */
export const IngegneriaWordmark: React.FC<{
  className?: string;
  textColor?: string;
  accentColor?: string;
}> = ({
  className = 'h-8 w-auto',
  textColor = '#ffffff',
  accentColor = '#cd061e',
}) => {
  return (
    <svg
      viewBox={LOGOTYPE_PATHS.viewBox}
      className={`shrink-0 overflow-visible select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="IngegnerIA"
    >
      {/* "Ingegner" in pure vector graphics */}
      <path d={LOGOTYPE_PATHS.pathIngegner} fill={textColor} />
      
      {/* "I" mark in official CNI red */}
      <path d={LOGOTYPE_PATHS.pathCniI} fill={accentColor} />
      
      {/* "A" in pure vector graphics */}
      <path d={LOGOTYPE_PATHS.pathA} fill={textColor} />
    </svg>
  );
};

export const CniIMark: React.FC<{ className?: string }> = ({
  className = 'h-[0.74em] w-[0.34em] fill-[#cd061e] inline-block align-baseline mx-[0.02em]',
}) => (
  <svg
    viewBox="0 0 40 100"
    preserveAspectRatio="none"
    aria-hidden="true"
    className={className}
  >
    <rect x="0" y="0" width="40" height="3.2" fill="currentColor" />
    <rect x="12.6" y="0" width="14.8" height="100" fill="currentColor" />
    <rect x="0" y="96.8" width="40" height="3.2" fill="currentColor" />
  </svg>
);

export const GearSparkLogo: React.FC<{
  size?: number;
  animated?: boolean;
  className?: string;
}> = ({ size = 48, animated = false, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <g className={animated ? 'animate-gear' : ''}>
        <path
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M64 8 L74 8 L77 20 L86 24 L96 17 L104 25 L97 35 L101 44 L113 47 L113 58
             L113 70 L101 73 L97 82 L104 92 L96 100 L86 93 L77 97 L74 109 L64 109
             L54 109 L51 97 L42 93 L32 100 L24 92 L31 82 L27 73 L15 70 L15 58
             L15 47 L27 44 L31 35 L24 25 L32 17 L42 24 L51 20 L54 8 Z"
        />
        <circle cx="64" cy="58" r="22" fill="none" stroke="#38bdf8" strokeWidth="5.5" />
      </g>
      {/* Red IA spark */}
      <path
        className={animated ? 'animate-spark' : ''}
        fill="#cd061e"
        d="M64 40 L68.5 54.5 L83 59 L68.5 63.5 L64 78 L59.5 63.5 L45 59 L59.5 54.5 Z"
      />
    </svg>
  );
};

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  animated?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  animated = false,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 30, wordmark: 'h-5', sub: 'text-[10px]' },
    md: { icon: 38, wordmark: 'h-6 sm:h-7', sub: 'text-xs' },
    lg: { icon: 54, wordmark: 'h-9 sm:h-11', sub: 'text-xs sm:text-sm' },
    xl: { icon: 96, wordmark: 'h-14 sm:h-20', sub: 'text-sm sm:text-base' },
  };

  const current = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <GearSparkLogo size={current.icon} animated={animated} />
      <div className="flex flex-col justify-center">
        {/* Full vector graphic logotype */}
        <IngegneriaWordmark className={current.wordmark} />
        {showSubtitle && (
          <span className={`text-sky-300 font-semibold tracking-wide mt-0.5 ${current.sub}`}>
            Dalla guida all'app
          </span>
        )}
      </div>
    </div>
  );
};
