const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://handymanservices.com";

function layout(content: string): string {
  return `
<!DOCTYPE html>
<html lang="lt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background:#2563EB;padding:24px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;">Handyman Services</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;color:#6b7280;font-size:13px;">
              <p style="margin:0;">&copy; ${new Date().getFullYear()} Handyman Services. Visos teisės saugomos.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function verificationEmail(name: string, token: string): string {
  const url = `${BASE_URL}/verify-email?token=${token}`;
  return layout(`
    <h2 style="color:#1a1a1a;margin:0 0 16px;">Sveiki, ${name}!</h2>
    <p style="color:#4b5563;line-height:1.6;">Dėkojame, kad užsiregistravote Handyman Services platformoje. Patvirtinkite savo el. pašto adresą paspausdami žemiau esantį mygtuką:</p>
    <div style="text-align:center;margin:32px 0;">
      <a href="${url}" style="background:#2563EB;color:#ffffff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block;">Patvirtinti el. paštą</a>
    </div>
    <p style="color:#6b7280;font-size:13px;">Jei nepregistravotės Handyman Services — ignoruokite šį laišką.</p>
  `);
}

export function passwordResetEmail(name: string, token: string): string {
  const url = `${BASE_URL}/reset-password?token=${token}`;
  return layout(`
    <h2 style="color:#1a1a1a;margin:0 0 16px;">Slaptažodžio atkūrimas</h2>
    <p style="color:#4b5563;line-height:1.6;">Sveiki, ${name}. Gavome prašymą atstatyti jūsų slaptažodį. Paspauskite mygtuką žemiau:</p>
    <div style="text-align:center;margin:32px 0;">
      <a href="${url}" style="background:#2563EB;color:#ffffff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block;">Atstatyti slaptažodį</a>
    </div>
    <p style="color:#6b7280;font-size:13px;">Nuoroda galioja 1 valandą. Jei neprašėte slaptažodžio atstatymo — ignoruokite šį laišką.</p>
  `);
}

export function newQuoteReceivedEmail(
  customerName: string,
  tradespersonName: string,
  jobTitle: string,
  price: number
): string {
  const url = `${BASE_URL}/account/quotes`;
  return layout(`
    <h2 style="color:#1a1a1a;margin:0 0 16px;">Gautas naujas pasiūlymas!</h2>
    <p style="color:#4b5563;line-height:1.6;">Sveiki, ${customerName}. <strong>${tradespersonName}</strong> pateikė pasiūlymą jūsų užklausai „${jobTitle}":</p>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;margin:24px 0;text-align:center;">
      <p style="margin:0;color:#166534;font-size:28px;font-weight:700;">€${price.toFixed(2)}</p>
    </div>
    <div style="text-align:center;margin:24px 0;">
      <a href="${url}" style="background:#2563EB;color:#ffffff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block;">Peržiūrėti pasiūlymą</a>
    </div>
  `);
}

export function milestoneSubmittedEmail(
  customerName: string,
  milestoneName: string,
  bookingTitle: string
): string {
  const url = `${BASE_URL}/account/bookings`;
  return layout(`
    <h2 style="color:#1a1a1a;margin:0 0 16px;">Etapas pateiktas peržiūrai</h2>
    <p style="color:#4b5563;line-height:1.6;">Sveiki, ${customerName}. Meistras pateikė etapą „<strong>${milestoneName}</strong>" užsakyme „${bookingTitle}" jūsų patvirtinimui.</p>
    <p style="color:#4b5563;line-height:1.6;">Peržiūrėkite atliktą darbą ir patvirtinkite arba pateikite pastabas per 72 valandas.</p>
    <div style="text-align:center;margin:32px 0;">
      <a href="${url}" style="background:#2563EB;color:#ffffff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block;">Peržiūrėti etapą</a>
    </div>
    <p style="color:#6b7280;font-size:13px;">Jei nepatvirtinsite per 72 valandas, etapas bus automatiškai patvirtintas.</p>
  `);
}

export function milestoneApprovedEmail(
  tradespersonName: string,
  milestoneName: string,
  amount: number
): string {
  const url = `${BASE_URL}/tradesperson/earnings`;
  return layout(`
    <h2 style="color:#1a1a1a;margin:0 0 16px;">Etapas patvirtintas!</h2>
    <p style="color:#4b5563;line-height:1.6;">Sveiki, ${tradespersonName}. Klientas patvirtino etapą „<strong>${milestoneName}</strong>".</p>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;margin:24px 0;text-align:center;">
      <p style="margin:0 0 4px;color:#6b7280;font-size:14px;">Išmoka:</p>
      <p style="margin:0;color:#166534;font-size:28px;font-weight:700;">€${amount.toFixed(2)}</p>
    </div>
    <div style="text-align:center;margin:24px 0;">
      <a href="${url}" style="background:#2563EB;color:#ffffff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block;">Peržiūrėti pajamas</a>
    </div>
  `);
}

export function bookingConfirmedEmail(
  name: string,
  jobTitle: string,
  tradespersonName: string,
  totalPrice: number
): string {
  const url = `${BASE_URL}/account/bookings`;
  return layout(`
    <h2 style="color:#1a1a1a;margin:0 0 16px;">Užsakymas patvirtintas!</h2>
    <p style="color:#4b5563;line-height:1.6;">Sveiki, ${name}. Jūsų užsakymas „<strong>${jobTitle}</strong>" su <strong>${tradespersonName}</strong> yra patvirtintas.</p>
    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:20px;margin:24px 0;">
      <p style="margin:0 0 8px;color:#1e40af;font-weight:600;">Bendra suma: €${totalPrice.toFixed(2)}</p>
      <p style="margin:0;color:#4b5563;font-size:14px;">Mokėjimas bus atliekamas etapais per saugų escrow mechanizmą.</p>
    </div>
    <div style="text-align:center;margin:24px 0;">
      <a href="${url}" style="background:#2563EB;color:#ffffff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block;">Peržiūrėti užsakymą</a>
    </div>
  `);
}
