---
title: Skiny
description: Skiny u warez serverů
published: true
date: 2025-12-21T21:26:48.319Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:25.486Z
---

# Skiny

Pokud na serveru máte povolené připojení warez hráčů (`online-mode=false`), server nekomunikuje se servery Mojangu, a proto neuvidíte skiny hráčů (všichni budou vypadat jako Steve nebo Alex). Tento problém jde naštěstí velmi jednoduše vyřešit.

## SkinsRestorer

Nejlepším a nejpoužívanějším řešením je plugin **SkinsRestorer**. Stáhnout ho můžete na [Spigotu](https://www.spigotmc.org/resources/skinsrestorer.2124/) nebo na [Modrinthu](https://modrinth.com/plugin/skinsrestorer).
Tento plugin umožňuje hráčům nastavit si jakýkoliv skin pomocí příkazu `/skin <jméno>` nebo `/skin url <odkaz>`.

### Herní server (Single)

Jestliže máte pouze jeden server (Spigot/Paper) a nepoužíváte proxy, plugin nahrajeme do složky `plugins` a restartujeme server.

### Proxy server (Velocity/BungeeCord)

Pokud vlastníte síť serverů propojenou přes Proxy:

1. Plugin nahrajeme **pouze na Proxy server** (do složky `plugins` na Velocity nebo BungeeCord).
2. Na herní servery (Survival, Lobby) ho **nenahráváme**.
3. Proxy server restartujeme.

Skiny se budou načítat automaticky při připojení.

## CMI

Druhá možnost je použít **CMI**, pokud ho již na serveru máte.
*Upozornění: CMI řešení skinů není tak pokročilé jako SkinsRestorer a funguje pouze na backend serverech (Spigot/Paper), nikoliv na Proxy.*

V souboru `config.yml` (ve složce CMI) najděte sekci **Skins** a nastavte `AutoApply` na `true`. Tím se server pokusí stáhnout skin podle jména hráče.

```yaml
Skins:
  # Applies skin to player automatically on his login to server if he doesnt have one already set
  # This will always set to skin by target player name
  AutoApply: true

```