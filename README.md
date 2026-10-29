# Davis Weather Station

An independent directory of authorized Davis Instruments resellers, with a full product catalog, a smart buying guide, an FAQ center, and a quote request flow.

- **Live site:** https://davisweatherstation.com
- **Contact:** https://davisweatherstation.com/contact

> This project is independent and is not affiliated with, endorsed by, or sponsored by Davis Instruments. Product names, images, and descriptions belong to their respective owners.

## Features

- Searchable directory of authorized Davis Instruments resellers, grouped by country.
- Detailed reseller profiles with contact details, designations, and background.
- Full Davis product catalog with categories, photos, SKUs, and feature highlights.
- Smart Buying Guide that turns seven simple answers into a recommended configuration and a ready-to-send quote.
- Quote requests delivered to the selected reseller, with bot protection and rate limiting.
- FAQ center with search and category filters.
- Legal and policy pages covering privacy, cookies, returns, shipping, accessibility, intellectual property, acceptable use, and more.

## Local development

Requirements: Node.js 22.23.4 or newer.

```bash
npm install
npm run dev
```

Content is loaded from build-time snapshots that are generated in the maintained
private environment and are not included in this repository. A fresh clone will
therefore need those snapshots provisioned before the dev server or a production
build can render reseller, product, and FAQ pages.

The development server runs at http://localhost:4321.

To create a production build:

```bash
npm run build
```

## Content

Reseller and product information is compiled from public sources and the official Davis Instruments reseller network. It is stored outside this repository and loaded into build-time snapshots. Product names, images, and descriptions remain the property of Davis Instruments and are used for informational purposes only.

Corrections and privacy requests can be sent through the [contact page](https://davisweatherstation.com/contact).

## Contributing

This project is not accepting public code contributions. For corrections or content requests, please use the contact page.

## License

The source code is licensed under the **PolyForm Noncommercial License 1.0.0**. See [LICENSE](LICENSE).

Commercial use requires a separate written licence. Davis Instruments trademarks, product names, images, and descriptions are not covered by this licence.

---

Website maintained with love by janasco.
