import { club } from '../data/club.js';
import { useLang } from '../lang.js';
import { Socials } from './ClubLinks.jsx';
import { Phone, Pin } from './Icons.jsx';
import Logo from './Logo.jsx';

export default function Footer() {
  const { t } = useLang();
  const heading = 'condensed text-[0.95rem] text-white';
  return (
    <footer className="bg-black text-white/75">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <Logo className="text-base" />
          <p className="mt-5 max-w-[17rem]">{t.footer.tagline}</p>
          <Socials className="-ml-2.5 mt-4" />
        </div>

        <nav aria-labelledby="footer-quick">
          <h2 id="footer-quick" className={heading}>
            {t.footer.quick}
          </h2>
          <ul className="mt-4 space-y-2">
            {t.nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-jaune">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>{t.footer.activities}</h2>
          <ul className="mt-4 space-y-2">
            {t.footer.activityList.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>{t.footer.contact}</h2>
          <address className="mt-4 space-y-3 not-italic">
            <a href={club.mapsUrl} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-jaune">
              <Pin className="mt-0.5 size-5 shrink-0 text-jaune" />
              <span>
                {t.footer.address[0]}
                <br />
                {t.footer.address[1]}
              </span>
            </a>
            <a href={club.phone.href} className="flex items-center gap-3 hover:text-jaune">
              <Phone className="size-5 shrink-0 text-jaune" />
              +237 {club.phone.display}
            </a>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="wrap py-5 text-sm">
          © {new Date().getFullYear()} {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
