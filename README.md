#  MyFlowAudio

Application de streaming audio développée avec next.js, typeScript et supabase. Ce projet permet aux utilisateurs d'écouter, de gérer et d'organiser leurs musiques préférées. 

##  Fonctionnalitées principales

-  **Lecteur audio ** avec contrôles (play, pause, skip, volume)
-  **Recherche de music** via l'API Deezer et base de données locale
-  **Système de favoris** pour sauvegarder vos chansons préférées
- **Playlists personnalisées** pour organiser votre musique (pas fini)
-  **Authentification sécurisée** avec Supabase Auth
-  **Design responsive** optimisé pour mobile et desktop 
-  **Interface moderne** avec animations fluides grace à tailwind CSS




##  Technologies utilisées

### Frontend
- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique pour une meilleure maintenabilité
- **Tailwind CSS** - Styles utilitaires et design system
- **Zustand** - Gestion d'état légère et performante
- **React Hot Toast** - Notifications élégantes

### Backend & Services
- **Supabase** - Backend as a Service (BaaS)
  - Authentication
  - PostgreSQL Database
  - Stockage pour les fichiers audio
- **Deezer API** - Catalogue musical externe

### Outils de développement
- **ESLint** - Linting du code
- **Zod** - Validation des schémas de données


##  Architecture du projet

web_app/
 ├── actions/          # Server actions (next.js)
 ├── app/             # Routes et pages (App Router)
 ├── components/      # Composants React
 │   ├── features/    # Composants métier
 │   └── ui/         # Composants UI réutilisables
 ├── hooks/          # Custom hooks React
 ├── lib/            # Utilitaires et validations
 └── providers/          # Context providers





