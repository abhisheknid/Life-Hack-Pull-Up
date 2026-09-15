import Link from "next/link";
import type { ReactNode } from "react";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M6 18L18 6M9 6h9v9" />
  </svg>
);

const base =
  "inline-flex items-center gap-3 rounded-full pl-5 pr-1.5 py-1.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 active:translate-y-0";

const variants = {
  dark: "bg-ink text-cream",
  accent: "bg-accent text-cream",
  light: "bg-white text-ink border border-black/10",
};

const bubbleVariants = {
  dark: "bg-white text-ink",
  accent: "bg-white text-accent",
  light: "bg-ink text-white",
};

function Bubble({ variant, icon }: { variant: keyof typeof variants; icon?: ReactNode }) {
  return (
    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${bubbleVariants[variant]}`}>
      {icon ?? <ArrowIcon />}
    </span>
  );
}

export function PillButton({
  href,
  onClick,
  type = "button",
  variant = "dark",
  disabled,
  children,
  icon,
  className = "",
}: {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: keyof typeof variants;
  disabled?: boolean;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  const classes = `${base} ${variants[variant]} ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        <Bubble variant={variant} icon={icon} />
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
      <Bubble variant={variant} icon={icon} />
    </button>
  );
}
