import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get('name');
  const email = data.get('email');
  const message = data.get('message');

  // Použitie environment variables
  const smtpUser = process.env.WS_EMAIL;
  const smtpPass = process.env.WS_PASS;

  const transporter = nodemailer.createTransport({
    host: 'smtp.websupport.sk',
    port: 587,
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    transporter.sendMail({
      from: smtpUser,
      to: 'dekys.michal@gmail.com',
      subject: `Nová správa z kontaktného formulára od ${name}`,
      replyTo: typeof email === 'string' ? email : undefined,
      text: `Meno: ${name}\nEmail: ${email}\nSpráva: ${message}`,
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: String(err) }), { status: 500 });
  }
};
