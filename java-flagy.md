---
title: Java flagy
description: Startovací java flagy pro váš server
published: true
date: 2025-06-12T12:02:12.773Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:18.244Z
---

# Java Flagy
Jak většina z vás určitě ví, Minecraft používá Java Flagy, díky nim pozná, jaký má mít server výkon, jak se má v určitých situacích chovat atd. Volba flagů je tedy velice důležitá, jelikož vám může opravdu hodně pomoci s výkonem serveru.<br>
Flagy tu nebudeme podrobně rozebírat, jen si uvdeme pár příkladů. Jestli vás ale zajímá více, můžete se o nich dočíst [zde](https://aikar.co/mcflags.html).<br>
Nejvíce důležité jsou flagy **Xmx** a **Xms**, jelikož ty určují, kolik má server přiřazeno RAMky. V moment, kdy používáte Pterodactyl panel, tak serveru dávejte vždy o 1GB RAM více, než uvedete v Java Flagách. 


<iframe
  src="https://flags.sh/"
  width="800"
  height="600"
  frameborder="0"
  allowfullscreen
  sandbox="allow-scripts allow-same-origin"
>
  Tvůj prohlížeč nepodporuje iframe.
</iframe>

        
```

Jak mnozí určitě poznali, jedná se ve většině případů o Aikar Flagy, případně o Pufferfish dodatek. Dané flagy doporučujeme vždy používat, jestli jste zároveň jedni z mála, kteří používají nové ZGC flagy pro servery s více jak 16GB RAM, tak bych to na vašem místě znovu zvážil. Sice jsou v některých případech lepší, ale  stále se jedná o novinku, která není úplně doladěná a není v některých případech úplně stabilní.
<br>
Případně můžete použít [tuto stránku](https://flags.sh/) pro vygenerování flagů.








