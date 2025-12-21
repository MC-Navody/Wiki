---
title: Java verze
description: Seznam java verzí pro MC server
published: true
date: 2025-12-21T20:56:06.907Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:19.426Z
---

# Java Verze

To, že určité verze Minecraftu vyžadují určitou verzi Javy, není pro mnohé překvapením. Menším problémem už ale je vědět, jakou Java verzi vaše Minecraft verze vyžaduje. Máme tady pro to připravený malý seznam. Doporučujeme vždy používat **LTS (Long Term Support)** verze Javy.

* **Verze 1.21.x** - Java 21
* **Verze 1.20.5 a 1.20.6** - Java 21
* **Verze 1.18 až 1.20.4** - Java 17
* **Verze 1.17** - Java 16 (Lze použít i 17)
* **Verze 1.16.5** - Java 11 (Oficiálně 8, ale doporučujeme 11)
* **Verze 1.12 až 1.15** - Java 8 (S Paperem lze často použít i 11)
* **Verze 1.8 až 1.11** - Java 8

Pozor! Spigot někdy zabraňuje používání Java verzí, které nejsou oficiálně podporované (např. používání Javy 17 na verzi 1.16). Pro změnu tohoto chování je nutné používat Paper (nebo jeho fork) a přidat flag `-DPaper.IgnoreJavaVersion=true` před `-jar`. Používání neoficiálních verzí Javy na starých serverech však může způsobovat problémy s některými pluginy.

**Proxy servery:**

* **Velocity** - Java 21 (pro nejnovější verze 3.3.0+)
* **Bungeecord** - Java 11+ (doporučeno, ačkoliv starší buildy běží na 8)
