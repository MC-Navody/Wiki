---
title: Optimalizace
description: Průvodce optimalizací serveru Minecraft
published: true
date: 2025-06-12T11:42:19.721Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:20.591Z
---

# Průvodce optimalizací Minecraft serveru

**Poznámka pro uživatele, kteří používají vanilla, Fabric nebo Spigot (nebo cokoliv pod Paper):** Otevřete soubor `server.properties` a změňte hodnotu `sync-chunk-writes` na `false`. Tato volba je v Paperu a jeho forcích nastavena automaticky, ale u jiných implementací ji musíte nastavit ručně. Umožní to serveru ukládat chunky mimo hlavní vlákno, čímž se sníží zátěž hlavní smyčky.

Průvodce pro verzi 1.21.5. Některé informace mohou být použitelné i pro verze 1.15 – 1.21.4.

Založeno na [této příručce](https://github.com/YouHaveTrouble/minecraft-optimization) a dalších zdrojích (na všechny jsou v příručce odkazy, pokud jsou relevantní).

Použijte obsah (vedle `README.md`) pro snadnou navigaci tímto dokumentem.

## Úvod

Nikdy nebude existovat jeden průvodce, který by přinesl perfektní výsledky. Každý server má jiné potřeby a limity toho, co je možné nebo ochotné obětovat. Ladění možností pro konkrétní potřeby vašeho serveru je klíčem. Tento průvodce má za cíl pomoci pochopit, které možnosti mají dopad na výkon a co přesně ovlivňují. Pokud narazíte na nepřesnost, můžete otevřít issue nebo vytvořit pull request.

## Příprava

### Server JAR

Volba softwaru má obrovský vliv na výkon i dostupné API. Existuje několik vhodných možností, ale i pár, kterým je lepší se vyhnout.

**Doporučené možnosti:**

* [Paper](https://github.com/PaperMC/Paper) – Nejpopulárnější software, zaměřený na výkon a opravy herních mechanik.
* [Purpur](https://github.com/PurpurMC/Purpur) – Fork Paperu s důrazem na možnosti přizpůsobení.

**Čemu se vyhnout:**

* Jakýkoli placený JAR, který slibuje "asynchronní" funkce – většinou podvod.
* Bukkit/CraftBukkit/Spigot – Zastaralé, co se týče výkonu.
* Pluginy/softwary, které umožňují dynamické načítání nebo vypínání pluginů – viz [tato sekce](#Pluginy, které za běhu zapínají/vypínají jiné pluginy).
* Mnoho forkovaných variant Paperu nebo Purpuru může být nestabilních.

> Více o server softwaru v tomto návodu [zde](https://minecraftnavody.eu/cs/herni-servery).
{.is-info}


### Předgenerování mapy

Díky moderním optimalizacím chunk generování je předgenerování mapy dnes užitečné hlavně u serverů s velmi slabými CPU. Jinak se používá spíš pro pluginy jako Pl3xMap nebo Dynmap.

Pro předgenerování světa můžete použít plugin [Chunky](https://github.com/pop4959/Chunky). Nezapomeňte nastavit `worldborder`, aby hráči nevytvářeli nové chunky. Předgenerování může trvat i několik hodin dle zvoleného poloměru. U serverů s Paperem nebo vyšším to sice neovlivní TPS, ale načítání chunků může být výrazně zpomaleno při přetížení CPU.

Pamatujte, že Overworld, Nether a End mají oddělené hranice světa, které je potřeba nastavit zvlášť. Nether je 8× menší než Overworld (pokud to neupravíte pomocí datapacku), takže při špatném nastavení mohou hráči skončit mimo hranici.

**Nastavte vanilkové `worldborder` (`/worldborder set [průměr]`), protože omezuje i některé funkce jako hledání pokladů, které mohou způsobit lagy.**
Zde je pokračování překladu: část **Konfigurace – Síť**.

> Více o předgeneraci světa se dozvíš v tomto návodu [zde](https://minecraftnavody.eu/cs/predgenerace-sveta).
{.is-info}


## Konfigurace

### Síť

#### \[server.properties]

**`network-compression-threshold`**

**Doporučená hodnota: 256**

Nastavuje limit velikosti paketu, od kterého se začne pokoušet o kompresi. Vyšší hodnota ušetří CPU na úkor šířky pásma, -1 ji úplně vypne. U klientů s pomalým připojením může vyšší hodnota způsobit problémy. Pokud máte server za proxy nebo na stejné mašině (ping < 2 ms), vypnutí komprese (-1) bývá výhodné – interní síť zvládne nekomprimovaný provoz.



#### \[purpur.yml]

**`use-alternate-keepalive`**

**Doporučená hodnota: true**

Zapíná alternativní keepalive systém Purpuru, který pomáhá hráčům se špatným připojením nevypadávat. Nekompatibilní s TCPShield.

> Posílá keepalive paket každou sekundu a odpojí hráče jen tehdy, když do 30 sekund neodpoví na žádný z nich. Odpověď na kterýkoli z nich udrží připojení.
> \~ [https://purpurmc.org/docs/Configuration/#use-alternate-keepalive](https://purpurmc.org/docs/Configuration/#use-alternate-keepalive)

Zde je další část překladu – sekce **Chunky**:



## Chunky

### \[server.properties]

#### `simulation-distance`

**Doporučená hodnota: 4**

Simulační vzdálenost určuje počet chunků kolem hráče, které server aktivně "tickuje" (probíhá v nich dění). Patří sem např. tavení v pecích, růst plodin apod. Tuto hodnotu doporučujeme nastavit nízko, např. `3`–`4`, protože díky existenci `view-distance` mohou být chunky načtené, ale netickované. Tím hráči vidí dál bez zbytečného zatížení serveru.

#### `view-distance`

**Doporučená hodnota: 7**

Vzdálenost v chuncích, kterou uvidí hráč. Funguje podobně jako `no-tick-view-distance` v Paperu. Konečná vzdálenost, která se pošle klientovi, bude rovna vyšší hodnotě mezi `simulation-distance` a `view-distance`.

Např. pokud je `simulation-distance` 4 a `view-distance` 12, klient uvidí 12 chunků.



### \[spigot.yml]

#### `view-distance`

**Doporučená hodnota: default**

Tato hodnota přepíše tu ze `server.properties`, pokud není nastavena na `default`. Doporučuje se ponechat na `default`, abyste mohli spravovat vzdálenosti centrálně.



### \[paper-world configuration]

#### `delay-chunk-unloads-by`

**Doporučená hodnota: 10s**

Určuje, jak dlouho zůstanou chunky načtené poté, co hráč odejde. Zabraňuje opakovanému načítání a uvolňování chunků, což zatěžuje server. Příliš vysoká hodnota však může způsobit zbytečně mnoho načtených chunků. Pokud se jedná o často navštěvovanou oblast, zvažte její trvalé načtení.

#### `prevent-moving-into-unloaded-chunks`

**Doporučená hodnota: true**

Zamezuje hráčům vstupovat do nenačtených chunků, což by způsobilo synchronní načítání a tím pádem i lagy. Čím nižší je vaše `view-distance`, tím vyšší riziko, že na takový chunk narazí.

#### `entity-per-chunk-save-limit`

**Doporučené hodnoty:**

```yaml
area_effect_cloud: 8
arrow: 16
breeze_wind_charge: 8
dragon_fireball: 3
egg: 8
ender_pearl: 8
experience_bottle: 3
experience_orb: 16
eye_of_ender: 8
fireball: 8
firework_rocket: 8
llama_spit: 3
splash_potion: 8
lingering_potion: 8
shulker_bullet: 8
small_fireball: 8
snowball: 8
spectral_arrow: 16
trident: 16
wind_charge: 8
wither_skull: 4
```

Pomocí této volby můžete nastavit limity počtu entit daného typu, které se mohou uložit v jednom chunku. Doporučuje se nastavit minimálně limity pro projektily, aby se předešlo jejich hromadění a následnému pádu serveru při načtení. Hodnota kolem `10` je ideální. Můžete přidat další entity podle jejich ID z Minecraft Wiki.

Tato volba neslouží k omezení spawnování mobů, ale pouze k limitaci při ukládání.
Pokračujeme překladem – sekce **Mobové**:



## Mobové

### \[bukkit.yml]

#### `spawn-limits`

**Doporučené počáteční hodnoty:**

```yaml
monsters: 20
animals: 5
water-animals: 2
water-ambient: 2
water-underground-creature: 3
axolotls: 3
ambient: 1
```

Vzorec pro výpočet je: `[počet hráčů] × [limit]`. Čím nižší čísla, tím méně mobů. Pokud používáte `per-player-mob-spawn`, rozděluje se spawn mezi hráče rovnoměrně. Snížením hodnot ulevíte serveru, ale ve hře, kde jsou přirozeně spawnovaní mobové důležití, to může omezit zážitek. Hodnotu `20` nebo méně lze použít, pokud zároveň snížíte `mob-spawn-range`.



#### `ticks-per`

**Doporučené hodnoty:**

```yaml
monster-spawns: 10
animal-spawns: 400
water-spawns: 400
water-ambient-spawns: 400
water-underground-creature-spawns: 400
axolotl-spawns: 400
ambient-spawns: 400
```

Určuje, jak často (v tickech) se pokouší server spawnovat daný typ entity. Voda/ambientní mobové se nemusí spawnovat často, protože je hráči rychle nezabíjejí. U monsterů mírné prodloužení intervalu nemá zásadní dopad – ani na farmy. Tyto hodnoty by měly být vyšší než `1`.



### \[spigot.yml]

#### `mob-spawn-range`

**Doporučená hodnota: 3**

Snižuje počet chunků, ve kterých mohou mobové spawnovat kolem hráče. Nižší hodnota (např. `2` nebo `3`) zmenší oblast, ale mobů bude působit více, protože budou blíž hráči. Tato hodnota by měla být menší nebo rovna `simulation-distance`.



#### `entity-activation-range`

**Doporučené hodnoty:**

```yaml
animals: 16
monsters: 24
raiders: 48
misc: 8
water: 8
villagers: 16
flying-monsters: 48
```

Nastavuje, na jakou vzdálenost od hráče se má entita aktivovat (tickovat). Nižší hodnoty zlepší výkon, ale mohou způsobit, že se mobové chovají "zpomaleně", dokud k nim hráč nepřijde blíž. U železných farem může nižší hodnota způsobit nefunkčnost.



#### `entity-tracking-range`

**Doporučené hodnoty:**

```yaml
players: 48
animals: 48
monsters: 48
misc: 32
other: 64
```

Určuje vzdálenost (v blocích), ze které jsou entity viditelné. Nižší hodnoty uleví výkonu, ale může se stát, že se mob "objeví z ničeho nic". Tato hodnota by měla být obvykle vyšší než `entity-activation-range`.



#### `tick-inactive-villagers`

**Doporučená hodnota: false**

Určuje, zda se mají vesničané tickovat mimo aktivační rozsah. Pokud je vypnuté, vesničané se chovají jako zmražení, což pomůže výkonu, ale může způsobit problémy se železnými farmami nebo obnovováním obchodu.



#### `nerf-spawner-mobs`

**Doporučená hodnota: true**

Moby spawnované ze spawneru můžete "zneškodnit", tedy zakázat jim AI. Takoví mobové nic nedělají. Pokud je chcete alespoň nechat pohybovat ve vodě, nastavte v \[paper-world configuration] volbu `spawner-nerfed-mobs-should-jump` na `true`.
Pokračujeme překladem – dokončení sekce **Mobové** (nastavení z `paper-world configuration` a `purpur.yml`):



### \[paper-world configuration]

#### `despawn-ranges`

**Doporučené hodnoty:**

```yaml
ambient:
  hard: 72
  soft: 30
axolotls:
  hard: 72
  soft: 30
creature:
  hard: 72
  soft: 30
misc:
  hard: 72
  soft: 30
monster:
  hard: 72
  soft: 30
underground_water_creature:
  hard: 72
  soft: 30
water_ambient:
  hard: 72
  soft: 30
water_creature:
  hard: 72
  soft: 30
```

Upravuje vzdálenosti, kdy se mobové despawnují. Pokud jsou mimo „hard“ rozsah, okamžitě zmizí. Mezi „soft“ a „hard“ mají šanci na despawn. Soft nastavte na cca `30`, hard na `(simulation-distance * 16) + 8`, tedy o něco víc než je dosah hráče, aby mobové nemizeli hned po odchodu hráče.



#### `per-player-mob-spawns`

**Doporučená hodnota: true**

Zapne počítání mob spawnu na hráče – server sleduje, kolik mobů už je kolem každého. To pomáhá při problémech, kdy jeden hráč zabere celý mobcap. Umožní také snížit `spawn-limits` bez zhoršení hratelnosti. Mírně zvýší nároky na výkon, ale přínos převažuje.



#### `max-entity-collisions`

**Doporučená hodnota: 2**

Určuje, kolik kolizí může entita najednou zpracovávat. Hodnota `0` znemožní jakýkoli pohyb, včetně tlačení hráčů. `2` je běžně dostatečná. Přepisuje hodnotu ze `spigot.yml`.

Poznámka: Přepíše funkci herního pravidla `maxEntityCramming`, pokud má vyšší hodnotu.



#### `update-pathfinding-on-block-update`

**Doporučená hodnota: false**

Vypnutím se sníží počet výpočtů cesty pro moby, čímž se zvýší výkon. Může to ale způsobit, že mobové se budou chvíli "motat" nebo nereagovat – aktualizace cesty probíhá pasivně každých 5 ticků (0,25 s).



#### `fix-climbing-bypassing-cramming-rule`

**Doporučená hodnota: true**

Opravuje problém, kdy entity při lezení (např. pavouci) obchází `maxEntityCramming`. Tím zabráníte příliš velkému množství mobů naskládaných na malém prostoru.



#### `armor-stands.tick`

**Doporučená hodnota: false**

Obvykle bezpečné nastavit na `false`. Pokud však používáte armor standy v kombinaci s pluginy nebo se hýbou (např. voda, gravitace), může být potřeba zapnout.



#### `armor-stands.do-collision-entity-lookups`

**Doporučená hodnota: false**

Zakáže kolize armor standů. Výrazně pomůže při velkém množství armor standů, pokud je nepotřebujete ke kolizím.



#### `tick-rates` (senzory a chování vesničanů)

**Doporučené hodnoty:**

```yaml
behavior:
  villager:
    validatenearbypoi: 60
    acquirepoi: 120
sensor:
  villager:
    secondarypoisensor: 80
    nearestbedsensor: 80
    villagerbabiessensor: 40
    playersensor: 40
    nearestlivingentitysensor: 40
```

Určuje, jak často (v tickech) se spouští určité smyčky chování a senzory u vesničanů. Např. `acquirepoi` (hledání pracovního bloku) je velmi náročný – jeho zpomalením snížíte zátěž serveru. V případě problémů s chováním vesničanů ho můžete zrychlit.



### \[purpur.yml]

#### `zombie.aggressive-towards-villager-when-lagging`

**Doporučená hodnota: false**

Pokud je server pod `lagging-threshold`, zombíci přestanou napadat vesničany. Pomáhá to ve chvílích, kdy server nestíhá.



#### `entities-can-use-portals`

**Doporučená hodnota: false**

Zakáže entitám (mimo hráčů) používat portály. Zamezí tím načítání chunků přes světy, což jinak běží na hlavním vláknu. Může to ale rozbít některé farmy nebo mechanismy založené na portálech.



#### `villager.lobotomize.enabled`

**Doporučená hodnota: true**

> Zapínejte pouze, pokud vesničané způsobují lagy.

Lobotomizovaní vesničané nemají AI, jen periodicky obnovují nabídky. Pokud se znovu dostanou k cíli (např. pracovnímu bloku), AI se jim znovu zapne.



#### `villager.search-radius`

**Doporučené hodnoty:**

```yaml
acquire-poi: 16
nearest-bed-sensor: 16
```

Omezuje, jak daleko mohou vesničané hledat pracovní bloky a postele. Menší radius výrazně pomůže při velkém množství vesničanů, ale může způsobit, že blok/postel "nevidí", i když jsou relativně blízko.

Zde je překlad další části – **Různé nastavení (Misc)**:



## Různé

### \[spigot.yml]

#### `merge-radius`

**Doporučené hodnoty:**

```yaml
item: 3.5
exp: 4.0
```

Určuje vzdálenost, ve které se budou spojovat itemy a XP orbíky. Spojování snižuje počet entit a tím i zátěž. Pokud je hodnota příliš vysoká, může to vést ke „zmizení“ itemů nebo k jejich teleportování přes bloky. Neprobíhá žádná kontrola zdí – unless použijete Paper a zapnete `fix-items-merging-through-walls`.

XP orbíky se slučují pouze při vzniku, ne později.



#### `hopper-transfer`

**Doporučená hodnota: 8**

Doba v tickech, za jak dlouho hopper přesune item. Vyšší hodnota zlepšuje výkon (méně výpočtů), ale může rozbít hopper hodiny nebo systémy třídění, pokud se přehání.



#### `hopper-check`

**Doporučená hodnota: 8**

Interval mezi kontrolami hopperu na item nad sebou nebo v připojeném inventáři. Zvýšením snížíte zátěž, ale opět hrozí rozbití složitějších systémů.



### \[paper-world configuration]

#### `alt-item-despawn-rate`

**Doporučené nastavení:**

```yaml
enabled: true
items:
  cobblestone: 300
  netherrack: 300
  sand: 300
  red_sand: 300
  gravel: 300
  dirt: 300
  short_grass: 300
  pumpkin: 300
  melon_slice: 300
  kelp: 300
  bamboo: 300
  sugar_cane: 300
  twisting_vines: 300
  weeping_vines: 300
  oak_leaves: 300
  spruce_leaves: 300
  birch_leaves: 300
  jungle_leaves: 300
  acacia_leaves: 300
  dark_oak_leaves: 300
  mangrove_leaves: 300
  cherry_leaves: 300
  cactus: 300
  diorite: 300
  granite: 300
  andesite: 300
  scaffolding: 600
```

Umožňuje nastavit vlastní dobu (v tickech) pro despawn specifických itemů. Hodí se místo pluginů na mazání itemů. V kombinaci s `merge-radius` to zefektivní server.



#### `redstone-implementation`

**Doporučená hodnota: ALTERNATE\_CURRENT**

Nahrazuje vanilkový redstone systém rychlejší variantou, která redukuje zbytečné blokové aktualizace. Výsledkem je nižší výpočetní náročnost. Může mírně ovlivnit extrémně technické redstone konstrukce.

Založeno na modifikaci [Alternate Current](https://modrinth.com/mod/alternate-current).



#### `hopper.disable-move-event`

**Doporučená hodnota: false**

Zakáže vyvolávání `InventoryMoveItemEvent`, pokud žádný plugin neposlouchá. Nastavte na `true` pouze tehdy, pokud víte, že takové pluginy nemáte nebo jejich funkce nepotřebujete. Jinak to může narušit např. ochranné pluginy.



#### `hopper.ignore-occluding-blocks`

**Doporučená hodnota: true**

Určuje, zda hoppers ignorují kontejnery uvnitř plných bloků (např. hopper minecart v písku). Zapnutím můžete zrychlit server, ale může to rozbít některé farmy.



#### `tick-rates.mob-spawner`

**Doporučená hodnota: 2**

Určuje, jak často se tickuje spawner. Vyšší hodnota = méně lagů při mnoha spawnerech. Ale pokud je příliš vysoká, sníží to efektivitu spawnování.



#### `optimize-explosions`

**Doporučená hodnota: true**

Zapne rychlejší algoritmus pro výpočty výbuchů. Je o něco méně přesný, ale rozdíl si hráči většinou nevšimnou a výkon se zlepší.



#### `treasure-maps.enabled`

**Doporučená hodnota: false**

Generování map s pokladem je velmi náročné a může zamrznout server při hledání struktur v negenerovaných částech světa. Bez předgenerovaného světa a nastaveného worldborderu **raději vypnout**.



#### `treasure-maps.find-already-discovered`

**Doporučené hodnoty:**

```yaml
loot-tables: true
villager-trade: true
```

Umožňuje mapám odkazovat na již existující struktury. Tím se předejde zamrzání serveru kvůli hledání neexistujících (negenerovaných) struktur.



#### `tick-rates.grass-spread`

**Doporučená hodnota: 4**

Určuje, jak často se pokusí šířit tráva nebo mycelium. Hodnota `4` sníží zátěž bez viditelného zpomalení růstu.



#### `tick-rates.container-update`

**Doporučená hodnota: 1**

Interval mezi aktualizacemi kontejnerů (např. truhly). Zvýšení může pomoci u problémových konfigurací, ale zvyšuje riziko desynchronizace inventáře (ghost itemy).



#### `non-player-arrow-despawn-rate`

#### `creative-arrow-despawn-rate`

**Doporučená hodnota: 20**

Čas v tickech, po kterém zmizí šípy od mobů nebo hráčů v Creative. Hráči je nemohou sebrat, takže je rozumné nastavit nízkou hodnotu (např. 1 sekundu = 20 ticků).



### \[purpur.yml]

#### `dolphin.disable-treasure-searching`

**Doporučená hodnota: true**

Zabrání delfínům hledat poklady, čímž se předejde náročným výpočtům podobným mapám s pokladem.



#### `teleport-if-outside-border`

**Doporučená hodnota: true**

Automaticky teleportuje hráče na spawn, pokud se ocitnou mimo worldborder. Užitečné, protože vanilla hranice lze obejít a způsobují jen malé poškození.

Zde je pokračování překladu – sekce **Ochrana a pomocné nástroje**, následovaná **Java flagy** a **problematickými pluginy**:



## Pomocné nástroje

### \[paper-world configuration]

#### `anti-xray.enabled`

**Doporučená hodnota: true**

Zapíná vestavěnou ochranu proti x-ray cheaterům. Pro detailní nastavení viz [návod PaperMC](https://docs.papermc.io/paper/anti-xray).

Tato funkce **sice trochu sníží výkon**, ale je **výrazně efektivnější** než pluginy třetích stran a dopad bývá zanedbatelný.



#### `nether-ceiling-void-damage-height`

**Doporučená hodnota: 127**

Pokud je tato hodnota větší než `0`, hráči nad danou výškou v Netheru obdrží poškození jako ve voidu. Brání hráčům používat střechu Netheru. Vanilla Nether má výšku 128 bloků, proto nastavte `127`. Pokud výšku Netheru měníte, nastavte to jako `[vaše_výška_netheru] - 1`.



## Java startovací parametry

**[Minecraft 1.20.5+ a novější vyžaduje Java 21 nebo vyšší.](https://docs.papermc.io/java-install-update)**
Oracle změnil licencování, takže **není nutné používat jejich distribuci**.

**Doporučené distribuce:**

* [Adoptium](https://adoptium.net/)
* [Amazon Corretto](https://aws.amazon.com/corretto/)

Alternativní JVM (např. OpenJ9, GraalVM) mohou fungovat, **ale nejsou Paperem podporovány** a mohou způsobovat problémy – jejich použití se **nedoporučuje**.



### Garbage collector a startovací parametry

Správně nastavený garbage collector může omezit lagy způsobené "pauzami" při mazání paměti. Doporučené parametry najdete zde:
👉 [Aikar's optimalizační flagy](https://docs.papermc.io/paper/aikars-flags) \[`SOG`]

Pro generování vhodných flagů pro váš server použijte:
👉 [flags.sh](https://flags.sh)

⚠️ Tyto doporučené flagy nejsou vhodné pro alternativní JVM jako OpenJ9!



## Pluginy, které zní „až moc dobře“

### Pluginy pro mazání itemů ze země

🚫 **Zbytečné.** Nahraďte je kombinací:

* `merge-radius`
* `alt-item-despawn-rate`

Tyto pluginy často spotřebují **víc výkonu při skenování a mazání**, než kdyby itemy zůstaly.



### Mob stackery

⚠️ Těžko obhajitelné.
Stackování přirozeně spawnovaných mobů často způsobí **větší lagy**, protože server se neustále pokouší spawnovat nové moby. Jediný rozumný případ je u **spawnerů** na serverech s jejich velkým množstvím.



### Pluginy, které za běhu zapínají/vypínají jiné pluginy

🚨 **Vysoce nebezpečné.**
Může vést k:

* fatálním chybám s ukládáním dat
* odstranění závislostí
* zničení session/dat

Totéž platí pro příkaz `/reload`. Více viz [článek od me4502](https://madelinemiller.dev/blog/problem-with-reload/)



## Jak zjistit, co laguje – měření výkonu

### `/mspt` příkaz

Paper nabízí příkaz `/mspt`, který ukazuje, kolik milisekund trvaly poslední ticky.

* Pokud jsou první a druhá hodnota < 50 ms → ✅ server nestíhá
* Pokud třetí hodnota překročí 50 → značí výkyv, který je běžný, nemusíte panikařit



### Spark

[**Spark**](https://spark.lucko.me/) je plugin pro detailní profilování výkonu (CPU i paměť).
Návod na použití: [Spark wiki](https://spark.lucko.me/docs/)
Jak najít příčiny lagů: [Průvodce](https://spark.lucko.me/docs/guides/Finding-lag-spikes)



## Exploity v Minecraftu a jak je opravit

Kompletní seznam exploitů a způsobů, jak je eliminovat, najdete zde:
👉 [minecraft-exploits-and-how-to-fix-them](https://github.com/YouHaveTrouble/minecraft-exploits-and-how-to-fix-them)



