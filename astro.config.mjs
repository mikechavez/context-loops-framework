import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    react(),
    starlight({
      title: 'Context Loops',
      description: 'A file-based sprint system for working with AI agents without losing context.',
      social: {
        github: 'https://github.com/mikechavez/context-loops',
      },
      customCss: ['./src/styles/custom.css'],
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
          ],
        },
        {
          label: 'First Session',
          items: [
            { label: 'Run Your First Session', slug: 'first-session' },
          ],
        },
        {
          label: 'Go Deeper',
          items: [
            { label: 'The Problem', slug: 'go-deeper/the-problem' },
            { label: 'Tickets', slug: 'go-deeper/tickets' },
            { label: 'Sessions', slug: 'go-deeper/sessions' },
            { label: 'Sprints', slug: 'go-deeper/sprints' },
            { label: 'ADRs', slug: 'go-deeper/adrs' },
            { label: 'Model Selection', slug: 'go-deeper/model-selection' },
            { label: 'Real Examples', slug: 'go-deeper/real-examples' },
          ],
        },
      ],
    }),
  ],
});
