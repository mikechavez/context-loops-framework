import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    react(),
    starlight({
      title: 'Context Loops',
      description: 'Your AI forgets everything between conversations. Context Loops gives it persistent memory — three files and a simple loop that keep every session informed, whether you use Claude, ChatGPT, Cursor, or any other AI tool.',
      social: {
        github: 'https://github.com/mikechavez/context-loops-framework',
      },
      customCss: ['./src/styles/custom.css'],
      components: {
        Head: './src/components/Head.astro',
      },
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: '',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap',
          },
        },
      ],
      sidebar: [
        {
          label: 'Context Loops',
          items: [
            { label: 'Overview', slug: '' },
            { label: 'Quick Start', slug: 'quick-start' },
          ],
        },
        {
          label: 'Context Engineering',
          items: [
            { label: 'The Problem', slug: 'context-engineering/the-problem' },
            { label: 'Why AI Workflows Break', slug: 'context-engineering/why-ai-workflows-break' },
            { label: 'Design Philosophy', slug: 'context-engineering/design-philosophy' },
            { label: 'Tickets', slug: 'context-engineering/tickets' },
            { label: 'Sessions', slug: 'context-engineering/sessions' },
            { label: 'Sprints', slug: 'context-engineering/sprints' },
            { label: 'ADRs', slug: 'context-engineering/adrs' },
            { label: 'Model Selection', slug: 'context-engineering/model-selection' },
            { label: 'Real Examples', slug: 'context-engineering/real-examples' },
          ],
        },
      ],
    }),
  ],
});
