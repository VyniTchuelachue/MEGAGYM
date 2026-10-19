// 45000 → « 45 000 » (fr) or '45,000' (en).
export const formatPrice = (amount, lang) =>
  new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US').format(amount);
