import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InviteRequest {
  email: string;
  fullName: string;
  enrollmentId: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, fullName, enrollmentId }: InviteRequest = await req.json();

    if (!email || !enrollmentId) {
      throw new Error("Missing required fields: email, enrollmentId");
    }

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      throw new Error("Server misconfiguration: Missing Email API Key");
    }

    // Determine the Link (Hardcoded for now, or env var)
    // For local dev, usually http://localhost:5173/login?mode=activate
    // For production, https://your-domain.com/login?mode=activate
    // We'll just point to /login for now as the user requested "Option A" which is a secure setup link.
    // Ideally we pass a localized origin from the client, or use a configured SITE_URL.
    // For MVP, let's use a generic link instructing them to enter their ID.
    
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "E-Cell Wadeh <onboarding@resend.dev>", // update this if user has a domain
        to: [email],
        subject: "Welcome to Wadeh Medical College - Activate Your Account",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Welcome, ${fullName || 'Student'}!</h1>
            <p>You have been enrolled at Wadeh Medical College.</p>
            <p><strong>Your Enrollment ID is:</strong> <code style="background: #eee; padding: 4px 8px; border-radius: 4px; font-size: 1.2em;">${enrollmentId}</code></p>
            <p>Please click the button below to activate your account and set up your password.</p>
            <a href="http://localhost:5173/login?activation=true&eid=${enrollmentId}&email=${encodeURIComponent(email)}" 
               style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
               Activate Account
            </a>
            <p style="margin-top: 24px; font-size: 0.9em; color: #666;">
              If the button doesn't work, go to <a href="http://localhost:5173/login">http://localhost:5173/login</a> and select "Activate Student".
            </p>
          </div>
        `,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
        console.error("Resend API Error:", data);
        throw new Error(data.message || "Failed to send email");
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
