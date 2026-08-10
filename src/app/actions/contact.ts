'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  type: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  const { name, email, type, message } = data;

  if (!name || !email || !message) {
    return { success: false, error: 'Veuillez remplir tous les champs obligatoires.' };
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'motion@maximelussiana.fr',
      replyTo: email,
      subject: `⚡ Nouveau projet : ${name} (${type || 'Contact'})`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="background-color: #08090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 16px; margin: 0; -webkit-font-smoothing: antialiased;">
            
            <div style="max-width: 560px; margin: 0 auto; background-color: #111319; border: 1px solid #202430; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
              
              <!-- Fine ligne néon dégradée tout en haut -->
              <div style="height: 3px; background: linear-gradient(90deg, #0048e4 0%, #a259ff 100%); width: 100%;"></div>

              <!-- En-tête -->
              <div style="padding: 28px 32px 20px 32px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td>
                      <span style="font-family: monospace; font-size: 11px; font-weight: 700; letter-spacing: 1.2px; color: #a259ff; text-transform: uppercase; background: rgba(162, 89, 255, 0.12); border: 1px solid rgba(162, 89, 255, 0.25); padding: 4px 10px; border-radius: 9999px; display: inline-block;">
                        Nouveau Message
                      </span>
                    </td>
                    <td style="text-align: right; font-size: 12px; color: #525866; font-weight: 500;">
                      maximelussiana.fr
                    </td>
                  </tr>
                </table>

                <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 20px 0 0 0; letter-spacing: -0.4px;">
                  ${name}
                </h1>
              </div>

              <!-- Séparateur -->
              <div style="height: 1px; background-color: #1d212c; margin: 0 32px;"></div>

              <!-- Métadonnées -->
              <div style="padding: 20px 32px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #626875; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; width: 100px;">
                      Email
                    </td>
                    <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">
                      <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #626875; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Besoin
                    </td>
                    <td style="padding: 8px 0;">
                      <span style="background-color: #1a1d26; color: #e2e8f0; font-size: 13px; font-weight: 600; padding: 4px 10px; border-radius: 6px; border: 1px solid #282d3c; display: inline-block;">
                        ${type || 'Non spécifié'}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Corps du message -->
              <div style="padding: 0 32px 32px 32px;">
                <p style="color: #626875; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">
                  Message
                </p>
                <div style="background-color: #0a0b0e; border: 1px solid #1d212c; border-radius: 14px; padding: 20px; color: #d1d5db; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>

                <!-- Bouton d'action -->
                <div style="margin-top: 28px;">
                  <a href="mailto:${email}" style="display: block; box-sizing: border-box; background: #0048e4; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 14px 20px; border-radius: 12px; text-align: center; box-shadow: 0 4px 20px rgba(0, 72, 228, 0.35);">
                    Répondre à ${name}
                  </a>
                </div>
              </div>

            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Erreur d'envoi Resend :", err);
    return { success: false, error: "Une erreur est survenue lors de l'envoi du message." };
  }
}