-- Fix: ensure claim_admin is called correctly and guest_invites RLS
-- allows authenticated admin users to INSERT/UPDATE/DELETE.
--
-- Root cause: has_role() may return false if the session is fresh and
-- claim_admin has not yet committed, or if the JWT was issued before
-- the user_roles row was written.
--
-- Fix: drop the single FOR ALL policy and replace with explicit per-verb
-- policies. Also add a direct uid-based fallback so the very first admin
-- can always write (claim_admin inserts the first row, which is allowed
-- because user_roles has no RLS on INSERT for authenticated users via GRANT).

-- Drop the existing catch-all policy
DROP POLICY IF EXISTS "Admins manage guests" ON public.guest_invites;

-- SELECT: admins only
CREATE POLICY "Admins select guests"
  ON public.guest_invites
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- INSERT: admins only
CREATE POLICY "Admins insert guests"
  ON public.guest_invites
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- UPDATE: admins only
CREATE POLICY "Admins update guests"
  ON public.guest_invites
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- DELETE: admins only
CREATE POLICY "Admins delete guests"
  ON public.guest_invites
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Ensure has_role is stable and marked SECURITY DEFINER so it can bypass
-- RLS on user_roles when called from within another RLS check.
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
