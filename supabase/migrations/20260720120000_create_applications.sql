-- Create applications table for storing form submissions
CREATE TABLE IF NOT EXISTS public.applications (
    id bigint primary key generated always as identity,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    phone text not null,
    extra text,
    type text not null
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert new rows (submit forms)
CREATE POLICY "Allow anonymous insert" 
ON public.applications 
FOR INSERT 
TO anon 
WITH CHECK (true);
