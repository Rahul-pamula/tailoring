-- SCHEMA SETUP FOR RAJESHWARI TAILORING

-- 1. Create 'designs' table
CREATE TABLE public.designs (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    custom_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Dress', 'Blouse')),
    image_urls TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create 'reviews' table
CREATE TABLE public.reviews (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    image_urls TEXT[] DEFAULT '{}',
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Row Level Security (RLS) on Tables

ALTER TABLE public.designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Clean up existing policies if they already exist
DROP POLICY IF EXISTS "Allow public read access to designs" ON public.designs;
DROP POLICY IF EXISTS "Allow authenticated users to manage designs" ON public.designs;
DROP POLICY IF EXISTS "Allow authenticated users to insert designs" ON public.designs;
DROP POLICY IF EXISTS "Allow authenticated users to delete designs" ON public.designs;
DROP POLICY IF EXISTS "Allow authenticated users to update designs" ON public.designs;
DROP POLICY IF EXISTS "Allow all access to designs" ON public.designs;

DROP POLICY IF EXISTS "Allow public to insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Allow public to read approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Allow authenticated users to select reviews" ON public.reviews;
DROP POLICY IF EXISTS "Allow authenticated users to update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Allow authenticated users to delete reviews" ON public.reviews;
DROP POLICY IF EXISTS "Allow authenticated users to manage reviews" ON public.reviews;
DROP POLICY IF EXISTS "Allow all access to reviews" ON public.reviews;

-- Open all access to designs and reviews for anyone (bypassing Supabase Auth requirement)
CREATE POLICY "Allow all access to designs" ON public.designs
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all access to reviews" ON public.reviews
    FOR ALL USING (true) WITH CHECK (true);

-- 4. Storage Bucket Setup
INSERT INTO storage.buckets (id, name, public) 
VALUES ('designs-images', 'designs-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('reviews-images', 'reviews-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies on storage.objects
-- Clean up existing storage policies if they already exist
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Review Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Storage Access" ON storage.objects;

-- Allow anyone to read, upload, and delete images in the tailoring buckets
CREATE POLICY "Public Storage Access"
ON storage.objects FOR ALL
USING ( bucket_id IN ('designs-images', 'reviews-images') )
WITH CHECK ( bucket_id IN ('designs-images', 'reviews-images') );

-- 5. Create 'admins' table
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    mobile_number TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on admins table
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Allow read access to admins (for login queries)
DROP POLICY IF EXISTS "Allow select admins" ON public.admins;
CREATE POLICY "Allow select admins" ON public.admins
    FOR SELECT USING (true);

-- Insert the default admin credential
INSERT INTO public.admins (mobile_number, password)
VALUES ('9849098510', '@RAJESHWARISURESH')
ON CONFLICT (mobile_number) DO NOTHING;

-- 6. Seed the Supabase Auth user so RLS policies can authorize client-side requests
-- Enable the pgcrypto extension if not already enabled (needed for crypt/gen_salt)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    role,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
)
VALUES (
    'd0ebd99c-29a5-4081-8078-4ef186c35967',
    '00000000-0000-0000-0000-000000000000',
    'admin@rajeshwari.com',
    crypt('@RAJESHWARISURESH', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Admin"}',
    now(),
    now(),
    'authenticated',
    '',
    '',
    '',
    ''
) ON CONFLICT (id) DO NOTHING;

-- Map user to auth.identities so Supabase Auth recognizes it
INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
)
VALUES (
    'd0ebd99c-29a5-4081-8078-4ef186c35967',
    'd0ebd99c-29a5-4081-8078-4ef186c35967',
    jsonb_build_object('sub', 'd0ebd99c-29a5-4081-8078-4ef186c35967', 'email', 'admin@rajeshwari.com'),
    'email',
    now(),
    now(),
    now()
) ON CONFLICT (id) DO NOTHING;
