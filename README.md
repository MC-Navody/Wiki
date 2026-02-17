# MN Wiki - Minecraft Návody

![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg?style=for-the-badge)
![Starlight](https://img.shields.io/badge/Docs-Starlight-F54927?style=for-the-badge)

Toto je komplexní znalostní báze zaměřená na tvorbu, správu a optimalizaci Minecraft serverů. Wiki je postavena na
frameworku [Starlight](https://starlight.astro.build).

## Jak spustit projekt lokálně

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

## Struktura projektu

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

## Jak přispět?

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

## Licence

Tento projekt je licencován pod licencí [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](LICENSE).

Znamená to, že můžete obsah sdílet a upravovat, ale musíte uvést původního autora, nesmíte jej využít komerčně a musíte zachovat stejnou licenci.
