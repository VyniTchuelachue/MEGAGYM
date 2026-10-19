// Photos du site. Chaque entrée est :
// - 'club/<nom>' : une photo du club. Déposez l'original dans photos/club/<nom>.jpg
//   puis lancez `npm run images` pour créer les tailles web ;
// - un identifiant Unsplash (« photo-… ») ;
// - ou le chemin d'un fichier du dossier public/ (ex. '/images/logo.png').
export const images = {
  hero: 'club/nouvelle-salle',
  club: 'club/salle-plateau',
  musculation: 'club/musculation-pompes',
  cardio: 'club/salle-cardio',
  cours: 'club/rpm-velos',
  seance: 'club/cours-groupe',
  coaching: 'club/coaching-tapis',
  // Pas encore de photo du hammam du club : image libre de droits en attendant.
  hammam: 'photo-1761470575018-135c213340eb',
  abonnement: 'club/cours-coach',
  gallery: [
    'club/cardio-rameurs',
    'club/coaching-poids',
    'club/cours-sol',
    'club/musculation-poulie',
    'club/cardio-velos',
    'club/cours-ballons',
  ],
};
