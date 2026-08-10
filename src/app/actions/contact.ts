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
      subject: `[Portfolio] Nouveau message de ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="background-color: #09090b; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px 16px; margin: 0; color: #ffffff;">
            <div style="max-width: 580px; margin: 0 auto; background-color: #121318; border: 1px solid #232530; border-radius: 20px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.6);">
              
              <!-- En-tête avec dégradé -->
              <div style="background: linear-gradient(135deg, #0048e4 0%, #a259ff 100%); padding: 28px 32px;">
                <h1 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 0; letter-spacing: -0.3px;">Nouveau message de contact</h1>
                <p style="color: rgba(255, 255, 255, 0.85); font-size: 13px; margin: 6px 0 0 0; font-weight: 500;">Provenant de maximelussiana.fr</p>
              </div>

              <!-- Corps du message -->
              <div style="padding: 32px;">
                
                <!-- Informations expéditeur -->
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                  <tr>
                    <td style="padding: 8px 0; color: #8a8f9e; font-size: 13px; width: 130px; font-weight: 600;">Expéditeur :</td>
                    <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 700;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #8a8f9e; font-size: 13px; font-weight: 600;">Adresse email :</td>
                    <td style="padding: 8px 0; color: #3b82f6; font-size: 14px;">
                      <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none; font-weight: 600;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #8a8f9e; font-size: 13px; font-weight: 600;">Type de besoin :</td>
                    <td style="padding: 8px 0; color: #a259ff; font-size: 14px; font-weight: 700;">${type || 'Non spécifié'}</td>
                  </tr>
                </table>

                <div style="height: 1px; background-color: #232530; margin: 24px 0;"></div>

                <!-- Message -->
                <p style="color: #8a8f9e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin: 0 0 12px 0;">Message :</p>
                <div style="background-color: #09090b; border: 1px solid #232530; border-radius: 12px; padding: 20px; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>

                <!-- Bouton de réponse -->
                <div style="margin-top: 32px; text-align: center;">
                  <a href="mailto:${email}" style="display: inline-block; background-color: #0048e4; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 14px 32px; border-radius: 9999px; box-shadow: 0 4px 14px rgba(0,72,228,0.4);">
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