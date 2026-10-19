import { useState } from 'react';
import About from './components/About.jsx';
import Classes from './components/Classes.jsx';
import Coaching from './components/Coaching.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Gallery from './components/Gallery.jsx';
import Header, { TopBar } from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Location from './components/Location.jsx';
import Membership from './components/Membership.jsx';
import Spaces from './components/Spaces.jsx';
import Wellness from './components/Wellness.jsx';
import { useLang } from './lang.js';

export default function App() {
  // What the visitor is asking about, and which plan if it is a membership;
  // buttons across the page preselect both in the contact form.
  const [interest, setInterest] = useState('abonnement');
  const [plan, setPlan] = useState('');
  const ask = (nextInterest, nextPlan = '') => {
    setInterest(nextInterest);
    setPlan(nextPlan);
  };
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
      <Header onAsk={ask} />
      <main id="contenu">
        <Hero />
        <About />
        <Spaces />
        <Gallery />
        <Classes />
        <Coaching onAsk={ask} />
        <Wellness onAsk={ask} />
        <Membership onAsk={ask} />
        <Location />
        <Contact interest={interest} onInterest={setInterest} plan={plan} onPlan={setPlan} />
      </main>
      <Footer />
    </>
  );
}
