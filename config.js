const SUPABASE_URL = 'https://gxvcgubbqtccoycvdupq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_wy4_pxxwFkS63SSL_d5yug_Bgybs85R'; // Replace with your actual key

// Only create the client if it doesn't already exist in the window
if (!window.supabaseClient) {
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

// Now use window.supabaseClient for all your database calls