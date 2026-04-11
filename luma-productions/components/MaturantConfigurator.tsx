"use client";

import { useMemo, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type Category = "foto" | "video" | "mix";

type Package = {
  category: Category;
  name: string;
  price: string;
  priceNum: number;
  imageSrc: string;
  minPeople: number;
  maxPeople: number;
  photographers: number;
  videographers: number;
  deliveryDays: number;
  photoCount: number;
  hasHighlight: boolean;
  hasFullVideo: boolean;
  features: string[];
};

type SizeValue = "small" | "medium" | "large" | "xlarge";

type SizeOption = {
  value: SizeValue;
  label: string;
  min: number;
  max: number;
  midpoint: number;
};

type NumOption = { value: number; label: string };

// ── Package data ──────────────────────────────────────────────────────────────
const PACKAGES: Package[] = [
  {
    category: "foto",
    name: "Foto #1",
    price: "8€/maturant",
    priceNum: 8,
    imageSrc: "/prikaz.webp",
    minPeople: 0,
    maxPeople: 30,
    photographers: 1,
    videographers: 0,
    deliveryDays: 3,
    photoCount: 200,
    hasHighlight: false,
    hasFullVideo: false,
    features: [
      "Do 30 maturanata",
      "1 fotograf",
      "200 digitalno obrađenih fotografija",
      "Isporuka materijala do 3 dana",
    ],
  },
  {
    category: "foto",
    name: "Foto #2",
    price: "5€/maturant",
    priceNum: 5,
    imageSrc: "/prikaz2.webp",
    minPeople: 31,
    maxPeople: Infinity,
    photographers: 2,
    videographers: 0,
    deliveryDays: 4,
    photoCount: 300,
    hasHighlight: false,
    hasFullVideo: false,
    features: [
      "30+ maturanata",
      "2 fotografa",
      "300+ digitalno obrađenih fotografija",
      "Isporuka materijala do 4 dana",
    ],
  },
  {
    category: "video",
    name: "Video #1",
    price: "7€/maturant",
    priceNum: 7,
    imageSrc: "/prikaz.webp",
    minPeople: 0,
    maxPeople: 59,
    photographers: 0,
    videographers: 1,
    deliveryDays: 4,
    photoCount: 0,
    hasHighlight: true,
    hasFullVideo: false,
    features: [
      "1 snimatelj",
      "Highlight video do 180 sekundi",
      "Isporuka materijala kroz 4 dana",
    ],
  },
  {
    category: "video",
    name: "Video #2",
    price: "7€/maturant",
    priceNum: 7,
    imageSrc: "/prikaz2.webp",
    minPeople: 60,
    maxPeople: Infinity,
    photographers: 0,
    videographers: 2,
    deliveryDays: 4,
    photoCount: 0,
    hasHighlight: false,
    hasFullVideo: true,
    features: [
      "60+ maturanata",
      "2 snimatelja",
      "Video cijele večeri u trajanju do 60 minuta",
      "Isporuka materijala kroz 4 dana",
    ],
  },
  {
    category: "mix",
    name: "Mix #1",
    price: "13€/maturant",
    priceNum: 13,
    imageSrc: "/prikaz.webp",
    minPeople: 0,
    maxPeople: 100,
    photographers: 1,
    videographers: 2,
    deliveryDays: 5,
    photoCount: 400,
    hasHighlight: false,
    hasFullVideo: true,
    features: [
      "Do 100 maturanata",
      "1 fotograf",
      "2 snimatelja",
      "Do 400 digitalno obrađenih fotografija",
      "Video cijele večeri u trajanju do 60 minuta",
      "Isporuka materijala unutar 5 dana",
    ],
  },
  {
    category: "mix",
    name: "Mix #2",
    price: "10€/maturant",
    priceNum: 10,
    imageSrc: "/prikaz2.webp",
    minPeople: 101,
    maxPeople: Infinity,
    photographers: 2,
    videographers: 2,
    deliveryDays: 7,
    photoCount: 800,
    hasHighlight: false,
    hasFullVideo: true,
    features: [
      "100+ maturanata",
      "2 fotografa",
      "2 snimatelja",
      "800 digitalno obrađenih fotografija",
      "Video cijele večeri u trajanju do 60 minuta",
      "Isporuka materijala unutar 7 dana",
    ],
  },
];

// ── Options ───────────────────────────────────────────────────────────────────
const SIZE_OPTIONS: SizeOption[] = [
  { value: "small", label: "Do 30", min: 1, max: 30, midpoint: 20 },
  { value: "medium", label: "30 – 60", min: 31, max: 60, midpoint: 45 },
  { value: "large", label: "60 – 100", min: 61, max: 100, midpoint: 80 },
  { value: "xlarge", label: "100+", min: 101, max: 200, midpoint: 130 },
];

const PHOTOGRAPHER_OPTIONS: NumOption[] = [
  { value: 0, label: "Bez fotografa" },
  { value: 1, label: "1 fotograf" },
  { value: 2, label: "2 fotografa" },
];

const VIDEOGRAPHER_OPTIONS: NumOption[] = [
  { value: 0, label: "Bez snimatelja" },
  { value: 1, label: "1 snimatelj" },
  { value: 2, label: "2 snimatelja" },
];

const PHOTO_COUNT_OPTIONS: NumOption[] = [
  { value: 0, label: "Bez fotografija" },
  { value: 200, label: "200+" },
  { value: 300, label: "300+" },
  { value: 400, label: "400+" },
  { value: 800, label: "800+" },
];

const DELIVERY_OPTIONS: NumOption[] = [
  { value: 99, label: "Nije važno" },
  { value: 3, label: "3 dana" },
  { value: 4, label: "4 dana" },
  { value: 5, label: "5 dana" },
  { value: 7, label: "7 dana" },
];

// ── Scoring recommendation ────────────────────────────────────────────────────
function recommend(
  count: number,
  photographers: number,
  videographers: number,
  photoCount: number,
  maxDelivery: number,
  wantsHighlight: boolean,
  wantsFullVideo: boolean
): Package | null {
  const wantsPhoto = photographers > 0;
  const wantsVideo = videographers > 0;

  if (!wantsPhoto && !wantsVideo) return null;

  let category: Category;
  if (wantsPhoto && wantsVideo) category = "mix";
  else if (wantsPhoto) category = "foto";
  else category = "video";

  const candidates = PACKAGES.filter((p) => p.category === category);

  const scored = candidates.map((p) => {
    let score = 0;
    const countFits = count >= p.minPeople && count <= p.maxPeople;

    if (!countFits) return { pkg: p, score: -Infinity };

    if (p.photographers === photographers) score += 3;
    if (p.videographers === videographers) score += 3;

    if (photoCount === 0 || p.photoCount >= photoCount) score += 2;
    if (maxDelivery === 99 || p.deliveryDays <= maxDelivery) score += 2;

    if (wantsHighlight && p.hasHighlight) score += 2;
    if (wantsFullVideo && p.hasFullVideo) score += 2;

    if (!wantsHighlight && p.hasHighlight) score -= 1;
    if (!wantsFullVideo && p.hasFullVideo) score -= 1;

    return { pkg: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.score === -Infinity ? null : scored[0]?.pkg ?? null;
}

// ── Sub-components ────────────────────────────────────────────────────────────
function CheckIcon({ active }: { active: boolean }) {
  const stroke = active ? "#BE9E5C" : "#d1d5db";
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      className="shrink-0 mt-0.5"
      aria-hidden
    >
      <circle cx="7.5" cy="7.5" r="7" stroke={stroke} strokeWidth="1" />
      <path
        d="M4 7.8L6.2 10L11 5"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SegGroup<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (val: T) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex-auto min-w-[80px] px-4 py-2.5 rounded-xl text-[13px] cursor-pointer transition-colors border ${
              active
                ? "border-[#BE9E5C] bg-[#BE9E5C]/[0.08] text-gray-900 font-medium"
                : "border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:border-gray-300 font-normal"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function ToggleRow({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div
      role="switch"
      aria-checked={value}
      tabIndex={0}
      onClick={() => onChange(!value)}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onChange(!value);
        }
      }}
      className="flex items-center justify-between px-4 py-3.5 cursor-pointer border-b border-gray-200 last:border-b-0"
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-[13px] font-medium text-gray-900">{label}</span>
        {hint && <span className="text-[11px] text-gray-500">{hint}</span>}
      </div>
      <div
        className={`relative w-10 h-[22px] rounded-[11px] transition-colors shrink-0 ${
          value ? "bg-[#BE9E5C]" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-[3px] left-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            value ? "translate-x-[18px]" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
}

function StepRow({
  num,
  label,
  children,
}: {
  num: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#BE9E5C] text-white text-[11px] font-semibold shrink-0">
          {num}
        </span>
        <span className="text-sm font-medium text-gray-900">{label}</span>
      </div>
      {children}
    </div>
  );
}

function CategoryBadge({ category }: { category: Category }) {
  const labels: Record<Category, string> = {
    foto: "Foto",
    video: "Video",
    mix: "Mix",
  };
  return (
    <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#BE9E5C] bg-[#BE9E5C]/10 border border-[#BE9E5C]/20 px-2.5 py-1 rounded-full">
      {labels[category]}
    </span>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-[13px] text-gray-500">{label}</span>
      <span className="text-[13px] font-medium text-gray-900">{value}</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function MaturantConfigurator() {
  const [sizeVal, setSizeVal] = useState<SizeValue>("small");
  const [photographers, setPhoto] = useState(1);
  const [videographers, setVideo] = useState(0);
  const [count, setCount] = useState(20);
  const [photoCount, setPhotoCount] = useState(0);
  const [maxDelivery, setMaxDelivery] = useState(99);
  const [wantsHighlight, setHighlight] = useState(false);
  const [wantsFullVideo, setFullVideo] = useState(false);

  const sizeOption = SIZE_OPTIONS.find((o) => o.value === sizeVal);

  const handleSizeChange = (val: SizeValue) => {
    setSizeVal(val);
    const opt = SIZE_OPTIONS.find((o) => o.value === val);
    setCount(opt?.midpoint ?? 20);
  };

  const pkg = useMemo(
    () =>
      recommend(
        count,
        photographers,
        videographers,
        photoCount,
        maxDelivery,
        wantsHighlight,
        wantsFullVideo
      ),
    [
      count,
      photographers,
      videographers,
      photoCount,
      maxDelivery,
      wantsHighlight,
      wantsFullVideo,
    ]
  );

  const total = pkg ? pkg.priceNum * count : 0;
  const nothingSelected = photographers === 0 && videographers === 0;

  const showVideoOptions = videographers > 0;
  const showPhotoOptions = photographers > 0;

  // Dynamic step numbering for conditional steps
  let step = 4;
  const photoStep = showPhotoOptions ? step++ : null;
  const videoStep = showVideoOptions ? step++ : null;
  const deliveryStep = step;

  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading — matches CTA style on same page */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
            Prilagodite <span className="text-[#BE9E5C]">Svoj Paket</span>
          </h2>
          <div className="w-12 h-px bg-[#BE9E5C] mx-auto mb-5" />
          <p className="text-base text-gray-500 font-light max-w-xl mx-auto">
            Odaberite parametre koji odgovaraju vašim potrebama i dobit ćete
            preporuku savršenog paketa.
          </p>
        </div>

        {/* Configurator card */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] rounded-3xl border border-gray-200 bg-white shadow-[0_10px_40px_-12px_rgba(0,0,0,0.08)] overflow-hidden">
          {/* ── Left — inputs ── */}
          <div className="p-8 sm:p-10 lg:p-12">
            {/* 1 — Group size */}
            <StepRow num={1} label="Koliko maturanata?">
              <SegGroup
                options={SIZE_OPTIONS}
                value={sizeVal}
                onChange={handleSizeChange}
              />
              <div className="mt-3 px-5 py-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] text-gray-500 uppercase tracking-[0.07em]">
                    Točan broj
                  </span>
                  <span className="text-base font-semibold text-gray-900">
                    {count}
                  </span>
                </div>
                <input
                  type="range"
                  min={sizeOption?.min ?? 1}
                  max={
                    sizeOption?.max === Infinity ? 200 : sizeOption?.max ?? 200
                  }
                  step={1}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full accent-[#BE9E5C]"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>{sizeOption?.min}</span>
                  <span>
                    {sizeOption?.max === Infinity ? "200+" : sizeOption?.max}
                  </span>
                </div>
              </div>
            </StepRow>

            {/* 2 — Photographers */}
            <StepRow num={2} label="Koliko fotografa?">
              <SegGroup
                options={PHOTOGRAPHER_OPTIONS}
                value={photographers}
                onChange={setPhoto}
              />
            </StepRow>

            {/* 3 — Videographers */}
            <StepRow num={3} label="Koliko snimatelja?">
              <SegGroup
                options={VIDEOGRAPHER_OPTIONS}
                value={videographers}
                onChange={setVideo}
              />
            </StepRow>

            {/* 4 — Photo count (only if photographer selected) */}
            {photoStep !== null && (
              <StepRow
                num={photoStep}
                label="Minimalan broj digitalnih fotografija?"
              >
                <SegGroup
                  options={PHOTO_COUNT_OPTIONS}
                  value={photoCount}
                  onChange={setPhotoCount}
                />
              </StepRow>
            )}

            {/* 5 — Video type (only if videographer selected) */}
            {videoStep !== null && (
              <StepRow num={videoStep} label="Kakav video materijal trebate?">
                <div className="flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200">
                  <ToggleRow
                    label="Highlight video"
                    hint="Kratki sažetak večeri do 180 sekundi"
                    value={wantsHighlight}
                    onChange={setHighlight}
                  />
                  <ToggleRow
                    label="Video cijele večeri"
                    hint="Snimka u trajanju do 60 minuta"
                    value={wantsFullVideo}
                    onChange={setFullVideo}
                  />
                </div>
              </StepRow>
            )}

            {/* 6 — Delivery */}
            <StepRow num={deliveryStep} label="Maksimalni rok isporuke?">
              <SegGroup
                options={DELIVERY_OPTIONS}
                value={maxDelivery}
                onChange={setMaxDelivery}
              />
            </StepRow>

            {/* Notices */}
            {pkg && (
              <div className="flex items-center gap-2.5 mt-2 px-4 py-3 bg-[#BE9E5C]/[0.08] border border-[#BE9E5C]/25 rounded-xl">
                <span className="text-[13px] font-bold text-[#BE9E5C]">★</span>
                <span className="text-[13px] text-gray-700 leading-[1.4]">
                  Preporučujemo{" "}
                  <strong className="text-gray-900">{pkg.name}</strong> za vaše
                  zahtjeve
                </span>
              </div>
            )}
            {nothingSelected && (
              <div className="flex items-center gap-2.5 mt-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
                <span className="text-[13px] font-bold text-amber-600">!</span>
                <span className="text-[13px] text-gray-700 leading-[1.4]">
                  Odaberite barem jednog fotografa ili snimatelja
                </span>
              </div>
            )}
          </div>

          {/* ── Right — summary ── */}
          <div className="bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200 p-8 sm:p-10 lg:p-12 flex flex-col">
            <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.12em] mb-6">
              Sažetak
            </h3>

            {pkg ? (
              <>
                <div className="flex items-center gap-2.5 mb-5">
                  <CategoryBadge category={pkg.category} />
                  <span className="text-[15px] font-semibold text-gray-900">
                    {pkg.name}
                  </span>
                </div>

                <div className="flex flex-col mb-5">
                  <SummaryRow
                    label="Fotografije"
                    value={pkg.photoCount > 0 ? `${pkg.photoCount}+` : "—"}
                  />
                  <SummaryRow
                    label="Isporuka"
                    value={`${pkg.deliveryDays} dana`}
                  />
                  <SummaryRow
                    label="Highlight"
                    value={pkg.hasHighlight ? "Da" : "Ne"}
                  />
                  <SummaryRow
                    label="Puna večer"
                    value={pkg.hasFullVideo ? "Da" : "Ne"}
                  />
                </div>

                <div className="h-px bg-gray-200 mb-5" />

                <div className="flex flex-col gap-2.5 mb-6 flex-1">
                  {pkg.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckIcon active />
                      <span className="text-[13px] text-gray-700 leading-normal">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-4xl font-semibold text-[#BE9E5C] tracking-tight">
                    {pkg.priceNum}€
                  </span>
                  <span className="text-sm text-[#BE9E5C] font-medium">
                    /maturant
                  </span>
                </div>

                <div className="h-px bg-gray-200 mb-4" />

                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-500">Ukupno</span>
                  <span className="text-2xl font-semibold text-gray-900">
                    {total}€
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {pkg.name} · {count} maturanata
                </div>
              </>
            ) : (
              <div className="flex-1">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-2.5 mb-3">
                    <CheckIcon active={false} />
                    <div
                      className="h-3 bg-gray-200 rounded"
                      style={{ width: `${50 + i * 12}%` }}
                    />
                  </div>
                ))}
                <p className="text-xs text-gray-400 mt-6 text-center">
                  Odaberite parametre za preporuku
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
