import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightDocSearch from '@astrojs/starlight-docsearch';
import starlightLinksValidator from 'starlight-links-validator';
import mermaid from 'astro-mermaid';

export default defineConfig({
    site: 'https://mcnavody.eu',
    redirects: {
        '/cs/home': '/',
        '/cs/herni-servery': '/nastaveni/herni-servery',
        '/cs/proxy': '/nastaveni/proxy',
        '/cs/optimalizace': '/nastaveni/optimalizace',
        '/cs/java-flagy': '/nastaveni/java-flagy',
        '/cs/updatovani': '/nastaveni/updatovani',
        '/cs/java-verze': '/nastaveni/java-verze',
        '/cs/ikona': '/nastaveni/ikona',
        '/cs/bedrock': '/nastaveni/bedrock',
        '/cs/autentizace': '/pluginy/autentizace',
        '/cs/vlastni-svet': '/pluginy/vlastni-svet',
        '/cs/dop-pluginy': '/pluginy/dop-pluginy',
        '/cs/premium-pluginy': '/pluginy/premium-pluginy',
        '/cs/skiny': '/pluginy/skiny',
        '/cs/predgenerace-sveta': '/pluginy/predgenerace-sveta',
        '/cs/dynmapa': '/pluginy/dynmapa',
        '/cs/voice-chat': '/pluginy/voice-chat',
        '/cs/[...slug]': '/[...slug]',
    },
    integrations: [
        mermaid({
            theme: 'forest',
            autoTheme: true
        }),

        starlight({
            favicon: '/favicon.png',
            title: 'MC Návody',
            logo: {
                src: './src/assets/logo-maly.avif',
            },
            components: {
                Footer: './src/components/CustomFooter.astro',
            },

            head: [
                {
                    tag: 'meta',
                    attrs: {
                        name: 'theme-color',
                        content: '#2ecc71',
                    },
                },
            ],

            locales: {
                root: {
                    label: 'Čeština',
                    lang: 'cs',
                },
            },

            editLink: {
                baseUrl: 'https://github.com/MC-Navody/Wiki/edit/main/',
                label: 'Upravit tuto stránku',
            },
            lastUpdated: true,

            plugins: [
                starlightDocSearch({
                    appId: 'VN4YC1YU0P',
                    apiKey: 'cb8d2704568851ce8ca465f55a589207',
                    indexName: 'mcnavody',
                }),
                starlightLinksValidator(),
            ],

            customCss: [
                '@fontsource/plus-jakarta-sans/400.css',
                '@fontsource/plus-jakarta-sans/600.css',
                '@fontsource/plus-jakarta-sans/700.css',
                '@fontsource/jetbrains-mono/400.css',
                './src/styles/custom.css',
            ],
            social: [
                {
                    icon: 'document',
                    label: 'Pastebin',
                    href: 'https://log.mcnavody.eu/',
                },
                {
                    icon: 'discord',
                    label: 'Discord',
                    href: 'https://discord.mcnavody.eu/',
                },
                {
                    icon: 'heart',
                    label: 'KoFi',
                    href: 'https://ko-fi.com/mcnavody',
                },
            ],

            sidebar: [
                {
                    label: 'Úvod',
                    link: '/uvod/',
                },
                {
                    label: 'Hlavní nastavení serverů',
                    autogenerate: {directory: 'nastaveni'},
                },
                {
                    label: 'Pluginy',
                    autogenerate: {directory: 'pluginy'},
                },
                {
                    label: 'Správa serverů',
                    autogenerate: {directory: 'sprava'},
                }
            ],
        }),

    ],
});