import { useRef, useState } from 'react';
import { club } from '../data/club.js';
import { plans } from '../data/plans.js';
import { useLang } from '../lang.js';
import { formatPrice } from '../lib/format.js';
import Button from './Button.jsx';
import Poster from './Poster.jsx';

const EMPTY = { name: '', phone: '', message: '', website: '' };
const field = 'mt-2 block w-full rounded-[2px] border-2 border-noir bg-white px-4 py-3 text-base text-noir';

function FieldError({ id, children }) {
  return (
    <p id={id} className="mt-2 bg-noir px-3 py-2 text-sm text-jaune">
      {children}
    </p>
  );
}

function ContactForm({ interest, onInterest, plan, onPlan }) {
  const { t, lang } = useLang();
  const form = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [failure, setFailure] = useState(null);
  const [status, setStatus] = useState('idle');
  const membership = interest === 'abonnement';
  const chosenPlan = membership && plan ? t.plans.items[plan].name : '';

  const set = (name) => (event) => setValues((current) => ({ ...current, [name]: event.target.value }));

  const showErrors = (fields) => {
    setErrors(fields);
    const first = ['name', 'phone'].find((name) => fields[name]);
    if (first) form.current.elements[first].focus();
  };

  const submit = async (event) => {
    event.preventDefault();
    const fields = {};
    const digits = values.phone.replace(/\D/g, '');
    if (values.name.trim().length < 2) fields.name = true;
    if (digits.length < 8 || digits.length > 15) fields.phone = true;
    if (Object.keys(fields).length) {
      showErrors(fields);
      return;
    }

    setErrors({});
    setFailure(null);
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, interest, plan: membership ? plan : '', lang }),
      });
      if (response.status === 201) {
        setStatus('sent');
        return;
      }
      if (response.status === 422) {
        showErrors((await response.json()).fields || {});
      } else {
        setFailure(response.status === 429 ? 'rate_limited' : 'network');
      }
    } catch {
      setFailure('network');
    }
    setStatus('idle');
  };

  if (status === 'sent') {
    return (
      <div role="status" className="surface-dark self-start bg-noir p-8 text-white sm:p-10">
        <h3 className="text-5xl font-extrabold uppercase leading-none text-jaune [font-stretch:62%]">
          {t.contact.sentTitle}
        </h3>
        <p className="mt-4 max-w-[30rem] text-lg">
          {t.contact.sentText(values.phone)} {chosenPlan && t.contact.planChosen(chosenPlan)}
        </p>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            setValues(EMPTY);
            setStatus('idle');
          }}
        >
          {t.contact.again}
        </Button>
      </div>
    );
  }

  return (
    <form ref={form} onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      <label className="block font-semibold">
        {t.contact.name}
        <input
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={set('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'error-name' : undefined}
          className={field}
        />
        {errors.name && <FieldError id="error-name">{t.contact.errors.name}</FieldError>}
      </label>

      <label className="block font-semibold">
        {t.contact.phone}
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={set('phone')}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'error-phone' : 'hint-phone'}
          className={field}
        />
        {errors.phone ? (
          <FieldError id="error-phone">{t.contact.errors.phone}</FieldError>
        ) : (
          <span id="hint-phone" className="mt-2 block text-sm font-normal">
            {t.contact.phoneHint}
          </span>
        )}
      </label>

      <label className="block font-semibold sm:col-span-2">
        {t.contact.interest}
        <select
          name="interest"
          value={interest}
          onChange={(event) => onInterest(event.target.value)}
          className={field}
        >
          {Object.entries(t.contact.interests).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      {membership && (
        <label className="block font-semibold sm:col-span-2">
          {t.contact.plan}
          <select name="plan" value={plan} onChange={(event) => onPlan(event.target.value)} className={field}>
            <option value="">{t.contact.planUndecided}</option>
            {plans.map(({ id, price }) => (
              <option key={id} value={id}>
                {t.contact.planOption(t.plans.items[id].name, formatPrice(price, lang))}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="block font-semibold sm:col-span-2">
        {t.contact.message} <span className="font-normal">({t.contact.optional})</span>
        <textarea
          name="message"
          rows="4"
          maxLength="1000"
          value={values.message}
          onChange={set('message')}
          className={field}
        />
      </label>

      {/* Left empty by people, filled in by bots. */}
      <input
        name="website"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
        value={values.website}
        onChange={set('website')}
        className="hidden"
      />

      <div className="sm:col-span-2">
        {failure && (
          <p role="alert" className="mb-4 bg-noir px-4 py-3 text-jaune">
            {t.contact.errors[failure]}
          </p>
        )}
        <Button type="submit" variant="dark" disabled={status === 'sending'} className="w-full disabled:opacity-70 sm:w-auto">
          {status === 'sending' ? t.contact.sending : t.contact.submit}
        </Button>
      </div>
    </form>
  );
}

export default function Contact({ interest, onInterest, plan, onPlan }) {
  const { t } = useLang();
  return (
    <section id="contact" className="surface-yellow bg-jaune text-noir">
      <div className="wrap grid gap-12 py-16 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:gap-20 lg:py-24">
        <div>
          <Poster lines={t.contact.lines} surface="yellow" />
          <p className="mt-7 text-lg leading-relaxed">{t.contact.text}</p>
          <p className="mt-8 font-semibold">{t.contact.direct}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Button href={club.phone.href} variant="outlineDark">
              {t.contact.call} {club.phone.display}
            </Button>
            <Button href={club.whatsapp} target="_blank" rel="noreferrer" variant="outlineDark">
              {t.contact.whatsapp}
            </Button>
          </div>
        </div>
        <ContactForm interest={interest} onInterest={onInterest} plan={plan} onPlan={onPlan} />
      </div>
    </section>
  );
}
