import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  try {
    // 1. Receive the payload from Supabase Auth Hook
    const payload = await req.json();
    
    // Extract the phone number and the generated OTP
    const phone = payload.phone; 
    const otp = payload.otp;

    // 2. Format the number (Remove the '+' as MSG91 usually expects raw country code + number)
    const formattedPhone = phone.replace('+', '');

    // 3. Get your secure secrets
    const authKey = Deno.env.get("MSG91_AUTH_KEY");
    const templateId = Deno.env.get("MSG91_TEMPLATE_ID");

    if (!authKey || !templateId) {
        throw new Error("Missing MSG91 credentials in environment variables.");
    }

    // 4. Prepare the MSG91 API Request
    const msg91Payload = {
      template_id: templateId,
      short_url: "0",
      recipients: [
        {
          mobiles: formattedPhone,
          VAR1: otp // Injects the 6-digit OTP into your template
        }
      ]
    };

    // 5. Send the request to MSG91
    const response = await fetch("https://control.msg91.com/api/v5/flow/", {
      method: "POST",
      headers: {
        "authkey": authKey,
        "accept": "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify(msg91Payload),
    });

    const result = await response.json();

    if (result.type === "error") {
      throw new Error(result.message);
    }

    // 6. Tell Supabase it was successful
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
})