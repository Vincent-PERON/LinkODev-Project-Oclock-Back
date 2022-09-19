## Connexion psql
```
sudo -i -u postgres psql
```


## Création de l'utilisateur

```SQL
CREATE USER linkodev WITH PASSWORD 'linkodev';
```

## Création de la base de données

```SQL
CREATE DATABASE linkodev WITH OWNER linkodev;
```
