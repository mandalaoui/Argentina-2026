import { cn } from "@/lib/utils";

type BadgeVariant = "past" | "today" | "upcoming" | "important" | "default";

const variantStyles: Record<BadgeVariant, string> = {
  past:      "bg-gray-100 text-gray-500",
  today:     "bg-argentina text-white",
  upcoming:  "bg-argentina-light text-navy",
  important: "bg-sun text-navy font-bold",
  default:   "bg-gray-100 text-gray-600",
};

const variantLabels: Record<BadgeVariant, string> = {
  past:      "עבר ✓",
  today:     "היום",
  upcoming:  "בקרוב",
  important: "חשוב",
  default:   "",
};

interface BadgeProps {
  variant?: BadgeVariant;
  label?: string;
  className?: string;
}

export default function Badge({ variant = "default", label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {label ?? variantLabels[variant]}
    </span>
  );
}
