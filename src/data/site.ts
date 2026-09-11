// ─────────────────────────────────────────────────────────────────────────────
// All page copy lives here. Edit the strings, rebuild, done.
// Voice follows the Lambda Software Design System: engineer to engineer,
// state the mechanism then the benefit, no hype adjectives.
// Lines marked  // EDIT  are placeholders. Replace with real detail.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: 'lambda_software',
  owner: 'Thijs Dickmans',
  email: 'hello@lambdasoftware.be',
  vatNote: 'BE0793.141.482',

  meta: {
    title: 'Lambda Software | Thijs Dickmans, freelance software developer',
    description:
      'Thijs Dickmans, freelance fullstack software developer. .NET, TypeScript and SQL Server. Available for project work and for joining existing teams.',
    ogImage: '/og.png', // 1200x630, generated from the brand system — see public/og.png
  },

  hero: {
    eyebrow: 'Freelance software developer · Belgium',
    title: 'Fullstack software, from schema to deploy.',
    body:
      "I'm Thijs Dickmans. Lambda Software is the name I work under. Mainly .NET on the backend, TypeScript on the front, SQL Server underneath.",
  },

  services: {
    heading: 'What I do',
    lede:
      'One engagement model: I take responsibility for the part of the system you hand me, and hand it back working.',
    items: [
      {
        title: 'Custom web applications',
        body:
          'Line-of-business applications built from the database up, the kind that carry a real process and have to keep working for years.',
      },
      {
        title: 'Backend & API development',
        body:
          'Domain logic, data access and HTTP APIs in .NET. Versioned contracts and tested paths, so the clients that consume them are not surprised.',
      },
      {
        title: 'Frontend development',
        body:
          'Typed, component-based interfaces that match the design rather than approximate it, and stay quick on the devices your users actually have.',
      },
      {
        title: 'Cloud & DevOps',
        body:
          'Containerised deploys, environments that resemble each other, and a pipeline that builds, tests and ships on every push.',
      },
      {
        title: 'Legacy modernisation',
        body:
          'Older systems moved forward in steps that keep the business running: framework upgrades, extraction, and a rewrite only where a rewrite is genuinely cheaper.',
      },
      {
        title: 'Integrations',
        body:
          'Getting two systems to agree: ERP, accounting, payment and third-party APIs, with the retries and reconciliation the happy path forgets.',
      },
    ],
  },

  stack: {
    heading: 'The stack',
    lede: 'What I reach for by default. I work in other stacks when a project already lives there.',
    rows: [
      { label: 'backend', items: ['.NET Framework', '.NET Core', 'ASP.NET Core', 'C#'] },
      { label: 'frontend', items: ['TypeScript', 'Angular', 'Blazor'] },
      { label: 'data', items: ['SQL Server', 'EF Core', 'Dapper'] },
      { label: 'infrastructure', items: ['Docker', 'IIS', 'Azure', 'Azure Pipelines'] },
    ],
  },

  contact: {
    heading: 'Get in touch',
    body:
      "Describe the project or the gap in your team. I'll reply with an honest read on whether I'm the right fit, usually within two working days.",
    location: 'Leuven/Tienen area, Belgium. Remote elsewhere, on site when it helps.',
    linkedin: 'https://be.linkedin.com/in/thijs-dickmans',
    cta: 'Email me',
  },
} as const;
