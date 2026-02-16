# MN Wiki - Minecraft Návody

Toto je komplexní znalostní báze zaměřená na tvorbu, správu a optimalizaci Minecraft serverů. Wiki je postavena na
frameworku [Starlight](https://starlight.astro.build).

## 📚 Co zde najdete?

Wiki pokrývá široké spektrum témat pro začátečníky i pokročilé administrátory:

* **Základy serveru**: Výběr správné verze Javy, typy serverového software (Paper, Purpur, atd.) a nastavení ikon.
* **Optimalizace**: Návody na předgenerování světa (Chunky), správné Java flagy a ladění výkonu serveru.
* **Pluginy**: Detailní návody pro LuckPerms, Dynmapu, SkinsRestorer, Simple Voice Chat a další klíčové doplňky.
* **Proxy sítě**: Nastavení Velocity nebo BungeeCord, propojení backend serverů a globální skiny.
* **Bezpečnost**: Autentizace (AuthMe/LibreLogin), zabezpečení proti exploitům a správa oprávnění.

## 🚀 Jak spustit projekt lokálně

Chcete-li si wiki spustit u sebe na počítači pro testování změn, postupujte následovně:

1. **Požadavky**: Ujistěte se, že máte nainstalovaný [Node.js](https://nodejs.org/) (doporučujeme verzi 18+).
2. **Instalace závislostí**:
   Otevřete terminál ve složce projektu a spusťte:
   ```bash
   npm install
   ```
3. **Spuštění vývojového serveru**:
   ```bash
   npm run dev
   ```
   Wiki se spustí na adrese `http://localhost:4321`.

## 🛠️ Struktura projektu

Projekt má následující strukturu:

```
wiki/
├── public/              # Statické soubory (obrázky, favikony)
├── src/
│   ├── assets/          # Obrázky použité v MDX souborech
│   ├── components/      # Vlastní Astro komponenty (např. Footer)
│   ├── content/
│   │   └── docs/        # Zde se nachází veškerý obsah (MDX soubory)
│   └── styles/          # Vlastní CSS styly
├── astro.config.mjs     # Konfigurace Astro a Starlight
└── package.json         # Závislosti projektu
```

## 📝 Jak přispět?

Chcete opravit chybu nebo přidat nový návod?

1. Vytvořte si nový `.mdx` soubor v `src/content/docs/`.
2. Ujistěte se, že používáte správný "frontmatter" (hlavičku souboru):
   ```markdown
   ---
   title: Název návodu
   description: Krátký popisek toho, co návod obsahuje
   ---
   ```
3. Pro formátování využívejte vestavěné komponenty Starlightu, jako jsou `<Steps>`, `<FileTree>`, `<Tabs>` nebo
   `<Aside>`.

## 📄 Licence

Tento projekt je licencován pod licencí [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](LICENSE).
Znamená to, že můžete obsah sdílet a upravovat, ale musíte uvést původního autora, nesmíte jej využít komerčně a musíte zachovat stejnou licenci.
