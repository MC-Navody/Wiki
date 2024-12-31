---
title: Autentizace
description: Nastavení autentizačního pluginu
published: true
date: 2023-11-25T10:31:20.300Z
tags: velocity, waterfall, paper
editor: markdown
dateCreated: 2023-11-24T23:42:09.884Z
---

# Autentizace

Plugin na autentizaci je nedílnou součástí "offline mode" serveru, neboli serveru který je přístupný i pro warez hráče.
Možná si říkáte, že na serveru se zapnutým whitelistem není toto potřeba řešit, ale plugin na autentizaci je nutné mít na serveru i když máme zapnutý whitelist. Bez autentizačního pluginu by si bylo možné nastavit nick hráče pomocí warez clientu, který je na whitelistu a připojit se za něj. 
Pojďme si ukázat, jak plugin na autentizaci správně nastavit.

### Instalace a nastavení pluginu

<details>

<summary><b>🚀 Velocity/BungeeCord/Waterfall</b></summary>

Stáhneme si plugin z [Modrinthu] a přesuneme ho do složky plugins. Následně restartujeme server. Ve složce plugins se vytvoří složka `librelogin`.

V ní otevřeme soubor `config.conf` a začneme s konfigurací:

Najdeme sekci:
```yaml
# The authentication servers/worlds, players should be sent to, when not authenticated. On Paper, players will be spawned on the world spawn. THIS SERVERS MUST BE REGISTERED IN THE PROXY CONFIG. IN CASE OF PAPER, THE WORLDS MUST EXIST.
limbo=[
    limbo0,
    limbo1
]
```

Do této sekce vložíme server, na kterém se hráči budou přihlašovat.

**Je nutné, abychom měli vyhrazený server pro přihlašování!**

**TIP:** *Doporučujeme použít odlehčenou verzi serveru jako např. [NanoLimbo]*

Pokud bychom měli server s jménem `auth`, tak tuto sekci upravíme takto:
```yaml
# The authentication servers/worlds, players should be sent to, when not authenticated. On Paper, players will be spawned on the world spawn. THIS SERVERS MUST BE REGISTERED IN THE PROXY CONFIG. IN CASE OF PAPER, THE WORLDS MUST EXIST.
limbo=[
    auth
]
```

Pokračujeme dál a najdeme sekci:
```yaml
# !!WHEN USING PAPER, PUT ALL WORLDS UNDER "root"!!
# On Paper, players will be spawned on the world spawn.
# 
# The servers/worlds player should be sent to when they are authenticated. THE SERVERS MUST BE REGISTERED IN THE PROXY CONFIG. IN CASE OF PAPER, THE WORLDS MUST EXIST.
# The configuration allows configuring forced hosts; the servers/worlds in "root" are used when players do not connect from a forced host. Use § instead of dots.
# See: https://github.com/kyngs/LibrePremium/wiki/Configuring-Servers
pass-through {
    root=[
        lobby1,
        lobby0
    ]
}
```
Do této sekce vložíme server, na který hráči budou přesměrováni po úspěšném přihlášení.

**Tento server nesmí být stejný jako server pro přihlašování!**

Pokud bychom chtěli aby hráči po přihlášení byli posláni na server `lobby`, tak tuto sekci upravíme takto:
```yaml
# !!WHEN USING PAPER, PUT ALL WORLDS UNDER "root"!!
# On Paper, players will be spawned on the world spawn.
# 
# The servers/worlds player should be sent to when they are authenticated. THE SERVERS MUST BE REGISTERED IN THE PROXY CONFIG. IN CASE OF PAPER, THE WORLDS MUST EXIST.
# The configuration allows configuring forced hosts; the servers/worlds in "root" are used when players do not connect from a forced host. Use § instead of dots.
# See: https://github.com/kyngs/LibrePremium/wiki/Configuring-Servers
pass-through {
    root=[
        lobby
    ]
}
```

Pokračujeme dále na [nastavení databáze](#nastavení-databáze).

</details>

<details>

<summary><b>📜 Paper</b></summary>

#### Vytvoření přihlašovacího světu

Stáhneme si plugin [MultiVerse Core] a přesuneme ho do složky plugins.

Zapneme server a vytvoříme si nový svět kde se budou hráči přihlašovat.
Příklad vytvoření světa s názvem `auth`:

```text
/mv create auth normal
```

Svět si upravíme podle gusta, hráči se spawnou na spawnu světa.

**TIP:** *Spawn světa můžeme nastavit pomocí příkazu `/setworldspawn`*

#### Instalace a konfigurace pluginu

Stáhneme si plugin z [Modrinthu] a přesuneme ho do složky plugins. Následně restartujeme server. Ve složce plugins se vytvoří složka `LibreLogin`.

V ní otevřeme soubor `config.conf` a začneme s konfigurací:

Najdeme sekci:
```yaml
# The authentication servers/worlds, players should be sent to, when not authenticated. On Paper, players will be spawned on the world spawn. THIS SERVERS MUST BE REGISTERED IN THE PROXY CONFIG. IN CASE OF PAPER, THE WORLDS MUST EXIST.
limbo=[
    limbo0,
    limbo1
]
```

Do této sekce vložíme svět, ve kterém se hráči budou přihlašovat.

**Je nutné, abychom měli vyhrazený svět pro přihlašování!**

Pokud bychom chtěli použít svět s názvem `auth` který jsme vytvořili v předchhozím kroku, tak tuto sekci upravíme takto:
```yaml
# The authentication servers/worlds, players should be sent to, when not authenticated. On Paper, players will be spawned on the world spawn. THIS SERVERS MUST BE REGISTERED IN THE PROXY CONFIG. IN CASE OF PAPER, THE WORLDS MUST EXIST.
limbo=[
    auth
]
```

Pokračujeme dál a najdeme sekci:
```yaml
# !!WHEN USING PAPER, PUT ALL WORLDS UNDER "root"!!
# On Paper, players will be spawned on the world spawn.
# 
# The servers/worlds player should be sent to when they are authenticated. THE SERVERS MUST BE REGISTERED IN THE PROXY CONFIG. IN CASE OF PAPER, THE WORLDS MUST EXIST.
# The configuration allows configuring forced hosts; the servers/worlds in "root" are used when players do not connect from a forced host. Use § instead of dots.
# See: https://github.com/kyngs/LibrePremium/wiki/Configuring-Servers
pass-through {
    root=[
        lobby1,
        lobby0
    ]
}
```
Do této sekce vložíme svět, ve kterém se hráči spawnou po úspěšném přihlášení.

**Tento svět nesmí být stejný jako svět pro přihlašování!**

Pokud bychom chtěli aby se hráči po přihlášení spawnuli ve světě `world`, tak tuto sekci upravíme takto:
```yaml
# !!WHEN USING PAPER, PUT ALL WORLDS UNDER "root"!!
# On Paper, players will be spawned on the world spawn.
# 
# The servers/worlds player should be sent to when they are authenticated. THE SERVERS MUST BE REGISTERED IN THE PROXY CONFIG. IN CASE OF PAPER, THE WORLDS MUST EXIST.
# The configuration allows configuring forced hosts; the servers/worlds in "root" are used when players do not connect from a forced host. Use § instead of dots.
# See: https://github.com/kyngs/LibrePremium/wiki/Configuring-Servers
pass-through {
    root=[
        world
    ]
}
```

Pokud bychom chtěli, aby se hráči po přihlášení objevili na stejném místě jako ze kterého se odpojili, tak najdeme možnost:
```yaml
# Should we remember the last server/world a player was on? This is not recommended for large networks.
remember-last-server=false
```

A nastavíme ji na `true`:
```yaml
# Should we remember the last server/world a player was on? This is not recommended for large networks.
remember-last-server=true
```

Pokračujeme dále na [nastavení databáze](#nastavení-databáze).

</details>

### Nastavení databáze
Máme na výběr ze dvou možností:

<details>

<summary><b>📁 SQLite</b></summary>

Pokud zvolíme tuto možnost, tak se data hráčů budou ukládat do souboru `user-data.db` ve složce pluginu.
Jelikož je toto defaultní možnost, nemusíme nic nastavovat.

Pokud jsme předtím používali AuthMe, tak je nutné přesunout data, pokračujme dále na [přesun dat](#přesun-dat-z-authme).

</details>

<details>

<summary><b>📁 MySQL</b></summary>

Pokud zvolíme tuto možnost, tak se data hráčů budou ukládat do externí MySQL databáze.

Najdeme sekci pro nastavení MySQL databáze a vyplníme ji:
```yaml
database {
  properties {
    mysql {
      # Název databáze.
      database = librelogin
      # IP databázového serveru.
      host = localhost
      # Maximální doba životnosti připojení k databázi v milisekundách. Pokud nevíte, co děláte, nedotýkejte se této hodnoty.
      max-life-time = 600000
      # Heslo k databázi.
      password = ""
      # Port databázového serveru.
      port = 3306
      # Uživatel databáze.
      user = root
    }
  }
}
```


</details>

### Přesun dat z AuthMe

V této sekci si ukážeme, jak přesunout data z SQLite AuthMe databáze do LibreLogin databáze.

*Pokud jste používali MySQL databázi pro AuthMe, tak si s pomocí komentářů v konfiguraci určitě poradíte. Pokud ne, navštivte náš Discord*

Přesuneme soubor `authme.db` ze složky AuthMe do složky pluginu LibreLogin.

Najdeme sekci pro nastavení migrace:
```yaml
# This is used for migrating the database from other plugins.
# Please see the wiki for further information: https://github.com/kyngs/LibreLogin/wiki/Database-Migration
migration {
    old-database {
        mysql {
            # The name of the database.
            database=librelogin
            # The host of the database.
            host=localhost
            # The maximum lifetime of a database connection in milliseconds. Don't touch this if you don't know what you're doing.
            max-life-time=600000
            # The password of the database.
            password=""
            # The port of the database.
            port=3306
            # The table of the old database.
            table=user-data
            # The user of the database.
            user=root
        }
        sqlite {
            # Path to SQLite database file. Relative to plugin datafolder.
            path="user-data.db"
        }
    }
    # Migrate the database on the next startup.
    on-next-startup=false
    # The type of the migration. Available Types:
    # jpremium-mysql - Can convert from MySQL JPremium SHA256 and BCrypt
    # authme-mysql - Can convert from MySQL AuthMe BCrypt and SHA256
    # authme-sqlite - Can convert from SQLite AuthMe BCrypt and SHA256
    # aegis-mysql - Can convert from MySQL Aegis BCrypt
    # dba-mysql - Can convert from MySQL DynamicBungeeAuth, which was configured to use SHA-512
    # librelogin-mysql - Can convert from MySQL LibreLogin, useful for migrating to a different database
    # librelogin-sqlite - Can convert from SQLite LibreLogin, useful for migrating to a different database
    type=authme-sqlite
}
```

V sekci `old-database` najdeme sekci `sqlite` ve které nastavíme `path` na `authme.db`.

V sekci `migration` nastavíme `on-next-startup` na `true`.

Zapneme server a počkáme, než se server zapne. Je pravděpodobné, že zapínání potrvá déle, kvůli přesunu dat. Poté server vypneme a nastavíme `on-next-startup` na `false`.

Pokud jsme vše správně nastavili, tak se data z AuthMe přesunuly do LibreLogin databáze. Pokud jste narazili na problém, navštivte náš Discord.

### Dodatečné nastavení

Doporučujeme projít si všechny možnosti v konfiguraci, zde si ukážeme pár užitečných možností.

#### Automatická registrace premium hráčů
Pokud bychom chtěli, aby hráči se zakoupeným Minecraftem byli automaticky zaregistrováni, povolíme možnost:
```yaml
# Should we automatically register all players with a premium nickname?
# !!CRACKED PLAYERS WILL NOT BE ABLE TO REGISTER PREMIUM USERNAMES!!
auto-register=true
```
**Mějte ale na vědomí, že hráči s cracknutým Minecraftem se nebudou moci připojit s premium jménem.**

#### Nastavení doby pro přihlášení
Pokud chceme omezit dobu pro přihlášení hráče, nastavíme možnost:
```yaml
# Sets the login/register time limit in seconds. Set to negative to disable.
seconds-to-authorize=-1
```

> Nevíte si s něčím rady? Připojte se na náš [Discord server](https://discord.mcnavody.eu/).
{.is-success}


[Modrinthu]: https://modrinth.com/plugin/libre-login/

[NanoLimbo]: https://www.spigotmc.org/resources/nanolimbo-1-7-1-19.86198/

[MultiVerse Core]: https://ci.onarandombox.com/job/Multiverse-Core/
