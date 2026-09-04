import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER || 'artemkudliuk@gmail.com',
    pass: process.env.SMTP_PASS || 'ojusrkfbbirbmqls'
  }
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

    const formName = data['Форма / Джерело'] || 'Форма на сайті';
    const clientName = data["Клієнт (Ім'я / Посада)"] || data.name || 'Не вказано';
    const clientPhone = data["Номер телефону"] || data.phone || 'Не вказано';
    const clientEmail = data["Email"] || data.email || 'Не вказано';
    const clientCity = data["Місто / Клініка"] || data.city || 'Не вказано';
    const messenger = data["Зручний месенджер"] || 'Не обрано';
    const formatDetails = data["Формат тесту / Апарат"] || '—';
    const pageUrl = data["Сторінка сайту"] || 'https://termosalud-new.vercel.app';
    const dateStr = data["Дата та час"] || new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' });

    const subject = `🔔 Нова заявка Termosalud: ${clientName} (${clientPhone})`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
        <div style="background: #18181b; padding: 24px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">TermoSalud Україна</h2>
          <p style="color: #a1a1aa; margin: 6px 0 0 0; font-size: 13px;">Нова вхідна заявка з офіційного сайту</p>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 12px 8px; color: #64748b; font-weight: 600; width: 38%;">Форма / Джерело:</td>
              <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${formName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9; background: #fafafa;">
              <td style="padding: 12px 8px; color: #64748b; font-weight: 600;">Клієнт (Ім'я / Посада):</td>
              <td style="padding: 12px 8px; color: #0f172a; font-weight: 700; font-size: 15px;">${clientName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 12px 8px; color: #64748b; font-weight: 600;">Номер телефону:</td>
              <td style="padding: 12px 8px; color: #2563eb; font-weight: 700; font-size: 16px;">
                <a href="tel:${clientPhone}" style="color: #2563eb; text-decoration: none;">${clientPhone}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9; background: #fafafa;">
              <td style="padding: 12px 8px; color: #64748b; font-weight: 600;">Email:</td>
              <td style="padding: 12px 8px; color: #0f172a;">
                ${clientEmail !== 'Не вказано' ? `<a href="mailto:${clientEmail}" style="color: #2563eb; text-decoration: none;">${clientEmail}</a>` : 'Не вказано'}
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 12px 8px; color: #64748b; font-weight: 600;">Місто / Клініка:</td>
              <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${clientCity}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9; background: #fafafa;">
              <td style="padding: 12px 8px; color: #64748b; font-weight: 600;">Зручний месенджер:</td>
              <td style="padding: 12px 8px; color: #059669; font-weight: 700;">${messenger}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 12px 8px; color: #64748b; font-weight: 600;">Формат тесту / Апарат:</td>
              <td style="padding: 12px 8px; color: #0f172a;">${formatDetails}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9; background: #fafafa;">
              <td style="padding: 12px 8px; color: #64748b; font-weight: 600;">Сторінка сайту:</td>
              <td style="padding: 12px 8px; color: #0f172a;">
                <a href="${pageUrl}" style="color: #64748b; text-decoration: underline;" target="_blank">${pageUrl}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 8px; color: #64748b; font-weight: 600;">Час надсилання:</td>
              <td style="padding: 12px 8px; color: #64748b;">${dateStr}</td>
            </tr>
          </table>
        </div>
        <div style="background: #f8fafc; padding: 14px 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
          TermoSalud España • Офіційний дистриб'ютор в Україні
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: '"TermoSalud Україна" <artemkudliuk@gmail.com>',
      to: 'zionic.ua@gmail.com',
      replyTo: clientEmail !== 'Не вказано' ? clientEmail : 'zionic.ua@gmail.com',
      subject: subject,
      html: htmlContent
    });

    return res.status(200).json({ success: true, message: 'Lead delivered successfully' });
  } catch (error) {
    console.error('SMTP lead delivery error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
