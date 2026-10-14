import { useEffect, useState } from 'react';
import { club } from '../data/club.js';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const toMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Current weekday (0 = Monday) and minutes since midnight at the club,
// whatever the visitor's own time zone.
export function clubNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: club.timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const part = (type) => parts.find((p) => p.type === type).value;
  return {
    day: WEEKDAYS.indexOf(part('weekday')),
    minutes: Number(part('hour')) * 60 + Number(part('minute')),
  };
}

export function clubStatus(now = clubNow()) {
  const today = club.hours[now.day];
  if (now.minutes >= toMinutes(today.open) && now.minutes < toMinutes(today.close)) {
    return { open: true, time: today.close, day: now.day };
  }
  if (now.minutes < toMinutes(today.open)) {
    return { open: false, time: today.open, tomorrow: false, day: now.day };
  }
  return { open: false, time: club.hours[(now.day + 1) % 7].open, tomorrow: true, day: now.day };
}

export function useClubStatus() {
  const [status, setStatus] = useState(clubStatus);
  useEffect(() => {
    const timer = setInterval(() => setStatus(clubStatus()), 60_000);
    return () => clearInterval(timer);
  }, []);
  return status;
}

// '05:30' → « 5h30 » (fr) or '5:30 am' (en); '20:00' → « 20h » or '8 pm'.
export function formatTime(time, lang) {
  const [hours, minutes] = time.split(':').map(Number);
  if (lang === 'fr') return `${hours}h${minutes ? String(minutes).padStart(2, '0') : ''}`;
  const hour12 = hours % 12 || 12;
  return `${hour12}${minutes ? `:${String(minutes).padStart(2, '0')}` : ''} ${hours < 12 ? 'am' : 'pm'}`;
}
