---
title: Předgenerace světa
description: Předgenerování světa pomocí pluginu Chunky
published: true
date: 2023-11-25T20:51:21.017Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:21.896Z
---

# Předgenerace světa

Předgenerování světa dobré z nějakolika důvodu. První důvodem je zvýšení stability server. Server nemusí generovat chunky při hraní hráčů, jelikož je má již předgenerování a tím pádem neubírá zbytečně výkon serveru. Dalším důvod předgenerování může být Dynmapa.

## Stažení
Jako první krok stáhneme plugin [Chunky](https://www.spigotmc.org/resources/chunky.81534/).
Po stažení plugin nahrajeme do složky **plugins** a server restartujeme.

## Generace
Generace je velmi jednoduchá a stačí použít pár příkazů. Příkazy můžeme zádávat ve hře nebo konzoli. (Do konzole bez /)

```
/chunky world world <- Jméno světa, který chceme vygenerovat.
/chunky center 0 0 <- Nastavíme střed generované oblasti.
/chunky radius 5000 <- Velikost generovaného rádiusu.
/chunky start <- spustíme proces generace
```

Pro začátek doporučujeme nastavit pro přírodu rádius 7500 + 5000 pro nether a end.
Pokud si chcete spočítat kolik místa svět zabere, stačí použít tuto [stránku](https://onlinemo.de/world).

Svět se bude generovat několik hodin. Procesor pojede nejspíše na plný výkon a TPS budou kolísat. To je naprosto normální a pokud by server spadnul, po opětovaném zapnutí stačí pouze napsat příkaz `/chunky continue`.

V konzoli je při generování vidět průběh generování.

V tomto návodu jsou ukázané základní funkce pluginy, veškeré funkce naleznete na [wiki](https://github.com/pop4959/Chunky/wiki) pluginu.

Pokud preferujete tutorial, stačí se podívat [sem](https://youtu.be/pqaisjCl0GY).

> Pokud máte jakékoliv dotazy nebo problémy s předgenerací světa, stačí nás kontaktovat na našem discordu.
