Cahier des charges pour l'application de jeu (AdonisJS backend, React Native frontend) :

### Partie Backend (AdonisJS) :

#### 1. Authentification via Spotify :

- Endpoint : `/signin`
- Description : Permet à l'utilisateur de s'authentifier à l'aide de son compte Spotify.

#### 2. Redirection Spotify :

- Endpoint : `/signin-callback`
- Description : URL vers laquelle Spotify redirige après l'authentification.

#### 3. Déconnexion :

- Endpoint : `/logout`
- Description : Permet à l'utilisateur de se déconnecter de l'application.

#### 4. Création d'une partie :

- Endpoint : `/create-insert`
- Description : Crée une nouvelle partie en prenant en compte les choix de l'utilisateur (nombre de participants, nombre de musiques parmi 3, 5 ou 7).

#### 5. Choix des musiques :

- Endpoint : `/choose-songs`
- Description : Permet à chaque joueur de choisir le nombre de musiques spécifié pour la partie.

#### 6. Ajout des scores à chaque manche :

- Endpoint : `/add-scores`
- Description : Enregistre les scores pour chaque manche. Un joueur gagne un point s'il trouve à qui appartient la musique, et un point est attribué à celui qui a choisi la musique si personne ne la trouve.

#### 7. Score final :

- Endpoint : `/final-score`
- Description : Calcule le score final à la fin de la partie pour chaque joueur.

#### 8. Suppression du compte :

- Endpoint : `/delete-user`
- Description : Permet à l'utilisateur de supprimer son compte.

### Partie Frontend (React Native) :

#### 1. Authentification via Spotify :

- Page : SigninPage
- Description : Interface pour que l'utilisateur puisse s'authentifier via Spotify.

#### 2. Redirection Spotify :

- Page : SigninCallbackPage
- Description : Page pour gérer la redirection de Spotify après l'authentification.

#### 3. Création d'une partie :

- Page : CreateGamePage
- Description : Interface pour créer une nouvelle partie en spécifiant le nombre de participants et le nombre de musiques.

#### 4. Choix des musiques :

- Page : ChooseSongsPage
- Description : Interface pour permettre à chaque joueur de choisir le nombre de musiques spécifié.

#### 5. Affichage des scores :

- Page : ScoresPage
- Description : Affiche les scores à la fin de chaque manche et le score final.

#### 6. Suppression du compte :

- Page : DeleteAccountPage
- Description : Interface pour permettre à l'utilisateur de supprimer son compte.
