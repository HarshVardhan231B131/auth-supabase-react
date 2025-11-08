-- Create users table to sync Auth0 user data
CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  auth0_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  name TEXT,
  picture TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
-- Users can view their own data
CREATE POLICY "Users can view their own data" 
ON public.users 
FOR SELECT 
USING (auth0_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Users can update their own data
CREATE POLICY "Users can update their own data" 
ON public.users 
FOR UPDATE 
USING (auth0_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Allow inserting new users (for sync from Auth0)
CREATE POLICY "Allow inserting new users" 
ON public.users 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index on auth0_id for faster lookups
CREATE INDEX idx_users_auth0_id ON public.users(auth0_id);