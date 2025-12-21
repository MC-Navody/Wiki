---
title: Vlastní svět
description: Nahrání vlastního světa
published: true
date: 2025-12-21T21:11:17.187Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:27.794Z
---

# Nahrání vlastního světa

Ať už stahujete mapu z internetu nebo přesouváte svět ze svého počítače, postup je velmi podobný.

## Jako hlavní svět

Pokud chceme nahradit hlavní svět a dát místo něj stažený, stačí udělat následující kroky.
**Před smazáním starého světa si vždy udělejte zálohu!**

1. Vypněte server.
2. Připojte se na FTP a smažte složku hlavního světa (název najdete v `server.properties` na řádku `level-name=`, ve výchozím stavu je to `world`).
3. Nahrajte složku s vaším novým světem na server.
4. **Důležité:** Otevřete nahranou složku a ujistěte se, že přímo v ní vidíte soubor `level.dat`. Pokud je tam další složka a až v ní soubory, musíte obsah přesunout o úroveň výš.
5. Přejmenujte nahranou složku tak, aby se shodovala s názvem v `server.properties` (např. na `world`).
6. Zapněte server.

*Poznámka: Pokud nahráváte starší mapu (např. z verze 1.16) na server 1.21, první spuštění může trvat déle, protože server konvertuje svět.*

## Jako další svět

Na tuto metodu budeme potřebovat plugin [Multiverse Core](https://www.spigotmc.org/resources/multiverse-core.390/), který stáhneme a nahrajeme do složky `plugins`. Následně server restartujeme.

Do hlavní složky serveru nahrajeme složku s mapou (ujistěte se, že neobsahuje mezery v názvu, např. `mojemapa`, nikoliv `moje mapa`). Poté použijeme příkaz pro import.

### Příkazy pro import

**Klasický import světa:**

```bash
/mv import <jméno_složky> NORMAL

```

**Import Nether nebo End světa:**
Pokud nahráváte dimenzi, musíte specifikovat typ prostředí:

```bash
/mv import <jméno_složky> NETHER
/mv import <jméno_složky> THE_END

```

**Import Flat (plochého) světa:**
Pokud je mapa typu Superflat:

```bash
/mv import <jméno_složky> NORMAL -t FLAT

```

**Import Void (prázdného) světa:**
Pro generaci prázdného světa na verzi 1.21 je potřeba mít nainstalovaný kompatibilní Void generátor (např. plugin *VoidGen*). Samotný Multiverse to bez doplňku neumí.

```bash
/mv import <jméno_složky> NORMAL -g VoidGen:

```

### Časté chyby

* **FAILED!** - Pokud vám import napíše chybu, většinou to znamená, že server nemůže najít soubor `level.dat` uvnitř složky, kterou se snažíte importovat. Zkontrolujte strukturu složky.