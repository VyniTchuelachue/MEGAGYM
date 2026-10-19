import { useEffect, useState } from 'react';
import { club } from '../data/club.js';
import { useLang } from '../lang.js';
import Button from './Button.jsx';
import { OpenStatus, Socials } from './ClubLinks.jsx';
import { Close, Menu, Phone, Pin } from './Icons.jsx';
import Logo from './Logo.jsx';

function LanguageToggle() {
  const { t, lang, setLang } = useLang();
  return (
    <div role="group" aria-label={t.nav.language} className="flex items-center">
      {['fr', 'en'].map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={`condensed px-2 py-2 text-[0.8125rem] transition-colors ${
            lang === code ? 'text-jaune' : 'text-white/60 hover:text-white'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export function TopBar() {
  const { t } = useLang();
  return (
    <div className="bg-black text-[0.8125rem] text-white/85">
      <div className="wrap flex h-10 items-center justify-between gap-4">
        <p className="flex items-center gap-1.5">
          <Pin className="size-3.5 text-jaune" />
          {t.topbar.location}
        </p>
        <div className="flex items-center gap-3 sm:gap-6">
          <OpenStatus className="hidden min-[34rem]:flex" />
          <LanguageToggle />
          <Socials className="hidden md:flex" />
        </div>
      </div>
    </div>
  );
}

export default function Header({ onAsk }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-noir/95 backdrop-blur">
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
          <a href="#top" aria-label={t.nav.home} className="shrink-0 text-[0.9rem] sm:text-base">
            <Logo />
          </a>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {t.nav.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="condensed py-2 text-[0.95rem] transition-colors hover:text-jaune">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button href="#tarifs" onClick={() => onAsk('abonnement')}>
                {t.nav.cta}
              </Button>
            </div>
            <button
              type="button"
              aria-label={t.nav.openMenu}
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen(true)}
              className="grid size-12 place-items-center lg:hidden"
            >
              <Menu className="size-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Outside the header: its backdrop filter would otherwise trap this fixed layer. */}
      {open && (
        <div id="menu" className="fixed inset-0 z-50 flex h-dvh flex-col overflow-y-auto bg-noir lg:hidden">
          <div className="wrap flex h-[4.5rem] shrink-0 items-center justify-between">
            <span className="text-[0.9rem] sm:text-base">
              <Logo />
            </span>
            <button
              type="button"
              aria-label={t.nav.closeMenu}
              onClick={() => setOpen(false)}
              autoFocus
              className="grid size-12 place-items-center"
            >
              <Close className="size-7" />
            </button>
          </div>
          <nav className="wrap flex-1 py-6">
            <ul>
              {t.nav.links.map((link) => (
                <li key={link.href} className="border-b border-white/10">
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-4xl font-extrabold uppercase [font-stretch:62%] hover:text-jaune"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="wrap space-y-5 pb-8">
            <OpenStatus className="text-white/85" />
            <a href={club.phone.href} className="flex items-center gap-2 text-lg font-semibold">
              <Phone className="size-5 text-jaune" />
              {club.phone.display}
            </a>
            <Button
              href="#tarifs"
              onClick={() => {
                onAsk('abonnement');
                setOpen(false);
              }}
              className="w-full"
            >
              {t.nav.cta}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
