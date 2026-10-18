import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const { name, email, details } = body || {};

    if (!name || !email || !details) {
      return Response.json({ error: 'Missing name, email, or details' }, { status: 400 });
    }

    // Send notification email — best-effort, don't fail the request if email delivery errors
    try {
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: 'ihsaninnovators@gmail.com',
        template_name: 'NewPrintRequest',
        variables: { name, email, details, app_name: 'Ihsan Innovators' }
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError.message);
    }

    return Response.json({ sent: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}