export default function Logo({ className = "w-10 h-10" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left W - rightmost stroke IS the A's left leg going up to apex */}
      <path
        d="M5 45 L12 95 L20 60 L28 95 L50 5"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right W - leftmost stroke IS the A's right leg coming from apex */}
      <path
        d="M50 5 L72 95 L80 60 L88 95 L95 45"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* A crossbar */}
      <path
        d="M30 32 L70 32"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
