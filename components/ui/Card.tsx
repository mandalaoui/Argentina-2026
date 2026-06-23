import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-argentina-light p-4",
        onClick && "cursor-pointer hover:shadow-md transition-shadow active:scale-[0.99]",
        className
      )}
    >
      {children}
    </div>
  );
}
