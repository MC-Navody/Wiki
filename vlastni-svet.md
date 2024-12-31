---
title: Vlastní svět
description: Nahrání vlastního světa
published: true
date: 2023-11-25T20:14:25.076Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:27.794Z
---

# Nahrání vlastního světa

## Jako hlavní svět
Pokuď chceme nahradit hlavní svět a dát místo něj stažený, stačí udělat následující kroky.

První server vypneme, smažeme hlavní svět (jméno hlavního světa nalezneme v souboru server.properties na řádku `level-name=world`). Nahrajeme náš svět a pojmenujeme jako smazaný starý svět nebo změníme jméno v server.properties.

## Jako další svět
Na tuto metodu budeme potřebovat plugin [Multiverse Core](https://www.spigotmc.org/resources/multiverse-core.390/), který stáhneme. Pokud budeme chtít importovat svět s void generací stáhněte plugin [Voidgen](https://www.spigotmc.org/resources/voidgen.25391/). Plugin/y nahrajeme na server a server restartujeme.

Do hlavní složky serveru nahrajeme složku s mapou s jakýmkoliv jménem. Poté použijeme tyto příkazy.

Import světa
```
/mv import <jméno světa> <typ>
```
Import světa s void generátorem
```
/mv import <jméno světa> <typ> -g Voidgen -t FLAT
```
Import světa typu flat
```
/mv import <jméno světa> <typ> -t FLAT
```
Typy máme: `Normal, Nether, End`.

