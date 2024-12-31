---
title: Luckperms
description: 
published: false
date: 2023-11-25T21:12:55.095Z
tags: 
editor: markdown
dateCreated: 2023-11-25T21:12:54.272Z
---

# LuckPerms
LuckPerms jsou bezesporu nejlepší a nejpoužívanější plugin na permisse. Jedná se o jeden z pluginů, které by neměly chybět na žádném serveru.

Co jsou to ale permisse? Permisse umoňují určit, zda nějaký hráč bude moci provádět danou akci, nebo zda nebude moci. Permisse můžou být úplně cokoliv, v drtivé většině případů se ale jedná o tvar *plugin.daná-permisse* tím pádem permisse třeba pro použití LuckPerms editoru bude *luckperms.editor*, dané permisse najdete vždy na stránkách pluginů či módů.

<h2>Instalace</h2>
LuckPerms momentálně podporují 8 platforem. Instalace je ve všech případech velice jednoduchá, celkově se ale v návodu zaměříme na bukkit/proxy platformy.
Jako první si stačí plugin stáhnout z oficiální stránky [odkaz](https://luckperms.net/download).
Následně nám stačí stažený soubor nahrát do složky plugins a zapnout server. 
Pro bukkit platformu doporučujeme rovnou stáhnout i plugin Vault [odkaz](https://www.spigotmc.org/resources/vault.34315/). Tento proces zopakujeme na každém serveru, kde chceme mít LuckPerms nainstalované.

<h2>Nastavení</h2>
Nastavení pluginů je velice jednoduché! Jestli máte pouze jeden server, tak můžete celou sekci nastavení přeskočit.
Jako první si změníme v souboru **config.yml** název našeho serveru. V defaultním configu se jedná o řádek 34.

```
server: název_serveru
```
Toto musíme provést na každém serveru, všude dávejte jiný název (survival, skyblock, lobby, proxy...). Uvedená hodnota bude později využívána v kontextu.

Následně budeme muset nastavit databázi pro ukládání. V základu se jedná o H2, což nebude fungovat v případě, kdy chceme mít stejné permisse na více serverech. Najdeme si tedy položku, kde se dá změnit typ databáze. V základu se jedná o řádek 86.
```
storage-method: h2
```
Zde změníme hodnotu h2 na jiný typ databáze, ve většině případů se bude jednat o MySQL. Následně jen vyplníme údaje, které získáme při vytvoření databáze.

<h2>Migrace Databáze</h2>






