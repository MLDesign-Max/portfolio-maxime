'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  type: string;
  message: string;
  website?: string; // Champ Honeypot
}

export async function sendContactEmail(data: ContactFormData) {
  const { name, email, type, message, website } = data;

  // 1. HONEYPOT ANTI-SPAM
  // Si le champ piège caché est rempli, c'est un robot.
  // On renvoie "success: true" pour duper le robot sans exécuter le reste.
  if (website && website.trim() !== '') {
    return { success: true };
  }

  // 2. VALIDATION DES CHAMPS OBLIGATOIRES
  if (!name || !email || !message) {
    return { success: false, error: 'Veuillez remplir tous les champs obligatoires.' };
  }

  // 3. VALIDATION DU FORMAT EMAIL (REGEX)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'L\'adresse email fournie n\'est pas valide.' };
  }

  try {
    // 1. EMAIL NOTIFICATION ADMIN
    const adminEmail = resend.emails.send({
      from: 'Maxime Lussiana <contact@maximelussiana.fr>',
      to: 'contact@maximelussiana.fr',
      replyTo: email,
      subject: `⚡ Nouveau projet : ${name} (${type || 'Contact'})`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              @media only screen and (max-width: 600px) {
                .padding-box { padding: 20px 16px !important; }
                .mobile-stack { display: block !important; width: 100% !important; }
                .mobile-badge { text-align: left !important; margin-top: 12px !important; }
              }
            </style>
          </head>
          <body style="background-color: #1E1E1E; background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 24px 24px; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif; padding: 32px 8px; margin: 0; -webkit-font-smoothing: antialiased;">
            
            <div style="max-width: 580px; margin: 0 auto; background-color: #222222; border: 1px solid #333333; border-radius: 28px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
              
              <div style="height: 2px; background: linear-gradient(90deg, transparent 0%, #0048e4 20%, #a259ff 80%, transparent 100%); width: 100%;"></div>

              <div class="padding-box" style="padding: 32px 32px 24px 32px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td class="mobile-stack" style="vertical-align: middle;">
                      <img 
                        src="https://www.maximelussiana.fr/assets/logo-email.png" 
                        alt="Maxime Lussiana" 
                        width="150" 
                        style="display: block; border: 0; max-width: 150px; height: auto;" 
                      />
                    </td>
                    <td class="mobile-stack mobile-badge" style="text-align: right; vertical-align: middle;">
                      <span style="font-family: monospace; font-size: 10px; font-weight: 700; letter-spacing: 1px; color: #22c55e; background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.25); padding: 5px 12px; border-radius: 9999px; text-transform: uppercase; display: inline-block;">
                        ● NOUVEAU MESSAGE
                      </span>
                    </td>
                  </tr>
                </table>

                <div style="margin-top: 24px;">
                  <h1 style="color: #ffffff; font-size: 24px; font-weight: 900; margin: 0; letter-spacing: -0.5px;">
                    ${name} <span style="color: #3b82f6; font-style: italic;">souhaite échanger.</span>
                  </h1>
                </div>
              </div>

              <div style="height: 1px; background-color: #333333; margin: 0 24px;"></div>

              <div class="padding-box" style="padding: 24px 32px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 6px 0; font-family: monospace; color: #888888; font-size: 11px; font-weight: 600; text-transform: uppercase; width: 110px;">EMAIL</td>
                    <td style="padding: 6px 0; font-size: 14px; font-weight: 600; word-break: break-all;">
                      <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-family: monospace; color: #888888; font-size: 11px; font-weight: 600; text-transform: uppercase;">EXPERTISE</td>
                    <td style="padding: 6px 0;">
                      <span style="background: rgba(255, 255, 255, 0.05); color: #f1f5f9; font-size: 12px; font-weight: 600; font-family: monospace; padding: 4px 10px; border-radius: 9999px; border: 1px solid #333333; display: inline-block;">
                        ${type || 'Non spécifié'}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>

              <div class="padding-box" style="padding: 0 32px 32px 32px;">
                <p style="font-family: monospace; color: #888888; font-size: 11px; font-weight: 600; text-transform: uppercase; margin: 0 0 12px 0;">MESSAGE</p>
                <div style="background-color: #181818; border: 1px solid #333333; border-radius: 16px; padding: 20px; color: #e4e4e7; font-size: 14px; line-height: 1.6; white-space: pre-wrap; word-break: break-word;">${message}</div>

                <div style="margin-top: 24px;">
                  <a href="mailto:${email}" style="display: block; box-sizing: border-box; background-color: #0048e4; color: #ffffff; text-decoration: none; font-family: monospace; font-weight: 700; font-size: 14px; padding: 16px 20px; border-radius: 9999px; text-align: center; box-shadow: 0 0 25px rgba(0, 72, 228, 0.35);">
                    Répondre à ${name} &nbsp;→
                  </a>
                </div>
              </div>

            </div>
          </body>
        </html>
      `,
    });

    // 2. EMAIL ACCUSÉ DE RÉCEPTION CLIENT
    const clientEmail = resend.emails.send({
      from: 'Maxime Lussiana <contact@maximelussiana.fr>',
      to: email,
      subject: `Message bien reçu ! — Maxime Lussiana`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              @media only screen and (max-width: 600px) {
                .padding-box { padding: 28px 20px !important; }
              }
            </style>
          </head>
          <body style="background-color: #1E1E1E; background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 24px 24px; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif; padding: 32px 12px; margin: 0; -webkit-font-smoothing: antialiased;">
            
            <div style="max-width: 540px; margin: 0 auto; background-color: #222222; border: 1px solid #333333; border-radius: 28px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5); text-align: center;">
              
              <div style="height: 2px; background: linear-gradient(90deg, transparent 0%, #0048e4 20%, #a259ff 80%, transparent 100%); width: 100%;"></div>

              <div class="padding-box" style="padding: 48px 36px 40px 36px;">
                
                <div style="margin-bottom: 32px;">
                  <img 
                    src="https://www.maximelussiana.fr/assets/success-icon.png" 
                    alt="Confirmation" 
                    width="96" 
                    style="display: inline-block; border: 0; max-width: 96px; height: auto;" 
                  />
                </div>

                <h1 style="color: #ffffff; font-size: 24px; font-weight: 900; margin: 0 0 16px 0; letter-spacing: -0.5px; line-height: 1.2;">
                  Merci ${name}, <br />
                  <span style="color: #3b82f6; font-style: italic; font-weight: 700;">votre demande est enregistrée.</span>
                </h1>

                <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; margin: 0 0 32px 0; font-weight: 400;">
                  J&apos;ai bien reçu votre message concernant votre besoin en <strong style="color: #ffffff;">${type || 'Design'}</strong>. Je prends connaissance de vos éléments et je vous recontacte sous 24h à 48h.
                </p>

                <div style="background-color: #181818; border: 1px solid #333333; border-radius: 18px; padding: 20px; text-align: left;">
                  <p style="font-family: monospace; color: #888888; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">
                    RÉCAPITULATIF DE VOTRE MESSAGE
                  </p>
                  <p style="color: #e4e4e7; font-size: 13px; line-height: 1.6; margin: 0; white-space: pre-wrap; word-break: break-word;">${message}</p>
                </div>

              </div>

            </div>
          </body>
        </html>
      `,
    });

    await Promise.all([adminEmail, clientEmail]);

    return { success: true };
  } catch (err) {
    console.error("Erreur d'envoi Resend :", err);
    return { success: false, error: "Une erreur est survenue lors de l'envoi du message." };
  }
}