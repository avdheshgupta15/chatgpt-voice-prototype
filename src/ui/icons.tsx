interface P {
  className?: string;
}

const base = (className?: string) => ({
  className,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
});

export const MenuIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M4 9h16M4 15h16" strokeWidth={2.5} />
  </svg>
);

export const SparkleIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.1 6.4L20.5 10l-6.4 2.1L12 18.5 9.9 12.1 3.5 10l6.4-1.6L12 2z" />
  </svg>
);

export const ChatIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.8-.8L3 20l1-4.9a8.3 8.3 0 0 1-1-4A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z" />
  </svg>
);

export const MicIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="9" y="2.5" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3.5" />
  </svg>
);

export const PlusIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 5v14M5 12h14" strokeWidth={2.2} />
  </svg>
);

export const WaveIcon = ({ className }: P) => (
  <svg {...base(className)} strokeWidth={2.6}>
    <path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4" />
  </svg>
);

export const ImageIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="M3.5 18l5-5 3.5 3.5 3-3 5.5 5" />
  </svg>
);

export const PencilIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1z" />
  </svg>
);

export const GlobeIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
  </svg>
);

export const XIcon = ({ className }: P) => (
  <svg {...base(className)} strokeWidth={2.5}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const InfoIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 7.5v.5" />
  </svg>
);

export const ShieldIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 3l7 3v5.5c0 4.4-3 8-7 9.5-4-1.5-7-5.1-7-9.5V6l7-3z" />
    <path d="M9.2 12l2 2 3.6-3.8" />
  </svg>
);

export const SlidersIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M4 8h10M18 8h2M4 16h4M12 16h8" />
    <circle cx="16" cy="8" r="2" />
    <circle cx="10" cy="16" r="2" />
  </svg>
);

export const CopyIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5" />
  </svg>
);

export const ThumbUpIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M7 10.5l4.2-7a2.4 2.4 0 0 1 2.3 3l-.8 3h6a2 2 0 0 1 2 2.4l-1.2 6a2.5 2.5 0 0 1-2.5 2.1H7" />
    <rect x="3" y="10.5" width="4" height="9.5" rx="1" />
  </svg>
);

export const ThumbDownIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M17 13.5l-4.2 7a2.4 2.4 0 0 1-2.3-3l.8-3h-6a2 2 0 0 1-2-2.4l1.2-6A2.5 2.5 0 0 1 7 4h10" />
    <rect x="17" y="4" width="4" height="9.5" rx="1" />
  </svg>
);

export const MoreIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="1.7" />
    <circle cx="12" cy="12" r="1.7" />
    <circle cx="19" cy="12" r="1.7" />
  </svg>
);

export const EditSquareIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M20 11v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7" />
    <path d="M9 15l1-3 8-8a2.1 2.1 0 0 1 3 3l-8 8-4 1z" />
  </svg>
);

export const SelectTextIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
    <path d="M8 12h8" />
  </svg>
);

export const ShareIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 14V4M8.5 7.5L12 4l3.5 3.5" />
    <path d="M6 11H5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 5 20h14a1.5 1.5 0 0 0 1.5-1.5v-6A1.5 1.5 0 0 0 19 11h-1" />
  </svg>
);

export const ArrowUpIcon = ({ className }: P) => (
  <svg {...base(className)} strokeWidth={2.6}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

export const BackspaceIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M9 5h11a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 20 19H9l-6-7 6-7z" />
    <path d="M12 9.5l5 5M17 9.5l-5 5" />
  </svg>
);
