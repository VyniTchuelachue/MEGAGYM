// Formules d'abonnement, en FCFA. Source : publications du club et de ses
// partenaires sur Facebook et TikTok (2025). À confirmer avec le club avant la
// mise en ligne. Les textes de chaque formule sont dans src/content/.
export const plans = [
  { id: 'standard', price: 45000, registration: 15000 },
  { id: 'vip', price: 100000, registration: 25000 },
];

export const planIds = plans.map((plan) => plan.id);
