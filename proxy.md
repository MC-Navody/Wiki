---
title: Proxy Servery
description: Typy proxy serverů
published: true
date: 2025-12-21T20:47:08.663Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:24.266Z
---

Zde je aktualizovaný návod pro proxy servery. Provedl jsem změny nezbytné pro fungování na verzi **1.21.1** (zejména verze Javy a konfigurace Paperu, která se v nových verzích změnila).

---

# Co je to proxy?

Proxy server umožňuje propojení ostatních serverů dohromady, což je velice důležité pro každého, kdo chce mít více různých serverů dohromady. Žádný větší server se bez proxy v dnešní době neobejde. Dělat servery typu, kde je na jediném spigot serveru hromada “jiných herních serverů” není vůbec moudré, ať už z technické stránky a i z pohledu hráčů.  
  
Naštěstí máme hromadu možných druhů proxy serverů, které můžeme využít, níže jsou vypsané všechny nejvíce využívané.

-   [Velocity](https://papermc.io/downloads/velocity) (Doporučeno)
-   [Bungeecord](https://ci.md-5.net/job/BungeeCord/lastSuccessfulBuild/)
-   ~~Waterfall~~ (Projekt byl ukončen, nepoužívat)
-   ~~Flamecord~~ (Nedoporučujeme, zastaralé)

Samozřejmě existují i jiné proxy (např. Aegis), avšak většinou není moc dobrý nápad je používat, pokud přesně nevíte, co děláte. Co se týče výše uvedených, **doporučujeme používat výhradně Velocity**, jelikož je víceméně ve všem lepší než ostatní proxy, je moderní a bezpečnější. Jediná nevýhoda Velocity je ta, že má menší podporu ze strany starších proxy pluginů, jelikož jako jediná není forkem Bungeecordu, ale většina důležitých pluginů již má svou Velocity verzi.

## Jak nastavit jednotlivé proxy servery?

Nastavení proxy serverů je většinou velice jednoduché, avšak se trochu u každého typu liší, což si níže rozebereme. Zároveň doporučujeme používat pro proxy port **25565**, jelikož se jedná o základní minecraft port, který je celkem důležitý používat hlavně v moment, kdy plánujete podporu pro Bedrock edici hry (Geyser). Jestli nemůžete daný port použít, nezoufejte, použití jiného portu ničemu neškodí (hráči ale budou muset zadávat IP včetně portu). Co se týče ostatních portů, je dobré přiřadit proxy serveru alespoň 5 dalších, pro případné pluginy, které je mohou využívat (např. Votifier).

  
 Co se týká výkonu, proxy servery nejsou moc náročné, ve většině případů vám bude bohatě stačit 512-1024MB RAM. Jestli chcete ale jít na jistotu u sítě s více hráči, je dobré zvolit rovnou 2GB RAM (v případě používání Pterodactyl panelu raději 3GB kvůli overheadu Javy). Využití CPU také není ve většině případů velké. Co se SSD týče, také není většinou třeba mít velké množství místa, jelikož velikost uložených souborů málokdy přesáhne 1GB místa.

### Velocity

Jak již bylo zmíněno výše, Velocity je nejvíce výkonný proxy server. Bez problému zvládne udržet stovky hráčů online s limitem na 2048MB RAM. Velocity má přímou podporu pro Paper, Sponge, Fabric a Forge a to pro verze 1.7.2 až 1.21.1. Od verze 1.13+  můžete používat *Velocity Modern Forwarding*, což silně doporučujeme. Tato vychytávka vám umožní bezpečně propojit servery bez nutnosti používaní dalších pluginů, jako je např BungeeGuard.
  
Instalace je velice jednoduchá! Jako první si stáhneme nejnovější verzi, kterou nalezneme [zde](https://papermc.io/downloads/velocity). Následně stažený soubor nahrajeme do prázdné složky našeho serveru. **Důležité:** Ujistěte se, že používáme **Javu 21** (pro nejnovější verze Velocity je to nutnost). V moment, kdy máme obě tyto věci, můžeme server poprvé zapnout, tím si vygenerujeme soubor **velocity.toml**, což je hlavní konfigurační soubor. Přesuneme se tedy do něj a můžeme se vrhnout na nastavení serverů.  
 

```toml
[servers]
limbo = "93.121.1.12:50166"
lobby1 = "neco.hostify.cz:30067"
survival = "pearhost.cz:30681"
try = [
  "lobby1"
]

```

Zde nám pouze stačí uvést IP adresy všech našich serverů a to pomocí jejich základních tvarů (IP:PORT). Následně do kolonky `try` uvedeme server, na který má být hráč poprvé připojen (auth nebo lobby). Jméno serveru zde musí být stejné, jako to, které je uvedené u jeho IP. V moment, kdy máme více lobby serverů, tak je můžeme také uvést, stačí je rozdělit čárkou.

**Důležité:** Následně na každém herním serveru (Survival, Lobby...) nastavíme v souboru `server.properties`:

```properties
online-mode=false

```

Zároveň si ověříme, že v souboru **spigot.yml** na každém herním serveru je nastavený Bungeecord na false (protože používáme moderní Velocity forwarding, nikoliv starý Bungee protokol).

```yaml
settings:
  bungeecord: false

```

Následně se přesuneme zpět do **velocity.toml** na proxy, kde si upravíme další hodnoty. Všechny možnosti jsou vysvětlené níže. U nových verzí Velocity se `forwarding-secret` nenachází v configu, ale má vlastní soubor **forwarding.secret**. Pokud soubor neexistuje, vytvořte ho a vložte do něj náhodný řetězec znaků.
 

```toml
# Tuto hodnotu nechte stejnou
config-version = "2.7" # Verze se může lišit dle verze Velocity

# Zde nastavíme port, který používá naše proxy. V základu se jedná o 25577 (doporučujeme změnit na 25565).
bind = "0.0.0.0:25577"

# Zde si můžeme nastavit MOTD serveru (je to možné udělat později i pomocí pluginů jako MiniMOTD).
motd = "<#09add3>A Velocity Server"

# Zde se jedná pouze o číslo, které se zobrazí u maximálního počtu hráčů.
show-max-players = 500

# Zde si vybereme, zda chceme povolit připojení i warez hráčů.
# true = pouze origo, false = i warez (pro warez je třeba auth plugin na lobby).
online-mode = true

# Toto ponechme zapnuté
force-key-authentication = true

# Základní ochrana před připojením přes proxy nebo VPN
prevent-client-proxy-connections = false

# Zde máme možnost nastavení typu posílání dat na další servery.
# Pro moderní servery (1.13+) VŽDY používejte "modern".
player-info-forwarding-mode = "modern"

# Cesta k souboru s tajným klíčem pro ověření.
forwarding-secret-file = "forwarding.secret"

# Oznámení, zda server podporuje Forge/NeoForge.
announce-forge = false

```

K zprovoznění Velocity nám stačí již poslední věc a tou je editace souboru **/config/paper-global.yml** na každém **herním serveru** (Lobby, Survival...). Pozor, v nových verzích Paperu se struktura configu změnila:
 

```yaml
proxies:
  velocity:
    # Povolení Velocity podpory
    enabled: true
    # Zde změníme online-mode na stejnou hodnotu, jako je ta v našem velocity.toml configu.
    online-mode: true
    # Zde uvedeme stejný kód, který máme v souboru forwarding.secret na proxy.
    secret: VHhPRwmT8znzHo73L8yNeixavyNfAqw7Puv9RUpthk8nsciPb9 # !TENTO KÓD NEPOUŽÍVEJTE!

```

  
Pro správné používání Velocity doporučujeme používat následující java flagy. Je vyžadována **Java 21**.
 

```bash
java -Xms2048M -Xmx2048M -XX:+UseG1GC -XX:G1HeapRegionSize=4M -XX:+UnlockExperimentalVMOptions 
-XX:+ParallelRefProcEnabled -XX:MaxInlineLevel=15 -jar velocity.jar

```

### Bungeecord

Bungeecord je základní proxy server. Jeho používání již **nedoporučujeme** (je zastaralý a méně výkonný než Velocity), ale pokud ho musíte použít, zde je návod.
  
Jako první se ujistíme, že používáme **Javu 21** (pro 1.21 servery). Následně si stáhneme nejnovější verzi Bungeecordu z odkazu [zde](https://ci.md-5.net/job/BungeeCord/). Tento soubor nahrajeme do prázdné hlavní složky serveru a zapneme. Tímto krokem se nám vytvoří soubor **config.yml**. Server následně vypneme.

Následně otevřeme daný soubor config.yml a zaměříme se na část serverů.
 

```yaml
servers:
  lobby:
    motd: '&1Lobby Server'
    address: 127.0.0.1:25566
    restricted: false
  survival:
    motd: '&1Survival Server'
    address: 127.0.0.1:25567
    restricted: false    

```

Následně si dáme položku `ip_forward` na `true`. Díky této položce se hráči budou muset připojit na IP Bungeecordu a budou se přenášet UUID a skiny.
 

```yaml
ip_forward: true

```

Následně v položce `priorities` uvedeme hlavní server (zpravidla lobby).
 

```yaml
priorities:
- lobby

```

Jako poslední věc odebereme vše z položky `groups` (pro bezpečnost).

```yaml
groups: {}

```

 
Jako úplně poslední věc nám stačí v souboru **spigot.yml** u každého herního serveru povolit Bungeecord.  
 

```yaml
settings:
  bungeecord: true

```

A následně v souboru **server.properties** na herních serverech vypnout online-mode.  
 

```properties
online-mode=false

```

Nyní máme vše potřebné nastavené, pro extra zabezpečení serveru ale **doporučujeme používat plugin BungeeGuard** (protože samotný Bungeecord nemá tak pokročilé ověření jako Velocity Modern Forwarding).

#### BungeeGuard

Nastavení tohoto pluginu je velice jednoduché. Stačí si plugin stáhnout ze [Spigotu](https://www.spigotmc.org/resources/bungeeguard.79601/). Následně ho nahrát na každý **herní server** (nikoliv na proxy) a všechny servery restartovat.   
Poté se nám vytvoří složka BungeeGuard, v ní bude soubor **token.yml.** Zde nám stačí si vymyslet nový token. Ten samý token musíme nastavit v configu BungeeGuardu na proxy (pokud existuje podpora) nebo jej používat pro ověření spojení.
 

```yaml
token: Xk8tcPafv6w9WwopHYeMVYCYzWLAKQqKomtNiDWV6MtMdW8ZbA # !TENTO KÓD NEPOUŽÍVEJTE!

```

> **Poznámka:** Pokud používáte Velocity s nastavením `modern` forwarding, BungeeGuard **nepotřebujete**, protože Velocity má tuto ochranu integrovanou (pomocí forwarding secret).

#### Firewall

Jestliže máte vlastní VPS/Dedik, zabezpečení můžete výrazně zvýšit použitím firewallu (IPTables / UFW). Stačí povolit port proxy (např. 25565) do veřejné sítě, a ostatní porty herních serverů (např. 30067, 30681...) uzamknout tak, aby přijímaly spojení pouze z `127.0.0.1` (localhost) nebo z IP adresy vaší proxy.

> Pozor, při nastavování firewallu nezapomeňte nechat povolené všechny potřebné porty pro správu (SSH - port 22, atd.).
> {.is-warning}