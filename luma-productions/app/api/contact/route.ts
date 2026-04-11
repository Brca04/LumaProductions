import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// In-memory rate limit (best-effort — resets on serverless cold start).
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;
const rateLimitHits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitHits.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SERVICE_LABELS: Record<string, string> = {
  vjencanje: "Vjenčanje",
  maturalna: "Maturalna večer",
  krstenje: "Krštenje / Photobooth",
  reklama: "Reklama / Komercijalno",
  ostalo: "Ostalo",
};

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Previše zahtjeva. Pokušajte ponovo kasnije." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neispravan zahtjev." }, { status: 400 });
  }

  const { name, lastname, email, phone, service, message } =
    (body ?? {}) as Record<string, string | undefined>;

  if (!name || !lastname || !email || !service || !message) {
    return NextResponse.json({ error: "Nedostaju obavezna polja." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Neispravna email adresa." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const serviceLabel = SERVICE_LABELS[service] ?? service;

  try {
    await transporter.sendMail({
      from: `"Luma Productions" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO ?? "info@luma-productions.net",
      replyTo: email,
      subject: `Nova upita – ${serviceLabel}`,
      text: [
        `Ime: ${name} ${lastname}`,
        `Email: ${email}`,
        `Telefon: ${phone || "—"}`,
        `Usluga: ${serviceLabel}`,
        "",
        message,
      ].join("\n"),
      html: `
        <p><strong>Ime:</strong> ${escapeHtml(name)} ${escapeHtml(lastname)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone || "—")}</p>
        <p><strong>Usluga:</strong> ${escapeHtml(serviceLabel)}</p>
        <hr/>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });
  } catch (err) {
    console.error("[contact] sendMail failed:", err);
    return NextResponse.json(
      { error: "Slanje nije uspjelo. Pokušajte ponovo kasnije." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
