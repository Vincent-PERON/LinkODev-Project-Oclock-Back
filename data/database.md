## 1. Connexion psql
```sh
sudo -i -u postgres psql
```


## 2. Création de l'utilisateur

```SQL
CREATE USER linkodev WITH PASSWORD 'linkodev';
```

## 3. Création de la base de données

```SQL
CREATE DATABASE linkodev WITH OWNER linkodev;
```

## 4. Ajout de données de test

Modifier le fichier data/data.json pour ajouter des données de tests

## 5. Création des tables et seeding

```sh
npm run initdb
```
