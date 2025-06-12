---
title: Herní Servery
description: Typy herních serverů
published: true
date: 2025-06-12T11:15:49.468Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:14.724Z
---

# Herní Servery
Pro mnohé nováčky je celkem překvapení, když zjistí, že servery, na kterých hrají, nejsou v drtivé většině případů Vanilla Minecraftem. 

Proč tomu ale tak je? Inu, je to jednoduché. Samotná Vanilla nepodporuje pluginy. Bez pluginů si zároveň neuděláte moc kvalitní server z více stránek pohledu. Samozřejmě můžete používat Command Blocky, ale to je jen zbytečná zátěž na server, která způsobí více škody než užitku.

CraftBukkit je zde již od nepaměti a za tu dobu se z něj zrodilo mnoho dalších modifikací, které jsou dodnes používané všemi serverami. Níže máte menší list pro představu:

- [CraftBukkit](https://getbukkit.org/download/craftbukkit)
- [Spigot](https://getbukkit.org/download/spigot)
- [Paper](https://papermc.io/software/paper)
- [Folia](https://papermc.io/software/folia)
- [Tuinity](https://github.com/Tuinity/Tuinity)
- [Airplane](https://github.com/TECHNOVE/Airplane)
- [Pufferfish](https://pufferfish.host/downloads)
- [Purpur](https://purpurmc.org/downloads)

Samozřejmě je mnohem více příkladů, vypsané tady jsou pouze ty hlavní, které se používaly nebo stále používají. Silně nedoporučuji používat typy serverů, které zde nejsou zmíněné.

Jaký z nich si tedy vybrat? Toť je celkem složitá otázka, první si musíme uvědomit, jak takové typy serverů vznikají. Každý z nich je forkem nějakého jiného druhu serveru. Pro představu, první zde byl CraftBukkit, ale ten měl jisté nedostatky, takže byl založen Spigot, který obsahuje to stejné, co má v sobě CraftBukkit, akorát přidává extra možnosti. Stejný proces se opakuje u každého typu serveru, akorát již nejsou většinou založené na CraftBukkitu, ale ve většině případů se jedná o forky Spigotu či Paperu (Dané servery samozřejmě CraftBukkit stále obsahují, jen se jim tak už neříká). Níže si rozebereme všechny druhy serverů podrobně, ať máte dobrou představu, k čemu všechny slouží. 




<h2>CraftBukkit</h2>
Jedná se o základ všech dalších druhů serverů. Bohužel CraftBukkit poskytuje hlavně možnost používání pluginů a pár extra možností, jako je kontrolování spawn systému mobů, či nastavení generace světů, tím to ale končí. Používat pouze CraftBukkit nedoporučujeme žádnému serveru.

<h2>Spigot</h2>
Spigot je stejně jako CraftBukkit typ serveru, který nedoporučujeme používat. Jedná se zase o ty serveru, který umožňuje používání Pluginů/Proxy a tím to víceméně končí. Nějaké extra možnosti tu samozřejmě jsou, ale v porovnání s možnostmi, které poskytne Paper, jsou ty ze Spigotu naprosto zanedbatelné.

<h2>Paper</h2>
Paper je bezesporu nejdůležitější ze všech možných druhů serverů, má dostupné verze od 1.8.8 až po momentálně nejnovější 1.20. Zaměřuje se na zlepšení hry ve všech možných ohledech. Ať už se jedná o celkovou optimalizaci hry, opravování "neúmyslných" herních mechanik (například duplikačních či crash glitchů) a mnoho dalšího, např možnost používání atributů u itemů. Paper je úplný základ a měl by ho používat úplně každý. Samozřejmě, když používáte některý z jeho forků, je to naprosto v pořádku. <br>
Za Paperem stojí zároveň stejný team, který se podílí na vývoji Velocity, Sponge, Waterfallu, Travertine, náhrady Spigotu Hangaru a mnoho dalšího. Takže již na základně této informace, si můžete být jisti, že od nich můžete čekat pouze to nejlepší.<br>

<h2>Folia</h2>
Folia seskupuje blízké načtené kusy do "nezávislé oblasti". Přesné informace o tom, jak Folia seskupuje blízké chunky, najdete v dokumentaci PaperMC. Každá nezávislá oblast má svou vlastní smyčku tiků, která se tiká běžnou rychlostí tiků Minecraftu (20TPS). Smyčky tick jsou prováděny paralelně na fondu vláken. Hlavní vlákno již neexistuje, protože každý region má efektivně své vlastní "hlavní vlákno", které provádí celou tick smyčku. Folia vyžaduje minimálně 16 jádrový procesor, proto je určena pro velké servery s dedikovanými servery.

<h2>Tuinity</h2>
Tuinity je fork Paperu, který se zaměřuje na optimalizaci hry. Avšak poslední dostupná verze je pro Minecraft 1.16.5, jelikož od verze 1.17 je Tuinity součástí Paperu. Jestli ale používáte stále verzi 1.16.5, doporučujeme Tuinity používat, případně můžete zvolit i Purpur, který Tuinity obsahuje.

<h2>Airplane</h2>
Airplane je fork Paperu, stejně jako Tuinity se zaměřuje na optimalizaci. Poslední použitelná verze je pro Minecraft 1.17.1. Od verze 1.18 je Airplane nahrazeno Pufferfishem.<br>
Airplane zároveň do hry přináší nový typ měření výkonu a to pomocí Flare, bohužel používání Flare vyjde na cca 150kč/měsíc, jelikož je nutné si obnovovat licence pro používání skrze Patreon.

<h2>Pufferfish</h2>
Pufferish je fork Paperu, zase se zaměřuje na optimalizaci hry a dělá to zatraceně dobře. Dá se použít pro každý 1.18+ server a silně ho doporučujeme používat pro úplně každý váš server (mimo survival, zde můžete zvážit používání Purpuru).<br>
Pufferfish také do hry přináší nový typ měření výkonu a to pomocí Flare, bohužel používání Flare vyjde na cca 120kč/měsíc, jelikož je nutné si obnovovat licence pro používání skrze [Patreon](https://www.patreon.com/airplane). Jestli ale máte na serveru velké lagy či memory leaky, doporučujeme zvážit zakoupení licence na měsíc.

<h2>Purpur</h2>
Purpur je fork Paperu, ale obsahuje i Airplane/Pufferish. Zaměřuje se na přidávání nových herních mechanik, jako je například kopání spawnerů silk touchem, zvětšení ender chestky či zranění hráče v moment, kdy běží s nůžkami v ruce. Většina těchto mechanik ale nemá pro většinu serverů moc využití. <br>
Co se jeho použávání týče, doporučujeme ho používat do verze 1.17.1. Od verze 1.18+ se ve většině případů vyplatí používat pouze Pufferfish. Výjimkou jsou survival servery. Důvod je k tomu jednodnoduchý, obsah věcí, které Purpur přidá se většinou pro jiné servery, než je survival, nehodí. Používat ho samozřejmě stále můžete, ničemu to neuškodí, jen to je trochu zbytečné.


<h2>Jiné</h2>
Existuje samozřejmě hromada jiných možných druhů serverů, ale nedoporučujeme je vůbec používat. Většinou se jedná o malé forky, na kterých pracuje jeden člověk a následně je prodává na MC-Marketu. Naštěstí je většina z nich mířená na 1.8.8 či 1.12.2 verze hry.<br>
Některé další jsou samozřejmě normálně dostupné i na novější verze, ale jak již bylo zmíněno, jejich používání serveru pouze většinou více uškodí, než pomůže.<br>
Mezi tyto druhy serverů patří například: Yatopia, Mirai, Patina, Akarin,  TacoSpigot, FoxSpigot, ImanitySpigot, SSSpigot, AtomSpigot... Je jich opravdu hodně, bohužel tady přesahuje kvantita kvalitu.

<h2>Instalace</h2>
Instalace všech herních forků je velice jednoduchá. Stačí si ověřit, že máte správnou verzi Javy. Následně jen stáhnete nový soubor, nahrajete ho do prázdné hlavní složky server s názvem server.jar (nebo jiným, podle vašich java flagů) a následně jen zapnete server.

<h2>Shrnutí</h2>
Pro menší shrnutí na konec, si zopakujeme, jaké doporučujeme druhy serverů pro dané verze.

- 1.21.* - Paper, Pufferfish
- 1.20.* - Paper, Pufferfish
- 1.19.* - Paper, Pufferfish
- 1.18.* - Paper, Pufferfish
- 1.17.* - Purpur, případně Airplane
- 1.16.* - Purpur, případně Tuinity/Airplane
- 1.8.8 až 1.15.3 - Paper, avšak silně nedoporučujeme používat takto staré verze pro váš server.
