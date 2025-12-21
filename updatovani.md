---
title: Updatování
description: Updaduj jednoduše svůj server
published: true
date: 2025-12-21T20:54:32.883Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:26.631Z
---

# Updatování serveru a pluginů

V tomto kratším článku si řekneme, jak správně updatovat pluginy a hlavní serverový soubor. Před každým updatem si ovšem **udělejte zálohu serveru**, nikdy nevíte, co se v novém updatu může pokazit.

<h2>Pluginy</h2>
Updatování pluginů je jednoduché, stačí si ve složce pluginů (ve složce `plugins`) vytvořit složku *update*. Do této složky pak vždy nahrajeme `.jar` soubory nových verzí pluginů. Při následném **restartu** serveru se nám všechny pluginy bezpečně updatují a staré verze se nahradí. Pro používání této funkce je potřeba používat Paper nebo jeho fork (Spigot to umí také). Další možnost je manuálně smazat staré a nahrát nové `.jar` soubory pluginů při **vypnutém** serveru.

> **Důrazné varování:** Nikdy neupdatujte pluginy příkazem `/reload` nebo pluginy typu PlugMan za běhu serveru! Moderní pluginy jsou komplexní a reloady často způsobují chyby v paměti (memory leaky) nebo rozbíjí funkčnost. Vždy server restartujte.
> {.is-danger}

<h2>Server</h2>
Updatování serveru bohužel zatím nemá podobnou automatickou možnost, jako je update složka pro pluginy. Nejlehčí a nejbezpečnější způsob je tento:

1. Vypněte server.
2. Smažte starý soubor `server.jar`.
3. Nahrajte nový `server.jar` (pro verzi 1.21.1).
4. Zapněte server.

Nikdy nemažte ani nepřepisujte serverový soubor za chodu serveru! Mohlo by dojít k poškození souborů (korupci mapy). 



Vždy si udělejte jako první zálohu!

<h2>Verze (Upgrade na 1.21)</h2>
Přechod mezi hlavními verzemi (např. z 1.20.4 na 1.21.1) je složitější. Jako první stačí vypnout server, smazat starý `server.jar` a nahrát nový. Avšak pozor na následující body:

1. **Java 21:** Ujistěte se, že server spouštíte na Javě 21. Pokud přecházíte ze starších verzí a nemáte Javu 21, server se ani nezapne.
2. **Pluginy:** Mezi verzí 1.20.4 a 1.20.5+ došlo k obrovské změně v kódu (NBT tagy byly nahrazeny Komponentami). To znamená, že staré pluginy na verzi 1.21 **nebudou fungovat**. Musíte stáhnout aktuální verze všech pluginů.
3. **Upgrade světů:** Po nahrání nové verze doporučujeme spustit server s parametrem `--forceUpgrade`. Tím server projede všechny chunky a převede je na nový formát najednou. Zabráníte tím lagům, které by vznikly, kdyby se svět převáděl až ve chvíli, kdy se připojí hráči. (Příkaz: `java -jar server.jar --forceUpgrade --nogui`).
4. **Cesta zpět neexistuje:** Verze se dá změnit pouze na vyšší! Pokud zapnete svět na verzi 1.21, už ho nikdy nespustíte na 1.20 bez toho, abyste ho kompletně resetovali nebo corruptnuli.

Ujistěte se, že jste na přechod připravení. Před přechodem si **vždy udělejte kompletní zálohu celého serveru!**