CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.claim_admin()
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN RETURN false; END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    RETURN EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin' AND user_id = uid);
  END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (uid, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN true;
END;
$$;
GRANT EXECUTE ON FUNCTION public.claim_admin() TO authenticated;

CREATE TABLE public.rsvp_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  attendance text NOT NULL,
  guests integer NOT NULL DEFAULT 1,
  message text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.rsvp_entries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rsvp_entries TO authenticated;
GRANT ALL ON public.rsvp_entries TO service_role;
ALTER TABLE public.rsvp_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read wishes" ON public.rsvp_entries FOR SELECT USING (true);
CREATE POLICY "Anyone can submit rsvp" ON public.rsvp_entries FOR INSERT WITH CHECK (
  length(btrim(name)) BETWEEN 2 AND 100
  AND length(message) <= 1000
  AND guests BETWEEN 1 AND 10
  AND attendance IN ('hadir','ragu','tidak')
);
CREATE POLICY "Admins can delete rsvp" ON public.rsvp_entries FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.guest_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text,
  sent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.guest_invites TO authenticated;
GRANT ALL ON public.guest_invites TO service_role;
ALTER TABLE public.guest_invites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage guests" ON public.guest_invites FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));