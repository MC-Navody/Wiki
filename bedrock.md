---
title: Bedrock
description: Zpřístupnění serveru pro bedrock hráče
published: true
date: 2025-12-21T21:00:22.756Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:11.136Z
---

# Podpora Bedrock

Jestliže chcete umožnit připojení Bedrock hráčům na váš server (mobily, konzole, Windows 10/11 edition), postačí nám na to jeden nebo dva pluginy. Vyberte si verzi serveru a postupujte podle návodu.

## Nastavení

### Online mode server

*Pokud máte server pouze pro hráče se zakoupeným MC (online-mode=true).*

<details>
  <summary><b>Velocity 🚀 (Doporučeno)</b></summary>

Přidáme na Velocity server plugin [GeyserMC](https://www.google.com/search?q=%5Bhttps://geysermc.org/download/%5D(https://geysermc.org/download/)), server poté restartujeme a otevřeme **config.yml**, který nalezneme v `/plugins/Geyser-Velocity/`.
V configu upravíme `port`, jestliže nechceme používat výchozí `19132`.

```yaml
bedrock:
  # IP adresa, která bude naslouchat připojení.
  # Není důvod ji měnit, pokud nechcete omezit IP adresy.
  address: 0.0.0.0
  # Port, který bude naslouchat pro připojení (UDP)
  port: 19132

```

Pokud jsme port upravili, musíme server opět restartovat.

</details>

<details><summary><b>BungeeCord 🌊</b></summary>

Přidáme na Bungeecord server plugin [GeyserMC](https://www.google.com/search?q=%5Bhttps://geysermc.org/download/%5D(https://geysermc.org/download/)), server poté restartujeme a otevřeme **config.yml**, který nalezneme v `/plugins/Geyser-BungeeCord/`.
V configu upravíme `port`, jestliže nechceme používat výchozí `19132`.

```yaml
bedrock:
  # IP adresa, která bude naslouchat připojení.
  address: 0.0.0.0
  # Port, který bude naslouchat pro připojení (UDP)
  port: 19132

```

Pokud jsme port upravili, musíme server opět restartovat. *Poznámka: Waterfall je již nepodporovaný software.*

</details>
<details><summary><b>Spigot/Paper 🌳 (Bez proxy)</b></summary>

Přidáme na Spigot/Paper server plugin [GeyserMC](https://www.google.com/search?q=%5Bhttps://geysermc.org/download/%5D(https://geysermc.org/download/)), server poté restartujeme a otevřeme **config.yml**, který nalezneme v `/plugins/Geyser-Spigot/`.
V configu upravíme `port`, jestliže nechceme používat výchozí `19132`.

```yaml
bedrock:
  # IP adresa, která bude naslouchat připojení.
  address: 0.0.0.0
  # Port, který bude naslouchat pro připojení (UDP)
  port: 19132

```

Pokud jsme port upravili, musíme server opět restartovat.

</details>

### Offline mode server

*Pokud máte server i pro warez nebo chcete, aby se Bedrock hráči nemuseli přihlašovat přes Java účet (použijeme Floodgate).*

<details><summary><b>Velocity 🚀 (Doporučeno)</b></summary>

Přidáme na Velocity server plugin [GeyserMC](https://www.google.com/search?q=%5Bhttps://geysermc.org/download/%5D(https://geysermc.org/download/)) a [Floodgate](https://www.google.com/search?q=%5Bhttps://geysermc.org/download/%3Fproject%3Dfloodgate%5D(https://geysermc.org/download/%3Fproject%3Dfloodgate)). Server poté restartujeme.

1. Otevřeme **config.yml** v `/plugins/Geyser-Velocity/`:

```yaml
bedrock:
  address: 0.0.0.0
  port: 19132
  
remote:
  # Zde změníme auth-type na floodgate
  auth-type: floodgate

```

2. (Volitelné) Otevřeme **config.yml** v `/plugins/floodgate/`:
U offline serverů musí mít Bedrock hráč nějaký prefix před jménem, aby se nehádal s Java jmény. Výchozí nastavení je `.`, ale některé pluginy (např. Essentials) tento znak blokují, proto doporučujeme prefix změnit například na `*`.

```yaml
# Floodgate předřazuje uživatelským jménům prefix.
# Doporučuje se používat předponu, která neobsahuje alfanumerické znaky.
username-prefix: "*"

```

Pokud jsme vše upravili, musíme server opět restartovat.

</details>

<details><summary><b>BungeeCord 🌊</b></summary>

Přidáme na Bungeecord server plugin [GeyserMC](https://www.google.com/search?q=%5Bhttps://geysermc.org/download/%5D(https://geysermc.org/download/)) a [Floodgate](https://www.google.com/search?q=%5Bhttps://geysermc.org/download/%3Fproject%3Dfloodgate%5D(https://geysermc.org/download/%3Fproject%3Dfloodgate)). Server poté restartujeme.

1. Otevřeme **config.yml** v `/plugins/Geyser-BungeeCord/`:

```yaml
bedrock:
  address: 0.0.0.0
  port: 19132

remote:
  # Zde změníme auth-type na floodgate
  auth-type: floodgate

```

2. (Volitelné) Otevřeme **config.yml** v `/plugins/floodgate/`:

```yaml
# Floodgate předřazuje uživatelským jménům prefix.
username-prefix: "*"

```

Pokud jsme vše upravili, musíme server opět restartovat.

</details>

<details><summary><b>Spigot/Paper 🌳 (Bez proxy)</b></summary>

Přidáme na Spigot server plugin [GeyserMC](https://www.google.com/search?q=%5Bhttps://geysermc.org/download/%5D(https://geysermc.org/download/)) a [Floodgate](https://www.google.com/search?q=%5Bhttps://geysermc.org/download/%3Fproject%3Dfloodgate%5D(https://geysermc.org/download/%3Fproject%3Dfloodgate)). Server poté restartujeme.

1. Otevřeme **config.yml** v `/plugins/Geyser-Spigot/`:

```yaml
bedrock:
  address: 0.0.0.0
  port: 19132

remote:
  # Zde změníme auth-type na floodgate
  auth-type: floodgate

```

2. (Volitelné) Otevřeme **config.yml** v `/plugins/floodgate/`:

```yaml
# Floodgate předřazuje uživatelským jménům prefix.
username-prefix: "*"

```

Pokud jsme vše upravili, musíme server opět restartovat.

</details>

## Připojení

<details><summary><b>S výchozím portem</b></summary>

Připojit se můžeme pomocí základní IP adresy např. `524.199.132.183` nebo pomocí vlastní domény např. `mc.superserver.cz`.
Doména musí být nastavená v DNS přes typ **A** (nebo CNAME). Bedrock edice má problémy s načítáním SRV záznamů, proto je vždy jistější používat přímou A doménu nebo číselnou IP.

</details>
<details><summary><b>S vlastním portem</b></summary>

Pokud máme port jiný než výchozí, musíme ho přidat za IP adresu např. `524.199.132.183:40005`.
Pokud používáte doménu, port se píše za ní: `be.superserver.cz:40005`.

</details>

## Firewall (Důležité!)

Máte-li vlastní VPS/VDS a používáte firewall (např. UFW nebo IPTables), musíte povolit přístup na port, který jste nastavili v configu Geyseru.
**POZOR:** Bedrock edice komunikuje přes protokol **UDP** (zatímco Java edice používá TCP).

Při povolování portu (např. 19132) se ujistěte, že povolujete **UDP** protokol. Pokud povolíte pouze TCP, Bedrock hráči se nepřipojí.