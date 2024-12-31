---
title: Dynmapa
description: Nastavení dynamické mapy
published: true
date: 2023-11-25T10:36:24.406Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:13.523Z
---

# Dynmapa
Dynmapa je dynamická mapa, která vám dokáže prostřednictvím webu ukázat živý náhled světa a pohyb hráčů po světě. Pojďme si ukázat jak Dynmapu nastavit na váš server.


## Stažení
První stáhneme pluginy z [SpigotMC](https://www.spigotmc.org/resources/dynmap%C2%AE.274/).
Stažený plugin nahrajeme do složky **plugins** na našem serveru a server restartujeme.

## Nastavení
Otevřeme si config dynmapy, který nalezneme v **plugins -> dynmap -> configuration.txt**
Jako první krok nastvíme správný typ úložiště kam se budou data ukládat. Doporučujeme použití typu SQLite, proto před **řádek 30** umístíme `#` ,následně před **řádkem 32 a 33** `#` odebereme.

```
storage:
  # Filetree storage (standard tree of image files for maps)
  #type: filetree
  # SQLite db for map storage (uses dbfile as storage location)
  #type: sqlite
  #dbfile: dynmap.db
	# MySQL DB for map storage 
  #type: mysql
```

Na **řádku 16** můžeme nastavit kvalitu mapy. Doporučujeme použít kvalitu `vlowres`, která vám nebude zabírat tolik místa na disku. Jestliže máte vyhrazený velký prostor pro dynmapu, když můžete hodnotu `hires` ponechat.

`vlowres` - zabíráné nejmnéně místa
`lowres` - zabírá přibližně 4x více než vlowres
`hires` - zabírá přibližně 16x více než lowres

```
deftemplatesuffix: vlowres
```

Dalším krokem bude nastavení portu. Nastavení portu se nachazí na **řádku 349**, kde nastavíme jeden z volných portů, který je přidělený vašemu serveru. Pokud nemáte žádný volný port, budete muset požádat váš hosting o přidělení.

```
# The TCP-port the webserver will listen on.
webserver-port: 8123
```

Pokud vše máme, config uložíme a server opět restartujeme. Web dynmapy nalezneme na ip vašeho serveru s nastaveným portem, například `786.235.980:<port>` nebo `node.superhosting.cz:<port>`.

Pokud máte zájem vidět celý svět v nějakém rádiusu, musíte svět první předgenerovat pomocí tohoto [návodu](/cs/predgenerace-sveta). Až budeme mít svět předgenerovaný, napíšeme příkaz `/dynmap fullrender`, což nám vygeneruje celou dynmapu.

Jestliže preferujete video tutorial, stačí se podívat [sem](https://youtu.be/so-kKy1pI-Q).

> Pokud máte jakékoliv dotazy nebo problémy s nastavením dynmapy, stačí nás kontaktovat na našem [discordu](https://discord.minecraftnavody.eu/).



