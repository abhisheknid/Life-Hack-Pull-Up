export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.5v5M12 16.5v5M2.5 12h5M16.5 12h5" />
      <path d="M5.6 5.6l3 3M15.4 15.4l3 3M5.6 18.4l3-3M15.4 8.6l3-3" opacity="0.6" />
    </svg>
  );
}

export function ScribbleCircle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 47C14 26 44 11 104 10c58-1 103 11 108 30 5 18-33 34-96 35-62 1-102-8-98-28z" />
    </svg>
  );
}
