# Photographer Portfolio Website

Profesionalna web stranica za fotografski studio s cijenama za maturalne večeri, vjenčanja, krštenja i reklame.

## Značajke

- **Next.js 14** s App Router
- **TypeScript** za type safety
- **Tailwind CSS** za styling
- **SEO optimizirano** s meta tags, sitemap, i robots.txt
- **Responsive dizajn** za sve uređaje
- **Server-side rendering** za bolji SEO
- Stranice za svaku uslugu s galerijom slika i cijenama
- Kontakt forma

## Stranice

1. **Početna** (`/`) - Hero sekcija i pregled svih usluga
2. **Maturalne Večeri** (`/maturalne-veceri`) - Galerija i 3 pricing plana
3. **Vjenčanja** (`/vjencanja`) - Galerija i 3 pricing plana
4. **Krštenja** (`/krstenja`) - Galerija i 3 pricing plana
5. **Reklame** (`/reklame`) - Galerija i 3 pricing plana
6. **Kontakt** (`/kontakt`) - Kontakt forma i informacije

## Instalacija

```bash
# Instaliraj dependencies
npm install

# Pokreni development server
npm run dev

# Build za produkciju
npm run build

# Pokreni production server
npm start
```

Aplikacija će biti dostupna na `http://localhost:3000`

## SEO Optimizacije

Projekt uključuje:

- ✅ Strukturirane meta tags za svaku stranicu
- ✅ Open Graph i Twitter meta tags
- ✅ Automatski sitemap.xml
- ✅ robots.txt
- ✅ Semantički HTML
- ✅ Optimizirane slike (next/image)
- ✅ Server-side rendering
- ✅ Mobile responsive
- ✅ Fast loading times

## Dodavanje slika

Zamijeni placeholder slike sa stvarnim fotografijama u `/public/images/`:

1. Dodaj slike u `/public/images/` direktorij
2. Imenuj ih prema kategoriji (npr., `maturalne-1.jpg`, `vjencanje-1.jpg`)
3. Ažuriraj Image komponente u odgovarajućim stranicama:

```tsx
<Image 
  src="/images/vjencanje-1.jpg" 
  alt="Vjenčanje"
  width={800}
  height={600}
  className="..."
/>
```

## Prilagođavanje

### Cijene

Ažuriraj cijene u `pricingPlans` arrayima u svakoj stranici:
- `/app/maturalne-veceri/page.tsx`
- `/app/vjencanja/page.tsx`
- `/app/krstenja/page.tsx`
- `/app/reklame/page.tsx`

### Boje

Promijeni boje u Tailwind konfiguraciji ili direktno u komponentama.

### Kontakt informacije

Ažuriraj kontakt informacije u:
- `/components/Footer.tsx`
- `/app/kontakt/page.tsx`

### Domena

Zamijeni `https://www.vasadomena.hr` sa stvarnom domenom u:
- `/app/layout.tsx`
- `/app/sitemap.ts`
- `/public/robots.txt`

## Struktura projekta

```
photo-portfolio/
├── app/
│   ├── layout.tsx          # Root layout s SEO metadata
│   ├── page.tsx            # Početna stranica
│   ├── globals.css         # Globalni stilovi
│   ├── sitemap.ts          # Sitemap generator
│   ├── maturalne-veceri/
│   │   └── page.tsx
│   ├── vjencanja/
│   │   └── page.tsx
│   ├── krstenja/
│   │   └── page.tsx
│   ├── reklame/
│   │   └── page.tsx
│   └── kontakt/
│       └── page.tsx
├── components/
│   ├── Navbar.tsx          # Navigacija
│   ├── Footer.tsx          # Footer
│   └── PricingCard.tsx     # Pricing komponenta
├── public/
│   ├── images/             # Slike
│   └── robots.txt
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── postcss.config.js
```

## Production Deployment

1. **Vercel** (preporučeno za Next.js):
```bash
npm install -g vercel
vercel
```

2. **Custom server**:
```bash
npm run build
npm start
```

## Performance

- Koristi Next.js Image optimizaciju
- Lazy loading za slike
- Server-side rendering
- Minimiziran CSS i JS
- Optimizirane font-ove

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

Private project - All rights reserved
