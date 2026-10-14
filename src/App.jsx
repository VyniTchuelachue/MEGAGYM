import { useState } from 'react';
import About from './components/About.jsx';
import Classes from './components/Classes.jsx';
import Coaching from './components/Coaching.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Header, { TopBar } from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Location from './components/Location.jsx';
import Membership from './components/Membership.jsx';
import Spaces from './components/Spaces.jsx';
import Wellness from './components/Wellness.jsx';
import { useLang } from './lang.js';

export default function App() {
  // What the visitor is asking about; buttons across the page preselect it in the contact form.
  const [interest, setInterest] = useState('abonnement');
  const { t } = useLang();

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-jaune focus:px-4 focus:py-3 focus:font-bold focus:text-noir"
      >
        {t.nav.skip}
      </a>
      <TopBar />
      <Header onAsk={setInterest} />
      <main id="contenu">
        <Hero />
        <About />
        <Spaces />
        <Classes />
        <Coaching onAsk={setInterest} />
        <Wellness onAsk={setInterest} />
        <Membership onAsk={setInterest} />
        <Location />
        <Contact interest={interest} onInterest={setInterest} />
      </main>
      <Footer />
    </>
  );
}
