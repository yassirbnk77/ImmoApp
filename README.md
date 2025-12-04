# Mini Application Immobilière

Ce projet présente une application web conçue pour être maintenable et évolutive. L'objectif principal était de concevoir une application respectant les principes de scalabilité et de maintenabilité, en mettant l'accent sur la qualité de l'architecture plutôt que sur la quantité de fonctionnalités.

## Installation et Lancement

Le projet est composé de deux parties distinctes : le backend (API) et le frontend (Client).

### 1. Backend

Le serveur API utilise Fastify.

```bash
cd backend
npm install
npm run dev
```

### 2. Frontend

L'interface client utilise React.

```bash
cd frontend
npm install
npm start
```

## Architecture Technique

Pour répondre à la contrainte de scalabilité, une architecture en couches (Layered Architecture) a été mise en place afin d'assurer une séparation stricte des responsabilités.

### Backend (Fastify + TypeScript)

* **Routes** : Gestion des requêtes HTTP (entrées/sorties), déléguant tout traitement interne.
* **Services** : Contient la logique métier (règles de tri, opérations, calculs).
* **Models (Repository)** : Isole l'accès aux données. Actuellement en mémoire, mais facilement remplaçable par une base SQL sans modification de la logique métier.
* **Validation** : Utilisation de Zod pour valider strictement les données entrantes et sortantes.

### Frontend (React + Tailwind CSS)

* **Composants** : Développement de composants UI personnalisés (boutons, cartes, champs) via Tailwind CSS, sans dépendances externes lourdes.
* **Gestion d'état** : Utilisation de React Query (TanStack Query) pour gérer le cache serveur, les états de chargement et la synchronisation des données.

## Justification des choix techniques

* **Scalabilité** : La séparation entre Routes, Services et Repository rend le code modulaire et facilite la maintenance. Le passage à une base de données (ex. PostgreSQL) n'impacte pas la logique métier.
* **Performance** : Fastify offre de meilleures performances qu'Express. Tailwind CSS est plus léger que Bootstrap, rendant l'application réactive et fluide.
* **Sécurité** : L'utilisation d'UUIDs pour les identifiants empêche l'énumération des ressources.

## Pistes d'amélioration

Si davantage de temps avait été disponible, plusieurs améliorations auraient été mises en place :

* **Persistance** : Remplacement du stockage en mémoire par PostgreSQL, accompagné de Prisma.
* **Tests** : Ajout de tests unitaires backend avec Vitest et de tests de composants frontend.
* **Déploiement** : Création d'une image Docker pour faciliter l'orchestration et le déploiement.
* **Gestion des fichiers** : Mise en place d'un upload réel des images vers un service de stockage distant (type S3).

## Stack technique

React, Fastify, TypeScript, Tailwind CSS.
