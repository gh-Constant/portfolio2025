// src/app/components/GridLines.tsx
const NUM_LINES = 4; // Adjust for the number of columns you want

export default function GridLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {[...Array(NUM_LINES + 1)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 border-r border-gray-400/30 dark:border-white/20"
          style={{
            left: `${(100 / NUM_LINES) * i}%`,
            width: 0,
          }}
        />
      ))}
    </div>
  );
}