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
      subject: `[Nouveau Projet] ${name} — ${type || 'Contact'}`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              @media only screen and (max-width: 600px) {
                .container {
                  border-radius: 20px !important;
                }
                .padding-box {
                  padding: 20px 16px !important;
                }
                .mobile-stack {
                  display: block !important;
                  width: 100% !important;
                  box-sizing: border-box !important;
                }
                .mobile-badge {
                  text-align: left !important;
                  margin-top: 14px !important;
                }
                .mobile-title {
                  font-size: 20px !important;
                }
                .mobile-cell-label {
                  display: block !important;
                  width: 100% !important;
                  padding-bottom: 4px !important;
                }
                .mobile-cell-value {
                  display: block !important;
                  width: 100% !important;
                  padding-bottom: 12px !important;
                }
              }
            </style>
          </head>
          <body style="background-color: #0d0e12; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif; padding: 24px 8px; margin: 0; -webkit-font-smoothing: antialiased;">
            
            <div class="container" style="max-width: 580px; margin: 0 auto; background-color: #12141c; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 28px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
              
              <!-- Ligne néon supérieure -->
              <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, #a259ff 50%, transparent 100%); width: 100%;"></div>

              <!-- En-tête : Logo & Badge -->
              <div class="padding-box" style="padding: 32px 32px 24px 32px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td class="mobile-stack" style="vertical-align: middle;">
                      <img 
                        src="https://www.maximelussiana.fr/assets/logo-email.png" 
                        alt="Maxime Lussiana" 
                        width="150" 
                        style="display: block; border: 0; outline: none; text-decoration: none; max-width: 150px; height: auto;" 
                      />
                    </td>
                    <td class="mobile-stack mobile-badge" style="text-align: right; vertical-align: middle;">
                      <span style="font-family: monospace; font-size: 10px; font-weight: 700; letter-spacing: 1px; color: #22c55e; background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); padding: 5px 12px; border-radius: 9999px; text-transform: uppercase; display: inline-block;">
                        ● NOUVEAU MESSAGE
                      </span>
                    </td>
                  </tr>
                </table>

                <!-- Titre accrocheur -->
                <div style="margin-top: 24px;">
                  <h1 class="mobile-title" style="color: #ffffff; font-size: 24px; font-weight: 900; margin: 0; letter-spacing: -0.5px; line-height: 1.2;">
                    ${name} <span style="color: #3b82f6; font-style: italic; font-weight: 700;">souhaite échanger.</span>
                  </h1>
                </div>
              </div>

              <!-- Séparateur -->
              <div style="height: 1px; background-color: rgba(255, 255, 255, 0.06); margin: 0 16px;"></div>

              <!-- Fiche d'information -->
              <div class="padding-box" style="padding: 24px 32px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td class="mobile-cell-label" style="padding: 8px 0; font-family: monospace; color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; width: 110px;">
                      EMAIL
                    </td>
                    <td class="mobile-cell-value" style="padding: 8px 0; font-size: 14px; font-weight: 600; word-break: break-all;">
                      <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td class="mobile-cell-label" style="padding: 8px 0; font-family: monospace; color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                      EXPERTISE
                    </td>
                    <td class="mobile-cell-value" style="padding: 8px 0;">
                      <span style="background-color: rgba(255, 255, 255, 0.05); color: #f1f5f9; font-size: 12px; font-weight: 600; font-family: monospace; padding: 5px 12px; border-radius: 9999px; border: 1px solid rgba(255, 255, 255, 0.1); display: inline-block;">
                        ${type || 'Non spécifié'}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Bloc Message -->
              <div class="padding-box" style="padding: 0 32px 32px 32px;">
                <p style="font-family: monospace; color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0;">
                  MESSAGE
                </p>
                <div style="background-color: #090a0f; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 16px; padding: 18px; color: #cbd5e1; font-size: 14px; line-height: 1.6; white-space: pre-wrap; word-break: break-word;">${message}</div>

                <!-- Bouton Pilule -->
                <div style="margin-top: 24px;">
                  <a href="mailto:${email}" style="display: block; box-sizing: border-box; background-color: #0048e4; color: #ffffff; text-decoration: none; font-family: monospace; font-weight: 700; font-size: 14px; padding: 15px 20px; border-radius: 9999px; text-align: center; box-shadow: 0 0 25px rgba(0, 72, 228, 0.35);">
                    Répondre à ${name} &nbsp;→
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