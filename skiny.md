---
title: Skiny
description: Skiny u warez serverů
published: true
date: 2023-11-25T20:49:15.535Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:25.486Z
---

# Skiny

Pokud na serveru máte povolené připojení warez hráču, neuvidíte skiny hráčů. Tento problém jde naštěstí velmi jednoduše vyřešit. 

## SkinsRestorer
První možností je použít plugin SkinsRestorer, který můžeme stáhnout [zde](https://www.spigotmc.org/resources/skinsrestorer.2124/).

### Herní server
Jestliže máme pouze jeden server, plugin nahrajeme do složky **plugins** a máme funkční skiny.

### Proxy server
Pokud vlastníte síť serverů, plugin nahrajeme pouze na proxy server do složky **plugins** a server restartujeme, po restartu bychom měli vidět skiny ve hře.

## CMI
Druhá možnost je použít CMI, ale tento plugin nepodporuje Proxy, takže to lze použít pouze herních serverů, kde nepoužívají žádné proxy.

V configu stačí na řádku 692 nastavit `AutoApply` na true, aby se skiny nastavovali automaticky.

```yml
Skins:
  # Applies skin to player automatically on his login to server if he doesnt have one already set
  # This will always set to skin by target player name
  AutoApply: true
```
