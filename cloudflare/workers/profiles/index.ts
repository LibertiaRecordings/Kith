/// <reference types="@cloudflare/workers-types" />

// cloudflare/workers/profiles/index.ts
// This is a placeholder for your Cloudflare Worker.
// You would deploy this Worker to Cloudflare, and it would interact with your D1 database.

export interface Env {
  // Example D1 binding
  DB: D1Database;
  // Example R2 binding for avatars
  AVATARS: R2Bucket;
}

interface ProfileUpdatePayload {
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/').filter(Boolean); // e.g., ["api", "profiles", "userId"]

    if (pathSegments[0] === 'api' && pathSegments[1] === 'profiles') {
      const userId = pathSegments[2];

      if (!userId) {
        return new Response(JSON.stringify({ message: 'User ID is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }

      switch (request.method) {
        case 'GET':
          // Implement logic to fetch profile from D1
          try {
            const { results } = await env.DB.prepare('SELECT first_name, last_name, avatar_url FROM profiles WHERE id = ?')
              .bind(userId)
              .all();

            if (results && results.length > 0) {
              return new Response(JSON.stringify({ profile: results[0] }), { status: 200, headers: { 'Content-Type': 'application/json' } });
            } else {
              return new Response(JSON.stringify({ message: 'Profile not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
            }
          } catch (e: any) {
            return new Response(JSON.stringify({ message: e.message || 'Error fetching profile' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
          }

        case 'PUT':
          // Implement logic to update profile in D1
          try {
            const body = await request.json() as ProfileUpdatePayload;
            const { first_name, last_name, avatar_url } = body;
            const { success } = await env.DB.prepare('UPDATE profiles SET first_name = ?, last_name = ?, avatar_url = ?, updated_at = ? WHERE id = ?')
              .bind(first_name, last_name, avatar_url, new Date().toISOString(), userId)
              .run();

            if (success) {
              return new Response(JSON.stringify({ message: 'Profile updated successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
            } else {
              return new Response(JSON.stringify({ message: 'Failed to update profile' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
            }
          } catch (e: any) {
            return new Response(JSON.stringify({ message: e.message || 'Error updating profile' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
          }

        default:
          return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
      }
    }

    return new Response(JSON.stringify({ message: 'Not Found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  },
};