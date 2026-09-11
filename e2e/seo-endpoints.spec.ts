import { test, expect } from '@playwright/test';

// These static outputs aren't part of the page screenshot, so a build/config
// regression (e.g. from the @astrojs/sitemap integration, or the custom
// llms.txt API route) could break them without moving a single pixel on the
// homepage. Plain HTTP checks against the built output, no browser needed.

test.describe('static SEO endpoints', () => {
  test('sitemap index is served and points at sitemap-0.xml', async ({ request }) => {
    const res = await request.get('/sitemap-index.xml');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('xml');

    const body = await res.text();
    expect(body).toContain('<sitemapindex');
    expect(body).toContain('https://lambdasoftware.be/sitemap-0.xml');
  });

  test('sitemap page list includes the homepage', async ({ request }) => {
    const res = await request.get('/sitemap-0.xml');
    expect(res.status()).toBe(200);

    const body = await res.text();
    expect(body).toContain('<urlset');
    expect(body).toContain('https://lambdasoftware.be/');
  });

  test('robots.txt allows crawling and references the sitemap', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);

    const body = await res.text();
    expect(body).toContain('Allow: /');
    expect(body).toContain('Sitemap: https://lambdasoftware.be/sitemap-index.xml');
  });

  test('llms.txt is served with the expected summary content', async ({ request }) => {
    const res = await request.get('/llms.txt');
    expect(res.status()).toBe(200);

    const body = await res.text();
    expect(body).toContain('# Lambda Software');
    expect(body).toContain('hello@lambdasoftware.be');
    expect(body).toContain('## Services');
  });
});
