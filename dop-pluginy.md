---
title: Doporučené pluginy
description: Seznam doporučených pluginů pro každý server
published: true
date: 2025-12-21T21:21:32.207Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:12.329Z
---

# Doporučené pluginy

Níže najdete seznam nejpoužívanějších a nejkvalitnějších **zdarma dostupných pluginů**, které najdou uplatnění téměř na každém serveru. V mnoha případech jsou dokonce lepší než jejich placené alternativy. Pokud je dostupný vývojový (dev) build, odkaz vede právě na něj, protože pro verzi 1.21 je často nutné používat nejnovější sestavení.

<h2>🔧 Hlavní pluginy (Core)</h2>

Tyto pluginy tvoří "mozek" serveru a jsou vyžadovány většinou ostatních pluginů.

* **[Vault](https://www.spigotmc.org/resources/vault.34315/)** – Absolutní nutnost. Slouží jako propojovací API pro ekonomiku, chat a oprávnění.
* **[ProtocolLib](https://ci.dmulloy2.net/job/ProtocolLib/lastSuccessfulBuild/)** – Knihovna pro manipulaci s packety. Vyžadována mnoha pluginy (např. Citizens, textury, anticheaty).
* **[PlaceholderAPI (PAPI)](https://www.spigotmc.org/resources/placeholderapi.6245/)** – Umožňuje používat tisíce proměnných (placeholderů) v chatu, tablistu, scoreboardu a menu (např. `%player_name%`, `%server_tps%`).
* **[LuckPerms](https://luckperms.net/download)** – Nejlepší plugin pro správu práv (permissions). Má skvělý webový editor.
* **[Spark](https://spark.lucko.me/download)** – Profiler pro diagnostiku lagu. Ukáže vám přesně, co zpomaluje server (CPU/RAM).
* **[EssentialsX](https://essentialsx.net/downloads.html)** – Základní sada příkazů (`/home`, `/spawn`, `/tpa`, `/warp`). Doporučujeme stáhnout i doplňky jako **EssentialsChat** (formátování chatu) a **EssentialsSpawn**.

<h2>🌲 Survival a Svět</h2>

Pluginy pro správu mapy, ochranu a stavění.

* **[Chunky](https://modrinth.com/plugin/chunky)** – **Kriticky důležitý plugin.** Slouží k předgenerování světa, aby se server nelagoval, když hráči chodí do nových chunků.
* **[ChunkyBorder](https://modrinth.com/plugin/chunkyborder)** – Doplněk pro Chunky. Nastaví pevnou hranici světa (World Border), za kterou se hráči nedostanou.
* **[CoreProtect](https://modrinth.com/plugin/coreprotect)** – Nejlepší nástroj pro logování bloků. Umožňuje zjistit, kdo vykradl truhlu nebo rozkopal dům, a jedním příkazem to vrátit zpět (`/co rollback`).
* **[WorldEdit](https://dev.bukkit.org/projects/worldedit)** / **[FastAsyncWorldEdit (FAWE)](https://modrinth.com/plugin/fastasyncworldedit)** – Pro hromadné úpravy terénu. FAWE je výrazně rychlejší a šetrnější k paměti, což se u velkých serverů hodí.
* **[WorldGuard](https://dev.bukkit.org/projects/worldguard)** – Ochrana spawnu a jiných oblastí. Umožňuje zakázat PvP, ničení bloků atd. v definovaných regionech.
* **[GriefPrevention](https://modrinth.com/plugin/griefprevention)** – "Zlatá lopata". Umožňuje hráčům snadno si zabrat pozemek (claim) pomocí nástroje. Alternativou je **Residence** nebo placený **Lands**.

<h2>🛡️ Administrace a Bezpečnost</h2>

* **[GrimAC](https://modrinth.com/plugin/grimac)** – Momentálně nejlepší free Anticheat pro verze 1.20+. Detekuje killaury, fly, speed a další hacky s minimem falešných detekcí.
* **[LibertyBans](https://modrinth.com/plugin/libertybans)** – Moderní trestací systém (bany, mutes, history). Skvělá alternativa k placenému LiteBans.
* **[TAB](https://github.com/NEZNAMY/TAB)** – Český plugin, který je světovou špičkou. Kompletně upravuje Tablist, jména nad hlavou a Scoreboard.
* **[Maintenance](https://modrinth.com/plugin/maintenance)** – Umožňuje zapnout profesionální režim údržby s vlastním MOTD, odpočtem a ikonou.
* **[DiscordSRV](https://modrinth.com/plugin/discordsrv)** – Propojí herní chat s Discord kanálem a umožňuje konzoli přes Discord.

<h2>🎮 Hratelnost a RPG</h2>

* **[DecentHolograms](https://modrinth.com/plugin/decentholograms)** – Tvorba vznášejících se textů (hologramů). Náhrada za zastaralé HolographicDisplays.
* **[CrazyCrates](https://modrinth.com/plugin/crazycrates)** – Systém beden s odměnami (lootboxy) za klíče.
* **[AuraSkills](https://modrinth.com/plugin/auraskills)** – Moderní náhrada za McMMO. Přidává do hry skilly (těžba, boj, farmářství) a staty (síla, zdraví, mana). Má krásné GUI.
* **[DeluxeMenus](https://modrinth.com/plugin/deluxemenus)** – Tvorba vlastních GUI menu (warp menu, kit menu, shop).

<h2>🌐 Ostatní užitečné nástroje</h2>

* **[NuVotifier](https://github.com/NuVotifier/NuVotifier/releases)** – Propojení serveru s hlasovacími stránkami (Czech-Craft atd.).
* **[SuperbVote](http://spigotmc.org/resources/superbvote.11626/history)** – Pokročilá správa odměn za hlasování.
* **[ViaVersion](https://modrinth.com/plugin/viaversion)** – Umožní připojení hráčů s novějším klientem na starší server.
* **[ViaBackwards](https://modrinth.com/plugin/viabackwards)** – Umožní připojení hráčů se starším klientem na novější server.
* **[Squaremap](https://modrinth.com/plugin/squaremap)** / **[Pl3xMap](https://modrinth.com/plugin/pl3xmap)** – Moderní a extrémně rychlá webová mapa. Je mnohem šetrnější k výkonu serveru než klasická **Dynmap**.
* **[Multiverse-Core](https://modrinth.com/plugin/multiverse-core)** – Umožňuje mít více světů na jednom serveru (např. Survival + těžební svět).
* **[VoidGen](https://modrinth.com/plugin/voidgen)** – Generátor prázdných světů (vhodné pro Skyblock, Lobby nebo Creative).