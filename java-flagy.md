---
title: Java flagy
description: Startovací java flagy pro váš server
published: true
date: 2025-06-12T12:12:05.708Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:18.244Z
---

# Java Flagy
Jak většina z vás určitě ví, Minecraft používá Java Flagy, díky nim pozná, jaký má mít server výkon, jak se má v určitých situacích chovat atd. Volba flagů je tedy velice důležitá, jelikož vám může opravdu hodně pomoci s výkonem serveru.<br>
Flagy tu nebudeme podrobně rozebírat, jen si uvedeme pár příkladů. Jestli vás ale zajímá více, můžete se o nich dočíst [zde](https://aikar.co/mcflags.html).<br>
Nejvíce důležité jsou flagy **Xmx** a **Xms**, jelikož ty určují, kolik má server přiřazeno RAMky.


<h2>Minecraft 1.21.5 5GB RAM, Paper/Purpur server</h2>

```java
java -Xms5120M -Xmx5120M --add-modules=jdk.incubator.vector -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -jar server.jar --nogui
```

<h2>Minecraft 1.21.5 12GB RAM, Pufferfish/Purpur server</h2>

```java
java -Xms12288M -Xmx12288M --add-modules=jdk.incubator.vector -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -XX:G1NewSizePercent=40 -XX:G1MaxNewSizePercent=50 -XX:G1HeapRegionSize=16M -XX:G1ReservePercent=15 -jar server.jar --nogui
```

<h2>Velocity 3GB RAM, Pterodactyl panel</h2>

```java
java -Xms3072M -Xmx3072M -XX:+UseG1GC -XX:G1HeapRegionSize=4M -XX:+UnlockExperimentalVMOptions -XX:+ParallelRefProcEnabled -XX:+AlwaysPreTouch -XX:MaxInlineLevel=15 -jar server.jar --nogui
```

> Pokud používáte Pterodactyl, nastavte ve flagách max. 85 % RAM kontejneru a odeberte `-XX:+AlwaysPreTouch`, může způsobovat problémy se se stabilitou.
> {.is-warning}

Jak mnozí určitě poznali, jedná se ve většině případů o Aikar Flagy, případně o Pufferfish dodatek. Dané flagy doporučujeme vždy používat, jestli jste zároveň jedni z mála, kteří používají nové ZGC flagy pro servery s více jak 16GB RAM, tak bych to na vašem místě znovu zvážil. Sice jsou v některých případech lepší, ale  stále se jedná o novinku, která není úplně doladěná a není v některých případech úplně stabilní.
<br>
Případně můžete použít [tuto stránku](https://flags.sh/) pro vygenerování flagů.