---
title: Java flagy
description: Startovací java flagy pro váš server
published: true
date: 2025-12-21T20:52:34.075Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:18.244Z
---

# Java Flagy

Jak většina z vás určitě ví, Minecraft používá Java Flagy (startovací argumenty). Díky nim Java pozná, jaký má mít server výkon, jak se má v určitých situacích chovat atd. Volba flagů je velice důležitá, jelikož vám může opravdu hodně pomoci s výkonem serveru a stabilitou TPS.

Flagy tu nebudeme podrobně rozebírat, jen si uvedeme pár příkladů. Jestli vás ale zajímá více, můžete se o nich dočíst [zde](https://aikar.co/2018/07/02/tuning-the-jvm-g1gc-garbage-collector-flags-for-minecraft/).

Nejvíce důležité jsou flagy **Xmx** a **Xms**, jelikož ty určují, kolik má server přiřazeno RAMky. Pro nejlepší výkon doporučujeme nastavit obě hodnoty na stejné číslo.

<h2>Minecraft 1.21.x - 6GB RAM (Paper/Purpur)</h2>
*Vhodné pro menší až střední servery.*

```java
java -Xms6144M -Xmx6144M --add-modules=jdk.incubator.vector -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -jar server.jar --nogui

```

<h2>Minecraft 1.21.x - 12GB RAM (Pufferfish/Purpur)</h2>
*Vhodné pro větší servery. Zde využíváme i modul pro vektorové operace (SIMD), který Pufferfish podporuje.*

```java
java -Xms12288M -Xmx12288M --add-modules=jdk.incubator.vector -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -XX:G1NewSizePercent=40 -XX:G1MaxNewSizePercent=50 -XX:G1HeapRegionSize=16M -XX:G1ReservePercent=15 -jar server.jar --nogui

```

<h2>Velocity - 3GB RAM (Pterodactyl/Pelican panel)</h2>
*Pro Velocity proxy stačí méně RAM, ale záleží na počtu hráčů.*

```java
java -Xms3072M -Xmx3072M -XX:+UseG1GC -XX:G1HeapRegionSize=4M -XX:+UnlockExperimentalVMOptions -XX:+ParallelRefProcEnabled -XX:+AlwaysPreTouch -XX:MaxInlineLevel=15 -jar server.jar --nogui

```

> **Pozor pro uživatele Pterodactylu (Docker):**
> Pokud máte server hostovaný na panelu (Pterodactyl, Pelican), **nikdy nenastavujte Xmx na 100 % kapacity serveru**. Java potřebuje extra paměť pro svá vlákna (Overhead).
> Doporučujeme nastavit Xmx/Xms na cca **85-90 %** celkové RAM (např. pokud máte 10GB server, flagy nastavte na cca 9GB).
> Pokud server padá při startu, odeberte flag `-XX:+AlwaysPreTouch`.
> {.is-warning}

Jak mnozí určitě poznali, jedná se ve většině případů o Aikar Flagy, případně o Pufferfish dodatek. Dané flagy doporučujeme vždy používat.

**Poznámka k ZGC:** Java 21 přináší "Generational ZGC", který může být pro servery s velkou RAM (16GB+) velmi efektivní. Nicméně pro většinu serverů je G1GC (Aikar) stále nejstabilnější a nejověřenější volbou. Pokud přesně nevíte, jak ZGC ladit, zůstaňte u výše uvedených flagů.

Případně můžete použít [tuto stránku](https://flags.sh/) pro vygenerování flagů přesně pro váš hardware.