function Icon({ children, className = '', filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export const Dumbbell = (props) => (
  <Icon {...props}>
    <path d="M2.5 9.5v5M5.5 6.5v11M18.5 6.5v11M21.5 9.5v5M5.5 12h13" />
  </Icon>
);

export const Coach = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20.5c0-3.6 3-6 7-6s7 2.4 7 6" />
  </Icon>
);

export const Lotus = (props) => (
  <Icon {...props}>
    <path d="M12 5c1.9 2.3 2.9 4.7 2.9 7s-1 4.2-2.9 5.5c-1.9-1.3-2.9-3.2-2.9-5.5S10.1 7.3 12 5z" />
    <path d="M9.2 10.2C7.4 9.3 5.6 9 3.5 9.3c.3 3.6 2.5 6.6 5.9 7.8M14.8 10.2c1.8-.9 3.6-1.2 5.7-.9-.3 3.6-2.5 6.6-5.9 7.8" />
    <path d="M4 19.5c2.6.8 5.3 1.2 8 1.2s5.4-.4 8-1.2" />
  </Icon>
);

export const Calendar = (props) => (
  <Icon {...props}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
    <path d="M8 3v4M16 3v4M3.5 10h17M8 14h2M14 14h2M8 17h2" />
  </Icon>
);

export const Group = (props) => (
  <Icon {...props}>
    <circle cx="9" cy="8.5" r="3" />
    <circle cx="17.2" cy="9.5" r="2.3" />
    <path d="M3 19.5c0-3 2.7-5 6-5s6 2 6 5M16.5 14.3c2.6 0 4.5 1.7 4.5 4.2" />
  </Icon>
);

export const Diamond = (props) => (
  <Icon {...props}>
    <path d="M6.5 4h11L22 10 12 21 2 10zM2 10h20M9.5 4 8 10l4 11 4-11-1.5-6" />
  </Icon>
);

export const Pin = (props) => (
  <Icon {...props}>
    <path d="M12 21.5s7-6.3 7-11.8a7 7 0 0 0-14 0c0 5.5 7 11.8 7 11.8z" />
    <circle cx="12" cy="9.7" r="2.5" />
  </Icon>
);

export const Phone = (props) => (
  <Icon {...props}>
    <path d="M6.5 3h3L11 7.5 9 9a12 12 0 0 0 6 6l1.5-2 4.5 1.5v3a2 2 0 0 1-2 2A15.5 15.5 0 0 1 4.5 5a2 2 0 0 1 2-2z" />
  </Icon>
);

export const Check = (props) => (
  <Icon {...props}>
    <path d="M4.5 12.5 9.5 17.5 19.5 6.5" strokeWidth="2" />
  </Icon>
);

export const Menu = (props) => (
  <Icon {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);

export const Close = (props) => (
  <Icon {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const WhatsApp = (props) => (
  <Icon {...props}>
    <path d="M3.5 20.5 4.8 16A8.5 8.5 0 1 1 8 19.2z" />
    <path d="M9.3 8.3c-.4 2.9 3.5 6.8 6.4 6.4l.8-1.5-1.9-1.1-.9.8a4.5 4.5 0 0 1-2.2-2.2l.8-.9-1.1-1.9z" />
  </Icon>
);

export const Instagram = (props) => (
  <Icon {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.8" />
    <path d="M17.2 6.8h.01" strokeWidth="2.2" />
  </Icon>
);

export const Facebook = (props) => (
  <Icon filled {...props}>
    <path d="M13.7 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.6V3.6a22 22 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.3H7.8V13h2.7v8z" />
  </Icon>
);

export const icons = {
  dumbbell: Dumbbell,
  coach: Coach,
  lotus: Lotus,
  calendar: Calendar,
  group: Group,
  diamond: Diamond,
};
