# AGENTS.md

## Project

Davis Weather Station — an independent directory of authorized Davis Instruments resellers, with a product catalog, smart buying guide, FAQ, and quote request flow.

## Development

```bash
npm install
npm run dev
npm run build
```

The dev server runs at http://localhost:4321.

## Conventions

- Keep the existing visual language: Davis blue `#00529B`, accent orange `#FF6B35`, rounded cards, soft shadows.
- Reuse the exported modules in `src/data/` rather than hardcoding products or resellers in pages.
- Content lives outside this repository and is loaded from gitignored build-time snapshots. Never commit content rows, snapshots, or source-data exports.
- Product detail pages are generated from the unified product data; do not add one-off product routes.
- Legal pages use `src/layouts/LegalLayout.astro` and must stay linked in the footer.
- Write clear, accurate content. Do not invent claims about Davis Instruments, resellers, or product capabilities.
- Watch inline spacing: add an explicit space before and after inline links and strong text in prose.

## Security and privacy

- Never commit `.env`, tokens, API keys, database IDs, deployment configuration, or infrastructure details.
- Do not add hosting, security-service, database, or email configuration to public documentation.
- Do not expose private contact addresses or internal service details in the UI.
- Quote submissions contain personal data. Do not log, publish, or commit them.

## Contributions

This project is not accepting public code contributions. Use the site contact page for corrections.
