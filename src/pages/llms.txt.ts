// llms.txt (https://llmstxt.org/) — a plain-text summary for AI crawlers and
// answer engines. Generated from src/data/site.ts at build time so it can
// never drift from the page copy: edit the strings there, rebuild, done.
import type { APIRoute } from 'astro';
import { site } from '../data/site';

export const GET: APIRoute = ({ site: siteUrl }) => {
  const base = (siteUrl ?? new URL('https://lambdasoftware.be')).toString().replace(/\/$/, '');

  const services = site.services.items.map((s) => `- ${s.title}: ${s.body}`).join('\n');
  const stack = site.stack.rows.map((r) => `- ${r.label}: ${r.items.join(', ')}`).join('\n');

  const body = `# Lambda Software

> ${site.meta.description}

## About
- Name: ${site.owner}
- Business: Lambda Software (${site.name}), freelance / sole proprietor
- Location: ${site.contact.location}
- Email: ${site.email}
- LinkedIn: ${site.contact.linkedin}
- VAT: ${site.vatNote}
- Website: ${base}/

## Services
${services}

## Stack
${stack}

## Contact
${site.contact.body}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
