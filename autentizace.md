---
title: Autentizace
description: Nastavení autentizačního pluginu
published: true
date: 2026-02-04T20:24:19.925Z
tags: velocity, waterfall, paper
editor: markdown
dateCreated: 2023-11-24T23:42:09.884Z
---

# Autentizace

Plugin na autentizaci je nedílnou součástí "offline mode" serveru, neboli serveru, který je přístupný i pro warez hráče.
Možná si říkáte, že na serveru se zapnutým whitelistem není toto potřeba řešit, ale plugin na autentizaci je nutné mít na serveru i když máme zapnutý whitelist. Bez autentizačního pluginu by si bylo možné nastavit nick hráče pomocí warez klientu, který je na whitelistu, a připojit se za něj. 
Pojďme si ukázat, jak plugin na autentizaci správně nastavit pomocí moderního pluginu **LibreLogin**.

### Instalace a nastavení pluginu

<details>

<summary><b>🚀 Velocity/BungeeCord (Doporučeno)</b></summary>

Toto je nejlepší způsob zabezpečení sítě. Autentizace probíhá přímo na proxy, takže se neověřený hráč nikdy nedostane na backend servery.

Stáhneme si plugin z [Modrinthu](https://modrinth.com/plugin/libre-login) a přesuneme ho do složky `plugins`. Následně restartujeme proxy. Ve složce plugins se vytvoří složka `LibreLogin`.

V ní otevřeme soubor `config.conf` a začneme s konfigurací:

Najdeme sekci `limbo`. Zde definujeme server, na kterém se hráč nachází **před** přihlášením.

**Je nutné, abychom měli vyhrazený server pro přihlašování!**
**TIP:** *Doporučujeme použít odlehčenou verzi serveru jako např. [NanoLimbo](https://github.com/Nan1t/NanoLimbo/releases), který prakticky nežere žádnou RAM.*

Pokud máme ve `velocity.toml` zaregistrovaný server s názvem `auth`, upravíme sekci takto:

```yaml
# Servery, na které jsou hráči posláni, když nejsou ověřeni.
limbo=[
    auth
]

```

Pokračujeme dál a najdeme sekci `pass-through`. Zde definujeme, kam má být hráč poslán **po** úspěšném přihlášení.

**Tento server nesmí být stejný jako server pro přihlašování!**

Pokud chceme, aby hráči po přihlášení byli posláni na server `lobby`, tak tuto sekci upravíme takto:

```yaml
# Sem vložte název vašeho hlavního serveru (Lobby).
pass-through {
    root=[
        lobby
    ]
}

```

Pokračujeme dále na [nastavení databáze](#nastavení-databáze).

</details>

<details>

<summary><b>📜 Paper (Single server)</b></summary>

*Tuto možnost zvolte pouze v případě, že nemáte Proxy (Velocity/Bungee) a provozujete jen jeden samostatný server.*

#### Vytvoření přihlašovacího světu

Stáhneme si plugin [MultiVerse Core](https://github.com/Multiverse/Multiverse-Core/releases) a přesuneme ho do složky plugins.

Zapneme server a vytvoříme si nový svět, kde se budou hráči přihlašovat (aby nemohli vykrádat věci v hlavním světě před loginem).
Příklad vytvoření světa s názvem `auth`:

```text
/mv create auth normal

```

Svět si upravíme podle gusta (vypnout spawnování mobů atd.). Hráči se spawnou na spawnu světa.

**TIP:** *Spawn světa můžeme nastavit pomocí příkazu `/setworldspawn*`

#### Instalace a konfigurace pluginu

Stáhneme si plugin z [Modrinthu](https://modrinth.com/plugin/libre-login/) a přesuneme ho do složky plugins. Následně restartujeme server. Ve složce plugins se vytvoří složka `LibreLogin`.

V ní otevřeme soubor `config.conf`:

Najdeme sekci `limbo`. Zde definujeme **svět**, ve kterém se hráči budou přihlašovat.
Pokud jsme vytvořili svět `auth`:

```yaml
limbo=[
    auth
]

```

Pokračujeme dál a najdeme sekci `pass-through`. Zde definujeme **svět**, do kterého se hráči portnou po úspěšném přihlášení (např. `world` nebo `survival`).

**Tento svět nesmí být stejný jako svět pro přihlašování!**

```yaml
pass-through {
    root=[
        world
    ]
}

```

Pokud bychom chtěli, aby se hráči po přihlášení objevili na stejném místě, jako ze kterého se odpojili (vhodné pro Survival), tak najdeme možnost:

```yaml
# Máme si pamatovat poslední lokaci hráče?
remember-last-server=true

```

Pokračujeme dále na [nastavení databáze](#nastavení-databáze).

</details>

### Nastavení databáze

Máme na výběr ze dvou možností:

<details>

<summary><b>📁 SQLite (Pro malé servery)</b></summary>

Pokud zvolíme tuto možnost, tak se data hráčů budou ukládat do souboru `user-data.db` ve složce pluginu.
Jelikož je toto defaultní možnost, nemusíme nic nastavovat.

Pokud jste předtím používali AuthMe, tak je nutné přesunout data, pokračujme dále na [přesun dat](#přesun-dat-z-authme).

</details>

<details>

<summary><b>📁 MySQL / MariaDB (Doporučeno)</b></summary>

Pokud zvolíme tuto možnost, tak se data hráčů budou ukládat do externí MySQL databáze. To je bezpečnější a rychlejší pro větší sítě.

Najdeme sekci `database` a vyplníme ji:

```yaml
database {
  properties {
    mysql {
      # Název databáze.
      database = librelogin
      # IP databázového serveru.
      host = "localhost"
      # Heslo k databázi.
      password = "mojeheslo"
      # Port databázového serveru.
      port = 3306
      # Uživatel databáze.
      user = "root"
      
      # Maximální doba životnosti připojení (neměnit, pokud nevíte co děláte)
      max-life-time = 600000
    }
  }
}

```

</details>

### Přesun dat z AuthMe

V této sekci si ukážeme, jak přesunout data z SQLite AuthMe databáze do LibreLogin databáze.

*Poznámka: Před migrací si vždy zálohujte soubory obou pluginů!*

1. Přesuneme soubor `authme.db` ze složky AuthMe do složky pluginu LibreLogin.
2. Otevřeme config LibreLoginu a najdeme sekci `migration`.

```yaml
# Nastavení migrace z jiných pluginů
migration {
    old-database {
        # Pokud jste měli AuthMe na MySQL, vyplňte sekci mysql výše.
        # Pokud jste měli AuthMe na SQLite (soubor), vyplňte sekci níže:
        sqlite {
            # Název souboru, který jsme přesunuli do složky LibreLogin
            path="authme.db"
        }
    }
    
    # DŮLEŽITÉ: Změňte na true pro spuštění migrace při startu
    on-next-startup=true
    
    # Typ migrace. Pro AuthMe SQLite zvolte:
    type=authme-sqlite
}

```

3. Zapneme server. V konzoli uvidíme průběh migrace.
4. Až se server zapne a migrace dokončí, server vypneme a vrátíme `on-next-startup` na `false`.

### Dodatečné nastavení

Doporučujeme projít si všechny možnosti v konfiguraci, zde si ukážeme pár užitečných možností.

#### Automatická registrace hráčů se zakoupeným Minecraftem (Premium AutoLogin)

Tato funkce je klíčová pro pohodlí hráčů. Pokud má hráč zakoupený Minecraft, nebude muset zadávat heslo (přihlásí se automaticky).

```yaml
# Máme automaticky registrovat/přihlašovat hráče s originálkou?
auto-register=true

```

**Upozornění:** Pokud toto zapnete, hráči s warez klientem se nebudou moci připojit za jméno, které vlastní někdo se zakoupeným Minecraftem (což je správně z hlediska bezpečnosti).

#### Čas na přihlášení

Pokud chceme omezit dobu, kterou má hráč na zadání hesla (aby neblokoval slot):

```yaml
# Čas v sekundách. -1 pro vypnutí limitu.
seconds-to-authorize=60

```

> Nevíte si s něčím rady? Připojte se na náš [Discord server](https://discord.mcnavody.eu/).
> {.is-success}