---
title: Java flagy
description: Startovací java flagy pro váš server
published: true
date: 2023-11-25T21:00:05.545Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:18.244Z
---

# Java Flagy
Jak většina z vás určitě ví, Minecraft používá Java Flagy, díky nim pozná, jaký má mít server výkon, jak se má v určitých situacích chovat atd. Volba flagů je tedy velice důležitá, jelikož vám může opravdu hodně pomoci s výkonem serveru.<br>
Flagy tu nebudeme podrobně rozebírat, jen si uvdeme pár příkladů. Jestli vás ale zajímá více, můžete se o nich dočíst [zde](https://aikar.co/mcflags.html).<br>
Nejvíce důležité jsou flagy **Xmx** a **Xms**, jelikož ty určují, kolik má server přiřazeno RAMky. V moment, kdy používáte Pterodactyl panel, tak serveru dávejte vždy o 1GB RAM více, než uvedete v Java Flagách. 


<h2>Minecraft 1.17.1 4GB RAM, Purpur server, Pterodactyl panel</h2>

```java
java -Xms3G -Xmx3G -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -XX:G1NewSizePercent=40 -XX:G1MaxNewSizePercent=50 -XX:G1HeapRegionSize=16M -XX:G1ReservePercent=15 -XX:InitiatingHeapOccupancyPercent=20 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -jar server.jar nogui
```

<h2>Minecraft 1.18.2-1.20 8GB RAM, Pufferfish/Purpur server, Pterodactyl panel</h2>

```java
java -Xms7G -Xmx7G -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:InitiatingHeapOccupancyPercent=15 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -XX:+UnlockDiagnosticVMOptions -XX:+DebugNonSafepoints --add-modules=jdk.incubator.vector -jar server.jar nogui
```

<h2>Velocity 3GB RAM, Pterodactyl panel</h2>

```java
java -Xms2048M -Xmx2048M -XX:+UseG1GC -XX:G1HeapRegionSize=4M -XX:+UnlockExperimentalVMOptions -XX:+ParallelRefProcEnabled -XX:MaxInlineLevel=15 -jar server.jar
```

Jak mnozí určitě poznali, jedná se ve většině případů o Aikar Flagy, případně o Pufferfish dodatek. Dané flagy doporučujeme vždy používat, jestli jste zároveň jedni z mála, kteří používají nové ZGC flagy pro servery s více jak 16GB RAM, tak bych to na vašem místě znovu zvážil. Sice jsou v některých případech lepší, ale  stále se jedná o novinku, která není úplně doladěná a není v některých případech úplně stabilní.
<br>
Případně můžete použít [tuto stránku](https://startmc.sh/) pro vygenerování flagů.








