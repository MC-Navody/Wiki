---
title: Ikona serveru
description: Nastavení ikony v server listu
published: true
date: 2025-12-21T20:57:35.157Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:17.080Z
---

# Ikona serveru

Ikona serveru je viditelná v serverlistu (seznamu serverů) vlevo od názvu serveru a také na status stránkách. Je to první vizuální věc, kterou hráč vidí.

## Formát

Jako první krok musíme naší ikonu konvertovat do velikosti **64×64 pixelů**. Toto je pevně daný limit Minecraftu. Velikost ikony můžeme upravit v jakémkoliv grafickém editoru nebo online přes stránku [ResizePixel.com](https://www.resizepixel.com/).
Poté, co budeme mít ikonu ve správné velikosti, musíme zkontrolovat, že je ve formátu **.png**. Pokud není, použijeme opět stránku [ResizePixel.com](https://www.resizepixel.com/) a konvertujeme ji do správného formátu.

## Nastavení

Až budeme mít ikonu ve správném formátu a velikosti, stačí ji nahrát do **hlavní složky serveru** (tam, kde je `server.jar`) a pojmenovat ji přesně:
`server-icon.png`

Následně stačí server restartovat.

> **Důležité pro Proxy sítě:**
> Pokud používáte proxy server (Velocity nebo Bungeecord), musíte tento obrázek nahrát do hlavní složky **Proxy serveru**. Ikona na backend (Survival/Lobby) serverech se v seznamu serverů nezobrazí, protože hráč komunikuje primárně s Proxy.
> {.is-info}

## Kontrola

Pokud ikonu ve svém klientu stále nevidíte ani po restartu serveru, je to často způsobeno tím, že si Minecraft klient ukládá starou ikonu do mezipaměti (cache). Zkuste server ze seznamu serverů **smazat a přidat ho znovu**.
Funkčnost si můžete ověřit také na externí stránce [MC Status](https://mcsrvstat.us/) zadáním IP adresy vašeho serveru.