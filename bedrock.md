---
title: Bedrock
description: Zpřístupnění serveru pro bedrock hráče
published: true
date: 2023-11-25T10:32:49.434Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:11.136Z
---

# Podpora Bedrock
Jesliže chcete umožnit připojení bedrock hráčům na váš server, postačí nám na to jeden nebo dva pluginy. Vyberte si verzi serveru a postupujte podle návodu.

## Nastavení

### Online mode server

<details>
  <summary><b>Velocity 🚀</b></summary>

Přidáme na Velocity server plugin [GeyserMC], server poté restartujeme a otevřeme **config.yml**, který nalezneme v `/plugins/Gyeser-Velocity/`.
V configu upravíme `port`, jestliže nechceme používat výchozí `19132`.
```yaml
bedrock:
  # IP adresa, která bude naslouchat připojení.
  # Není důvod ji měnit, pokud nechcete omezit IP adresy, které se mohou připojit k serveru.
  address: 0.0.0.0
  # Port, který bude naslouchat pro připojení
  port: 19132
```
Pokud jsme port upravili, musíme server opět restartovat.
</details>

<details><summary><b>BungeeCord/Waterfall 🌊</b></summary>

Přidáme na Bungeecord server plugin [GeyserMC], server poté restartujeme a otevřeme **config.yml**, který nalezneme v `/plugins/Gyeser-Bungee/`.
V configu upravíme `port`, jestliže nechceme používat výchozí `19132`.
```yaml
bedrock:
  # IP adresa, která bude naslouchat připojení.
  # Není důvod ji měnit, pokud nechcete omezit IP adresy, které se mohou připojit k serveru.
  address: 0.0.0.0
  # Port, který bude naslouchat pro připojení
  port: 19132
```
Pokud jsme port upravili, musíme server opět restartovat.
</details>
<details><summary><b>Spigot 🌳</b></summary>

Přidáme na Spigot server plugin [GeyserMC], server poté restartujeme a otevřeme **config.yml**, který nalezneme v `/plugins/Gyeser-Spigot/`.
V configu upravíme `port`, jestliže nechceme používat výchozí `19132`.
```yaml
bedrock:
  # IP adresa, která bude naslouchat připojení.
  # Není důvod ji měnit, pokud nechcete omezit IP adresy, které se mohou připojit k serveru.
  address: 0.0.0.0
  # Port, který bude naslouchat pro připojení
  port: 19132
```
Pokud jsme port upravili, musíme server opět restartovat.
</details>

### Offline mode server
<details><summary><b>Velocity 🚀</b></summary>

Přidáme na Velocity server plugin [GeyserMC] a [Floodgate], server poté restartujeme a otevřeme **config.yml**, který nalezneme v `/plugins/Gyeser-Velocity/`.
V configu upravíme `port`, jestliže nechceme používat výchozí `19132` a `auth-type` na `floodgate`. U offline serverů musí mít bedrock hráč nějaký prefix před jménem, výhozí nastavení je `.`, ale některé pluginy tyho hráče blokují a proto doporučujeme prefix změnit na jiný, tuto hodnotu změníme v **config.yml**, který nalezneme v `plugins/floodagte/`.
```yaml
bedrock:
  # IP adresa, která bude naslouchat připojení.
  # Není důvod ji měnit, pokud nechcete omezit IP adresy, které se mohou připojit k serveru.
  address: 0.0.0.0
  # Port, který bude naslouchat pro připojení
  port: 19132
```
```yaml
  # Typ ověření. Může být offline, online nebo floodgate (viz https://github.com/GeyserMC/Geyser/wiki/Floodgate).
  # U verzí pluginů se doporučuje ponechat v poli `address` hodnotu "auto", aby byla podpora Floodgate nakonfigurována automaticky.
  # Pokud je nainstalována funkce Floodgate a `adresa:` je nastavena na "auto", pak se automaticky použije "auth-type: floodgate".
  auth-type: floodgate
```
```yaml
# Floodgate předřazuje uživatelským jménům v základu předponu, aby se předešlo konfliktům.
# Některé konflikty však mohou způsobit problémy s některými pluginy, takže tento prefix je konfigurovatelný pomocí níže uvedené vlastnosti
# Doporučuje se používat předponu, která neobsahuje alfanumerické znaky, aby se zabránilo možnosti duplicitních uživatelských jmen.
username-prefix: "."
```
Pokud jsme vše upravili, musíme server opět restartovat.
</details>
<details><summary><b>BungeeCord/Waterfall 🌊</b></summary>

Přidáme na Bungeecord server plugin [GeyserMC] a [Floodgate], server poté restartujeme a otevřeme **config.yml**, který nalezneme v `/plugins/Gyeser-Bungee/`.
V configu upravíme `port`, jestliže nechceme používat výchozí `19132` a `auth-type` na `floodgate`. U offline serverů musí mít bedrock hráč nějaký prefix před jménem, výhozí nastavení je `.`, ale některé pluginy tyho hráče blokují a proto doporučujeme prefix změnit na jiný, tuto hodnotu změníme v **config.yml**, který nalezneme v `plugins/floodagte/`.
```yaml
bedrock:
  # IP adresa, která bude naslouchat připojení.
  # Není důvod ji měnit, pokud nechcete omezit IP adresy, které se mohou připojit k serveru.
  address: 0.0.0.0
  # Port, který bude naslouchat pro připojení
  port: 19132
```
```yaml
  # Typ ověření. Může být offline, online nebo floodgate (viz https://github.com/GeyserMC/Geyser/wiki/Floodgate).
  # U verzí pluginů se doporučuje ponechat v poli `address` hodnotu "auto", aby byla podpora Floodgate nakonfigurována automaticky.
  # Pokud je nainstalována funkce Floodgate a `adresa:` je nastavena na "auto", pak se automaticky použije "auth-type: floodgate".
  auth-type: floodgate
```
```yaml
# Floodgate předřazuje uživatelským jménům v základu předponu, aby se předešlo konfliktům.
# Některé konflikty však mohou způsobit problémy s některými pluginy, takže tento prefix je konfigurovatelný pomocí níže uvedené vlastnosti
# Doporučuje se používat předponu, která neobsahuje alfanumerické znaky, aby se zabránilo možnosti duplicitních uživatelských jmen.
username-prefix: "."
```
Pokud jsme vše upravili, musíme server opět restartovat.
</details>
<details><summary><b>Spigot 🌳</b></summary>

Přidáme na Spigot server plugin [GeyserMC] a [Floodgate], server poté restartujeme a otevřeme **config.yml**, který nalezneme v `/plugins/Gyeser-Spigot/`.
V configu upravíme `port`, jestliže nechceme používat výchozí `19132` a `auth-type` na `floodgate`. U offline serverů musí mít bedrock hráč nějaký prefix před jménem, výhozí nastavení je `.`, ale některé pluginy tyho hráče blokují a proto doporučujeme prefix změnit na jiný, tuto hodnotu změníme v **config.yml**, který nalezneme v `plugins/floodagte/`.
```yaml
bedrock:
  # IP adresa, která bude naslouchat připojení.
  # Není důvod ji měnit, pokud nechcete omezit IP adresy, které se mohou připojit k serveru.
  address: 0.0.0.0
  # Port, který bude naslouchat pro připojení
  port: 19132
```
```yaml
  # Typ ověření. Může být offline, online nebo floodgate (viz https://github.com/GeyserMC/Geyser/wiki/Floodgate).
  # U verzí pluginů se doporučuje ponechat v poli `address` hodnotu "auto", aby byla podpora Floodgate nakonfigurována automaticky.
  # Pokud je nainstalována funkce Floodgate a `adresa:` je nastavena na "auto", pak se automaticky použije "auth-type: floodgate".
  auth-type: floodgate
```
```yaml
# Floodgate předřazuje uživatelským jménům v základu předponu, aby se předešlo konfliktům.
# Některé konflikty však mohou způsobit problémy s některými pluginy, takže tento prefix je konfigurovatelný pomocí níže uvedené vlastnosti
# Doporučuje se používat předponu, která neobsahuje alfanumerické znaky, aby se zabránilo možnosti duplicitních uživatelských jmen.
username-prefix: "."
```
Pokud jsme vše upravili, musíme server opět restartovat.
</details>
<br>

## Připojení
<details><summary><b>S výchozím portem</b></summary>

Připojit se můžeme pomocí základní IP adresy např. `524.199.132.183` nebo pomocí vlastní domény např. `mc.superserver.cz`. Doména musí být nastavená v DNS přes typ A nebo CNAME, pokud používáme typ SRV, budeme k tomu muset vytvořit ještě nový záznam typu A nebo CNAME na IP adresu serveru. Výsledná doména bude muset být jiná než pro Java verzi, třeba `be.superserver.cz`.
</details>
<details><summary><b>S vlastním portem</b></summary>

Pokud máme port jiný než výchozí, musíme ho přidat za IP adresu např. `524.199.132.183:40005` nebo doménu, např. `mc.superserver.cz:19132`. Doména musí být nastavená v DNS přes typ A nebo CNAME, pokud používáme typ SRV, budeme k tomu muset vytvořit ještě nový záznam typu A nebo CNAME na IP adresu serveru. Výsledná doména bude muset být jiná než pro Java verzi, třeba `be.superserver.cz:40005`.
</details>
<br>

## Firewall
Máte-li vlastní VPS/VDS a používáte firewall, musíte povolit přístup na port, který jste nastavili v configu. Pokud používáte port 19132, tak je potřeba povolit přístup na tento port. Pokud používáte jiný port, tak je potřeba povolit přístup na tento port.

[GeyserMC]: https://ci.opencollab.dev//job/GeyserMC/job/Geyser/job/master/
[Floodgate]: https://ci.opencollab.dev/job/GeyserMC/job/Floodgate/job/master/
