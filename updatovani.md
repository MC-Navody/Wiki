---
title: Updatování
description: Updaduj jednoduše svůj server
published: true
date: 2023-11-25T20:48:53.721Z
tags: 
editor: markdown
dateCreated: 2023-11-24T23:42:26.631Z
---

# Updatování serveru a pluginů
V tomto kratším článku si řekneme, jak správně updatovat pluginy a hlavní serverový soubor. Před každým updatem si ovšem udělejte zálohu serveru, nikdy nevíte, co se v novém updatu může pokazit.

<h2>Pluginy</h2>
Updatování pluginů je jednoduché, stačí si ve složce pluginů vytvořit složku *update*. Do této složky pak vždy nahrajeme .jar soubory nových verzí pluginů, při následném restartu serveru se nám všechny pluginy bezpečně updatují. Pro používání této funkce je potřeba používat Paper nebo jeho fork. Další možnost je manuálně nahrát nové .jar soubory pluginů při vypnutém serveru. <br>Nikdy neupdatujte pluginy při zaplém serveru a vždy si dělejte jako první zálohy.

<h2>Server</h2>
Updatování serveru bohužel zatím nemá podobnou možnost, jako je update složka. Nejlehčí způsob je nahrát nový .jar soubor do hlavní složky serveru a následně upravit spouštěcí soubor, aby se po restartování používala již nová verze. Nikdy nemažte serverový soubor za chodu! Chcete-li provést manuální update, vypněte server, smažte starý server.jar a nahrajte nový. <br>Vždy si udělejte jako první zálohu!
<h2>Verze</h2>
Přechod mezi verzemi je stejný, jako předchozí dva kroky dohromady. Jako první stačí vypnout server, smazat starý server.jar a nahrát nový z nové verze. Následně bude třeba projít všechny pluginy a ujistit se, že již podporují novou verzi serveru, jestli tomu tak není, tak se podívejte, zda se nedá stáhnou nová verze pluginů, či jejich dev buildy. Stažené pluginy pak zase stačí nahrát do složky update. Verze se dá změnit pouze na vyšší, není zde žádná cesta zpět (alespoň od verze 1.13+)!<br>Ujistěte se, že jste na přechod připravení, že máte správnou verzi Javy a že vaše důležité pluginy danou verzi podporují, cesta zpět by znamenala hromadu problémů, jako je smazání světů. Před přechodem si vždy udělejte zálohu!

