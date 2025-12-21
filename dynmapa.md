---
title: Dynmapa
description: Nastavení dynamické mapy
published: true
date: 2025-12-21T21:39:59.199Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:13.523Z
---

# Dynmapa

Dynmapa je dynamická mapa, která vám dokáže prostřednictvím webu ukázat živý náhled světa a pohyb hráčů po světě. Pojďme si ukázat, jak Dynmapu nastavit na váš server.

> **Tip:** Dynmapa je velmi náročná na disk a výkon. Pro moderní servery (1.21) často doporučujeme zvážit lehčí alternativu **[Squaremap](https://modrinth.com/plugin/squaremap)** (dříve Pl3xMap), která je rychlejší a zabírá méně místa.
> {.is-info}

## Stažení

Nejnovější verzi stáhneme ze [SpigotMC](https://www.spigotmc.org/resources/dynmap%C2%AE.274/) nebo [Modrinthu](https://modrinth.com/plugin/dynmap).
Stažený plugin nahrajeme do složky **plugins** na našem serveru a server restartujeme.

## Nastavení

Otevřeme si config dynmapy, který nalezneme v `plugins/dynmap/configuration.txt`.

### 1. Typ úložiště (Storage)

Jako první krok nastavíme správný typ úložiště, kam se budou data ukládat. **Důrazně doporučujeme** použití typu **SQLite**. Výchozí `filetree` vytváří miliony malých souborů, což zpomaluje zálohování a může zahltit disk (inode limit).

V configu najděte sekci `storage`. Před `type: filetree` přidejte `#` a u `type: sqlite` naopak `#` smažte.

```yaml
storage:
  # Filetree storage (standard tree of image files for maps)
  #type: filetree
  # SQLite db for map storage (uses dbfile as storage location)
  type: sqlite
  dbfile: dynmap.db
  # MySQL DB for map storage 
  #type: mysql

```

### 2. Formát obrázků (Velká úspora místa!)

Ve výchozím nastavení Dynmapa ukládá obrázky jako PNG. Pro verzi 1.21 doporučujeme změnit formát na **WebP**, který ušetří obrovské množství místa na disku.
Najděte řádek `image-format: png` a změňte ho na:

```yaml
image-format: webp

```

### 3. Kvalita mapy

V sekci `deftemplatesuffix` můžeme nastavit rozlišení mapy.

* `vlowres` - Zabírá nejméně místa, ale kvalita je velmi nízká (rozmazané).
* `lowres` - Zlatá střední cesta (doporučeno).
* `hires` - Vysoká kvalita, ale mapa bude zabírat stovky GB.

```yaml
deftemplatesuffix: lowres

```

### 4. Nastavení portu

Nastavení portu se nachází u položky `webserver-port`. Zde nastavíme jeden z volných portů, který je přidělený vašemu serveru (musí být otevřený ve firewallu, nejedná se o herní port 25565!). Pokud nemáte žádný volný port, budete muset požádat váš hosting o přidělení.

```yaml
# The TCP-port the webserver will listen on.
webserver-port: 8123

```

Pokud vše máme, config uložíme a server opět restartujeme. Web dynmapy nalezneme na IP vašeho serveru s nastaveným portem, například `82.208.17.10:8123`.

## Renderování (Generování mapy)

Dynmapa sama o sobě ukáže jen to, co hráči prozkoumali. Pokud chcete vidět celý svět, musíte ho nejprve **předgenerovat** pomocí pluginu Chunky (viz [návod na předgeneraci](https://www.google.com/search?q=/cs/predgenerace-sveta)).

Až budeme mít svět předgenerovaný, napíšeme příkaz pro vykreslení celé mapy:

```bash
/dynmap fullrender

```

Tento proces může trvat hodiny a výrazně zatíží server. Doporučujeme to dělat v noci nebo při údržbě.

> Pokud máte jakékoliv dotazy nebo problémy s nastavením dynmapy, stačí nás kontaktovat na našem [discordu](https://discord.mcnavody.eu/).