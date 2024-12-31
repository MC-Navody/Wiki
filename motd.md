---
title: MOTD Serveru
description: 
published: false
date: 2023-11-25T21:15:00.442Z
tags: 
editor: markdown
dateCreated: 2023-11-25T21:14:48.542Z
---

# MOTD Serveru
MOTD serveru můžeme nastavit buď pomocí výchozí funkce serveru nebo přes plugin.

## Výchozí MOTD
Výchozí MOTD se pro různé druhy serveru líší, zde si ukážeme Velocity, Bungeecord a Spigot.

**Velocity**
Najdeme v hlavní složce serveru soubor `velocity.toml` a na řádku 7 můžeme upravit samotné MOTD.
```
# Co by mělo být MOTD? To se zobrazí, když hráč přidá váš server
# jejich seznam serverů. Starší barevné kódy a JSON jsou přijímány.
motd = "MOTD"  <- zde nastavíte MOTD
```

**Bungeecord**
Najdeme v hlavní složce serveru soubor `config.yml` a na řádku 2 upravíme samotné MOTD.
```
  motd: MOTD   <- Zde nastavíte MOTD
```

**Spigot**
Najdeme v hlavní složce serveru soubor `server.properties` a přibližně na řádku 11 upravíme samotné MOTD.
```
motd=MOTD  <- Zde nastavíte MOTD
```

## Pomocí pluginu
V tomto návodu si ukážeme jednoduchý plugin na nastavení a to **PistonMOTD**. Plugin stáhneme [zde](https://www.spigotmc.org/resources/pistonmotd-rgb-and-1-18-support.80567/) a vložíme na náš server. Tento plugin podporuje Velocity, Bungeecord i Spigot servery. server restartujeme.

Až plugin budeme mít plugin funkční, půjdeme do **/plugins/pistonmotd/config.yml**, zde se nastavuje celé MOTD. Popis configu níže.

```
# You can find color codes here: https://minecraft.tools/en/color-code.php
# Formatting comes after the color! &d&l will work, but not &l&d.
# MiniMessage formatting IS supported: https://docs.adventure.kyori.net/minimessage.html#template
# MiniMessage allows you to make rainbow colors and gradients!
# HEX/RGB colors ARE supported. (Only the MOTD)
# Hex format: &#FFFFFF
# Placeholders: %online% (Players online)
# %max% (Server max slots)
# %newline% adds a newline to your MOTD.
# %tps% shows the tps (Paper only)
description:
  activated: true
  text:
    - "Hello! %newline%World!"
    - "Use &4color codes!"
    - "&ka &rFormatting &rworks &rtoo! &ka"
    - "&1Players: %online%/%max%"

# Not supported on: Spigot (Paper works), Sponge
version:
  # The version name is shown if the version of the client doesn't match the version of the server.
  # %aftericon% adds a bunch of spaces so the text is after the icon. (Only for protocol)
  name:
    activated: true
    text: "&1My custom version name!"
  # Dangerous! This can show a wrong server version to the client.
  # When the client is on a different protocol, it will show the version name set above.
  protocol:
    activated: false
    value: 1

players:
  # Override your actual player count
  # Not supported on: Spigot (Paper works)
  online:
    activated: false
    value: 0
  # Override your max player count
  max:
    activated: false
    value: 10
  # Will show ??? as the player count.
  # Not supported on: Spigot (Paper works)
  hide: false
  # Box shown when you hover over the player count
  # Not supported on: Spigot (Paper works)
  sample:
    # Restores the vanilla behavior for the sample box.
    # The name of every player on the server will be shown in the sample box.
    # Overrides the text feature from below.
    vanilla:
      activated: false
      hidden:
        - "Notch"
    activated: true
    text:
      - "&3Hello world!"
      - "&eNewline!"
      - "&6    spaces!"
      - "&d&lCombined"
      - "&1Players: %online%/%max%"

# The image of a server in the server list.
favicon:
  activated: false
  # Favicons are stored in the /plugins/PistonMOTD/favicons folder.
  # Favicons are 64x64 pixels and must be PNG. The file name does not matter for random mode.
  # Valid: RANDOM, SINGLE
  mode: RANDOM
  # The single favicon shown when SINGLE is selected.
  single: example.png

# Extensions to the functionality of PistonMOTD
extensions:
  # Extensions for vanishing plugins
  vanish:
    # Support for SuperVanish. Hide players from the player count/sample on Bukkit.
    supervanish: false
    # Support for PremiumVanish. Hide players from the player count/sample on Bukkit AND BungeeCord. (Premium plugin)
    premiumvanish: false
    # Hide players from the vanilla player sample feature.
    hideSample: true
    # Hide players from the online player count. (Most vanish plugins already have that built in)
    hideCount: false

# Advanced features that should not be messed with unless you know what you're doing.
advanced:
  # If activated the server will only be shown as supported for the following protocols.
  supportedProtocol:
    activated: false
    unsupportedNumber: -1 # Shown when the protocol is not supported.
    # The supported protocol versions.
    # Protocol version numbers can be found here: https://wiki.vg/Protocol_version_numbers
    numbers:
      - 757
      - 756

```