---
title: Proxy Návody
description: 
published: false
date: 2023-11-25T21:10:15.655Z
tags: 
editor: markdown
dateCreated: 2023-11-25T21:10:14.868Z
---

# Proxy Návody
V tomto článku se dočtete ohledně různých užitečných návodů ohledně nastavení proxy serverů.

## Synchronizace Příkazů
Synchronizace příkazů je velice užitečná věc, která se hodí například u premium plateb. Ve zkratce se jedná o to, že příkaz použitý na serveru A se projeví na serveru B. Tím pádem jdou z proxy používat příkazy na backend serverech. Synchronizovat příkazy je možné i bez proxy, ale v tomto článku se zaměříme na variantu s proxy.

1) Stáhneme si plugin CommandSync [odkaz](https://www.spigotmc.org/resources/commandsync.52093/). Ten následně nahrajeme na všechny servery, kde chceme synchronizovat příkazy (včetně proxy).
2) Všechny servery následně restartujeme a přesuneme se do configů pluginů.
3) V configu proxy pluginu nastavíme IP serveru