---
title: Optimalizace
description: Průvodce optimalizací serveru Minecraft
published: true
date: 2023-11-25T20:56:16.864Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:20.591Z
---

# Průvodce optimalizací serveru Minecraft

Poznámka pro uživatele, kteří používají Vanillu, Fabric nebo Spigot (nebo cokoli pod Paper) - přejděte do souboru server.properties a změňte `sync-chunk-writes` na `false`. Tato volba je na Paperu a jeho forcích násilně nastavena na false, ale na ostatních implementacích serveru je třeba ji přepnout na false ručně. To umožní serveru ukládat chunky mimo hlavní vlákno, čímž se sníží zatížení hlavní smyčky tick.

Příručka pro verzi 1.20. Některé věci mohou stále platit pro verze 1.15 - 1.19.

Založeno na [této příručce](https://github.com/YouHaveTrouble/minecraft-optimization) a dalších zdrojích (na všechny jsou v příručce odkazy, pokud jsou relevantní).

# Intro
Nikdy nebude existovat návod, která by vám poskytl dokonalé výsledky. Každý server má své vlastní potřeby a limity, které můžete nebo jste ochotni obětovat. O tom, jak si pohrát s možnostmi a vyladit je podle potřeb vašeho serveru, to je to, oč tu běží. Cílem tohoto návodu je pouze pomoci vám pochopit, jaké možnosti mají vliv na výkon a co přesně mění.

# Přípravy

## Server JAR
Výběr serverového softwaru může mít velký vliv na výkon a možnosti rozhraní API. V současné době existuje několik životaschopných populárních serverových JARů, ale existuje také několik, od kterých byste se měli z různých důvodů držet dál.

Doporučené tipy:
* [Paper](https://github.com/PaperMC/Paper) - Nejoblíbenější serverový software, který se snaží zlepšit výkon a zároveň opravit nesrovnalosti v hratelnosti a mechanikách.
* [Pufferfish](https://github.com/pufferfish-gg/Pufferfish) - Fork Paperu, jehož cílem je další zlepšení výkonu serveru.
* [Purpur](https://github.com/PurpurMC/Purpur) - Pufferfish fork zaměřený na funkce a svobodu přizpůsobení.

Měli byste se držet dál od:
* Jakýkoli placený serverový JAR, který tvrdí, že je asynchronní - 99,99% pravděpodobnost, že se jedná o podvod.
* Bukkit/CraftBukkit/Spigot - Extrémně zastaralý z hlediska výkonu ve srovnání s jiným serverovým softwarem, ke kterému máte přístup.
* Jakýkoli plugin/software, který za běhu povoluje/zakazuje/načítá pluginy. Viz [tato sekce](#Pluginy povolující/zakazující jiné pluginy), abyste pochopili proč.
* Mnoho forků dále po proudu od Pufferfish nebo Purpur se bude potýkat s nestabilitou a dalšími problémy. Pokud usilujete o větší nárůst výkonu, optimalizujte svůj server nebo investujte do osobního soukromého forku.

> Více o server softwaru v tomto návodu [zde](https://minecraftnavody.eu/cs/herni-servery).

## Předgnerace světa
Předgenerování map je díky různým optimalizacím generování chunků přidaným v průběhu let nyní užitečné pouze na serverech s příšernými, jednovláknovými nebo omezenými procesory. Ačkoli se pregenerace běžně používá ke generování chunků pro pluginy map světa, jako je Pl3xMap nebo Dynmap.

Pokud přesto chcete svět předgenerovat, můžete k tomu použít plugin, jako je [Chunky](https://github.com/pop4959/Chunky). Nezapomeňte nastavit hranice světa, aby hráči negenerovali nové chunky! Všimněte si, že předgenování může někdy trvat hodiny v závislosti na poloměru, který nastavíte v pluginu Chunky. Mějte na paměti, že se softwarem Paper a vyšší nebude mít načítání chunků vliv na vaše tps, ale rychlost načítání chunků se může výrazně zpomalit, pokud je procesor vašeho serveru přetížen.

Klíčové je si uvědomit, že overworld, nether a end mají samostatné hranice světa, které je třeba nastavit pro každý svět zvlášť.

**Ujistěte se, že jste nastavili vanillovou hranici světa (`/worldborder set [poloměr]`), protože omezuje některé funkce, jako je například rozsah vyhledávání pokladů, což může způsobit nárůst zatížení**.

> Více o předgeneraci světa se dozvíš v tomto návodu [zde](https://minecraftnavody.eu/cs/predgenerace-sveta).



# Konfigurace

## Síťování

### [server.properties]

#### network-compression-threshold

`Dobrá počáteční hodnota: 256`

Umožňuje nastavit horní hranici velikosti paketu, než se jej server pokusí zkomprimovat. Nastavení vyšší hodnoty může ušetřit některé prostředky procesoru na úkor šířky pásma a nastavení na -1 tuto funkci zakáže. Nastavení vyšší hodnoty může také poškodit klienty s pomalejším síťovým připojením. Pokud je server v síti s proxy serverem nebo na stejném počítači (s pingem kratším než 2 ms), bude vypnutí této hodnoty (-1) výhodné, protože rychlost vnitřní sítě obvykle zvládne dodatečný nekomprimovaný provoz.

### [purpur.yml]

#### use-alternate-keepalive

`Dobrá počáteční hodnota: true`

Můžete povolit systém alternativního keepalive Purpuru, aby hráči se špatným připojením nebyli tak často vyřazováni. Má známou nekompatibilitu s TCPShield.

> Zapnutím této funkce se jednou za sekundu odešle hráči keepalive paket, který se vyhodí na timeout pouze v případě, že na žádný z nich nebylo do 30 sekund odpovězeno. Odpověď na kterýkoli z nich v libovolném pořadí udrží hráče připojeného. AKA, nedojde k vykopnutí hráče, protože někde na trase dojde k zahození 1 paketu.  
~ https://purpurmc.org/docs/Configuration/#use-alternate-keepalive

---

## Chunky

### [server.properties]

#### simulation-distance

`Dobrá počáteční hodnota: 4`

Simulační vzdálenost je vzdálenost v chuncích kolem hráče, kterou bude server tikat. V podstatě vzdálenost od hráče, ve které se budou dít věci. Patří sem tavení pecí, růst plodin a stromů atd. Tuto volbu chcete záměrně nastavit nízko, někde kolem `3` nebo `4`, kvůli existenci `view-distance`. To umožňuje načítat více kusů bez jejich zaškrtávání. To efektivně umožňuje hráčům vidět dále bez stejného dopadu na výkon.

#### view-distance

`Dobrá počáteční hodnota: 7`

Jedná se o vzdálenost v chuncích, která bude hráčům zaslána, podobně jako u no-tick-view-distance z Paperu.

Celková vzdálenost pohledu bude rovna největší hodnotě mezi `simulation-distance` a `view-distance`. Pokud je například vzdálenost simulace nastavena na 4 a vzdálenost zobrazení na 12, celková vzdálenost odeslaná klientovi bude 12 chunků.

### [spigot.yml]

#### view-distance

`Dobrá počáteční hodnota: default`

Tato hodnota přepíše hodnotu server.properties, pokud není nastavena na `default`. Měli byste ji ponechat jako výchozí, abyste měli simulaci i vzdálenost zobrazení na jednom místě pro snadnější správu.

### [konfigurace paper-world]

#### delay-chunk-unloads-by

`Dobrá počáteční hodnota: 10s`

Tato volba umožňuje nastavit, jak dlouho zůstanou chunky načtené po odchodu hráče. Pomáhá to, aby se při pohybu hráče sem a tam neustále nenačítaly a nevypouštěly stejné chunky. Příliš vysoké hodnoty mohou vést k tomu, že se načítá příliš mnoho chunků najednou. V oblastech, do kterých se často teleportujete a které jsou často načítány, zvažte, zda je možné nechat oblast trvale načtenou. To bude pro váš server lehčí než neustálé načítání a vykládání kusů.

#### max-auto-save-chunks-per-tick

`Dobrá počáteční hodnota: 8`

Umožňuje zpomalit inkrementální ukládání světa tím, že se úloha ještě více rozloží v čase pro lepší průměrný výkon. Při počtu hráčů vyšším než 20-30 byste mohli chtít nastavit vyšší hodnotu než `8`. Pokud se inkrementální ukládání nestihne dokončit včas, bukkit automaticky uloží zbylé chunky najednou a začne proces znovu.

#### prevent-moving-into-unloaded-chunks

`Dobrá počáteční hodnota: true`

Je-li tato volba zapnuta, zabrání hráčům v pohybu do nenačtených chunků a způsobí synchronizační zatížení, které zahltí hlavní vlákno a způsobí zpoždění. Pravděpodobnost, že hráč narazí do nenačteného chunku, je tím vyšší, čím menší je vzdálenost pohledu.

#### entity-per-chunk-save-limit

Dobré počáteční hodnoty:
```yaml
    area_effect_cloud: 8
    arrow: 16
    dragon_fireball: 3
    egg: 8
    ender_pearl: 8
    experience_bottle: 3
    experience_orb: 16
    eye_of_ender: 8
    fireball: 8
    firework_rocket: 8
    llama_spit: 3
    potion: 8
    shulker_bullet: 8
    small_fireball: 8
    snowball: 8
    spectral_arrow: 16
    trident: 16
    wither_skull: 4
```

Pomocí této položky můžete nastavit omezení, kolik entit zadaného typu lze uložit. Měli byste stanovit limit alespoň pro každý projektil, abyste se vyhnuli problémům s ukládáním obrovského množství projektilů, při jehož načítání by server padal. Můžete zde uvést libovolné ID entit, ID entit najdete na minecraft wiki. Upravte prosím limit podle svých představ. Doporučená hodnota pro všechny projektily je přibližně `10`. Do tohoto seznamu můžete také přidat další entity podle jejich typových názvů. Tato konfigurační volba není určena k tomu, aby bránila hráčům ve vytváření velkých farem mobů.

### [pufferfish.yml]

#### max-loads-per-projectile

`Dobrá počáteční hodnota: 8`

Určuje maximální počet chunků, které může projektil za svou životnost načíst. Snížení sníží zatížení chunky způsobené projektily entit, ale mohlo by způsobit problémy s trojzubci, enderpearly atd.

---

## Moby

### [bukkit.yml]

#### spawn-limits

Dobré počáteční hodnoty:
```yaml
    monsters: 20
    animals: 5
    water-animals: 2
    water-ambient: 2
    water-underground-creature: 3
    axolotls: 3
    ambient: 1
```

Matematika omezování mobů je `[playercount] * [limit]`, kde "playercount" je aktuální počet hráčů na serveru. Logicky, čím menší je počet, tím méně mobů uvidíte. `per-player-mob-spawn` k tomu použije další limit, který zajistí rovnoměrné rozdělení mobů mezi hráče. Snížení tohoto počtu je dvousečná zbraň; ano, váš server má méně práce, ale v některých herních režimech jsou přirozeně se spawnující mobové velkou součástí herního režimu. Pokud správně nastavíte `mob-spawn-range`, můžete jít až na 20 nebo méně. Nastavení `mob-spawn-range` na nižší hodnotu způsobí, že budete mít pocit, jako by kolem každého hráče bylo více mobů. Pokud používáte Paper, můžete nastavit limity mobů pro jednotlivé světy v [Paper-world konfiguraci].

#### ticks-per

Dobré výchozí hodnoty:
```yaml
    monster-spawns: 10
    animal-spawns: 400
    water-spawns: 400
    water-ambient-spawns: 400
    water-underground-creature-spawns: 400
    axolotl-spawns: 400
    ambient-spawns: 400
```

Tato volba nastavuje, jak často (v tikách) se server pokusí spawnovat určité živé entity. Vodní/okolní moby se nemusí spawnovat každý tick, protože obvykle nejsou zabiti tak rychle. Co se týče příšer: Mírné prodloužení doby mezi jednotlivými spawny by nemělo mít vliv na počet spawnů ani u farem s moby. Ve většině případů by všechny hodnoty v rámci této volby měly být vyšší než `1`. Nastavení vyšší hodnoty také umožní serveru lépe se vypořádat s oblastmi, kde je spawnování mobů zakázáno.

### [spigot.yml]

#### mob-spawn-range

`Dobrá počáteční hodnota: 2`

Umožňuje snížit rozsah (v částech), kde se budou mobové v okolí hráče spawnovat. V závislosti na herním režimu vašeho serveru a jeho počtu hráčů budete možná chtít tuto hodnotu snížit spolu s hodnotou `spawn-limits` v souboru [bukkit.yml]. Nastavení nižší hodnoty způsobí, že budete mít pocit, že je kolem vás více mobů. Tato hodnota by měla být nižší nebo rovna vaší vzdálenosti pohledu a nikdy by neměla být větší než váš rozsah tvrdého despawn / 16.

#### entity-activation-range

Dobré výchozí hodnoty:
```yaml
      animals: 16
      monsters: 24
      raiders: 48
      misc: 8
      water: 8
      villagers: 16
      flying-monsters: 48
```

Můžete nastavit, v jaké vzdálenosti od hráče se má entita nacházet, aby mohla tikat (dělat věci). Snížení těchto hodnot pomáhá výkonu, ale může mít za následek nereagující moby, dokud se k nim hráč nedostane opravdu blízko. Přílišné snížení této hodnoty může rozbít některé farmy mobů; nejčastější obětí jsou železné farmy.

#### entity-tracking-range

Dobré výchozí hodnoty:
```yaml
      players: 48
      animals: 48
      monsters: 48
      misc: 32
      other: 64
```

Toto je vzdálenost v blocích, ze které budou entity viditelné. Jen nebudou posílány hráčům. Pokud je tato hodnota nastavena příliš nízko, může způsobit, že se moby v blízkosti hráče objeví jakoby odnikud. Ve většině případů by tato hodnota měla být vyšší než `entity-activation-range`.

#### tick-inactive-villagers

`Dobrá počáteční hodnota: false`

Umožňuje řídit, zda mají být vesničané zaškrtáváni mimo aktivační rozsah. To způsobí, že vesničané budou postupovat normálně a budou ignorovat aktivační rozsah. Vypnutí této funkce pomůže výkonu, ale v určitých situacích může být pro hráče matoucí. Může to způsobit problémy s železnými farmami a doplňováním zásob obchodu.

#### nerf-spawner-mobs

`Dobrá počáteční hodnota: true`

Můžete nastavit, aby mobové spawnovaní spawnerem nestvůr neměli žádnou umělou inteligenci. Nerfovaní mobové nebudou dělat nic. Můžete je donutit skákat, když jsou ve vodě, změnou `spawner-nerfed-mobs-should-jump` na `true` v [konfigurace paper-worl].

### [konfigurace paper-world]

#### despawn-ranges

Dobré výchozí hodnoty:
```yaml
      ambient:
        hard: 56
        soft: 30
      axolotls:
        hard: 56
        soft: 30
      creature:
        hard: 56
        soft: 30
      misc:
        hard: 56
        soft: 30
      monster:
        hard: 56
        soft: 30
      underground_water_creature:
        hard: 56
        soft: 30
      water_ambient:
        hard: 56
        soft: 30
      water_creature:
        hard: 56
        soft: 30
```

Umožňuje nastavit rozsahy odchodu entit (v blocích). Snižte tyto hodnoty, abyste rychleji vymazali moby, kteří jsou daleko od hráče. Měli byste udržovat měkký rozsah kolem `30` a nastavit tvrdý rozsah o něco více, než je vaše skutečná simulační vzdálenost, aby se moby okamžitě nevypařily, když hráč přejde těsně za bod načítání kusu (to funguje dobře díky `delay-chunk-unloads-by` v [konfigurace paper-world]). Když se mob dostane mimo pevný rozsah, bude okamžitě despawnován. Když se nachází mezi měkkým a tvrdým rozsahem, bude mít náhodnou šanci na despawn. Váš tvrdý rozsah by měl být větší než měkký rozsah. Měli byste jej upravit podle vzdálenosti pohledu pomocí `(simulační vzdálenost * 16) + 8`. To částečně zohledňuje kusy, které ještě nebyly vyloženy poté, co je hráč navštívil.

#### per-player-mob-spawns

`Dobrá počáteční hodnota: true`

Tato volba rozhoduje, zda se při spawnu mobů má zohlednit, kolik mobů se již nachází v okolí cílového hráče. Můžete tak obejít spoustu problémů týkajících se nekonzistentního spawnování mobů kvůli hráčům, kteří vytvářejí farmy zabírající celý mobcap. Umožní to více se podobat spawnování v singleplayeru a umožní vám to nastavit nižší `spawn-limits`. Povolení této funkce má velmi mírný dopad na výkon, nicméně tento dopad je zastíněn zlepšením limitů `spawn-limits`, které umožňuje.

#### max-entity-collisions

`Dobrá počáteční hodnota: 2`

Přepíše volbu se stejným názvem v souboru [spigot.yml]. Umožňuje rozhodnout, kolik kolizí může jedna entita zpracovat najednou. Hodnota `0` způsobí nemožnost tlačit jiné entity, včetně hráčů. Hodnota `2` by měla ve většině případů stačit. Stojí za zmínku, že to učiní gamerule maxEntityCramming nepoužitelným, pokud je jeho hodnota vyšší než hodnota této konfigurační volby.

#### update-pathfinding-on-block-update

`Dobrá počáteční hodnota: false`

Zakázání této funkce povede k tomu, že se bude provádět méně pathfindingu, čímž se zvýší výkon. V některých případech to způsobí, že se mobové budou jevit více zpoždění; Budou jen pasivně aktualizovat svou cestu každých 5 tiků (0,25 s).

#### fix-climbing-bypassing-cramming-rule

`Dobrá počáteční hodnota: true`

Zapnutím této funkce opravíte, že entity nejsou při šplhání ovlivněny crammingem. Tím se zabrání tomu, aby se absurdní množství mobů hromadilo v malých prostorech, i když lezou (pavouci).

#### armor-stands.tick

`Dobrá počáteční hodnota: false`

Ve většině případů můžete tuto hodnotu bezpečně nastavit na `false`. Pokud používáte stojany na brnění nebo nějaké pluginy, které upravují jejich chování, a vyskytnou se problémy, znovu jej zapněte. Tím zabráníte tomu, aby stojany na brnění byly tlačeny vodou nebo ovlivňovány gravitací.

#### armor-stands.do-collision-entity-lookups

`Dobrá počáteční hodnota: false`

Zde můžete zakázat kolize stojanů brnění. To pomůže, pokud máte hodně stojanů na brnění a nepotřebujete, aby s něčím kolidovaly.

#### tick-rates

Dobré výchozí hodnoty:
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

> Nedoporučuje se měnit tyto hodnoty oproti výchozímu nastavení, dokud je povolen [Pufferfish's DAB](#dabenabled)!

To rozhoduje o tom, jak často se zadané chování a senzory v tikách spouštějí. Zdá se, že `acquirepoi` pro vesničany je nejtěžší chování, takže bylo značně zvýšeno. Snižte jej v případě problémů s hledáním vesničanů.

### [pufferfish.yml]

#### dab.enabled

`Dobrá počáteční hodnota: true`

DAB (dynamic activation of brain) snižuje hodnotu zaškrtnutí entity tím více, čím dále je od hráčů. DAB funguje na základě gradientu, nikoliv na základě pevně stanovené hranice jako EAR. Namísto plného zaškrtnutí blízkých entit a sotva zaškrtnutých vzdálených entit sníží DAB množství zaškrtnutí entity na základě výsledku výpočtu ovlivněného parametrem [dab.activation-dist-mod](#dabactivation-dist-mod).

#### dab.max-tick-freq

`Dobrá počáteční hodnota: 20`

Určuje nejpomalejší množství entit vzdálených od hráčů, které budou zaškrtnuty. Zvýšení této hodnoty může zlepšit výkon entit vzdálených od výhledu, ale může rozbít farmy nebo výrazně zhoršit chování mobů. Pokud zapnutí DAB rozbije farmy mobů, zkuste tuto hodnotu snížit.

#### dab.activation-dist-mod

`Dobrá počáteční hodnota: 7`

Řídí sklon, ve kterém jsou mobové zaškrtáváni. Snížením této hodnoty se DAB aktivuje blíže k hráčům, což zlepší nárůst výkonu DAB, ale ovlivní to interakci entit s okolím a může to rozbít mobí farmy. Pokud zapnutí DAB rozbíjí farmy mobů, zkuste tuto hodnotu zvýšit.

#### enable-async-mob-spawning

`Dobrá počáteční hodnota: true`

Pokud má být povoleno asynchronní spawnování mobů. Aby to fungovalo, musí být povoleno nastavení Paper's per-player-mob-spawns. Tato volba ve skutečnosti nevede k asynchronnímu spawnování mobů, ale přenáší velkou část výpočetního úsilí spojeného se spawnováním nových mobů na jiné vlákno. Povolení této možnosti by nemělo být na hře vanilla nijak znatelné.

#### enable-suffocation-optimization

`Dobrá počáteční hodnota: true`

Tato volba optimalizuje kontrolu udušení (kontrola, zda je mob uvnitř bloku a zda má dostat poškození udušením) tím, že omezí rychlost kontroly na časový limit poškození. Této optimalizace by si nemělo být možné všimnout, pokud nejste extrémně technický hráč, který používá přesné načasování tiků, aby zabil entitu v přesně stanovený čas udušením.

#### inactive-goal-selector-throttle

`Dobrá počáteční hodnota: true`

Přiškrtí selektor cílů umělé inteligence v neaktivních entitách, čímž způsobí, že neaktivní entity budou aktualizovat svůj selektor cílů každých 20 tiků namísto každého tiku. Může zlepšit výkon o několik procent a má drobné dopady na hratelnost.

### [purpur.yml]

#### zombie.aggressive-towards-villager-when-lagging

`Dobrá počáteční hodnota: false`

Zapnutí této funkce způsobí, že zombie přestanou cílit na vesničany, pokud je server pod prahem tps nastaveným pomocí `lagging-threshold` v [purpur.yml].

#### entities-can-use-portals

`Dobrá počáteční hodnota: false`

Tato volba může zakázat používání portálů všem entitám kromě hráče. Tím se zabrání tomu, aby entity načítaly chunky změnou světů, která je zpracovávána v hlavním vlákně. To má vedlejší efekt v tom, že entity nemohou procházet portály.

#### villager.brain-ticks

`Dobrá počáteční hodnota: 2`

Tato volba umožňuje nastavit, jak často (v tikách) budou tikat mozky vesničanů (pracovní a poi). Je potvrzeno, že vyšší hodnota než `3` způsobí, že vesničané budou nekonzistentní/bugovat.

#### villager.lobotomize.enabled

`Dobrá počáteční hodnota: true`

> Toto by mělo být povoleno pouze v případě, že vesničané způsobují lag! V opačném případě mohou kontroly vyhledávání cest snížit výkon.

Lobotomizovaní vesničané jsou zbaveni své AI a pouze jednou za čas doplňují své nabídky. Zapnutím této funkce dojde k lobotomii vesničanů, kteří nejsou schopni najít cestu ke svému cíli. Jejich osvobození by je mělo odlobotomizovat.

---

## Různé

### [spigot.yml]

#### merge-radius

Dobré výchozí hodnoty:
```yaml
      item: 3.5
      exp: 4.0
```

Toto rozhoduje o vzdálenosti mezi předměty a exp orby, které mají být sloučeny, čímž se sníží množství předmětů tikajících na zemi. Příliš vysoké nastavení povede k iluzi, že předměty nebo exp orby při slučování mizí. Příliš vysoké nastavení povede k rozbití některých farem a také umožní teleportaci předmětů skrz bloky. Nejsou prováděny žádné kontroly, které by zabránily slučování předmětů přes zdi. Expy se slučují pouze při vytvoření.

#### hopper-transfer

`Dobrá počáteční hodnota: 8`

Doba v tikách, po kterou budou hoppery čekat na přesun předmětu. Zvýšení této hodnoty pomůže zlepšit výkon, pokud je na serveru hodně hopperů, ale při nastavení příliš vysoké hodnoty rozbije hodiny založené na hopperu a případně i systémy třídění předmětů.

#### hopper-check

`Dobrá počáteční hodnota: 8`

Čas v tikách mezi kontrolou zásobníků na položku nad nimi nebo v inventáři nad nimi. Zvýšení této hodnoty pomůže výkonu, pokud je na serveru hodně zásobníků, ale rozbije hodiny založené na zásobnících a systémy třídění položek spoléhající se na proudy vody.

### [konfigurace paper-world]

#### alt-item-despawn-rate

Dobré výchozí hodnoty:
```yaml
      enabled: true
      items:
        cobblestone: 300
        netherrack: 300
        sand: 300
        red_sand: 300
        gravel: 300
        dirt: 300
        grass: 300
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
        cactus: 300
        diorite: 300
        granite: 300
        andesite: 300
        scaffolding: 600
```

Tento seznam umožňuje nastavit alternativní čas (v tikách) pro rychlejší nebo pomalejší vypuštění určitých typů shozených předmětů, než je výchozí. Tuto volbu lze použít místo pluginů pro vymazávání položek spolu s `merge-radius` pro zlepšení výkonu.

#### redstone-implementation

`Dobrá výchozí hodnota: ALTERNATE_CURRENT`

Nahradí systém redstone rychlejšími a alternativními verzemi, které omezují nadbytečné aktualizace bloků, čímž snižují množství logiky, kterou musí server počítat. Použití ne-vanilkové implementace může přinést drobné nesrovnalosti s velmi technickým redstonem, ale výkonnostní přínosy daleko převyšují možné problémy s výklenky. Volba ne-vanilla implementace může navíc opravit další nekonzistence redstonu způsobené CraftBukkitem.

Implementace `ALTERNATE_CURRENT` vychází z módu [Alternate Current](https://modrinth.com/mod/alternate-current). Více informací o tomto algoritmu naleznete na jejich stránce se zdroji.

#### hopper.disable-move-event

`Dobrá počáteční hodnota: false`

`InventoryMoveItemEvent` se nevyvolá, pokud této události aktivně nenaslouchá žádný plugin. To znamená, že byste tuto hodnotu měli nastavit na true pouze v případě, že takový plugin máte a nezáleží vám na tom, aby nemohly na tuto událost reagovat. **Nenastavujte na true, pokud chcete používat plugin, které poslouchají tuto událost, např. ochranné plugin!**

#### hopper.ignore-occluding-blocks

`Dobrá počáteční hodnota: true`

Určuje, zda budou zásobníky ignorovat kontejnery uvnitř plných bloků, například zásobník minecart uvnitř bloku písku nebo štěrku. Ponechání této volby zapnuté rozbije některé kontejnery závislé na tomto chování.

#### tick-rates.mob-spawner

`Dobrá počáteční hodnota: 2`

Tato volba umožňuje nastavit, jak často se mají spawnery zaškrtávat. Vyšší hodnoty znamenají menší zpoždění, pokud máte hodně spawnerů, i když při nastavení příliš vysoké hodnoty (vzhledem ke zpoždění vašich spawnerů) se rychlost spawnování mobů sníží.

#### optimize-explosions

`Dobrá počáteční hodnota: true`

Nastavení této hodnoty na `true` nahradí vanilkový algoritmus výbuchů rychlejším, ovšem za cenu mírné nepřesnosti při výpočtu poškození způsobeného výbuchy. Obvykle to není patrné.

#### treasure-maps.enabled

`Dobrá počáteční hodnota: false`

Generování map pokladů je extrémně nákladné a může server zavěsit, pokud se struktura, kterou se snaží najít, nachází v nevytvořeném chunku. Zapnout tuto funkci je bezpečné pouze v případě, že jste předgenerovali svět a nastavili vanilkovou hranici světa.

#### mapy pokladů.find-already-discovered

Dobré výchozí hodnoty:
```yaml
      loot-tables: true
      villager-trade: true
```

Výchozí hodnota této volby nutí nově generované mapy hledat neprozkoumané struktury, které jsou obvykle v dosud nevytvořených částech. Nastavení této hodnoty na true způsobí, že mapy mohou vést k dříve objeveným strukturám. Pokud tuto hodnotu nezměníte na `true`, může se stát, že se server při generování nových map pokladů zasekne nebo spadne. `Villager-trade` je určen pro mapy, se kterými obchodují vesničané, a loot-tables se týká všeho, co dynamicky generuje kořist, jako jsou truhly s poklady, truhly v dungeonech atd.

#### tick-rates.grass-spread

`Dobrá výchozí hodnota: 4`

Doba v tikách mezi tím, co se server pokusí rozšířit trávu nebo mycelium. To způsobí, že velkým plochám hlíny bude trvat o něco déle, než se změní na trávu nebo mycelium. Nastavení této hodnoty na přibližně `4` by mělo fungovat dobře, pokud ji chcete snížit, aniž by byla snížená rychlost šíření patrná.

#### tick-rates.container-update

`Dobrá počáteční hodnota: 1`

Doba v tikách mezi aktualizacemi kontejneru. Zvýšení této hodnoty může pomoci, pokud vám aktualizace kontejnerů způsobují problémy (stává se to zřídka), ale usnadňuje hráčům zažít desynchronizaci při interakci s inventářem (předměty duchů).

#### non-player-arrow-despawn-rate

`Dobrá počáteční hodnota: 20`

Doba v tikách, po které by měly šípy vystřelené moby zmizet poté, co něco zasáhnou. Hráči je stejně nemohou sebrat, takže to můžete rovnou nastavit na něco jako `20` (1 sekunda).

#### creative-arrow-despawn-rate

`Dobrá počáteční hodnota: 20`

Doba v tikách, po které by měly šípy vystřelené hráči v kreativním režimu zmizet poté, co něco zasáhnou. Hráči je stejně nemohou sebrat, takže můžete nastavit hodnotu jako `20` (1 sekunda).

### [pufferfish.yml]

#### disable-method-profiler

`Dobrá počáteční hodnota: true`

Tato volba zakáže některé dodatečné profilování prováděné hrou. Toto profilování není pro produkční provoz nutné a může způsobovat další zpoždění.

### [purpur.yml]

#### dolphin.disable-treasure-searching

`Dobrá počáteční hodnota: true`

Zabraňuje delfínům provádět vyhledávání struktur podobné mapám pokladů.

#### teleport-if-outside-border

`Dobrá počáteční hodnota: true`

Umožňuje teleportovat hráče na místo zrodu světa, pokud se náhodou nachází mimo hranice světa. Užitečné, protože vanilkovou hranici světa lze obejít a poškození, které způsobuje hráči, lze zmírnit.

---

## Pomocníci

### [konfigurace paper-world]

#### anti-xray.enabled

`Dobrá počáteční hodnota: true`

Zapnutím této funkce skryjete rudy před rentgenovými paprsky. Podrobnou konfiguraci této funkce naleznete v [Konfigurace Anti-Xray](https://docs.papermc.io/paper/anti-xray). Povolením této funkce se ve skutečnosti sníží výkon, je však mnohem účinnější než jakýkoli plugin anti-xray. Ve většině případů bude dopad na výkon zanedbatelný.

#### nether-ceiling-void-damage-height

`Dobrá počáteční hodnota: 127`

Pokud je tato volba větší než `0`, budou hráči nad nastavenou úrovní y poškozeni, jako by se nacházeli v prázdnotě. To zabrání hráčům používat síťovou střechu. Vanilkový nether je vysoký 128 bloků, takže byste pravděpodobně měli nastavit hodnotu `127`. Pokud výšku netheru nějakým způsobem upravíte, měli byste ji nastavit na `[vaše_výška_netheru] - 1`.

---

# Spouštěcí Java flagy
[Software Vanilla Minecraft a Minecraft server ve verzi 1.20 vyžaduje Javu 17 nebo vyšší](https://docs.papermc.io/java-install-update). Společnost Oracle změnila licencování a již neexistuje pádný důvod, proč si pořizovat Javu právě od ní. Doporučenými dodavateli jsou [Adoptium](https://adoptium.net/) a [Amazon Corretto](https://aws.amazon.com/corretto/). Alternativní implementace JVM, jako je OpenJ9 nebo GraalVM, mohou fungovat, nejsou však podporovány společností Paper a je známo, že způsobují problémy, proto se v současné době nedoporučují.

Váš garbage collector lze nakonfigurovat tak, aby se snížily výkyvy zpoždění způsobené velkými úlohami garbage collectoru. Příznaky spouštění optimalizované pro servery Minecraft najdete [zde](https://docs.papermc.io/paper/aikars-flags) [`SOG`]. Mějte na paměti, že toto doporučení nebude fungovat na alternativních implementacích JVM.
Pro získání správných spouštěcích příznaků pro váš server doporučujeme použít generátor spouštěcích příznaků [flags.sh](https://flags.sh/).

Kromě toho může přidání beta příznaku `--add-modules=jdk.incubator.vector` před `-jar` ve spouštěcích příznacích zlepšit výkon. Tento příznak umožňuje programu Pufferfish používat instrukce SIMD na vašem procesoru, což urychluje některé matematické operace. V současné době se používá pouze ke zrychlení vykreslování v mapách herních pluginů (jako jsou imageonmaps), a to možná až osmkrát.

# "Příliš dobré na to, aby to byla pravda" pluginy

## Pluginy odstraňující pozemní předměty
Naprosto zbytečné, protože je lze nahradit [merge-radius](#merge-radius) a [alt-item-despawn-rate](#alt-item-despawn-rate) a upřímně řečeno, jsou méně konfigurovatelné než základní konfigurace serveru. Mají tendenci spotřebovávat více prostředků při skenování a odstraňování položek než při neodstraňování položek vůbec.

## Pluginy Mob stacker
Je opravdu těžké ospravedlnit jeho používání. Stackování přirozeně spawnovaných entit způsobuje větší lag než jejich nestackování vůbec kvůli tomu, že se server neustále snaží spawnovat další moby. Jediný "přijatelný" případ použití je pro spawnery na serverech s velkým množstvím spawnerů.

## Pluginy povolující/zakazující jiné pluginy
Cokoli, co za běhu povoluje nebo zakazuje pluginy, je extrémně nebezpečné. Takové načtení pluginu může způsobit fatální chyby se sledováním dat a zakázání pluginu může vést k chybám kvůli odstranění závislosti. Příkaz `/reload` trpí přesně stejnými problémy a více se o nich můžete dočíst v příspěvku na blogu [me4502](https://madelinemiller.dev/blog/problem-with-reload/).

# Co se zpožďuje? - měření výkonu

## mspt
Paper nabízí příkaz `/mspt`, který vám sdělí, kolik času serveru trvalo vypočítat poslední tiky. Pokud je první a druhá hodnota, kterou vidíte, nižší než 50, pak vám gratulujeme! Váš server není zpožděný! Pokud je třetí hodnota vyšší než 50, pak to znamená, že alespoň 1 tik trval déle. To je zcela normální a čas od času se to stává, takže nepanikařte.

## Spark
[Spark](https://spark.lucko.me/) je plugin, který umožňuje profilovat využití procesoru a paměti vašeho serveru. O tom, jak jej používat, si můžete přečíst [na jeho wiki](https://spark.lucko.me/docs/). K dispozici je také návod, jak zjistit příčinu prudkých nárůstů zpoždění [zde](https://spark.lucko.me/docs/guides/Finding-lag-spikes).

## Timings
Způsob, jak zjistit, co se může dít, když váš server lagoval, jsou Timings. Timings je nástroj, který vám umožní přesně zjistit, které úlohy trvají nejdéle. Je to nejzákladnější nástroj pro řešení problémů, a pokud požádáte o pomoc ohledně lagování, budete s největší pravděpodobností požádáni o Timings. Je známo, že Timings má vážný dopad na výkon serverů, doporučuje se používat plugin Spark místo Timings a pomocí Purpuru nebo Pufferfish Timings zcela zakázat.

Chcete-li získat Timings svého serveru, stačí spustit příkaz `/timings paste` a kliknout na odkaz, který se vám zobrazí. Tento odkaz můžete sdílet s dalšími lidmi, aby vám pomohli. Pokud nevíte, co děláte, můžete se také snadno splést. Existuje podrobný [videonávod od Aikara](https://www.youtube.com/watch?v=T4J0A9l7bfQ), jak je přečíst.

[`SOG`]: https://www.spigotmc.org/threads/guide-server-optimization%E2%9A%A1.283181/
[server.properties]: https://minecraft.fandom.com/wiki/Server.properties
[bukkit.yml]: https://bukkit.fandom.com/wiki/Bukkit.yml
[spigot.yml]: https://www.spigotmc.org/wiki/spigot-configuration/
[konfigurace paper-global]: https://docs.papermc.io/paper/reference/global-configuration
[konfigurace paper-world]: https://docs.papermc.io/paper/reference/world-configuration
[purpur.yml]: https://purpurmc.org/docs/Configuration/
[pufferfish.yml]: https://docs.pufferfish.host/setup/pufferfish-fork-configuration/
[Petal]: https://github.com/Bloom-host/Petal
