---
title: Proxy Servery
description: Typy proxy serverů
published: true
date: 2023-11-25T20:49:59.744Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:24.266Z
---

# Co je to proxy?

Proxy server umožňuje propojení ostatních serverů dohromady, což je velice důležité pro každého, kdo chce mít více různých serverů dohromady. Žádný větší server se bez proxy v dnešní době neobejde. Dělat servery typu, kde je na jediném spigot serveru hromada “jiných herních serverů” není vůbec moudré, ať už z technické stránky a i z pohledu hráčů.  
  
Naštěstí máme hromadu možných druhů proxy serverů, které můžeme využít, níže jsou vypsané všechny nejvíce využívané.

-   [Bungeecord](https://ci.md-5.net/job/BungeeCord/lastSuccessfulBuild/)
-   [Waterfall](https://papermc.io/downloads/waterfall)
-   [Flamecord](https://builtbybit.com/resources/13492/)
-   [Velocity](https://papermc.io/downloads/velocity)

Samozřejmě existují i jiné proxy, avšak většinou není moc dobrý nápad je používat (např Aegis). Co se týče výše uvedených, doporučujeme používat Velocity, jelikož je víceméně ve všem lepší než ostatní proxy. Jediná nevýhoda Velocity je ta, že má menší podporu ze strany proxy pluginů, jelikož jako jediná není forkem Bungeecordu.  
 

## Jak nastavit jednotlivé proxy servery?

Nastavení proxy serverů je většinou velice jednoduché, avšak se trochu u každého typu liší, což si níže rozebereme. Zároveň doporučujeme používat pro proxy port 25565, jelikož se jedná o základní minecraft port, který je celkem důležitý používat hlavně v moment, kdy plánujete podporu pro Bedrock edici hry. Jestli nemůžete daný port použít, nezoufejte, použití jiného portu ničemu neškodí. Co se týče ostatních portů, je dobré přiřadit proxy serveru alespoň 5 dalších, pro případné pluginy, které je mohou využívat.

  
 Co se týká výkonu, proxy servery nejsou moc náročné, ve většině případů vám bude bohatě stačit 512-1024MB RAM, jestli chcete ale jít na jistotu, je dobré zvolit rovnou 2GB RAM, v případě používání Pterodactyl panelu 3GB. Využítí CPU také není ve většině případů velké, u většiny CPU vám bude stačit přiřadit 100% jádra. Co se SSD týče, také není většinou třeba mít velké množství místa, jelikož velikost uložených souborů málokdy přesáhne 1GB místa.

### Velocity

Jak již bylo zmíněno výše, Velocity je nejvíce výkoný proxy server. Bez problému zvládne udržet okolo 800 hráčů online s limitem na 2048MB RAM. Velocity má přímou podporu pro Paper, Sponge, Fabric a Forge a to pro verze 1.7.2 až 1.20, avšak od verze 1.13+  můžete používat *Velocity Modern Forwarding*, což silně doporučujeme. Tato vychytávka vám umožní bezpečně propojit servery bez nutnosti používaní dalších pluginů, jako je např BungeeGuard. (Návod k pluginu BungeeGuard najdete níže u zabezpečení Bungeecord proxy serveru)  
  
Instalace je velice jednoduchá! Jako první si stáhneme nejnovější verzi, kterou nalezneme [zde](https://papermc.io/downloads#Velocity). Následně stažený soubor nahrajeme do prázdné složky našeho serveru. Dále se ujistíme, že používáme verzi Javy 11 nebo vyšší. V moment, kdy máme obě tyto věci, můžeme server poprvé zapnout, tím si vygenerujeme soubor **velocity.toml**, což je hlavní konfigurační soubor. Přesuneme se tedy do něj a můžeme se vrhnout na nastavení serverů.  
 

```toml
[servers]
limbo = "93.121.1.12:50166"
lobby1 = "neco.hostify.cz:30067"
lobby2 = "batcore.eu:30681"
survival = "pearhost.cz:30681"
try = [
  "lobby1"
]
```

Zde nám pouze stačí uvést IP adresy všech našich serverů a to pomocí jejich základních tvarů. Následně do kolonky try uvedeme server, na který má být hráč poprvé připojen. Jméno serveru zde musí být stejné, jako to, které je uvedené u jeho IP. V moment, kdy máme více lobby serverů, tak je můžeme také uvést, stačí je rozdělit čárkou. Následně na každém uvedeném serveru nastavíme v souboru server.properties online-mode na false.

```toml
online-mode=false
```

Zároveň si ověříme, že v souboru **spigot.yml** na každém serveru je nastavený Bungeecord na false.

```toml
bungeecord: false
```

Následně se přesuneme zpět do **velocity.toml,** kde si upravíme další hodnoty, podle toho, jak nám vyhovují. Všechny možnosti jsou vysvětlené níže. U položky **forwarding-secret** doporučujeme vytvořit náhodný kód, který bude mít alespoň 30 znaků.  **Pozor!** U nových verzí Velocity forwarding-secret již není v cofigu, ale má vlastní soubor. V základu se jedná o **forwarding.secret**. Jestli daný soubor nemůžete otevřít, pak stačí změnit koncovku na .txt a následně do souboru vepsat secret.
 

```toml
# Tuto hodnotu nechte stejnou
config-version = "2.5"

# Zde nastavíme port, který používá naše proxy. V základu se jedná o 25577.
bind = "0.0.0.0:25577"

# Zde si můžeme nastavit MOTD serveru (je to možné udělat později i pomocí pluginů).
motd = "&3A Velocity Server"

# Zde se jedná pouze o číslo, které se zobrazí u maximálního počtu hráčů, toto číslo ale nic
# neznamená, jelikož se podle něj Velocity neřídí.
show-max-players = 500

# Zde si vybereme, zda chceme povolit připojení i warez hráčů, false = warez hráči se mohou připojit.
online-mode = true

#Toto ponechme zapnuté
force-key-authentication = true

#Základní ochrana před připojení přes proxy nebo VPN
prevent-client-proxy-connections = false

# Zde máme možnost nastavení typu posílání dat na další servery, na výběr máme 3 možnosti:
# - "none":   Nebudou posílána žádná data, nedopučujeme používat.
# - "legacy": Totu možnost používat pouze v případě, že máte podporu pro 1.12 verze a níž. 
# - "modern": Nejlepší možnost posílání dat, dostupná od verzích 1.13+.
player-info-forwarding-mode = "NONE"

# Jestli používáte modern typ, tak do nastaveného souboru nějaký kód, nejlépe alespoň 50 znaků dlouhý.
forwarding-secret-file = "forwarding.secret"
# Oznámení, zda server podporuje Forge.
announce-forge = false
```

Zbytek configu můžete nechat ve stavu, v jakém byl při vytvoření. Jestli vás ale i tak zajímají všechny ostatní funkce, tak se [zde](https://docs.papermc.io/velocity/configuration) můžete podívat na jejich důkladné vysvětlení.

K zprovoznění Velocity nám stačí již poslední věc a tou je editace souboru **/config/paper-global.yml** na každém serveru z configu.  
 

```yml
  velocity-support:
    # Zde musíme dát true. 
    enabled: true
    # Zde změníme online-mode na stejnou hodnotu, jako je ta v našem velocity.toml configu.
    online-mode: true
    # Zde uvedeme stejný kód, který jsme vytvořili v velocity.toml configu nebo v forwarding.secret.
    secret: VHhPRwmT8znzHo73L8yNeixavyNfAqw7Puv9RUpthk8nsciPb9 # !TENTO KÓD NEPOUŽÍVEJTE!
```

  
Pro správné používání Velocity doporučujeme používat následující java flagy, jedná se o 2048MB RAM. Při používání Pterodactyl panelu je třeba přidat serveru 1 GB extra RAM.   
 

```java
java -Xms2048M -Xmx2048M -XX:+UseG1GC -XX:G1HeapRegionSize=4M -XX:+UnlockExperimentalVMOptions 
-XX:+ParallelRefProcEnabled -XX:MaxInlineLevel=15 -jar velocity.jar
```

### Bungeecord

Bungeecord je základní a nejvíce používaný proxy server. Jeho používání moc nedoporučujeme, je totiž lepší si vybrat jeden z jeho forků. Proxy nastavení je avšak stejné, tudíž není třeba dělat rozdílné návody pro každý fork. Instalace je zároveň mnohem jednodušší než u Velocity.  
  
Jako první se ujistíme, že používání Javu 8 nebo novější verzi. Následně si stáhneme nejnovější verzi Bungeecordu z odkazu [zde](https://ci.md-5.net/job/BungeeCord/). Tento soubor nahrajeme do prázdné hlavní složky serveru, ten následně zapneme. Tímto krokem se nám vytvoří soubor **config.yml**. Server následně vypneme, editování souborů při zapnutém Bungeecordu nemá smysl, nic se z nich totiž neuloží. Následně do složky **modules** nahrajeme všechny ostatní soubory mimo bungeecord.jar, které stáhneme z odkazu, kde jsme stahovali samotný Bungeecord.

Následně otevřeme daný soubor config.yml a zaměřímě se na část serverů. Zde si přidáme všechny naše servery, které chceme mít napojené  
 

```yml
servers:
  lobby:
    motd: '&1Just another BungeeCord - Forced Host'
    address: 28.23.23.42:25565
    restricted: false
  survival:
    motd: '&1Just another BungeeCord - Forced Host'
    address: cow.hostify.cz:25565
    restricted: false    
```

Položka *restricted* značí, zda hráč může na server bez permisse. Doporučujeme to tedy zapnout pouze pro servery, kam hráči nemají mít přístup, např tedy Build či Test server.  
Následně si dáme položku IP\_forward na true. Díky této položce se hráči budou muset připojit na IP Bungeecordu, jinak by se mohli připojit přímo na IP serverů, což by znamenalo velký bezpečnostní problém.  
 

```yml
ip_forward: true
```

Následně v položce priorities uvedeme hlavní server, kam se mají hráči připojovat jako první.  
 

```yml
priorities:
- lobby
```

Jako poslední věc odebereme vše z položky groups.

```yml
groups: {}
```

Hlavní položky v Bungeecord configu máme nyní nastavené, jestli vás zajímají i ostatní položky, můžete si o nich přečíst více informací [zde](https://www.spigotmc.org/wiki/bungeecord-installation/).  
  
Jako úplně poslední věc nám stačí v souboru **spigot.yml** u každého serveru povolit Bungeecord.  
 

```yml
bungeecord: true
```

A následně v souboru **server.properties** vypnout online-mode.  
 

```properties
online-mode=false
```

Nyní máme vše potřebné nastavené, pro extra zabezpečení serveru ale **doporučujeme používat plugin BungeeGuard.**   
 

#### BungeeGuard

Nastavení tohoto pluginu je velice jednoduché. Stačí si plugin stáhnout ze [Spigotu](https://www.spigotmc.org/resources/bungeeguard.79601/). Následně ho nahrát na každý server a všechny servery restartovat.   
Poté se nám vytvoří složka BungeeGuard, v ní bude soubor **token.yml.** Zde nám stačí si vymyslet nový token, nejlépe alespoň 30 náhodných znaků. (Prosím nekopírujte níže uvedený příklad, vytvořte si vlastní token a ten nikomu nikdy nesdělujte)  
 

```yml
token: Xk8tcPafv6w9WwopHYeMVYCYzWLAKQqKomtNiDWV6MtMdW8ZbA # !TENTO KÓD NEPOUŽÍVEJTE!
```

Tento proces následně zopakujeme na každém serveru, včetně proxy, s tím, že všude bude uvedený stejný token.

#### Firewall

Jestliže máte vlastní VPS/Dedik můžete zabezpečení zvýšit použitím firewallu. Stačí povolit port proxy do veřejné sítě, ostatní porty MC serveru mohou být uzamknuté. Pokud používate Pterodactyl, doporučujeme kouknout na [tento](https://pterodactyl.io/community/games/minecraft.html) návod, kde je podrobně vysvětelno, jak FW správně nastavit. 
> Pozor, při nastavování firewallu nezapomeňte nechat povolené všechny potřebné porty. (SSH, Weby,...)
{.is-warning}
