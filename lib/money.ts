export function formatETB(santim: number): string {
  const birr = santim / 100;
  const isWhole = Number.isInteger(birr);
  const text = birr.toLocaleString("en-US", {
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return `ETB ${text}`;
}
