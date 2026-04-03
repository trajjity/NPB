export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const data = req.body;

  const firstName = (data.fullName || '').split(' ')[0] || 'there';

  // Branded HTML email for the applicant
  const applicantHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f5f5f7;font-family:Inter,system-ui,-apple-system,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f7;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

<!-- Header -->
<tr><td style="background-color:#111111;padding:40px 48px;text-align:center;">
  <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">No Push Backs</h1>
  <p style="margin:6px 0 0;font-size:14px;color:#888888;font-weight:400;">Barbershop</p>
</td></tr>

<!-- Body -->
<tr><td style="padding:48px;">
  <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#1a1a1a;">Hey ${firstName},</h2>
  <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#555555;">
    We received your application and appreciate your interest in joining the No Push Backs team. Our crew will review your info and get back to you soon.
  </p>

  <!-- Application Summary -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa;border-radius:12px;border:1px solid #e8eaed;margin-bottom:32px;">
  <tr><td style="padding:24px 28px;">
    <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;color:#888888;">Your Application Summary</p>
    <p style="margin:0;font-size:15px;color:#333333;line-height:1.8;">
      <strong>Name:</strong> ${data.fullName}<br>
      <strong>Experience:</strong> ${data.experience || 'N/A'}<br>
      <strong>Licensed:</strong> ${data.licensed || 'N/A'}
    </p>
  </td></tr>
  </table>

  <p style="margin:0 0 32px;font-size:16px;line-height:1.7;color:#555555;">
    In the meantime, feel free to check us out on Instagram or stop by the shop.
  </p>

  <!-- CTA Button -->
  <table cellpadding="0" cellspacing="0">
  <tr><td style="background-color:#1a73e8;border-radius:8px;">
    <a href="https://www.instagram.com/nopushbacks/" target="_blank" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">Follow @nopushbacks</a>
  </td></tr>
  </table>
</td></tr>

<!-- Footer -->
<tr><td style="padding:0 48px 40px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e8eaed;padding-top:24px;">
  <tr><td>
    <p style="margin:0 0 4px;font-size:13px;color:#888888;">No Push Backs Barbershop</p>
    <p style="margin:0 0 4px;font-size:13px;color:#888888;">204 Mill St, Suite 102 &middot; Bristol, PA 19007</p>
    <p style="margin:0;font-size:13px;color:#888888;">(215) 447-8392 &middot; <a href="https://nopushbacks.com" style="color:#1a73e8;text-decoration:none;">nopushbacks.com</a></p>
  </td></tr>
  </table>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  // Plain text for the owner notification
  const ownerText = `New Career Application - No Push Backs

Full Name: ${data.fullName}
Email: ${data.email}
Date of Birth: ${data.dob}
Address: ${data.address}
Experience: ${data.experience}
Licensed: ${data.licensed}
Currently Working: ${data.currentlyWorking}
Haircut Price: ${data.haircutPrice || 'N/A'}

About:
${data.about}
`;

  const ownerHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#f5f5f7;font-family:Inter,system-ui,-apple-system,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f7;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
<tr><td style="background-color:#111111;padding:32px 48px;text-align:center;">
  <h1 style="margin:0;font-size:20px;font-weight:800;color:#ffffff;">New Career Application</h1>
</td></tr>
<tr><td style="padding:40px 48px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Full Name</strong><br><span style="font-size:15px;color:#333;">${data.fullName}</span></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Email</strong><br><a href="mailto:${data.email}" style="font-size:15px;color:#1a73e8;">${data.email}</a></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Date of Birth</strong><br><span style="font-size:15px;color:#333;">${data.dob}</span></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Address</strong><br><span style="font-size:15px;color:#333;">${data.address}</span></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Experience</strong><br><span style="font-size:15px;color:#333;">${data.experience}</span></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Licensed</strong><br><span style="font-size:15px;color:#333;">${data.licensed}</span></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Currently Working</strong><br><span style="font-size:15px;color:#333;">${data.currentlyWorking}</span></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Haircut Price</strong><br><span style="font-size:15px;color:#333;">${data.haircutPrice || 'N/A'}</span></td></tr>
    <tr><td style="padding:12px 0;"><strong style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">About</strong><br><p style="font-size:15px;color:#333;line-height:1.6;margin:8px 0 0;white-space:pre-wrap;">${data.about}</p></td></tr>
  </table>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  // Verify Turnstile captcha
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret && data.captchaToken) {
    const captchaRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: turnstileSecret,
        response: data.captchaToken
      })
    });
    const captchaData = await captchaRes.json();
    if (!captchaData.success) {
      return res.status(400).json({ error: 'Captcha verification failed' });
    }
  }

  try {
    // Send confirmation to applicant
    const applicantRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'No Push Backs <onboarding@resend.dev>',
        to: [data.email],
        subject: 'We Received Your Application - No Push Backs',
        html: applicantHtml
      })
    });

    // Send notification to owner
    const ownerRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'NPB Careers <onboarding@resend.dev>',
        to: ['tonysautner1@gmail.com'],
        subject: `New Career Application: ${data.fullName}`,
        html: ownerHtml,
        text: ownerText,
        reply_to: data.email
      })
    });

    const applicantData = await applicantRes.json();
    const ownerData = await ownerRes.json();

    if (applicantRes.ok && ownerRes.ok) {
      return res.status(200).json({ success: true });
    } else {
      console.error('Resend error:', applicantData, ownerData);
      return res.status(500).json({ error: 'Failed to send emails', details: { applicant: applicantData, owner: ownerData } });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
