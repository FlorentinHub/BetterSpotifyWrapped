# Application Spotify Wrapped Personnalisé

Cette application permet aux utilisateurs de créer un Wrapped Spotify personnalisé basé sur les données de leur compte Spotify. Elle extrait des informations à partir de l'API Spotify pour générer un récapitulatif unique. L'application est disponible à l'adresse suivante : [https://betterspotifywrapped.netlify.app/](https://betterspotifywrapped.netlify.app/).

## Fonctionnalités

- **Connexion à Spotify :** Génération d'une URL de connexion Spotify dynamique avec les scopes nécessaires et redirection vers la page d'autorisation Spotify.
- **Extraction de données Spotify :** Récupère les informations de l'utilisateur, y compris :
  - Top artistes
  - Titres les plus écoutés
  - Historique de lecture récent
- **Interface intuitive :** Design responsive et moderne grâce à Bootstrap.
- **Exportation du Wrapped :** Visualisez et partagez facilement votre Wrapped personnalisé.
- **Scopes de l'API Spotify inclus :**
  - `user-library-read`
  - `playlist-read-private`
  - `user-read-email`
  - `user-top-read`
  - `user-read-recently-played`
- **Disponible en ligne :** Pas besoin de télécharger, accessible directement depuis l'[URL](https://betterspotifywrapped.netlify.app/).

## Technologies Utilisées

- **React :** Pour construire l'interface utilisateur.
- **Bootstrap :** Pour un design moderne et responsive.
- **Vite :** Pour un développement rapide et efficace.

## Instructions d'Installation locale

### Prérequis

- Node.js (version 16 ou supérieure recommandée)

### Installation

1. **Cloner le dépôt :**

   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. **Installer les dépendances :**

   ```bash
   npm install
   ```

3. **Lancer le serveur de développement :**

   ```bash
   npm run dev
   ```

4. **Accéder à l'application :**
   Ouvrez votre navigateur et rendez-vous sur `http://localhost:3000`.

### Construction pour la Production

Pour construire l'application en production, exécutez :

```bash
npm run build
```

## Instructions d'Utilisation

1. **Se connecter via Spotify :**
   - Cliquez simplement sur le bouton de connexion.
   - Connectez-vous à Spotify.

2. **Copier l'URI de redirection :**
   - Utilisez le bouton "Copier" pour copier l'URI de redirection.
   - Ajoutez cette URI dans la section Redirect URLs de votre Spotify Developer Dashboard.

3. **Consultez votre Wrapped !**
   - Consultez votre wrapped selon les catégories souhaitées

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

### Étapes pour Contribuer
1. Forkez le dépôt.
2. Créez une nouvelle branche : `git checkout -b feature-branch-name`.
3. Commitez vos modifications : `git commit -m "Description des modifications"`.
4. Poussez sur la branche : `git push origin feature-branch-name`.
5. Soumettez une pull request.

## Documentations & Services utilisés

- [Documentation Développeur Spotify](https://developer.spotify.com/documentation/web-api/)
- [Bootstrap](https://getbootstrap.com/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Netlify](https://www.netlify.com/)
