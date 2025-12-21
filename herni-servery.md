---
title: Herní Servery
description: Typy herních serverů
published: true
date: 2025-12-21T20:44:16.173Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:14.724Z
---

# Herní Servery

Pro mnohé nováčky je celkem překvapení, když zjistí, že servery, na kterých hrají, nejsou v drtivé většině případů Vanilla Minecraftem. 

Proč tomu ale tak je? Inu, je to jednoduché. Samotná Vanilla nepodporuje pluginy. Bez pluginů si zároveň neuděláte moc kvalitní server z více stránek pohledu. Samozřejmě můžete používat Command Blocky, ale to je jen zbytečná zátěž na server, která způsobí více škody než užitku.

CraftBukkit je zde již od nepaměti a za tu dobu se z něj zrodilo mnoho dalších modifikací, které jsou dodnes používané všemi servery. Níže máte menší list pro představu:

* [CraftBukkit](https://getbukkit.org/download/craftbukkit)
* [Spigot](https://getbukkit.org/download/spigot)
* [Paper](https://papermc.io/software/paper)
* [Folia](https://papermc.io/software/folia)
* [Tuinity](https://github.com/Tuinity/Tuinity)
* [Airplane](https://github.com/TECHNOVE/Airplane)
* [Pufferfish](https://pufferfish.host/downloads)
* [Purpur](https://purpurmc.org/downloads)

Samozřejmě je mnohem více příkladů, vypsané tady jsou pouze ty hlavní, které se používaly nebo stále používají. Silně nedoporučuji používat typy serverů, které zde nejsou zmíněné (tzv. "no-name" forky).

Jaký z nich si tedy vybrat? Toť je celkem složitá otázka, první si musíme uvědomit, jak takové typy serverů vznikají. Každý z nich je forkem nějakého jiného druhu serveru. Pro představu, první zde byl CraftBukkit, ale ten měl jisté nedostatky, takže byl založen Spigot, který obsahuje to stejné, co má v sobě CraftBukkit, akorát přidává extra možnosti. Stejný proces se opakuje u každého typu serveru, akorát již nejsou většinou založené na CraftBukkitu, ale ve většině případů se jedná o forky Spigotu či Paperu (Dané servery samozřejmě CraftBukkit stále obsahují, jen se jim tak už neříká). Níže si rozebereme všechny druhy serverů podrobně, ať máte dobrou představu, k čemu všechny slouží. 

<h2>CraftBukkit</h2>
Jedná se o základ všech dalších druhů serverů. Bohužel CraftBukkit poskytuje hlavně možnost používání pluginů a pár extra možností, jako je kontrolování spawn systému mobů, či nastavení generace světů, tím to ale končí. Používat pouze CraftBukkit nedoporučujeme žádnému serveru, jelikož je extrémně náročný na výkon.

<h2>Spigot</h2>
Spigot je stejně jako CraftBukkit typ serveru, který dnes již nedoporučujeme používat pro produkční servery. Jedná se o software, který umožňuje používání Pluginů/Proxy a tím to víceméně končí. Nějaké extra možnosti optimalizace tu samozřejmě jsou, ale v porovnání s možnostmi, které poskytne Paper, jsou ty ze Spigotu naprosto zanedbatelné a server bude při větším počtu hráčů lagovat.

<h2>Paper</h2>
Paper je bezesporu nejdůležitější ze všech možných druhů serverů, má dostupné verze od 1.8.8 až po momentálně nejnovější 1.21.1. Zaměřuje se na zlepšení hry ve všech možných ohledech. Ať už se jedná o celkovou optimalizaci hry, opravování "neúmyslných" herních mechanik (například duplikačních či crash glitchů) a mnoho dalšího. Paper je úplný základ a měl by ho používat úplně každý, kdo chce stabilní server. Samozřejmě, když používáte některý z jeho forků (Pufferfish, Purpur), je to naprosto v pořádku. 

Za Paperem stojí zároveň stejný team, který se podílí na vývoji Velocity (moderní proxy), a dalších nástrojů. Takže již na základně této informace si můžete být jisti, že od nich můžete čekat pouze to nejlepší.

<h2>Folia</h2>
Folia je relativně nový projekt od týmu PaperMC, který seskupuje blízké načtené kusy do "nezávislé oblasti". Přesné informace o tom, jak Folia seskupuje blízké chunky, najdete v dokumentaci PaperMC. Každá nezávislá oblast má svou vlastní smyčku tiků, která tiká běžnou rychlostí Minecraftu (20TPS). To znamená, že server využívá více jader procesoru (multithreading) efektivně. Folia vyžaduje specifické pluginy (musí podporovat Folia) a je určena pro velmi velké servery s vysokým počtem hráčů, které běží na dedikovaném hardwaru. Pro běžný menší server může být zbytečně složitá na nastavení.

<h2>Tuinity</h2>
Tuinity byl fork Paperu zaměřený na optimalizaci. Poslední samostatná verze je pro Minecraft 1.16.5. Od verze 1.17 byly vymoženosti Tuinity sloučeny přímo do Paperu. Pokud tedy používáte moderní verzi Paperu (1.21+), již využíváte technologie, které Tuinity přineslo.

<h2>Airplane</h2>
Airplane byl fork Paperu, který se zaměřoval na optimalizaci. Poslední použitelná verze je pro Minecraft 1.17.1. Od verze 1.18 byl projekt ukončen a jeho nástupcem se stal Pufferfish.

<h2>Pufferfish</h2>
Pufferfish je fork Paperu, který se zaměřuje na maximální optimalizaci hry a dělá to zatraceně dobře. Dá se použít pro všechny moderní verze (včetně 1.21.1) a silně ho doporučujeme používat, pokud hledáte čistý výkon bez zbytečných herních změn. 

Pufferfish také nabízí pokročilé konfigurační možnosti pro správu entit a asynchronního načítání. Pro servery, které mají problémy s výkonem na čistém Paperu, je Pufferfish logickým dalším krokem.

<h2>Purpur</h2>
Purpur je fork Pufferfish (a tím pádem i Paperu). To znamená, že obsahuje všechny optimalizace z Pufferfish, ale navíc přidává obrovské množství herních nastavení a mechanik. Můžete nastavit například jízdu na hráčích, editovat chování mobů, povolit silk-touch na spawner a stovky dalších věcí.

Co se jeho používání týče, pro verzi 1.21.1 je to jedna z nejoblíbenějších voleb. Pokud provozujete Survival, Skyblock nebo Creative a chcete mít plnou kontrolu nad hrou, Purpur je ideální volba. Pokud chcete jen čistý výkon bez herních změn, zvolte Pufferfish.

<h2>Jiné (Gale, etc.)</h2>
Existuje samozřejmě hromada jiných možných druhů serverů (Gale, Leaves), ale doporučujeme je používat s opatrností. Často se jedná o menší forky zaměřené na specifické optimalizace, které mohou rozbít kompatibilitu s některými pluginy.
Vyhněte se "placeným" forkům z pochybných stránek nebo MC-Marketu, které slibují zázračný výkon pro staré verze (1.8.8) – často obsahují backdoory nebo jsou nestabilní.

<h2>Instalace</h2>
Instalace všech herních forků je velice jednoduchá. Stačí si ověřit, že máte správnou verzi Javy (pro Minecraft 1.21.1 je nutná **Java 21**). Následně jen stáhnete nový soubor `.jar`, nahrajete ho do hlavní složky serveru, přejmenujete na `server.jar` (nebo upravíte svůj startovací skript) a zapnete server.

<h2>Shrnutí</h2>
Pro menší shrnutí na konec si zopakujeme, jaké doporučujeme druhy serverů pro dané verze.

* **1.21.x** - Paper (základ), Pufferfish (výkon), Purpur (výkon + funkce)
* **1.20.x** - Paper, Pufferfish, Purpur
* **1.19.x** - Paper, Pufferfish, Purpur
* **1.18.x** - Paper, Pufferfish, Purpur
* **1.17.1** - Purpur, případně Airplane (ale doporučujeme aktualizovat)
* **1.16.5** - Purpur, případně Tuinity
* **1.8.8 až 1.16** - Paper, avšak silně nedoporučujeme používat takto staré verze kvůli bezpečnosti a výkonu.