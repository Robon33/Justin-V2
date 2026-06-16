# Justin Café — site vitrine & réservation

Site statique (HTML/CSS/JS) avec une fonction serverless Vercel pour gérer les demandes de réservation par email.

## Structure

```
index.html        page unique : splash "ouverture" + site complet
styles.css
script.js
api/reserve.js    fonction serverless Vercel — reçoit le formulaire et envoie un email via Resend
assets/img/       logos (svg)
```

## Déploiement sur Vercel

1. Pousse ce dossier sur un repo Git (GitHub/GitLab), puis importe-le dans Vercel — aucune configuration de build nécessaire (site statique + dossier `/api` détecté automatiquement).
2. Crée un compte sur [resend.com](https://resend.com) (gratuit jusqu'à 3000 emails/mois).
   - Ajoute et vérifie ton domaine (ou utilise le domaine de test `onboarding@resend.dev` pour commencer).
   - Récupère ta clé API (`RESEND_API_KEY`).
3. Dans Vercel → Project → Settings → Environment Variables, ajoute :
   - `RESEND_API_KEY` → ta clé Resend
   - `RESERVATION_TO` → l'adresse qui doit recevoir les réservations (ex. ton adresse perso)
   - `RESERVATION_FROM` → l'adresse expéditrice vérifiée (ex. `Justin Café <reservations@justincafe.fr>`, ou `onboarding@resend.dev` en attendant d'avoir un domaine)
4. Redéploie. Le formulaire de réservation de la page envoie alors un email automatiquement à chaque demande.

## Personnalisation rapide

- **Texte du splash / date d'ouverture / adresse** : dans `index.html`, sections `#splash` et `#ouverture`.
- **Couleurs** : variables CSS en haut de `styles.css` (`--brown-dark`, `--taupe`, `--cream`…).
- **Logos** : `assets/img/` contient toutes les variantes (blanc, marron, tricolore, illustré).
- **Réseaux sociaux / contact** : section `<footer>` de `index.html`.
