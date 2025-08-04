import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role key to bypass RLS
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Parse request body
    const { sessionId } = await req.json();
    
    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    console.log(`Verifying payment for session: ${sessionId}`);

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Retrieve checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status !== 'paid') {
      throw new Error("Payment not completed");
    }

    const courseSlug = session.metadata?.courseSlug;
    const userId = session.metadata?.userId;

    if (!courseSlug || !userId) {
      throw new Error("Missing course or user information in session metadata");
    }

    console.log(`Payment verified for course: ${courseSlug}, user: ${userId}`);

    // Get current user profile
    const { data: profile, error: profileError } = await supabaseService
      .from('profiles')
      .select('cursos_liberados, status')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error("Error fetching user profile:", profileError);
      throw new Error("Failed to fetch user profile");
    }

    // Add course to user's released courses
    const cursosLiberados = profile.cursos_liberados || [];
    if (!cursosLiberados.includes(courseSlug)) {
      cursosLiberados.push(courseSlug);
      
      // Update user profile with new course access
      const { error: updateError } = await supabaseService
        .from('profiles')
        .update({
          cursos_liberados: cursosLiberados,
          status: 'ativo', // Ensure user has active status
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (updateError) {
        console.error("Error updating user profile:", updateError);
        throw new Error("Failed to grant course access");
      }

      console.log(`Course access granted: ${courseSlug} for user: ${userId}`);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      courseSlug,
      message: "Payment verified and course access granted" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});