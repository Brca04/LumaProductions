import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, lastname, email, phone, service, message } = await req.json();

  if (!name || !lastname || !email || !service || !message) {
    return NextResponse.json({ error: "Nedostaju obavezna polja." }, { status: 400 });
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

  const serviceLabels: Record<string, string> = {
    vjencanje: "Vjenčanje",
    maturalna: "Maturalna večer",
    krstenje: "Krštenje / Photobooth",
    reklama: "Reklama / Komercijalno",
    ostalo: "Ostalo",
  };

  await transporter.sendMail({
    from: `"Luma Productions" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO ?? "info@luma-productions.net",
    replyTo: email,
    subject: `Nova upita – ${serviceLabels[service] ?? service}`,
    text: [
      `Ime: ${name} ${lastname}`,
      `Email: ${email}`,
      `Telefon: ${phone || "—"}`,
      `Usluga: ${serviceLabels[service] ?? service}`,
      "",
      message,
    ].join("\n"),
    html: `
      <p><strong>Ime:</strong> ${name} ${lastname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone || "—"}</p>
      <p><strong>Usluga:</strong> ${serviceLabels[service] ?? service}</p>
      <hr/>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
