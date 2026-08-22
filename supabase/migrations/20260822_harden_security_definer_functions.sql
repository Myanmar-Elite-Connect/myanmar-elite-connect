-- MEC security hardening migration
-- Applied to Supabase project ikjwisfsdcupibgjiuvp on 2026-08-22.

BEGIN;

-- Trigger/internal SECURITY DEFINER functions must not be exposed as RPC endpoints.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.protect_profile_privileged_fields() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.protect_profile_privileged_fields() FROM anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.reset_listing_to_pending_on_owner_edit() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.reset_listing_to_pending_on_owner_edit() FROM anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.update_chat_room_timestamp() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.update_chat_room_timestamp() FROM anon, authenticated;

-- Admin RPCs keep authenticated access because the functions enforce admin_only internally.
REVOKE EXECUTE ON FUNCTION public.admin_review_listing(uuid, text, text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_set_ui_theme(text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.admin_review_listing(uuid, text, text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_set_ui_theme(text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;

-- Pin trigger-function search paths to prevent search_path manipulation.
ALTER FUNCTION public.set_updated_at() SET search_path = public;
ALTER FUNCTION public.set_listings_updated_at() SET search_path = public;
ALTER FUNCTION public.sync_listing_market_category() SET search_path = public;
ALTER FUNCTION public.normalize_listing_insert_values() SET search_path = public;

COMMIT;
