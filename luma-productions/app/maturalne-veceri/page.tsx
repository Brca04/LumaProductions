// app/maturalne-veceri/page.tsx

import { Metadata } from 'next';
import MaturalneCTA from '@/components/MaturalneCTA';
import MaturantConfigurator from '@/components/MaturantConfigurator';
import WeddingGalleryCarousel from '@/components/WeddingGalleryCarousel';
import { maturalneItems } from './data';

export const metadata: Metadata = {
  title: 'Fotografija Maturalne Večeri',
  description:
    'Profesionalna fotografija maturalne večeri. Uhvatite najljepše trenutke slavlja. Pristupačni paketi i vrhunska kvaliteta.',
  keywords: ['maturalne večeri', 'fotografija', 'matura', 'maturalna zabava', 'foto studio'],
  openGraph: {
    title: 'Fotografija Maturalne Večeri | Foto Studio',
    description: 'Profesionalna fotografija maturalne večeri. Uhvatite najljepše trenutke slavlja.',
  },
};

export default function MaturalneVeceri() {
  const maturalneCards = maturalneItems.map((item, i) => ({
    id: i + 1,
    name: item.name,
    category: item.category,
    imageSrc: item.coverImage,
    href: `/maturalne-veceri/${item.slug}`,
  }));

  return (
    <div className="min-h-screen bg-white text-black">

      {/* ── Hero ── */}
      <section className="relative h-[100dvh] overflow-hidden">

        <style>{`
          @keyframes pRise {
            from { opacity:0; transform: translateY(60px) skewY(3deg); }
            to   { opacity:1; transform: translateY(0) skewY(0deg); }
          }
          @keyframes pFade {
            from { opacity:0; transform: translateY(16px); }
            to   { opacity:1; transform: translateY(0); }
          }
          @keyframes scrollDrop {
            0%,100% { transform: translateY(0); opacity:1; }
            50%     { transform: translateY(8px); opacity:0.3; }
          }
          .p-tag {
            font-size: 0.7rem;
            font-weight: 600;
            letter-spacing: 0.25em;
            text-transform: uppercase;
            color: #BE9E5C;
            opacity: 0;
            animation: pFade 0.6s ease 0.3s forwards;
          }
          .p-word {
            font-size: clamp(4rem, 10vw, 8rem);
            font-weight: 600;
            line-height: 1;
            letter-spacing: -0.025em;
            color: #fff;
            display: block;
          }
          .p-word-1 {
            opacity: 0;
            animation: pRise 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s forwards;
          }
          .p-word-2 {
            opacity: 0;
            animation: pRise 0.8s cubic-bezier(0.16,1,0.3,1) 0.75s forwards;
            color: #BE9E5C;
          }
          .p-desc {
            font-size: 1rem;
            color: rgba(255,255,255,0.65);
            line-height: 1.8;
            font-weight: 300;
            opacity: 0;
            animation: pFade 0.8s ease 1.3s forwards;
          }
          .p-scroll {
            position: absolute;
            bottom: max(2.5rem, env(safe-area-inset-bottom, 0px) + 1.5rem);
            left: 0;
            right: 0;
            width: fit-content;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            opacity: 0;
            animation: pFade 0.8s ease 1.8s forwards;
            z-index: 10;
          }
          .p-scroll-label {
            font-size: 0.6rem;
            font-weight: 500;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.4);
          }
          .p-scroll-dot {
            width: 4px; height: 4px; border-radius: 50%;
            background: #BE9E5C;
            animation: scrollDrop 1.6s ease-in-out 2s infinite;
          }
          @media (max-width: 767px) {
            .p-hero-overlay {
              grid-template-columns: 1fr !important;
              text-align: center;
              padding: 0 1.5rem calc(3rem + 32px) !important;
            }
            .p-desc { display: none; }
            .p-word { font-size: clamp(4rem, 18vw, 6.5rem); }
          }
        `}</style>

        <video
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        >
          <source src="/videoMaturalne.mp4" type="video/mp4" />
        </video>

        {/* Title overlay — bottom of video */}
        <div className="p-hero-overlay" style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0 2rem calc(3rem + 32px)',
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.85))',
          zIndex: 10,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0 3rem',
          alignItems: 'flex-end',
        }}>
          <h1 style={{ margin: 0 }}>
            <span className="p-word p-word-1">Maturalne</span>
            <span className="p-word p-word-2" style={{ marginTop: '0.05em' }}>Večeri</span>
          </h1>
          <p className="p-desc" style={{ paddingLeft: '20%' }}>
            Profesionalna fotografija i video produkcija koja čuva najljepše trenutke vaše maturalne večeri. Vrhunska kvaliteta, pristupačni paketi, nezaboravne uspomene.
          </p>
        </div>

        <div className="p-scroll">
          <span className="p-scroll-label">scroll</span>
          <div className="p-scroll-dot" />
        </div>

      </section>

      {/* Description Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-20">
            {/* Left — kicker + heading */}
            <div className="lg:max-w-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#BE9E5C] mb-4">
                Naš pristup
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.1]">
                Jedna noć,{" "}
                <span className="text-[#BE9E5C]">milijun uspomena</span>
              </h2>
              <div className="w-12 h-px bg-[#BE9E5C] mt-6" />
            </div>

            {/* Right — paragraphs */}
            <div className="space-y-6 max-w-2xl lg:pt-2">
              <p className="text-lg text-gray-600 leading-[1.8] font-light">
                Matura je kraj jednog poglavlja i početak novog — noć prepuna
                emocija, prijatelja i trenutaka koje ćete pamtiti zauvijek. Naša
                zadaća je uhvatiti svaki taj detalj: od pripreme i dolaska,
                preko prvog plesa, do zadnjih zagrljaja pred zoru.
              </p>
              <p className="text-lg text-gray-600 leading-[1.8] font-light">
                Radimo diskretno, bez ometanja, a opet smo tu za svaki važan
                kadar. Kombiniramo klasične grupne fotografije s autentičnim
                reportažnim pristupom — dobit ćete i formalne portrete i
                spontane trenutke koji najbolje pričaju priču vaše večeri.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WeddingGalleryCarousel cards={maturalneCards} />

      <MaturantConfigurator />

      <MaturalneCTA />

    </div>
  );
}
