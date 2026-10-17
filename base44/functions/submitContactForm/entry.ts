import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing name, email, or message' }, { status: 400 });
    }

    // Create the submission record using service role (no user login needed)
    await base44.asServiceRole.entities.ContactSubmission.create({ name, email, message });

    // Send notification email — best-effort, don't fail the submission if email delivery errors
    try {
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: 'ihsaninnovators@gmail.com',
        template_name: 'NewContactSubmission',
        variables: { name, email, message, app_name: 'Ihsan Innovators' }
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError.message);
    }

    return Response.json({ sent: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}