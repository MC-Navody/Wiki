---
title: Předgenerace světa
description: Předgenerování světa pomocí pluginu Chunky
published: true
date: 2025-12-21T21:32:32.594Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:21.896Z
---

# Předgenerace světa

Předgenerování světa je jedním z **nejdůležitějších kroků** při zakládání nového serveru. Hlavním důvodem je zvýšení stability. Pokud svět není předgenerovaný, server musí při pohybu hráčů náročně vypočítávat nové chunky, což způsobuje masivní lagy (pokles TPS), zejména když hráči létají s Elytrou.
Pokud máte svět předgenerovaný, server pouze načítá hotová data z disku, což je mnohem rychlejší. Dalším důvodem je **Dynmapa/Squaremap**, která nemůže zobrazit mapu, dokud není vygenerovaná.

## Stažení

Jako první krok stáhneme plugin **Chunky**.

* [Stáhnout z Modrinth](https://modrinth.com/plugin/chunky) (Doporučeno)
* [Stáhnout ze Spigotu](https://www.spigotmc.org/resources/chunky.81534/)

Doporučujeme stáhnout i doplněk **[ChunkyBorder](https://modrinth.com/plugin/chunkyborder)**, který zajistí, že hráči nebudou moci chodit za hranice vygenerovaného světa.

Pluginy nahrajeme do složky `plugins` a server restartujeme.

## Generace

Generace je velmi jednoduchá. Příkazy zadáváme ideálně do **konzole serveru** (aby se proces nepřerušil, kdyby vás to vykoplo ze hry).

1. **Výběr světa:**

```bash
chunky world world

```

*(Místo "world" doplňte název vašeho světa, pokud je jiný).*

2. **Nastavení středu:**

```bash
chunky center 0 0

```

3. **Nastavení rádiusu (poloměru):**

```bash
chunky radius 5000

```

*Tento příkaz nastaví, kolik bloků na každou stranu od středu se má vygenerovat. Rádius 5000 znamená mapu o velikosti 10 000 × 10 000 bloků.*

4. **Spuštění:**

```bash
chunky start

```

### Doporučené hodnoty a velikost

Na verzi 1.21 jsou světy datově náročnější kvůli větší výšce světa. Mějte na paměti, že předgenerovaná mapa zabírá místo na disku (SSD).

* **Rádius 5000** (~10GB) – Ideální pro menší Survival servery.
* **Rádius 10000** (~40GB) – Pro střední servery.
* **Rádius 20000** (~160GB) – Pouze pro velké projekty s velkým diskem.

Pro Nether a End obvykle stačí menší rádius (např. 3000 až 5000).

> **Důležité: Hranice světa (World Border)**
> Samotná předgenerace nezabrání hráčům jít dál. Musíte nastavit neviditelnou zeď.
> Pokud máte plugin **ChunkyBorder**, použijte příkaz:
> `chunkyborder set world 5000` (číslo musí odpovídat rádiusu).
> Pokud plugin nemáte, použijte vanilla příkaz:
> `/worldborder set 10000` (pozor, vanilla bere průměr, takže 2× rádius).
> {.is-warning}

### Průběh a přerušení

Svět se bude generovat několik hodin (záleží na výkonu CPU). Procesor pojede na 100 % a TPS serveru klesnou (často i pod 10). **To je naprosto normální.** Během generace na server nic nestavějte a ideálně tam ani nehrajte.

Pokud by server spadl nebo jste ho museli vypnout, po zapnutí stačí napsat:

```bash
chunky continue

```

V tomto návodu jsou ukázané základní funkce. Veškeré pokročilé funkce (jako ořezávání světa nebo různé tvary) naleznete na [wiki](https://github.com/pop4959/Chunky/wiki) pluginu.

Pokud preferujete video návod, můžete se podívat [sem](https://youtu.be/pqaisjCl0GY).