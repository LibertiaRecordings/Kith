// src/integrations/cloudflare/client.ts
// This file will define the base URL for your Cloudflare Worker.
// You will need to replace 'YOUR_CLOUDFLARE_WORKER_URL' with the actual URL of your deployed Worker.

export const CLOUDFLARE_WORKER_BASE_URL = process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER_URL || 'http://localhost:8787/api';