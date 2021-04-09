# Rapport projet Cra'Quiz

## Organisation

### L'équipe

L'équipe **LesCrackheadsDeLens** est composé de :

- Mohamed Aarouss
- Cleveland Hennechart
- Léo Sportich

### L'application

**Cra'Quiz** est un site de quiz en ligne, il permet de répondre à des quiz déjà présents sur le site créé par les autres utilisateurs
mais il permet aussi de créer son propre quiz en y ajoutant le nom du quiz, une image et un thème.
Il ajoute également les questions avec le nombre de points que la question rapporte, ainsi que les propositions associées
avec un texte ou une image.

### Les outils

Pour l'IDE nous avons tous utilisé _WebStorm_ ainsi qu'un répertoire _GitLab_ associé.
Pour la base de donnée nous utilisons chacun _PostgreSQL_ et les technologies utilisées nous avons du _Express.js_ pour le backend et du _React.js_ pour le frontend.

## Gestion de projet

La méthode choisie pour la gestion de ce projet est la méthode agile, pour nous c'était le plus adapté pour un projet rapide comme celui-ci.
De plus nous avons déjà réalisé des projets à l'aide de cette méthode et nous avions déjà eu des cours sur cette méthode.

Concernant les rôles, nous allons le voir dans la répartition des fonctionnalités mais voici un petit résumé :

- Mohamed s'est occupé de la partie authentification et des fonctionnalités liées à ça.
- Cleveland a réalisé des formulaires ainsi que le backend (création, modification, suppression) pour les quiz, questions et propositions.
- Léo s'est chargé du backend et de l'affichage des quiz et de la réalisation des tests.

De plus, Mohamed et Cleveland se sont occupés de l'esthétique du site avec bootstrap.
Et nous avons tous travaillé sur la base de données et sur le backend pour mettre en place le serveur.

### Journée type

Pour une journée nous avions notre petite routine :

Réaliser un daily meeting pour voir ce qui a été fait et ce qu'il faut faire, et mettre à jour le Trello en conséquence.
Ensuite nous travaillons chacun sur notre branch pour développer nos fonctionnalités et faire des commits au fur et à mesure.
Puis à la fin de chaque journée nous faisions une petite réunion pour voir si nous avons bien avancé sur nos objectifs et définir les prochaines priorités.

### Trello

Comme outil de suivi de projet nous avons utilisé _Trello_ qui nous permet de nous organiser selon
la méthode agile avec un tableau de Kanban.

Le lien du trello : https://trello.com/invite/b/Wgj9r4Gh/ea4e5f71b31ab35d82383e70f88f46c8/projet-js-avril

## Application

### Fonctionnalités obligatoires

- Créer la base de données avec quelques données de base : fonctionne totalement, réalisé par tout le monde.
- Afficher la liste de tous les quiz, avec l’image associée : fonctionne totalement, réalisé par Léo.
- Afficher la liste des quiz en fonction d’un mot-clé : fonctionne totalement, réalisé par Léo et Cleveland.
- Intégrer au moins une question dont les propositions sont des images, et les afficher sur le frontend : fonctionne partiellement, réalisé par Léo et Mohamed.
- Permettre de jouer à un quiz et afficher la somme des points obtenus : fonctionne totalement, réalisé par Léo.
- Authentifier les utilisateurs : fonctionne totalement, réalisé par Mohamed.
- Limiter les possibilités des joueurs non identifiés : ils ne peuvent répondre qu’aux trois premières questions d’un quiz : non fait
- Permettre à un joueur authentifié de créer et de modifier ses propres quiz : non fait
- Interdire à un joueur authentifié de jouer à ses propres quiz : non fait
- Mémoriser les scores des joueurs authentifiés : non fait

## Mise en place

Tout d'abord nous devons configurer l'accès à notre base de données dans le fichier _pg.js_
```JS
const pool = new Pool({
user: 'postgres', //postgres
host: 'localhost',
database: 'postgres', //postgres
password: 'admin', //admin
port: 5432
});
```
Puis nous pouvons lancer le script _pg.sql_ afin de créer le schéma ainsi que les tables.
Il faut également faire un npm install dans la racine du projet et dans le dossier server pour
que tout s'affiche correctement. Puis lancer un npm start dans le dossier server et ensuite dans la racine.
Si tout se passe bien votre navigateur va s'ouvrir sur localhost:3000 et afficher la page d'accueil du site.

## Rétrospective

Pour les difficultés rencontrées nous avon eu un problème d'affichage des propositions, l'index est décalé quand on passe à la question suivante,
ce problème a été vu avec M.Paris mais nous n'avons pas trouvé de solution.
Mohamed a également rencontré des difficultés pour l'authentification de ce fait il a passé beaucoup de
temps sur ce point notamment sur la sécurisation des routes.

Nous avons une bonne cohésion et une bonne entente ce qui nous a permis de bien nous répartir les tâches comme vu précédemment.

Les parties qui auraient pu être améliorées sont l'affichage des propositions sans le problème de décalage d'index.
Développer la partie utile de l'authentification pour s'en servir pour les accès et les restrictions.
Passer en revue le design du site pour avoir une interface plus propre et esthétique.
Améliorer la méthode pour les modifications (quiz, questions et propositions).
Et intégrer l'upload d'image pour un quiz et une proposition.
