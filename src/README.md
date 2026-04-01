# EasyWorkTogether frontend (API-aligned)

This frontend has been rewritten to match the provided backend API contract.

## What changed

- Landing page UI kept intact.
- Landing page navigation now points to real app surfaces.
- Auth flow uses the backend endpoints under `/api/*`.
- Workspace selector uses `/api/workspaces`, `/api/invitations/pending`, `/api/invitations/accept`, `/api/invitations/{id}/decline`.
- Dashboard uses `/api/workspaces/{id}/stats`, `/api/workspaces/{id}/my-stats`, `/api/workspaces/{id}/tasks`, `/api/workspaces/{id}/members`.
- Tasks page uses create/list/update/delete/story-point-votes endpoints.
- Invitations page uses list/create/resend/revoke invitation endpoints plus invite suggestions.
- Members page uses list/update/remove/transfer ownership endpoints.
- Setup page uses `/api/profile`, `/api/profile/summary`, `/api/change-password`, `/api/workspaces/{id}` and delete workspace.

## Run

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env` and set:

```bash
VITE_API_BASE_URL=http://localhost:5000
```

The backend expects Bearer auth using the session token returned from `/api/login`.
