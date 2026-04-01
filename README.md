# EasyWorkTogether

Production-clean React/Vite project.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Auth service

This project supports two auth modes:

- **Real API mode**: set `VITE_API_BASE_URL`
- **Demo mode**: set `VITE_ENABLE_DEMO_AUTH=true` or leave `VITE_API_BASE_URL` empty

Default real-auth endpoints expected by the frontend:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/auth/providers`
- `GET /api/auth/oauth/:provider/start`

## Notes

- Landing page files were kept unchanged.
- Auth pages were cleaned by extracting shared auth components and submit-state logic.
- Protected routes were added for workspace surfaces.
