type Props = { type: string; color?: string; className?: string };

export default function GarmentIcon({ type, color, className }: Props) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g
        className={
          color
            ? "stroke-foreground/30"
            : "fill-background stroke-foreground/30"
        }
        style={color ? { fill: color } : undefined}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {type === "hoodies" ? (
          <>
            <path d="M68 42 L34 54 L12 128 L38 136 L56 92 L56 178 L144 178 L144 92 L162 136 L188 128 L166 54 L132 42 Q100 66 68 42 Z" />
            <path d="M66 42 Q62 10 100 10 Q138 10 134 42 Q100 70 66 42 Z" />
            <path
              d="M80 38 Q100 62 120 38 Q112 22 100 22 Q88 22 80 38 Z"
              className="fill-foreground/15"
            />
            <path d="M70 132 H130 L138 164 H62 Z" fill="none" />
            <path d="M93 62 V88 M107 62 V88" fill="none" />
          </>
        ) : type === "sweaters" ? (
          <>
            <path d="M72 34 L40 46 L14 130 L40 138 L58 92 L58 176 L142 176 L142 92 L160 138 L186 130 L160 46 L128 34 Q100 54 72 34 Z" />
            <path d="M72 34 Q100 54 128 34" fill="none" strokeWidth="5" />
            <path d="M58 162 H142" fill="none" />
            <path d="M18 118 L43 126 M182 118 L157 126" fill="none" />
          </>
        ) : (
          <>
            <path d="M70 30 L48 38 L16 64 L38 92 L56 80 L56 174 L144 174 L144 80 L162 92 L184 64 L152 38 L130 30 Q100 54 70 30 Z" />
            <path d="M70 30 Q100 54 130 30" fill="none" />
          </>
        )}
      </g>
    </svg>
  );
}
