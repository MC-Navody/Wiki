---
title: Voice chat
description: Nastavení pluginu Simple Voice Chat
published: true
date: 2025-12-21T21:45:08.724Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:28.951Z
---

Zde je aktualizovaný návod pro **Simple Voice Chat**.

**Provedené změny:**

* **Protokol UDP:** Toto je nejdůležitější technická změna. Voice chat používá protokol **UDP**. Většina začátečníků otevře jen TCP a diví se, proč to nefunguje. Přidal jsem na to důrazné upozornění.
* **Fabric API:** V sekci Klient jsem doplnil nutnost instalace **Fabric API**. Bez něj hra s Fabric módy spadne, což je nejčastější chyba hráčů.
* **Voice Host:** Vysvětlil jsem funkci `voice_host`, která je klíčová na většině hostingů (Pterodactyl), kde se interní IP liší od té veřejné.
* **Odkazy:** Aktualizoval jsem odkazy na Modrinth (dnes standard pro moderní módy) a SpigotMC.

---

# Voice chat

Plugin **Simple Voice Chat** nám umožňuje bezdotykovou hlasovou komunikaci mezi hráči přímo ve hře (proximity chat). Aby mohl hráč voice chat využívat, je nutné, aby měl nainstalovaný mód i ve svém klientovi (počítači). Pokud ho mít nebude, na server se sice připojí, ale nikoho neuslyší.

## Server (Instalace pluginu)

Jako první stáhneme plugin z [Modrinthu](https://modrinth.com/plugin/simple-voice-chat/versions) (vyberte verzi "Paper/Spigot").
Plugin nahrajeme do složky `plugins` a server restartujeme.

Po restartu se nám ve složce `plugins/voicechat/` vytvoří soubor **voicechat-server.properties**.
Zde je nutné provést základní konfiguraci. Nejdůležitější je **port**. Musíte použít port, který máte od hostingu přidělený a volný.

> **Důležité upozornění:** Voice chat komunikuje přes protokol **UDP**. Ujistěte se, že vámi zvolený port je na firewallu (nebo v administraci hostingu) otevřený pro UDP komunikaci!
> {.is-warning}

Otevřeme soubor a upravíme následující řádky:

```properties
# Port pro voice chat. Musí být volný a otevřený (UDP).
port=24454

# Pokud máte server na hostingu, zde MUSÍTE vyplnit vaši veřejnou IP adresu serveru (bez portu).
# Pokud to necháte prázdné, na většině hostingů to nebude fungovat.
voice_host=

```

*Příklad:* Pokud je IP vašeho serveru `82.208.17.10:27854`, tak do `voice_host` napíšete `82.208.17.10` a do `port` napíšete port, který vám hosting přidělil pro voice chat (např. 24454, pokud je volný, nebo jiný).

Soubor uložíme a server restartujeme.

## Klient (Instalace módu)

Hráči musí mít nainstalovaný Fabric (nebo Forge). Pro moderní verze Minecraftu (1.21) doporučujeme **Fabric**.

1. Stáhněte a nainstalujte **[Fabric Loader](https://fabricmc.net/use/installer/)** pro vaši verzi hry.
2. Stáhněte **[Fabric API](https://modrinth.com/mod/fabric-api)** (Nutné pro funkčnost!).
3. Stáhněte mód **[Simple Voice Chat](https://modrinth.com/plugin/simple-voice-chat)** (verze pro Fabric).

Oba stažené soubory (`.jar`) vložte do složky `%appdata%/.minecraft/mods`.

### Jak poznám, že to funguje?

Po připojení na server stiskněte klávesu `V`. Pokud se otevře menu voice chatu, vše je nastaveno správně. Pokud se objeví ikona "přeškrtnuté zástrčky", znamená to, že se klient nemůže spojit s portem serveru (zkontrolujte `voice_host` a firewall/UDP port).