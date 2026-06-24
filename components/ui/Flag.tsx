interface FlagProps {
  code: "AR" | "UY";
  size?: number;
  className?: string;
}

const COUNTRY_NAMES: Record<string, string> = {
  AR: "Argentina",
  UY: "Uruguay",
};

export default function Flag({ code, size = 20, className = "" }: FlagProps) {
  const country = code.toLowerCase();
  const height = Math.round(size * 0.67);
  return (
    <img
      src={`https://flagcdn.com/w40/${country}.png`}
      width={size}
      height={height}
      alt={COUNTRY_NAMES[code] ?? code}
      className={`inline-block rounded-sm shrink-0 ${className}`}
    />
  );
}
