# nutrition-connect-platform-172674-172684

This workspace includes a web frontend and a backend. Configure environment variables using the provided `.env.example` files:

- Frontend: `web_frontend/.env.example`
  - `REACT_APP_USE_SUPABASE_AUTH=true`
  - `REACT_APP_SUPABASE_URL`
  - `REACT_APP_SUPABASE_ANON_KEY`
  - `REACT_APP_STORAGE_BUCKET=uploads` (frontend reference; backend storage remains disabled)

- Backend: refer to backend repo `nutrition-connect-platform-172674-172685/backend/.env.example` for:
  - `USE_SUPABASE_AUTH=true`
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `SUPABASE_JWKS_URL` (e.g., https://<project>.supabase.co/auth/v1/.well-known/jwks.json)
  - `SUPABASE_STORAGE_ENABLED=false`
  - `SUPABASE_STORAGE_BUCKET=uploads`
  - `SUPABASE_SERVICE_ROLE_KEY=` (leave empty; never commit)