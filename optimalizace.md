---
title: Optimalizace
description: Průvodce optimalizací serveru Minecraft
published: true
date: 2025-12-21T21:48:17.093Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:20.591Z
---

# Průvodce optimalizací Minecraft serveru

**Poznámka pro uživatele Vanilla/Fabric/Spigot:** Otevřete soubor `server.properties` a změňte hodnotu `sync-chunk-writes` na `false`. Tato volba je v Paperu a jeho forcích nastavena automaticky, ale u jiných implementací ji musíte nastavit ručně. Umožní to serveru ukládat chunky mimo hlavní vlákno, čímž se sníží zátěž hlavní smyčky.

Tento průvodce je určen primárně pro verzi **1.21.x**. Většina informací je platná i pro starší verze (1.18+), ale názvy souborů se mohou lišit.

Založeno na [této příručce](https://github.com/YouHaveTrouble/minecraft-optimization) a aktuálních datech z komunity.

## Úvod

Nikdy nebude existovat jeden univerzální návod, který přinese perfektní výsledky pro všechny. Každý server má jiné potřeby (Survival vs. Skyblock vs. Minihry) a jiné hardwarové limity. Ladění možností pro konkrétní potřeby vašeho serveru je klíčem.

## Příprava

### Server Software (JAR)

Volba softwaru má obrovský vliv na výkon i dostupné API.

**Doporučené možnosti:**

* **[Paper](https://papermc.io/downloads)** – Zlatý standard. Zaměřený na výkon a opravy herních mechanik.
* **[Pufferfish](https://pufferfish.host/downloads)** – Fork Paperu, který přináší ještě agresivnější optimalizace. Skvělý pro větší servery.
* **[Purpur](https://purpurmc.org/downloads)** – Fork Pufferfish/Paperu s důrazem na herní možnosti a konfigurovatelnost.

**Čemu se vyhnout:**

* **Spigot / CraftBukkit** – Zastaralé, neefektivní.
* **Vanilla** – Nezvládne více než pár hráčů.
* **"Async" forky** – Placené JARy slibující "všechno asynchronně" jsou často podvody nebo extrémně nestabilní.
* **PlugMan** a podobné pluginy pro "reload" pluginů za běhu.

### Předgenerování mapy

Předgenerování mapy je dnes kriticky důležité, protože generace světa v 1.21 (nové jeskyně, výška světa) je extrémně náročná na CPU.
Použijte plugin **[Chunky](https://modrinth.com/plugin/chunky)** a nezapomeňte nastavit **WorldBorder**.

> **Tip:** Nezapomeňte nastavit hranice i pro Nether a End! Nether je 8× menší než Overworld. Pokud nastavíte Overworld na 10 000, Nether nastavte na 1 250 (pokud nepoužíváte datapack na změnu souřadnic).
> {.is-tip}

---

## Konfigurace

Zde projdeme nejdůležitější soubory. Pamatujte, že Paper od verze 1.19 dělí konfiguraci na `config/paper-global.yml` a `config/paper-world-defaults.yml`.

### 1. server.properties

#### `network-compression-threshold`

**Doporučeno: 256**
Nastavuje velikost paketu, od které se začne komprimovat.

* Pokud máte server za BungeeCordem/Velocity na stejném stroji, zvažte `-1` (vypnuto), ušetříte CPU.
* Pro veřejné servery nechte `256`.

#### `simulation-distance`

**Doporučeno: 4**
Určuje vzdálenost v chuncích, kde server "počítá fyziku" (růst obilí, pece, mobové). Toto je **nejdůležitější nastavení pro výkon**.

* Hodnota `3` nebo `4` je ideální pro většinu serverů.
* Díky `view-distance` mohou hráči vidět dál, než kam sahá simulace.

#### `view-distance`

**Doporučeno: 7-10**
Jak daleko hráči vidí. Tuto hodnotu nastavte vyšší než `simulation-distance`. Paper efektivně posílá chunky bez toho, aby je tickoval.

### 2. spigot.yml

#### `mob-spawn-range`

**Doporučeno: 3** (Pokud používáte simulation-distance 4)
Snižuje okruh, kde se spawnuje hmyz a monstra. Musí být menší nebo rovno `simulation-distance`. Snížení této hodnoty výrazně pomáhá s výkonem AI.

#### `entity-activation-range`

**Doporučeno:**

```yaml
      animals: 16
      monsters: 24
      raiders: 48
      misc: 8
      tick-inactive-villagers: false
      ignore-spectators: true

```

Mobové mimo tuto vzdálenost nebudou mít aktivní AI (nebudou se hýbat).

* **Varování:** `tick-inactive-villagers: false` může rozbít železné farmy nebo doplňování obchodů vesničanů. Pokud s tím máte problém, vraťte na `true`.

#### `merge-radius`

**Doporučeno:** `item: 3.5`, `exp: 4.0`
Spojuje itemy na zemi do jednoho stacku. Snižuje počet entit, které musí server počítat.

### 3. config/paper-world-defaults.yml

*(Dříve paper.yml)*

#### `delay-chunk-unloads-by`

**Doporučeno: 10s**
Zabraňuje tomu, aby se chunk okamžitě odnačetl, když hráč udělá krok tam a zpět. Šetří disk a CPU.

#### `max-entity-collisions`

**Doporučeno: 2**
Kolik entit se může "strkat" najednou. Hodnota `2` stačí pro většinu farem. Zabraňuje lagům při přemnožení mobů na jednom bloku.

#### `despawn-ranges`

**Doporučeno (Soft / Hard):**

* **Monster:** 32 / 96
* **Ostatní:** 32 / 96
Mobové, kteří jsou dále než `Hard` limit, zmizí okamžitě. Mobové mezi `Soft` a `Hard` mají šanci zmizet.
* Hard limit by měl být mírně větší než `simulation-distance` * 16.

#### `per-player-mob-spawns`

**Doporučeno: true**
Zajišťuje spravedlivé rozdělení mobů mezi hráče. Zabrání tomu, aby jeden hráč u mob farmy vyčerpal celý limit serveru a ostatní neměli nic.

#### `redstone-implementation`

**Doporučeno: ALTERNATE_CURRENT**
Mnohem efektivnější algoritmus pro redstone. Snižuje lagy z velkých obvodů až o 80 %.

#### `anti-xray`

**Doporučeno: true (engine-mode: 2)**
Zabudovaná ochrana proti X-Ray. Mírně zvyšuje zátěž CPU, ale je efektivnější než externí pluginy. `engine-mode: 2` nahrazuje rudy za náhodné bloky (falešné rudy), což je nejbezpečnější.

#### `hopper.disable-move-event`

**Doporučeno: false**
Vypíná event `InventoryMoveItemEvent`. Pokud nemáte plugin na ochranu (LWC, Lockette) nebo třídění, který tento event potřebuje, můžete dát `true` pro masivní zrychlení hopperů. Většina serverů ale potřebuje `false`.

#### `optimize-explosions`

**Doporučeno: true**
Rychlejší výpočet TNT. Mírně mění chování (odstřelí bloky trochu jinak), ale ušetří server před pádem při velkých explozích.

#### `treasure-maps.enabled`

**Doporučeno: false**
Hledání pokladů (mapy k vrakům/pokladům) je hlavním důvodem zamrznutí serveru při generaci světa. Pokud nemáte svět 100% předgenerovaný, vypněte to.

### 4. purpur.yml

*(Pouze pokud používáte Purpur)*

#### `use-alternate-keepalive`

**Doporučeno: true**
Pomáhá hráčům se špatným internetem, aby nebyli vyhazováni ze serveru ("Timed out").

#### `zombie.aggressive-towards-villager-when-lagging`

**Doporučeno: false**
Pokud TPS klesne, zombíci přestanou hledat vesničany.

#### `villager.lobotomize.enabled`

**Doporučeno: true**
Vesničané, kteří nemohou najít cestu nebo jsou zavření v 1x1 prostoru, ztratí AI a přestanou zatěžovat server.

---

## Správa entit a Mob Limity

V souboru `bukkit.yml` nastavte limity. Tyto hodnoty se s Paperem (`per-player-mob-spawns: true`) počítají **na hráče**.

**Doporučené `spawn-limits`:**

```yaml
monsters: 20  # Stačí pro přirozený pocit
animals: 5
water-animals: 2
water-ambient: 2
ambient: 1

```

**Doporučené `ticks-per`:**

```yaml
monster-spawns: 10
animal-spawns: 400
water-spawns: 400

```

Zvyšte intervaly spawnování. Server se nemusí snažit spawnovat olihně každý tick.

---

## Java Flagy a Verze

**⚠️ Důležité:** Minecraft 1.21 vyžaduje **Java 21**.

Nepoužívejte výchozí parametry. Používejte **Aikar's Flags**, které jsou průmyslovým standardem pro optimalizaci Garbage Collectoru (G1GC).

**Doporučené spouštěcí parametry (pro 6-10 GB RAM):**

```bash
java -Xms8G -Xmx8G -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -jar server.jar --nogui

```

*(Upravte Xms a Xmx podle vaší RAM. Vždy nastavte obě hodnoty stejně!)*

Pro vygenerování přesných flagů pro váš server použijte stránku: **[flags.sh](https://flags.sh)**

---

## Měření výkonu (Co dělat, když to laguje?)

Nehádejte. Měřte.

### 1. `/mspt`

Příkaz Paperu. Ukáže průměrnou délku ticku.

* Pod 50ms = ✅ OK (20 TPS)
* Nad 50ms = ⚠️ Lagy (TPS klesá)

### 2. Spark

[Spark](https://modrinth.com/plugin/spark) je nejlepší nástroj na analýzu. Je součástí Purpuru, na Paperu ho musíte doinstalovat.
Napište `/spark profiler start`, nechte běžet cca 5 minut při lagách a pak `/spark profiler stop`. Dostanete odkaz, kde přesně uvidíte, který plugin nebo entita žere výkon.

### 3. Timings

Starý příkaz `/timings paste` je v nových verzích Paperu nahrazen Sparkem, ale stále může fungovat. Spark je však mnohem přesnější.

---

## Nebezpečné "optimalizace"

🚫 **Pluginy na mazání itemů (ClearLag)**
Zbytečné. Většinou způsobí více lagů skenováním světa, než kolik ušetří smazáním itemů. Použijte raději nastavení `alt-item-despawn-rate` v configu Paperu (např. cobblestone zmizí po 30s).

🚫 **Reload (`/reload` nebo PlugMan)**
Nikdy nepoužívejte `/reload` na produkčním serveru. Rozbíjí to pluginy, způsobuje memory leaky a chyby v datech. Vždy server restartujte.