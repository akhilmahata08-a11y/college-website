/* ==========================================================================
   Supabase configuration
   --------------------------------------------------------------------------
   Leave both values empty and the whole site runs offline, saving notices and
   applications in the visitor's browser (localStorage). Perfect for a demo or
   a GitHub Pages preview.

   To make data shared and persistent:

     1. Create a free project at https://supabase.com
     2. Open the SQL editor and run supabase/schema.sql from this project
     3. Project Settings -> API -> copy the Project URL and the "anon public" key
     4. Paste them below

   Only the anon key belongs here. Never paste the service_role key into a
   browser app — it bypasses row-level security.
   ========================================================================== */

window.SUPABASE_CONFIG = {
  url: "",      // e.g. "https://abcdefghijklmno.supabase.co"
  anonKey: ""   // e.g. "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
};
