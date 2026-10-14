import { club } from '../data/club.js';
import { useLang } from '../lang.js';
import { formatTime, useClubStatus } from '../lib/hours.js';
import { Facebook, Instagram, WhatsApp } from './Icons.jsx';

export function Socials({ className = '' }) {
  const { t } = useLang();
  const links = [
    { href: club.whatsapp, label: t.social.whatsapp, Icon: WhatsApp },
    { href: club.instagram, label: t.social.instagram, Icon: Instagram },
    { href: club.facebook, label: t.social.facebook, Icon: Facebook },
  ];
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="grid size-9 place-items-center text-white transition-colors hover:text-jaune"
          >
            <Icon className="size-[1.15rem]" />
          </a>
        </li>
      ))}
    </ul>
  );
}

// "Open until 22:30" / "Closed, opens at 5:30", computed in Douala time.
export function OpenStatus({ className = '' }) {
  const { t, lang } = useLang();
  const status = useClubStatus();
  const time = formatTime(status.time, lang);
  const label = status.open
    ? t.status.open(time)
    : status.tomorrow
      ? t.status.closedTomorrow(time)
      : t.status.closedToday(time);
  return (
    <p className={`flex items-center gap-2 ${className}`}>
      <span
        aria-hidden="true"
        className={`size-2 rounded-full ${status.open ? 'bg-jaune' : 'border border-current'}`}
      />
      {label}
    </p>
  );
}
